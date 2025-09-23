import {
  Document,
  Font,
  Image,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import React from 'react';
import { EvaluationComments, EvaluationScores } from '../types/evaluation';
import { calculateEvaluation } from '../utils/evaluationHelpers';

// 간단한 SVG 기반 대체 로고 생성
const createFallbackLogo = (): string => {
  const svgLogo = `
    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" fill="#dc2626" rx="8"/>
      <text x="25" y="32" font-family="Arial, sans-serif" font-size="11"
            fill="white" text-anchor="middle" font-weight="bold">도장</text>
    </svg>
  `;
  return 'data:image/svg+xml;base64,' + btoa(svgLogo);
};

// 이미지 로딩 시도 (React PDF가 직접 처리하도록)
const getBase64Image = async (imageUrl: string): Promise<string> => {
  console.log(
    '🖼️ Attempting image load (React PDF will handle CORS):',
    imageUrl
  );

  // React PDF의 Image 컴포넌트가 직접 처리할 수 있도록 원본 URL 반환
  // 실패 시 대체 로고 사용
  try {
    // 간단한 연결 테스트
    const testResponse = await fetch(imageUrl, {
      method: 'HEAD',
      mode: 'no-cors', // CORS 무시
    });
    console.log('🔗 URL connection test completed');
    return imageUrl; // 원본 URL 반환 (React PDF가 처리)
  } catch (error) {
    console.log('⚠️ Connection test failed, using fallback logo');
    return createFallbackLogo();
  }
};

// 환경별 폰트 기본 URL 설정
const fontBaseUrl =
  import.meta.env.VITE_ENV_FILE === 'production'
    ? 'https://mas9-file.s3.us-west-2.amazonaws.com'
    : 'https://mas9-stg-file.s3.us-west-2.amazonaws.com';

// NotoSansKR 폰트 등록
Font.register({
  family: 'NotoSansKR',
  fonts: [
    {
      src: `${fontBaseUrl}/fonts/NotoSansKR-Regular.ttf`,
      fontWeight: 'normal',
    },
    {
      src: `${fontBaseUrl}/fonts/NotoSansKR-Medium.ttf`,
      fontWeight: 'bold',
    },
  ],
});

// PDF 스타일 정의 - 한 페이지 최적화 디자인
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 16,
    fontSize: 9,
    fontFamily: 'NotoSansKR',
  },
  // 컴팩트한 헤더 섹션
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottom: '2px solid #dc2626',
    paddingBottom: 6,
  },
  headerLeft: {
    flexDirection: 'column',
    fontSize: 7,
    color: '#6b7280',
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  logoContainer: {
    width: 50,
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    textAlign: 'center',
  },

  // 메인 콘텐츠 레이아웃
  mainContent: {
    flexDirection: 'row',
    gap: 12,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },

  // 학생 정보 섹션 - 컴팩트화
  infoSection: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    gap: 16,
  },
  infoColumn: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 2,
    fontSize: 8,
    alignItems: 'center',
  },
  infoLabel: {
    width: 45,
    color: '#64748b',
    fontSize: 7,
  },
  infoValue: {
    color: '#1e293b',
    fontWeight: 'bold',
    fontSize: 8,
  },

  // 종합 결과 섹션 - 우측 상단
  summarySection: {
    backgroundColor: '#fef2f2',
    border: '2px solid #dc2626',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 6,
  },
  summaryContent: {
    alignItems: 'center',
    gap: 4,
  },
  summaryScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  summaryGrade: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  summaryResult: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },

  // 코멘트 섹션 - 우측 하단
  commentsSection: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  commentsTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 4,
  },
  commentsText: {
    fontSize: 8,
    color: '#334155',
    lineHeight: 1.3,
  },

  // 평가 테이블 - 메인 콘텐츠
  evaluationTable: {
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 4,
    paddingVertical: 6,
    marginBottom: 3,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e2e8f0',
    paddingVertical: 3,
    height: 24, // 고정 높이로 변경
  },
  categoryColumn: {
    width: '20%',
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  itemColumn: {
    width: '25%',
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  scoreColumn: {
    width: '40%',
    paddingHorizontal: 3,
    justifyContent: 'center',
  },
  pointsColumn: {
    width: '15%',
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 카테고리 박스 - 더 컴팩트하게
  categoryBox: {
    paddingVertical: 3,
    paddingHorizontal: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  itemText: {
    fontSize: 8,
    color: '#334155',
    textAlign: 'center',
  },

  // 점수 바 - 더 시각적으로
  scoreContainer: {
    alignItems: 'center',
    gap: 2,
  },
  scoreBar: {
    width: 80,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  scoreProgress: {
    height: '100%',
    borderRadius: 3,
  },
  scoreLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  scoreLabel: {
    fontSize: 6,
    color: '#64748b',
  },
  pointsText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1e293b',
  },
});

// 카테고리별 색상
const getCategoryColor = (category: string): string => {
  if (category.includes('HOMEWORK')) return '#f59e0b';
  if (category.includes('ATTENDANCE')) return '#ef4444';
  if (category.includes('CHARACTER')) return '#8b5cf6';
  if (category.includes('PHYSICAL')) return '#10b981';
  if (category.includes('REQUIREMENT')) return '#3b82f6';
  return '#6b7280';
};

// 점수에 따른 색상
const getScoreColor = (score: number): string => {
  if (score >= 8) return '#10b981';
  if (score >= 6) return '#f59e0b';
  if (score >= 4) return '#f97316';
  return '#ef4444';
};

// 등급에 따른 색상
const getGradeColor = (grade: string): string => {
  switch (grade) {
    case 'A':
      return '#10b981';
    case 'B':
      return '#f59e0b';
    case 'C':
      return '#f97316';
    case 'D':
      return '#ef4444';
    case 'F':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

interface PDFGenerationOptions {
  student: {
    fullName: string;
    oldRankName: string;
    newRankName: string;
    attendanceCount: number;
    homeworkCount: number;
    birth?: string;
    gender?: string;
  };
  scores: EvaluationScores;
  comments?: EvaluationComments;
  testingEvent?: string;
  schoolLogoUrl?: string; // 도장 로고 URL props 추가
}

// PDF 문서 컴포넌트
const EvaluationPDFDocument: React.FC<{
  options: PDFGenerationOptions;
  logoBase64?: string;
}> = ({ options, logoBase64 }) => {
  const {
    student,
    scores,
    comments,
    testingEvent = 'Testing Event',
    schoolLogoUrl,
  } = options;
  const evaluation = calculateEvaluation(scores);

  console.log('🖼️ Logo data in PDF:', {
    originalUrl: schoolLogoUrl,
    hasBase64: !!logoBase64,
    base64Length: logoBase64?.length,
  });

  // 나이 계산
  const age = student.birth
    ? new Date().getFullYear() - new Date(student.birth).getFullYear()
    : '';

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* 헤더 섹션 - 개선된 레이아웃 */}
        <View style={styles.header}>
          {/* 좌측: 제목을 중앙으로 이동하기 위한 빈 공간 */}
          <View style={styles.headerLeft}>
            <Text> </Text>
          </View>

          {/* 중앙: 제목 */}
          <View style={styles.headerCenter}>
            <Text style={styles.title}>승급 평가표</Text>
          </View>

          {/* 우측: 로고 */}
          <View style={styles.headerRight}>
            <View style={styles.logoContainer}>
              {logoBase64 ? (
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.logo, { backgroundColor: '#f8f9fa', borderRadius: 8, justifyContent: 'center', alignItems: 'center', border: '2px solid #e9ecef' }]}>
                    <Image
                      style={{ width: 46, height: 46, objectFit: 'contain' }}
                      src={logoBase64}
                    />
                  </View>
                  <Text style={{ fontSize: 6, color: '#6b7280', marginTop: 2, textAlign: 'center' }}>도장 로고</Text>
                </View>
              ) : schoolLogoUrl ? (
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.logo, { backgroundColor: '#f8f9fa', borderRadius: 8, justifyContent: 'center', alignItems: 'center', border: '2px solid #e9ecef' }]}>
                    <Image
                      style={{ width: 46, height: 46, objectFit: 'contain' }}
                      src={schoolLogoUrl}
                    />
                  </View>
                  <Text style={{ fontSize: 6, color: '#6b7280', marginTop: 2, textAlign: 'center' }}>도장 로고</Text>
                </View>
              ) : (
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.logo, { backgroundColor: '#f3f4f6', borderRadius: 8, justifyContent: 'center', alignItems: 'center', border: '2px solid #e5e7eb' }]}>
                    <Text style={{ fontSize: 10, color: '#6b7280', textAlign: 'center', fontWeight: 'bold' }}>LOGO</Text>
                  </View>
                  <Text style={{ fontSize: 6, color: '#9ca3af', marginTop: 2, textAlign: 'center' }}>도장 로고</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* 메타 정보 섹션 - 헤더 아래 별도 배치 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ fontSize: 7, color: '#6b7280' }}>
            실시일: {new Date().toLocaleDateString('ko-KR')}
          </Text>
          <Text style={{ fontSize: 7, color: '#6b7280' }}>
            이벤트: {testingEvent}
          </Text>
        </View>

        {/* 학생 정보 섹션 - 상단에 컴팩트하게 */}
        <View style={styles.infoSection}>
          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>성명:</Text>
              <Text style={styles.infoValue}>{student.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>나이:</Text>
              <Text style={styles.infoValue}>{age}세</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>현재 급수:</Text>
              <Text style={styles.infoValue}>{student.oldRankName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>승시 급수:</Text>
              <Text style={styles.infoValue}>{student.newRankName}</Text>
            </View>
          </View>
          <View style={styles.infoColumn}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>출석:</Text>
              <Text style={styles.infoValue}>{student.attendanceCount}회</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>숙제:</Text>
              <Text style={styles.infoValue}>{student.homeworkCount}회</Text>
            </View>
          </View>
        </View>

        {/* 메인 콘텐츠 - 2단 레이아웃 */}
        <View style={styles.mainContent}>
          {/* 좌측: 평가 테이블 */}
          <View style={styles.leftColumn}>
            <View style={styles.evaluationTable}>
              {/* 테이블 헤더 */}
              <View style={styles.tableHeader}>
                <View style={styles.categoryColumn}>
                  <Text style={styles.tableHeaderText}>평가 항목</Text>
                </View>
                <View style={styles.itemColumn}>
                  <Text style={styles.tableHeaderText}>세부 항목</Text>
                </View>
                <View style={styles.scoreColumn}>
                  <Text style={styles.tableHeaderText}>점수 (0-10)</Text>
                </View>
                <View style={styles.pointsColumn}>
                  <Text style={styles.tableHeaderText}>점수</Text>
                </View>
              </View>

              {/* 테이블 데이터 - 카테고리별 그룹화로 진짜 병합 구현 */}
              {(() => {
                const categories = [
                  {
                    name: 'HOMEWORK\n가정평가',
                    color: getCategoryColor('HOMEWORK'),
                    items: [
                      {
                        item: '효도 존중 숙제 기타',
                        score: scores.homework.combined,
                        points: scores.homework.combined,
                      },
                    ],
                  },
                  {
                    name: 'ATTENDANCE\n출석',
                    color: getCategoryColor('ATTENDANCE'),
                    items: [
                      {
                        item: '근면성실',
                        score: scores.attendance.diligence,
                        points: scores.attendance.diligence,
                      },
                    ],
                  },
                  {
                    name: 'DESLINE\n인성',
                    color: getCategoryColor('CHARACTER'),
                    items: [
                      {
                        item: '감사노트',
                        score: scores.character.gratitudeNotes,
                        points: scores.character.gratitudeNotes,
                      },
                      {
                        item: '리더십',
                        score: scores.character.leadership,
                        points: scores.character.leadership,
                      },
                    ],
                  },
                  {
                    name: 'PHYSICAL TEST\n체력',
                    color: getCategoryColor('PHYSICAL'),
                    items: [
                      {
                        item: '스쿼트',
                        score: scores.physical.squats,
                        points: scores.physical.squats,
                      },
                      {
                        item: '점핑잭',
                        score: scores.physical.jumpingJacks,
                        points: scores.physical.jumpingJacks,
                      },
                    ],
                  },
                  {
                    name: 'REQUIREMENT\n기술',
                    color: getCategoryColor('REQUIREMENT'),
                    items: [
                      {
                        item: '품새',
                        score: scores.technical.poomsae,
                        points: scores.technical.poomsae,
                      },
                      {
                        item: '겨루기',
                        score: scores.technical.sparring,
                        points: scores.technical.sparring,
                      },
                      {
                        item: '발차기',
                        score: scores.technical.kicks,
                        points: scores.technical.kicks,
                      },
                      {
                        item: '격파',
                        score: scores.technical.breaking,
                        points: scores.technical.breaking,
                      },
                    ],
                  },
                ];

                return categories.map((category, categoryIndex) => {
                  const lineCount = category.name.split('\n').length;
                  const adjustedHeight = Math.max(category.items.length * 24, lineCount * 12 + 6);

                  return (
                    <View key={categoryIndex} style={{ flexDirection: 'row' }}>
                      {/* 카테고리 컬럼 - 진짜 병합 */}
                      <View
                        style={[
                          styles.categoryColumn,
                          {
                            height: adjustedHeight,
                            justifyContent: 'center',
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.categoryBox,
                            {
                              backgroundColor: category.color,
                              height: adjustedHeight - 6,
                              justifyContent: 'center',
                            },
                          ]}
                        >
                        <View
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {category.name.split('\n').map((line, index) => (
                            <Text key={index} style={styles.categoryText}>
                              {line}
                            </Text>
                          ))}
                        </View>
                      </View>
                    </View>

                    {/* 아이템들 컬럼 */}
                    <View style={{ flex: 1 }}>
                      {category.items.map((item, itemIndex) => (
                        <View
                          key={itemIndex}
                          style={[
                            styles.tableRow,
                            {
                              height: adjustedHeight / category.items.length,
                              borderBottom:
                                itemIndex === category.items.length - 1
                                  ? '1px solid #e2e8f0'
                                  : 'none',
                            },
                          ]}
                        >
                          {/* 항목 */}
                          <View
                            style={[styles.itemColumn, { width: '33.33%' }]}
                          >
                            <Text style={styles.itemText}>{item.item}</Text>
                          </View>

                          {/* 점수 바 */}
                          <View
                            style={[styles.scoreColumn, { width: '53.33%' }]}
                          >
                            {typeof item.score === 'number' &&
                              item.score > 0 && (
                                <View style={styles.scoreContainer}>
                                  <View style={styles.scoreBar}>
                                    <View
                                      style={[
                                        styles.scoreProgress,
                                        {
                                          backgroundColor: getScoreColor(
                                            item.score
                                          ),
                                          width: `${(item.score / 10) * 100}%`,
                                        },
                                      ]}
                                    />
                                  </View>
                                  <View style={styles.scoreLabels}>
                                    <Text style={styles.scoreLabel}>0</Text>
                                    <Text style={styles.scoreLabel}>10</Text>
                                  </View>
                                </View>
                              )}
                          </View>

                          {/* 점수 값 */}
                          <View
                            style={[styles.pointsColumn, { width: '13.33%' }]}
                          >
                            <Text style={styles.pointsText}>{item.points}</Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                  );
                });
              })()}
            </View>
          </View>

          {/* 우측: 종합 결과 & 코멘트 */}
          <View style={styles.rightColumn}>
            {/* 종합 결과 섹션 */}
            <View style={styles.summarySection}>
              <Text style={styles.summaryTitle}>종합 결과</Text>
              <View style={styles.summaryContent}>
                <Text style={styles.summaryScore}>
                  {evaluation.totalScore}점
                </Text>
                <Text
                  style={[
                    styles.summaryGrade,
                    { color: getGradeColor(evaluation.grade) },
                  ]}
                >
                  등급: {evaluation.grade}
                </Text>
                <Text
                  style={[
                    styles.summaryResult,
                    { color: evaluation.passed ? '#10b981' : '#ef4444' },
                  ]}
                >
                  {evaluation.passed ? '✓ 합격' : '✗ 불합격'}
                </Text>
              </View>
            </View>

            {/* 종합 코멘트 섹션 */}
            {comments?.overall && (
              <View style={styles.commentsSection}>
                <Text style={styles.commentsTitle}>종합 평가</Text>
                <Text style={styles.commentsText}>
                  {(comments.overall || '').split('\n').map((line, index) => (
                    <Text key={index}>
                      {line}
                      {index <
                        (comments.overall || '').split('\n').length - 1 && '\n'}
                    </Text>
                  ))}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// PDF 생성 및 다운로드/미리보기 함수
export const generateEvaluationPDF = async (
  options: PDFGenerationOptions,
  preview: boolean = false
): Promise<void> => {
  try {
    console.log('🔄 Generating PDF with @react-pdf/renderer...');
    console.log('📄 PDF Options:', {
      studentName: options.student.fullName,
      schoolLogoUrl: options.schoolLogoUrl,
      hasLogo: !!options.schoolLogoUrl,
    });

    // 로고 Base64 변환 시도 (실패 시 원본 URL 사용)
    let logoBase64: string | undefined;
    if (options.schoolLogoUrl) {
      console.log('🖼️ Converting logo to Base64...');
      try {
        logoBase64 = await getBase64Image(options.schoolLogoUrl);
        if (logoBase64 && logoBase64.length > 100) {
          console.log('✅ Logo converted to Base64 successfully');
        } else {
          console.log('⚠️ Base64 conversion failed, will use original URL');
          logoBase64 = undefined;
        }
      } catch (error) {
        // console.error('⚠️ Logo conversion error, will use original URL:', error.message);
        logoBase64 = undefined;
      }
    }

    const document = (
      <EvaluationPDFDocument options={options} logoBase64={logoBase64} />
    );
    const blob = await pdf(document).toBlob();

    if (preview) {
      // 미리보기용 URL 생성
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      console.log('✅ PDF preview opened successfully');
    } else {
      // 다운로드용 링크 생성
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = `평가표_${options.student.fullName}_${new Date().toISOString().split('T')[0]}.pdf`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('✅ PDF download completed successfully');
    }
  } catch (error) {
    console.error('❌ PDF generation failed:', error);
    throw error;
  }
};

export default { generateEvaluationPDF };
