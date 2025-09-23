import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Grid,
  TextField,
} from '@mui/material';
import { COLORS } from '@mas9/shared-ui';
import { User, Calendar, Award } from 'lucide-react';
import {
  EvaluationScores,
  EvaluationComments,
  StudentEvaluation,
} from '../../types/evaluation';
import {
  getDefaultScores,
  calculateEvaluation,
} from '../../utils/evaluationHelpers';
import {
  HomeworkSection,
  AttendanceSection,
  CharacterSection,
  PhysicalSection,
  TechnicalSection,
} from './CategorySection';
import EvaluationSummary from './EvaluationSummary';

interface EvaluationFormProps {
  student: {
    id: number;
    fullName: string;
    avatar?: string;
    oldRankName: string;
    newRankName: string;
    attendanceCount: number;
    homeworkCount: number;
    birth?: string;
    gender?: 'MALE' | 'FEMALE' | null;
  };
  initialData?: StudentEvaluation;
  onSave: (evaluation: Partial<StudentEvaluation>) => void;
  onScoreChange?: (scores: EvaluationScores) => void;
  onCommentsChange?: (comments: EvaluationComments) => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({
  student,
  initialData,
  onSave,
  onScoreChange,
  onCommentsChange,
}) => {
  const [scores, setScores] = useState<EvaluationScores>(
    initialData?.scores || getDefaultScores()
  );
  const [comments, setComments] = useState<EvaluationComments>(
    initialData?.comments || {
      homework: {},
      attendance: {},
      character: {},
      physical: {},
      technical: {},
      overall: '',
    }
  );

  const calculation = calculateEvaluation(scores);

  // 점수 변경 시 부모 컴포넌트에 알림
  useEffect(() => {
    onScoreChange?.(scores);
  }, [scores, onScoreChange]);

  // 자동 저장 (3초마다)
  useEffect(() => {
    const autoSave = setTimeout(() => {
      const evaluationData: Partial<StudentEvaluation> = {
        participantId: student.id,
        studentInfo: {
          fullName: student.fullName,
          avatar: student.avatar,
          currentRank: student.oldRankName,
          targetRank: student.newRankName,
          attendanceCount: student.attendanceCount,
          homeworkCount: student.homeworkCount,
          gender: student.gender || undefined,
        },
        scores,
        comments,
        totalScore: calculation.totalScore,
        grade: calculation.grade,
        passed: calculation.passed,
        updatedAt: new Date(),
      };
      onSave(evaluationData);
    }, 3000);

    return () => clearTimeout(autoSave);
  }, [scores, comments, student, calculation, onSave]);

  const handleScoreChange = (category: keyof EvaluationScores, field: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleCommentChange = (category: keyof EvaluationComments, field: string, value: string) => {
    const newComments = {
      ...comments,
      [category]: {
        ...(comments[category] as Record<string, any> || {}),
        [field]: value,
      },
    };
    setComments(newComments);
    onCommentsChange?.(newComments);
  };

  const getAge = (birthDate?: string): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = getAge(student.birth);

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* 좌측: 평가 폼 */}
        <Grid item xs={8}>
          <Box sx={{ p: 3 }}>
            {/* 학생 정보 헤더 */}
            <Box
              sx={{
                bgcolor: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: 3,
                p: 3,
                mb: 4,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  src={student.avatar || '/api/placeholder/80/80'}
                  sx={{
                    width: 80,
                    height: 80,
                    border: `3px solid ${COLORS.PRIMARY.RED}`,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{
                      color: COLORS.TEXT.BLACK_PRIMARY,
                      mb: 1,
                      fontSize: '24px',
                    }}
                  >
                    {student.fullName}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip
                      icon={<Award size={14} />}
                      label={`${student.oldRankName} → ${student.newRankName}`}
                      size="small"
                      sx={{
                        bgcolor: COLORS.PRIMARY.RED,
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                    {age && (
                      <Chip
                        icon={<User size={14} />}
                        label={`${age}세`}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#d1d5db', color: '#6b7280' }}
                      />
                    )}
                    {student.gender && (
                      <Chip
                        label={student.gender === 'MALE' ? '남성' : '여성'}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#d1d5db', color: '#6b7280' }}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 4 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                        출석 횟수
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ color: COLORS.TEXT.BLACK_PRIMARY }}
                      >
                        {student.attendanceCount}회
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
                        숙제 횟수
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        sx={{ color: COLORS.TEXT.BLACK_PRIMARY }}
                      >
                        {student.homeworkCount}회
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 평가 섹션들 */}
            <HomeworkSection
              scores={scores.homework}
              comments={comments.homework}
              onScoreChange={(field, value) => handleScoreChange('homework', field, value)}
              onCommentChange={(field, value) => handleCommentChange('homework', field, value)}
            />

            <AttendanceSection
              scores={scores.attendance}
              comments={comments.attendance}
              attendanceCount={student.attendanceCount}
              onScoreChange={(field, value) => handleScoreChange('attendance', field, value)}
              onCommentChange={(field, value) => handleCommentChange('attendance', field, value)}
            />

            <CharacterSection
              scores={scores.character}
              comments={comments.character}
              onScoreChange={(field, value) => handleScoreChange('character', field, value)}
              onCommentChange={(field, value) => handleCommentChange('character', field, value)}
            />

            <PhysicalSection
              scores={scores.physical}
              comments={comments.physical}
              onScoreChange={(field, value) => handleScoreChange('physical', field, value)}
              onCommentChange={(field, value) => handleCommentChange('physical', field, value)}
            />

            <TechnicalSection
              scores={scores.technical}
              comments={comments.technical}
              onScoreChange={(field, value) => handleScoreChange('technical', field, value)}
              onCommentChange={(field, value) => handleCommentChange('technical', field, value)}
            />

            {/* 종합 코멘트 */}
            <Box
              sx={{
                p: 3,
                bgcolor: '#f8fafc',
                border: '1px solid #e5e7eb',
                borderRadius: 3,
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: COLORS.TEXT.BLACK_PRIMARY, mb: 2, fontSize: '16px' }}
              >
                종합 평가
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder={`${student.fullName} 학생에 대한 종합 평가와 향후 개선사항을 작성해주세요...`}
                value={comments.overall || ''}
                onChange={(e) => {
                  // 50자로 제한 (개행 포함)
                  const limitedValue = e.target.value.substring(0, 50);
                  const newComments = { ...comments, overall: limitedValue };
                  setComments(newComments);
                  onCommentsChange?.(newComments);
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    fontSize: '14px',
                    '& fieldset': {
                      borderColor: '#e5e7eb',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d1d5db',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: COLORS.PRIMARY.RED,
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#9ca3af',
                    opacity: 1,
                  },
                }}
              />
              {/* 글자수 카운터 */}
              <Typography
                variant="caption"
                sx={{
                  color: (comments.overall || '').length >= 45 ? '#ef4444' : '#6b7280',
                  fontSize: '12px',
                  mt: 0.5,
                  textAlign: 'right',
                  display: 'block'
                }}
              >
                {(comments.overall || '').length}/50
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* 우측: 실시간 결과 */}
        <Grid item xs={4}>
          <Box
            sx={{
              height: '100%',
              borderLeft: '1px solid #e5e7eb',
              bgcolor: '#fafafa',
              p: 3,
            }}
          >
            <EvaluationSummary
              calculation={calculation}
              studentName={student.fullName}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EvaluationForm;