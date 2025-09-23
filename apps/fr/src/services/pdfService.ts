import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { EvaluationScores } from '../types/evaluation';
import { calculateEvaluation } from '../utils/evaluationHelpers';

// 폰트 베이스 URL 설정
const fontBaseUrl =
  import.meta.env.VITE_ENV_FILE === 'production'
    ? 'https://mas9-file.s3.us-west-2.amazonaws.com'
    : 'https://mas9-stg-file.s3.us-west-2.amazonaws.com';

// NotoSansKR 폰트를 base64로 변환하여 jsPDF에 추가하는 함수
const addNotoSansKRFont = async (pdf: jsPDF): Promise<boolean> => {
  try {
    // NotoSansKR 폰트 파일들을 base64로 로드
    const regularFontUrl = `${fontBaseUrl}/fonts/NotoSansKR-Regular.ttf`;
    const boldFontUrl = `${fontBaseUrl}/fonts/NotoSansKR-Medium.ttf`;

    // 폰트 파일을 fetch하여 base64로 변환
    const [regularResponse, boldResponse] = await Promise.all([
      fetch(regularFontUrl),
      fetch(boldFontUrl),
    ]);

    if (regularResponse.ok && boldResponse.ok) {
      const [regularBuffer, boldBuffer] = await Promise.all([
        regularResponse.arrayBuffer(),
        boldResponse.arrayBuffer(),
      ]);

      // ArrayBuffer를 base64로 변환
      const regularBase64 = btoa(
        new Uint8Array(regularBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      const boldBase64 = btoa(
        new Uint8Array(boldBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      // jsPDF에 폰트 추가
      pdf.addFileToVFS('NotoSansKR-Regular.ttf', regularBase64);
      pdf.addFileToVFS('NotoSansKR-Medium.ttf', boldBase64);
      pdf.addFont('NotoSansKR-Regular.ttf', 'NotoSansKR', 'normal');
      pdf.addFont('NotoSansKR-Medium.ttf', 'NotoSansKR', 'bold');

      return true;
    }
  } catch (error) {
    console.error('Failed to load NotoSansKR fonts:', error);
    return false;
  }
  return false;
};

export interface PDFGenerationOptions {
  student: {
    fullName: string;
    oldRankName: string;
    newRankName: string;
    attendanceCount: number;
    homeworkCount: number;
    birth?: string;
    gender?: 'MALE' | 'FEMALE' | null;
  };
  scores: EvaluationScores;
  comments?: any;
  testingEvent?: string;
  schoolLogoUrl?: string; // 도장 로고 URL props 추가
}

export const generateEvaluationPDF = async (
  options: PDFGenerationOptions,
  preview: boolean = false
): Promise<void> => {
  const {
    student,
    scores,
    comments,
    testingEvent = 'Testing Event',
    schoolLogoUrl,
  } = options;

  // PDF 서비스에서 받은 데이터 확인
  console.log('🔍 PDF 서비스 받은 데이터:', {
    studentName: student.fullName,
    comments,
    commentsOverall: comments?.overall,
    commentsType: typeof comments?.overall,
    commentsLength: comments?.overall?.length,
    preview,
  });

  const evaluation = calculateEvaluation(scores);

  const pdf = new jsPDF('p', 'mm', 'a4');

  // NotoSansKR 폰트 추가
  const fontLoaded = await addNotoSansKRFont(pdf);
  if (!fontLoaded) {
    console.warn('Failed to load NotoSansKR fonts, using default fonts');
  }

  // Calculate age if birth date is available
  const age = student.birth
    ? new Date().getFullYear() - new Date(student.birth).getFullYear()
    : '';

  let yPosition = 15;
  const pageWidth = 210;
  const pageHeight = 297; // A4 height in mm
  const marginLeft = 12;
  const marginRight = 12;
  const marginBottom = 15;
  const contentWidth = pageWidth - marginLeft - marginRight;
  const maxY = pageHeight - marginBottom;

  // Helper function to check if new page is needed
  const checkPageBreak = (requiredHeight: number): number => {
    if (yPosition + requiredHeight > maxY) {
      pdf.addPage();
      return 15; // Reset to top margin
    }
    return yPosition;
  };

  // Helper function to add text with automatic line wrapping
  const addText = (
    text: string,
    x: number,
    y: number,
    fontSize: number = 10,
    fontStyle: string = 'normal',
    color: string = '#000000'
  ): number => {
    pdf.setFontSize(fontSize);
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', fontStyle);
    pdf.setTextColor(color);

    const lines = pdf.splitTextToSize(text, contentWidth - (x - marginLeft));
    pdf.text(lines, x, y);
    return y + lines.length * fontSize * 0.35; // Return next Y position
  };

  // Helper function to draw a rectangle
  const drawRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor?: string,
    borderColor: string = '#000000'
  ): void => {
    pdf.setDrawColor(borderColor);
    pdf.setLineWidth(0.5);

    if (fillColor) {
      pdf.setFillColor(fillColor);
      pdf.rect(x, y, width, height, 'FD');
    } else {
      pdf.rect(x, y, width, height, 'S');
    }
  };

  // Header with school logo - 우상단에 배치
  const logoSize = 25; // 더 적절한 크기
  const logoX = pageWidth - marginRight - logoSize - 5; // 우상단
  const logoY = 10; // 상단 여백

  // 이미지를 base64로 변환하는 유틸리티 함수 (성공하는 코드와 동일한 방식)
  const getBase64FromUrl = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const base64 = canvas.toDataURL('image/png');
        console.log('✅ Logo converted to base64, length:', base64.length);
        resolve(base64);
      };
      img.onerror = () => {
        console.error('❌ Logo image loading failed');
        resolve(''); // 실패시 빈 문자열 반환
      };
      img.src = url;
    });
  };

  // Function to add school logo - with extensive debugging
  const addSchoolLogo = async () => {
    console.log('🔄 Starting logo loading process...');
    console.log('Logo position:', { logoX, logoY, logoSize });

    // 기본 도장 로고 URL, props로 받은 URL 우선 사용
    const defaultLogoUrl =
      'https://de7r26jwjif71.cloudfront.net/schools/53/profile/88b70d1e-e3ee-4c56-800c-2a7a1a81cff9.png';
    const logoUrls = [
      schoolLogoUrl || defaultLogoUrl, // props로 받은 URL 우선
      defaultLogoUrl,
      'https://de7r26jwjif71.cloudfront.net/schools%2F53%2Fprofile%2F88b70d1e-e3ee-4c56-800c-2a7a1a81cff9.png',
      // 테스트용 이미지
      'https://via.placeholder.com/100x100/dd1921/ffffff?text=LOGO',
    ];

    for (const logoUrl of logoUrls) {
      try {
        console.log('🔄 Trying logo URL:', logoUrl);

        // Method 1: getBase64FromUrl 사용
        const logoBase64 = await getBase64FromUrl(logoUrl);
        if (logoBase64 && logoBase64.length > 100) {
          console.log(
            '✅ Base64 conversion successful, length:',
            logoBase64.length
          );
          pdf.addImage(logoBase64, 'PNG', logoX, logoY, logoSize, logoSize);
          console.log('✅ Logo successfully added to PDF at position:', {
            logoX,
            logoY,
            logoSize,
          });
          return true;
        } else {
          console.warn(
            '❌ Base64 conversion failed or too short:',
            logoBase64?.length
          );
          // 플레이스홀더를 여기서 호출하지 않음 - 다음 방법 시도
        }

        // Method 2: Direct URL to jsPDF (fallback)
        console.log('🔄 Trying direct URL method...');
        pdf.addImage(logoUrl, 'PNG', logoX, logoY, logoSize, logoSize);
        console.log('✅ Direct URL method successful');
        return true;
      } catch (error) {
        console.error('❌ Failed with URL:', logoUrl, error);
        continue;
      }
    }

    // Method 3: 텍스트 기반 로고 대신 표시
    console.log('🔄 All image methods failed, adding text logo');
    pdf.setFontSize(8);
    pdf.setTextColor('#DD1921');
    pdf.text('SCHOOL', logoX + logoSize / 2, logoY + logoSize / 2 - 2, {
      align: 'center',
    });
    pdf.text('LOGO', logoX + logoSize / 2, logoY + logoSize / 2 + 3, {
      align: 'center',
    });

    console.warn('❌ All logo loading methods failed, using text fallback');
    return false;
  };

  const addLogoPlaceholder = () => {
    drawRect(logoX, logoY, logoSize, logoSize, '#f8f9fa', '#e2e8f0');
    pdf.setTextColor('#9ca3af');
    pdf.setFontSize(6);
    pdf.text('SCHOOL', logoX + logoSize / 2, logoY + logoSize / 2 - 1, {
      align: 'center',
    });
    pdf.text('LOGO', logoX + logoSize / 2, logoY + logoSize / 2 + 2, {
      align: 'center',
    });
  };

  // 로고 배경 (선택적으로 사용)
  // drawRect(logoX, logoY, logoSize, logoSize, '#ffffff', '#e5e7eb');

  // Try to load logo, fallback to placeholder if it fails
  try {
    const logoSuccess = await addSchoolLogo();
    if (!logoSuccess) {
      console.log('Logo loading returned false');
    }
  } catch (error) {
    console.error('Logo loading failed with error:', error);
    // Temporarily disable placeholder
    // addLogoPlaceholder();
  }

  // Event info on top left
  pdf.setFontSize(8);
  pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
  pdf.setTextColor('#6b7280');
  pdf.text(
    `심사일: ${new Date().toLocaleDateString('ko-KR')}`,
    marginLeft,
    yPosition
  );
  pdf.text(`이벤트: ${testingEvent}`, marginLeft, yPosition + 3);

  yPosition += 8;

  // Main title
  pdf.setFontSize(20);
  pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
  pdf.setTextColor('#374151');
  pdf.text('승급 평가표', pageWidth / 2, yPosition, { align: 'center' });

  // Header line
  yPosition += 8;
  pdf.setDrawColor('#d1d5db');
  pdf.setLineWidth(1);
  pdf.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);

  yPosition += 6;

  // Student Information Section as compact table
  const compactRowHeight = 10;
  const studentTableHeight = 3 * compactRowHeight + 5;

  // Check if new page is needed for student info
  yPosition = checkPageBreak(studentTableHeight);

  // Student info as compact table
  const infoRows = [
    [`성명: ${student.fullName}`, `나이: ${age ? `${age}세` : '미등록'}`],
    [`현재 급수: ${student.oldRankName}`, `응시 급수: ${student.newRankName}`],
    [
      `출석 횟수: ${student.attendanceCount}회`,
      `숙제 완료: ${student.homeworkCount}회`,
    ],
  ];

  infoRows.forEach((row, index) => {
    const rowY = yPosition + index * compactRowHeight;
    const isEvenRow = index % 2 === 0;
    const rowBgColor = isEvenRow ? '#ffffff' : '#f8f9fa';

    drawRect(
      marginLeft,
      rowY,
      contentWidth,
      compactRowHeight,
      rowBgColor,
      '#e5e7eb'
    );

    pdf.setTextColor('#374151');
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
    pdf.setFontSize(9);

    const col1X = marginLeft + 8;
    const col2X = marginLeft + contentWidth / 2 + 5;

    pdf.text(row[0] || '', col1X, rowY + 7);
    pdf.text(row[1] || '', col2X, rowY + 7);
  });

  yPosition += infoRows.length * compactRowHeight + 5;

  // Total Score Section - with more padding
  const totalSectionHeight = 25;
  yPosition = checkPageBreak(totalSectionHeight + 5);

  drawRect(
    marginLeft,
    yPosition - 2,
    contentWidth,
    totalSectionHeight,
    '#f8fafc',
    '#e2e8f0'
  );

  pdf.setFontSize(12);
  pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
  pdf.setTextColor('#374151');
  pdf.text('총점 및 결과', pageWidth / 2, yPosition + 4, { align: 'center' });
  yPosition += 12;

  // Results in three columns
  const colWidth = contentWidth / 3;

  // Use calculated evaluation results from actual scores
  const newTotalScore = evaluation.totalScore;
  const newGrade = evaluation.grade;
  const newPassed = evaluation.passed;

  // Total Score
  pdf.setFontSize(14);
  pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
  pdf.setTextColor('#374151');
  pdf.text(newTotalScore.toString(), marginLeft + colWidth / 2, yPosition - 1, {
    align: 'center',
  });

  pdf.setFontSize(8);
  pdf.setTextColor('#6b7280');
  pdf.text('총점', marginLeft + colWidth / 2, yPosition + 13, {
    align: 'center',
  });

  // Grade
  pdf.setFontSize(14);
  pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
  pdf.setTextColor('#374151');
  pdf.text(newGrade, marginLeft + colWidth + colWidth / 2, yPosition - 1, {
    align: 'center',
  });

  pdf.setFontSize(8);
  pdf.setTextColor('#6b7280');
  pdf.text('등급', marginLeft + colWidth + colWidth / 2, yPosition + 13, {
    align: 'center',
  });

  // Pass/Fail
  pdf.setFontSize(14);
  pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
  pdf.setTextColor(newPassed ? '#374151' : '#6b7280');
  pdf.text(
    newPassed ? '합격' : '불합격',
    marginLeft + colWidth * 2 + colWidth / 2,
    yPosition - 1,
    { align: 'center' }
  );

  pdf.setFontSize(8);
  pdf.setTextColor('#6b7280');
  pdf.text('결과', marginLeft + colWidth * 2 + colWidth / 2, yPosition + 13, {
    align: 'center',
  });

  yPosition += 3;

  // Comments Section - 종합 평가 코멘트
  if (comments?.overall) {
    yPosition = checkPageBreak(20); // Check space for comments section

    // Comment section title
    pdf.setFontSize(10);
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
    pdf.setTextColor('#374151');
    pdf.text('종합 평가', marginLeft, yPosition);
    yPosition += 6;

    // Comment box - textarea style with reduced padding and height
    const commentHeight = 18;
    drawRect(
      marginLeft,
      yPosition - 2,
      contentWidth,
      commentHeight,
      '#f8fafc',
      '#e2e8f0'
    );

    // 50자로 제한하고 개행 처리
    const limitedCommentText = comments.overall.substring(0, 50);

    // Handle manual line breaks in comment text
    const commentLines = limitedCommentText.split('\n');
    let currentCommentY = yPosition + 3;

    pdf.setFontSize(9);
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
    pdf.setTextColor('#334155');

    commentLines.forEach((line: string, index: number) => {
      if (line.trim()) {
        // 빈 줄이 아닌 경우만 처리
        const wrappedLines = pdf.splitTextToSize(
          line.trim(),
          contentWidth - 12
        );
        pdf.text(wrappedLines, marginLeft + 6, currentCommentY);
        currentCommentY += wrappedLines.length * 3.5; // Line height
      } else if (index < commentLines.length - 1) {
        // 마지막 줄이 아닌 빈 줄
        currentCommentY += 3.5; // 빈 줄 높이
      }
    });

    yPosition = currentCommentY + 4;
  }

  // Add some spacing before table
  yPosition += 3;

  // Unified Scores Table
  yPosition = checkPageBreak(15);

  // Define table structure with merged cells
  const tableData = [
    // Header row
    {
      category: '테스트 항목 기준',
      item: '',
      score: '0점부터 10점 만점',
      points: '점수',
      type: 'header',
    },

    // HOMEWORK section
    {
      category: 'HOMEWORK\n가정평가',
      item: '효도 존중 숙제 기타',
      score: scores.homework.combined,
      points: scores.homework.combined,
      type: 'data',
      categoryRowspan: 1,
    },

    // ATTENDANCE section
    {
      category: 'ATTENDANCE\n출석',
      item: '근면성실',
      score: scores.attendance.diligence,
      points: scores.attendance.diligence,
      type: 'data',
      categoryRowspan: 1,
    },

    // CHARACTER section
    {
      category: 'CHARACTER\n인성',
      item: '감사노트',
      score: scores.character.gratitudeNotes,
      points: scores.character.gratitudeNotes,
      type: 'data',
      categoryRowspan: 2,
    },
    {
      category: '',
      item: '리더십',
      score: scores.character.leadership,
      points: scores.character.leadership,
      type: 'data',
    },

    // PHYSICAL section
    {
      category: 'PHYSICAL TEST\n체력',
      item: '스쿼트',
      score: scores.physical.squats,
      points: scores.physical.squats,
      type: 'data',
      categoryRowspan: 2,
    },
    {
      category: '',
      item: '점핑잭',
      score: scores.physical.jumpingJacks,
      points: scores.physical.jumpingJacks,
      type: 'data',
    },

    // TECHNICAL section
    {
      category: 'REQUIREMENT\n기술',
      item: '품새',
      score: scores.technical.poomsae,
      points: scores.technical.poomsae,
      type: 'data',
      categoryRowspan: 4,
    },
    {
      category: '',
      item: '겨루기',
      score: scores.technical.sparring,
      points: scores.technical.sparring,
      type: 'data',
    },
    {
      category: '',
      item: '발차기',
      score: scores.technical.kicks,
      points: scores.technical.kicks,
      type: 'data',
    },
    {
      category: '',
      item: '격파',
      score: scores.technical.breaking,
      points: scores.technical.breaking,
      type: 'data',
    },
  ];

  // Table dimensions - more compact
  const tableWidth = contentWidth;
  const colWidths = [
    tableWidth * 0.35,
    tableWidth * 0.25,
    tableWidth * 0.3,
    tableWidth * 0.1,
  ]; // 4 columns - wider test criteria, narrower score
  const rowHeight = 14;
  const headerHeight = 12;

  // Calculate total table height for page break check
  const totalTableHeight =
    headerHeight + (tableData.length - 1) * rowHeight + 20;
  yPosition = checkPageBreak(totalTableHeight);

  let currentY = yPosition;

  // Helper function to get category background color
  const getCategoryBgColor = (
    category: string,
    isHeader: boolean,
    rowIndex: number
  ): string => {
    if (isHeader) return '#f1f5f9';

    // Category별 색상 매핑 (UI와 동일한 색상)
    if (category.includes('HOMEWORK')) return '#fef3c7'; // Light amber
    if (category.includes('ATTENDANCE')) return '#fecaca'; // Light red
    if (category.includes('CHARACTER')) return '#e9d5ff'; // Light violet
    if (category.includes('PHYSICAL')) return '#d1fae5'; // Light emerald
    if (category.includes('REQUIREMENT')) return '#dbeafe'; // Light blue

    // Default alternating colors
    return rowIndex % 2 === 0 ? '#f8f9fa' : '#ffffff';
  };

  // Draw table
  tableData.forEach((row, rowIndex) => {
    const isHeader = row.type === 'header';
    const rowY = currentY + rowIndex * (isHeader ? headerHeight : rowHeight);
    const currentRowHeight = isHeader ? headerHeight : rowHeight;

    // Determine if this row should draw category cell (for merged cells)
    const shouldDrawCategory = row.category !== '' || rowIndex === 0;

    let currentX = marginLeft;

    // Column 1: Category (with merging)
    if (shouldDrawCategory) {
      const cellHeight = row.categoryRowspan
        ? currentRowHeight * row.categoryRowspan
        : currentRowHeight;
      const bgColor = getCategoryBgColor(row.category, isHeader, rowIndex);

      drawRect(
        currentX,
        rowY,
        colWidths[0] || 0,
        cellHeight || currentRowHeight,
        bgColor,
        '#e5e7eb'
      );

      pdf.setTextColor(isHeader ? '#374151' : '#333333');
      pdf.setFont(
        fontLoaded ? 'NotoSansKR' : 'helvetica',
        isHeader ? 'bold' : 'normal'
      );
      pdf.setFontSize(isHeader ? 10 : 9);

      if (row.category) {
        const lines = row.category.split('\n');
        const lineHeight = 3.5;
        const startY =
          rowY +
          currentRowHeight / 2 -
          ((lines.length - 1) * lineHeight) / 2 +
          1;
        lines.forEach((line, lineIndex) => {
          pdf.text(line, currentX + 2, startY + lineIndex * lineHeight, {
            maxWidth: (colWidths[0] || 0) - 4,
          });
        });
      }
    }
    currentX += colWidths[0] || 0;

    // Column 2: Item
    const itemBgColor = isHeader
      ? '#f1f5f9'
      : rowIndex % 2 === 0
        ? '#f8f9fa'
        : '#ffffff';
    drawRect(
      currentX,
      rowY,
      colWidths[1] || 0,
      currentRowHeight,
      itemBgColor,
      '#e5e7eb'
    );

    pdf.setTextColor(isHeader ? '#374151' : '#333333');
    pdf.setFont(
      fontLoaded ? 'NotoSansKR' : 'helvetica',
      isHeader ? 'bold' : 'normal'
    );
    pdf.setFontSize(isHeader ? 10 : 9);

    if (row.item) {
      // For single line items, center vertically
      pdf.text(row.item, currentX + 2, rowY + currentRowHeight / 2 + 2, {
        maxWidth: (colWidths[1] || 0) - 4,
      });
    }
    currentX += colWidths[1] || 0;

    // Column 3: Score description or progress bar
    const scoreBgColor = isHeader
      ? '#f1f5f9'
      : rowIndex % 2 === 0
        ? '#f8f9fa'
        : '#ffffff';
    drawRect(
      currentX,
      rowY,
      colWidths[2] || 0,
      currentRowHeight,
      scoreBgColor,
      '#e5e7eb'
    );

    if (isHeader) {
      pdf.setTextColor('#374151');
      pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.text(
        row.score.toString(),
        currentX + 2,
        rowY + currentRowHeight / 2 + 2
      );
    } else {
      // Draw progress bar for scores - much thinner
      const progressBarWidth = (colWidths[2] || 0) - 16;
      const progressBarHeight = 3;
      const progressBarX = currentX + 8;
      const progressBarY = rowY + (currentRowHeight - progressBarHeight) / 2;

      // Background bar
      drawRect(
        progressBarX,
        progressBarY,
        progressBarWidth,
        progressBarHeight,
        '#e5e7eb',
        '#d1d5db'
      );

      // Progress fill
      const numericScore =
        typeof row.score === 'string' ? parseFloat(row.score) : row.score;
      if (numericScore > 0) {
        const fillWidth = (numericScore / 10) * progressBarWidth;
        const fillColor =
          numericScore >= 8
            ? '#10b981'
            : numericScore >= 6
              ? '#f59e0b'
              : numericScore >= 4
                ? '#f97316'
                : '#ef4444';
        drawRect(
          progressBarX,
          progressBarY,
          fillWidth,
          progressBarHeight,
          fillColor
        );
      }

      // Score numbers at both ends
      pdf.setTextColor('#6b7280');
      pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.text('0', progressBarX - 6, progressBarY + 4);
      pdf.text('10', progressBarX + progressBarWidth + 1, progressBarY + 4);
    }
    currentX += colWidths[2] || 0;

    // Column 4: Points
    const pointsBgColor = isHeader
      ? '#f1f5f9'
      : rowIndex % 2 === 0
        ? '#f8f9fa'
        : '#ffffff';
    drawRect(
      currentX,
      rowY,
      colWidths[3] || 0,
      currentRowHeight,
      pointsBgColor,
      '#e5e7eb'
    );

    pdf.setTextColor(isHeader ? '#374151' : '#333333');
    pdf.setFont(
      fontLoaded ? 'NotoSansKR' : 'helvetica',
      isHeader ? 'bold' : 'normal'
    );
    pdf.setFontSize(isHeader ? 10 : 10);

    if (!isHeader) {
      pdf.text(
        row.points.toString(),
        currentX + (colWidths[3] || 0) / 2,
        rowY + currentRowHeight / 2 + 2,
        { align: 'center' }
      );
    } else {
      pdf.text(
        '점수',
        currentX + (colWidths[3] || 0) / 2,
        rowY + currentRowHeight / 2 + 2,
        { align: 'center' }
      );
    }
  });

  yPosition = currentY + tableData.length * rowHeight + 8;

  // Footer - simplified (commented out)
  // yPosition = Math.max(yPosition + 20, 270); // Ensure footer is at bottom

  // pdf.setDrawColor('#e0e0e0');
  // pdf.setLineWidth(0.5);
  // pdf.line(marginLeft, yPosition, pageWidth - marginRight, yPosition);

  // yPosition += 10;
  // pdf.setFontSize(10);
  // pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
  // pdf.setTextColor('#666666');
  // pdf.text('MAS9 승급 평가 시스템', pageWidth / 2, yPosition, { align: 'center' });

  // Download or Preview PDF
  if (preview) {
    // PDF Preview - 새 창에서 미리보기
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(url, '_blank');

    if (!newWindow) {
      console.error('Please allow popups for this site');
      // 팝업이 차단된 경우 다운로드로 fallback
      const fileName = `평가표_${student.fullName}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
    } else {
      // 메모리 정리
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    }
  } else {
    // PDF Download
    const fileName = `평가표_${student.fullName}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  }
};

// Helper function to get score color in hex format
function getScoreColorHex(score: number): string {
  if (score >= 8) return '#10b981'; // green
  if (score >= 6) return '#f59e0b'; // yellow
  if (score >= 4) return '#f97316'; // orange
  return '#ef4444'; // red
}

// Helper function to get grade color in hex format
function getGradeColorHex(grade: string): string {
  if (grade.startsWith('A')) return '#10b981';
  if (grade.startsWith('B')) return '#3b82f6';
  if (grade.startsWith('C')) return '#f59e0b';
  if (grade === 'D') return '#f97316';
  return '#ef4444';
}

// Generate PDF for multiple students
export const generateBatchEvaluationPDF = async (
  evaluations: Array<{
    student: any;
    scores: EvaluationScores;
    comments?: any;
  }>,
  testingEvent?: string,
  schoolLogoUrl?: string
): Promise<void> => {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // NotoSansKR 폰트 추가
  const fontLoaded = await addNotoSansKRFont(pdf);
  if (!fontLoaded) {
    console.warn('Failed to load NotoSansKR fonts, using default fonts');
  }

  evaluations.forEach((evaluation, index) => {
    if (index > 0) {
      pdf.addPage();
    }

    const calc = calculateEvaluation(evaluation.scores);
    const age = evaluation.student.birth
      ? new Date().getFullYear() -
        new Date(evaluation.student.birth).getFullYear()
      : '';

    let yPosition = 20;
    const pageWidth = 210;
    const marginLeft = 15;
    const marginRight = 15;
    const contentWidth = pageWidth - marginLeft - marginRight;

    // Helper functions for this page
    const addText = (
      text: string,
      x: number,
      y: number,
      fontSize: number = 10,
      fontStyle: string = 'normal',
      color: string = '#000000'
    ): number => {
      pdf.setFontSize(fontSize);
      pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', fontStyle);
      pdf.setTextColor(color);
      pdf.text(text, x, y);
      return y + fontSize * 0.4;
    };

    const drawRect = (
      x: number,
      y: number,
      width: number,
      height: number,
      fillColor?: string
    ): void => {
      if (fillColor) {
        pdf.setFillColor(fillColor);
        pdf.rect(x, y, width, height, 'F');
      }
      pdf.setDrawColor('#e0e0e0');
      pdf.rect(x, y, width, height, 'S');
    };

    // Header
    pdf.setFontSize(18);
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
    pdf.setTextColor('#DD1921');
    pdf.text('승급 평가표', pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 8;
    pdf.setFontSize(10);
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
    pdf.setTextColor('#666666');
    pdf.text(testingEvent || 'Testing Event', pageWidth / 2, yPosition, {
      align: 'center',
    });

    yPosition += 15;

    // Student Info
    drawRect(marginLeft, yPosition - 3, contentWidth, 20, '#f8f9fa');
    yPosition = addText(
      '수험생 정보',
      marginLeft + 3,
      yPosition,
      12,
      'bold',
      '#333333'
    );
    yPosition = addText(
      `성명: ${evaluation.student.fullName}  나이: ${age ? `${age}세` : '미등록'}`,
      marginLeft + 5,
      yPosition,
      9
    );
    yPosition = addText(
      `현재: ${evaluation.student.oldRankName}  응시: ${evaluation.student.newRankName}`,
      marginLeft + 5,
      yPosition,
      9
    );

    yPosition += 15;

    // Scores Summary
    yPosition = addText(
      '평가 점수',
      marginLeft,
      yPosition,
      12,
      'bold',
      '#333333'
    );
    yPosition += 3;

    const scores = [
      `숙제: ${evaluation.scores.homework.combined}점`,
      `출석: ${evaluation.scores.attendance.diligence}점`,
      `감사노트: ${evaluation.scores.character.gratitudeNotes}점`,
      `리더십: ${evaluation.scores.character.leadership}점`,
      `스쿼트: ${evaluation.scores.physical.squats}점`,
      `점핑잭: ${evaluation.scores.physical.jumpingJacks}점`,
      `품새: ${evaluation.scores.technical.poomsae}점`,
      `겨루기: ${evaluation.scores.technical.sparring}점`,
      `발차기: ${evaluation.scores.technical.kicks}점`,
      `격파: ${evaluation.scores.technical.breaking}점`,
    ];

    // Display scores in a compact grid
    const scoreText = scores.join(' | ');
    const lines = pdf.splitTextToSize(scoreText, contentWidth);
    pdf.setFontSize(8);
    pdf.text(lines, marginLeft, yPosition);
    yPosition += lines.length * 3;

    yPosition += 10;

    // Total Results
    drawRect(marginLeft, yPosition - 3, contentWidth, 15, '#f0f9ff');
    yPosition = addText(
      '결과',
      pageWidth / 2,
      yPosition,
      12,
      'bold',
      '#0369a1'
    );
    yPosition += 3;

    pdf.setFontSize(14);
    pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'bold');
    pdf.setTextColor('#DD1921');
    const resultText = `총점: ${calc.totalScore}점 | 등급: ${calc.grade} | ${calc.passed ? '합격' : '불합격'}`;
    pdf.text(resultText, pageWidth / 2, yPosition, { align: 'center' });

    // Comments if available
    if (evaluation.comments?.overall) {
      yPosition += 20;
      yPosition = addText(
        '종합 코멘트',
        marginLeft,
        yPosition,
        10,
        'bold',
        '#333333'
      );
      yPosition += 3;

      pdf.setFontSize(8);
      pdf.setFont(fontLoaded ? 'NotoSansKR' : 'helvetica', 'normal');
      pdf.setTextColor('#333333');
      const commentLines = pdf.splitTextToSize(
        evaluation.comments.overall,
        contentWidth
      );
      pdf.text(commentLines, marginLeft, yPosition);
    }
  });

  const fileName = `평가표_일괄_${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};
