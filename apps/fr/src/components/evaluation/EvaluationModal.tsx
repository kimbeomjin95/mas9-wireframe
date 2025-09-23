import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { COLORS, showToast } from '@mas9/shared-ui';
import {
  X,
  Save,
  FileText,
  Check,
  AlertTriangle,
} from 'lucide-react';
import {
  EvaluationScores,
  StudentEvaluation,
  EvaluationStatus,
  EvaluationComments,
} from '../../types/evaluation';
import {
  calculateEvaluation,
  hasAnyScoreChanged,
  isEvaluationReadyToSave,
  areAllScoresEntered,
  getDefaultScores,
  flattenScoresForAPI,
  FlattenedScoreData
} from '../../utils/evaluationHelpers';
import StudentSidebar from './StudentSidebar';
import EvaluationForm from './EvaluationForm';

// 트랜지션 컴포넌트
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Participant {
  id: number;
  clubUser: {
    user: {
      fullName: string;
      profile?: string;
      birth?: string;
      gender?: 'MALE' | 'FEMALE' | null;
    };
    attendanceCount: number;
    homeworkCount: number;
  };
  oldRankName: string;
  newRankName: string;
}

interface EvaluationModalProps {
  open: boolean;
  onClose: () => void;
  participants: Participant[];
  testingEventId?: string;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({
  open,
  onClose,
  participants,
  testingEventId = 'test-event-1',
}) => {
  const [currentStudentId, setCurrentStudentId] = useState<number>(
    participants[0]?.id || 0
  );
  const [evaluationData, setEvaluationData] = useState<Record<number, Partial<StudentEvaluation>>>({});
  const [evaluationStatuses, setEvaluationStatuses] = useState<Record<number, EvaluationStatus>>({});
  const [savedEvaluations, setSavedEvaluations] = useState<Set<number>>(new Set());

  // 실시간 comments 상태 관리
  const [currentComments, setCurrentComments] = useState<Record<number, EvaluationComments>>({});

  // 실시간 scores 상태 관리
  const [currentScores, setCurrentScores] = useState<Record<number, EvaluationScores>>({});

  const currentStudent = participants.find(p => p.id === currentStudentId);
  const currentIndex = participants.findIndex(p => p.id === currentStudentId);

  const handleStudentSelect = useCallback((studentId: number) => {
    setCurrentStudentId(studentId);
    // 학생 선택만으로는 상태를 변경하지 않음
    // 실제 점수 입력이 시작될 때 상태가 변경됨
  }, []);

  const handleCommentsChange = useCallback((comments: EvaluationComments) => {
    setCurrentComments(prev => ({
      ...prev,
      [currentStudentId]: comments,
    }));
  }, [currentStudentId]);

  const handleScoresChange = useCallback((scores: EvaluationScores) => {
    setCurrentScores(prev => ({
      ...prev,
      [currentStudentId]: scores,
    }));
  }, [currentStudentId]);

  const handleSave = useCallback((evaluation: Partial<StudentEvaluation>) => {
    setEvaluationData(prev => ({
      ...prev,
      [currentStudentId]: evaluation,
    }));

    // 점수 기반으로 상태 업데이트
    if (evaluation.scores) {
      const hasStarted = hasAnyScoreChanged(evaluation.scores);
      const isSaved = savedEvaluations.has(currentStudentId);

      let newStatus: EvaluationStatus = 'pending';

      if (isSaved) {
        newStatus = 'saved';
      } else if (hasStarted) {
        newStatus = 'in_progress';
      }

      setEvaluationStatuses(prev => ({
        ...prev,
        [currentStudentId]: newStatus,
      }));
    }
  }, [currentStudentId, savedEvaluations]);

  const handleSaveIndividual = async (studentId: number) => {
    // 실시간 점수 우선 사용
    const currentStudentScores = currentScores[studentId] || evaluationData[studentId]?.scores;

    if (!currentStudentScores) {
      showToast('평가 데이터가 없습니다.', {
        type: 'error',
        position: 'top-center',
      });
      return;
    }

    // 저장 가능한 상태인지 확인
    if (!areAllScoresEntered(currentStudentScores)) {
      showToast('🔢 모든 점수를 입력해주세요.', {
        type: 'warning',
        position: 'top-center',
      });
      return;
    }

    try {
      // 점수 데이터를 플랫 구조로 변환
      const flattenedScores = flattenScoresForAPI(currentStudentScores);
      const currentStudentData = participants.find(p => p.id === studentId);
      const studentComments = currentComments[studentId] || evaluationData[studentId]?.comments;
      const calculatedData = calculateEvaluation(currentStudentScores);

      // API 전송용 데이터 구조 (1-depth)
      const apiData = {
        userId: 'current-user-id', // TODO: 실제 사용자 ID
        upgradeId: testingEventId,
        ...flattenedScores,
        overallComment: studentComments?.overall || '',
        totalScore: calculatedData.totalScore
      };

      console.log('📤 API 전송 데이터 (1-depth):', apiData);

      // TODO: 실제 API 호출로 개별 평가 데이터 저장
      // const response = await fetch('/api/evaluations/save', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(apiData)
      // });
      await new Promise(resolve => setTimeout(resolve, 500));

      // 저장 완료된 학생 추가
      setSavedEvaluations(prev => new Set([...prev, studentId]));

      // 상태를 saved로 변경
      setEvaluationStatuses(prev => ({
        ...prev,
        [studentId]: 'saved',
      }));

      showToast(`💾 ${participants.find(p => p.id === studentId)?.clubUser.user.fullName}님의 평가가 저장되었습니다.`, {
        type: 'success',
        position: 'top-center',
      });
    } catch (error) {
      showToast('❌ 저장 중 오류가 발생했습니다.', {
        type: 'error',
        position: 'top-center',
      });
    }
  };


  const handleGeneratePDF = async (preview: boolean = false) => {
    try {
      // 실시간 점수 우선 사용
      const currentStudentScores = currentScores[currentStudentId] || evaluationData[currentStudentId]?.scores;

      if (!currentStudentScores || !areAllScoresEntered(currentStudentScores)) {
        showToast('🔢 모든 점수를 입력해주세요.', {
          type: 'warning',
          position: 'top-center',
        });
        return;
      }

      const currentEvaluation = evaluationData[currentStudentId];
      if (!currentEvaluation) {
        showToast('현재 학생의 평가 데이터가 없습니다.', {
          type: 'error',
          position: 'top-center',
        });
        return;
      }

      // React PDF 서비스 import (새로운 버전)
      const { generateEvaluationPDF } = await import('../../services/reactPdfService');

      // 실시간 comments 데이터 사용 (저장된 데이터보다 우선)
      const realTimeComments = currentComments[currentStudentId] || currentEvaluation.comments;

      // PDF 생성 전 데이터 확인
      const logoUrl = 'https://de7r26jwjif71.cloudfront.net/schools/53/profile/88b70d1e-e3ee-4c56-800c-2a7a1a81cff9.png';

      console.log('📄 PDF 생성 데이터:', {
        studentName: currentStudent!.clubUser.user.fullName,
        scores: currentEvaluation.scores,
        savedComments: currentEvaluation.comments,
        realTimeComments: realTimeComments,
        commentsOverall: realTimeComments?.overall,
        testingEvent: testingEventId,
        schoolLogoUrl: logoUrl,
        preview
      });

      await generateEvaluationPDF({
        student: {
          fullName: currentStudent!.clubUser.user.fullName,
          oldRankName: currentStudent!.oldRankName,
          newRankName: currentStudent!.newRankName,
          attendanceCount: currentStudent!.clubUser.attendanceCount,
          homeworkCount: currentStudent!.clubUser.homeworkCount,
          birth: currentStudent!.clubUser.user.birth,
          gender: currentStudent!.clubUser.user.gender || undefined,
        },
        scores: currentStudentScores,
        comments: realTimeComments,
        testingEvent: testingEventId,
        schoolLogoUrl: logoUrl,
      }, preview);

      if (!preview) {
        showToast(`📄 ${currentStudent!.clubUser.user.fullName}님의 평가표 PDF 다운로드가 완료되었습니다.`, {
          type: 'success',
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('PDF 생성 오류:', error);
      showToast('❌ PDF 생성 중 오류가 발생했습니다.', {
        type: 'error',
        position: 'top-center',
      });
    }
  };



  const getCompletedCount = () => {
    return Object.values(evaluationStatuses).filter(status => status === 'saved').length;
  };

  const getCurrentStudentData = () => {
    const evaluation = evaluationData[currentStudentId];
    if (!currentStudent) return null;

    return {
      id: currentStudent.id,
      fullName: currentStudent.clubUser.user.fullName,
      avatar: currentStudent.clubUser.user.profile,
      oldRankName: currentStudent.oldRankName,
      newRankName: currentStudent.newRankName,
      attendanceCount: currentStudent.clubUser.attendanceCount,
      homeworkCount: currentStudent.clubUser.homeworkCount,
      birth: currentStudent.clubUser.user.birth,
      gender: currentStudent.clubUser.user.gender,
    };
  };

  const studentData = getCurrentStudentData();

  if (!currentStudent || !studentData) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: '#fafafa',
        },
      }}
    >
      {/* 앱바 */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={onClose} sx={{ color: COLORS.TEXT.BLACK_PRIMARY }}>
              <X size={24} />
            </IconButton>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: COLORS.TEXT.BLACK_PRIMARY, fontSize: '18px' }}
            >
              승급 평가 시스템
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '14px' }}
          >
            {getCompletedCount()}/{participants.length} 완료
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 메인 컨텐츠 */}
      <DialogContent sx={{ p: 0, height: 'calc(100vh - 64px - 80px)', overflow: 'hidden' }}>

        <Box sx={{ display: 'flex', height: '100%' }}>
          {/* 좌측: 학생 사이드바 */}
          <StudentSidebar
            students={participants.map(p => ({
              id: p.id,
              fullName: p.clubUser.user.fullName,
              avatar: p.clubUser.user.profile,
              oldRankName: p.oldRankName,
              newRankName: p.newRankName,
            }))}
            currentStudentId={currentStudentId}
            evaluationStatuses={evaluationStatuses}
            onStudentSelect={handleStudentSelect}
          />

          {/* 우측: 평가 폼 */}
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <EvaluationForm
              student={studentData}
              initialData={evaluationData[currentStudentId] as StudentEvaluation}
              onSave={handleSave}
              onScoreChange={handleScoresChange}
              onCommentsChange={handleCommentsChange}
            />
          </Box>
        </Box>
      </DialogContent>

      {/* 하단 액션 바 */}
      <Box
        sx={{
          height: 80,
          borderTop: '1px solid #e5e7eb',
          bgcolor: 'white',
          display: 'flex',
          alignItems: 'center',
          px: 3,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
          <Button
            startIcon={<Save size={16} />}
            onClick={() => handleSaveIndividual(currentStudentId)}
            disabled={savedEvaluations.has(currentStudentId)}
            variant="contained"
            sx={{
              bgcolor: savedEvaluations.has(currentStudentId) ? '#10b981' : COLORS.PRIMARY.RED,
              '&:hover': {
                bgcolor: savedEvaluations.has(currentStudentId) ? '#059669' : COLORS.BUTTON.PRIMARY_HOVER
              },
              '&.Mui-disabled': {
                bgcolor: '#e5e7eb',
                color: '#9ca3af',
              },
              minWidth: 120,
            }}
          >
            {savedEvaluations.has(currentStudentId) ? '저장 완료' : 'Save'}
          </Button>

          <Button
            startIcon={<FileText size={16} />}
            onClick={() => handleGeneratePDF()}
            variant="outlined"
            disabled={false}
            sx={{
              borderColor: '#3b82f6',
              color: '#3b82f6',
              '&:hover': {
                borderColor: '#2563eb',
                bgcolor: '#eff6ff',
              },
              '&.Mui-disabled': {
                borderColor: '#e5e7eb',
                color: '#9ca3af',
              },
              minWidth: 120,
            }}
          >
            PDF 다운로드
          </Button>

          <Button
            startIcon={<FileText size={16} />}
            onClick={() => handleGeneratePDF(true)}
            variant="outlined"
            disabled={false}
            sx={{
              borderColor: '#10b981',
              color: '#10b981',
              '&:hover': {
                borderColor: '#059669',
                bgcolor: '#ecfdf5',
              },
              '&.Mui-disabled': {
                borderColor: '#e5e7eb',
                color: '#9ca3af',
              },
              minWidth: 120,
            }}
          >
            PDF 미리보기
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default EvaluationModal;