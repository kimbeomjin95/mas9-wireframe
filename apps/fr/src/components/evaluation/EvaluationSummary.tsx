import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import { COLORS } from '@mas9/shared-ui';
import { CheckCircle, AlertCircle, TrendingUp, Award } from 'lucide-react';
import { ScoreCalculation } from '../../types/evaluation';
import { getGradeColor } from '../../utils/evaluationHelpers';

interface EvaluationSummaryProps {
  calculation: ScoreCalculation;
  studentName: string;
}

const EvaluationSummary: React.FC<EvaluationSummaryProps> = ({
  calculation,
  studentName,
}) => {
  const { totalScore, grade, passed, categoryAverages } = calculation;

  const getPassStatusConfig = () => {
    if (passed) {
      return {
        icon: <CheckCircle size={20} />,
        text: 'PASS',
        color: '#10b981',
        bgcolor: '#d1fae5',
        message: '축하합니다! 승급 요건을 충족했습니다.',
      };
    }
    return {
      icon: <AlertCircle size={20} />,
      text: 'FAIL',
      color: '#ef4444',
      bgcolor: '#fee2e2',
      message: '더 많은 연습이 필요합니다.',
    };
  };

  const passConfig = getPassStatusConfig();

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* 총점 및 등급 */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: 'none',
          background: `linear-gradient(135deg, ${getGradeColor(grade)}15, white)`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant='h4'
              fontWeight={700}
              sx={{
                color: getGradeColor(grade),
                fontSize: '48px',
                lineHeight: 1,
                mb: 1,
              }}
            >
              {totalScore}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ fontSize: '13px', letterSpacing: '0.5px' }}
            >
              총점 (100점 만점)
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Chip
              label={grade}
              sx={{
                bgcolor: getGradeColor(grade),
                color: 'white',
                fontSize: '18px',
                fontWeight: 700,
                height: 36,
                px: 2,
                '& .MuiChip-label': {
                  px: 2,
                },
              }}
            />
          </Box>

          {/* 합격/불합격 상태 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              p: 2,
              bgcolor: passConfig.bgcolor,
              borderRadius: 2,
              border: `1px solid ${passConfig.color}30`,
            }}
          >
            <Box sx={{ color: passConfig.color }}>{passConfig.icon}</Box>
            <Typography
              variant='h6'
              fontWeight={600}
              sx={{ color: passConfig.color, fontSize: '16px' }}
            >
              {passConfig.text}
            </Typography>
          </Box>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              textAlign: 'center',
              mt: 2,
              fontSize: '13px',
              fontStyle: 'italic',
            }}
          >
            {passConfig.message}
          </Typography>
        </CardContent>
      </Card>

      {/* 카테고리별 점수 */}
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <TrendingUp size={18} color={COLORS.PRIMARY.RED} />
            <Typography
              variant='h6'
              fontWeight={600}
              sx={{ color: COLORS.TEXT.BLACK_PRIMARY, fontSize: '16px' }}
            >
              카테고리별 점수
            </Typography>
          </Box>

          <Box sx={{ space: 2 }}>
            {[
              {
                label: '숙제/가정평가',
                value: categoryAverages.homework,
                color: '#f59e0b',
              },
              {
                label: '출석',
                value: categoryAverages.attendance,
                color: '#dc2626',
              },
              {
                label: '인성',
                value: categoryAverages.character,
                color: '#8b5cf6',
              },
              {
                label: '체력',
                value: categoryAverages.physical,
                color: '#10b981',
              },
              {
                label: '기술요구사항',
                value: categoryAverages.technical,
                color: '#3b82f6',
              },
            ].map((category, index) => (
              <Box key={category.label} sx={{ mb: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ color: COLORS.TEXT.BLACK_PRIMARY, fontSize: '13px' }}
                  >
                    {category.label}
                  </Typography>
                  <Typography
                    variant='body2'
                    fontWeight={600}
                    sx={{ color: category.color, fontSize: '13px' }}
                  >
                    {category.value.toFixed(1)}점
                  </Typography>
                </Box>
                <LinearProgress
                  value={(category.value / 10) * 100}
                  variant='determinate'
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      bgcolor: category.color,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* 성과 분석 */}
      <Card
        sx={{
          borderRadius: 3,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <Award size={18} color={COLORS.PRIMARY.RED} />
            <Typography
              variant='h6'
              fontWeight={600}
              sx={{ color: COLORS.TEXT.BLACK_PRIMARY, fontSize: '16px' }}
            >
              성과 분석
            </Typography>
          </Box>

          <Box sx={{ space: 2 }}>
            {/* 최고 성과 영역 */}
            {(() => {
              const highest = Object.entries(categoryAverages).reduce((a, b) =>
                a[1] > b[1] ? a : b
              );
              const lowest = Object.entries(categoryAverages).reduce((a, b) =>
                a[1] < b[1] ? a : b
              );

              const categoryNames: Record<string, string> = {
                homework: '숙제/가정평가',
                attendance: '출석',
                character: '인성',
                physical: '체력',
                technical: '기술요구사항',
              };

              return (
                <>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#ecfdf5',
                      borderRadius: 2,
                      border: '1px solid #d1fae5',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant='body2'
                      color='#065f46'
                      sx={{ fontSize: '13px', fontWeight: 500 }}
                    >
                      🎯 최고 성과: {categoryNames[highest[0]]} (
                      {highest[1].toFixed(1)}점)
                    </Typography>
                  </Box>

                  {highest[1] !== lowest[1] && (
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: '#fef2f2',
                        borderRadius: 2,
                        border: '1px solid #fecaca',
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant='body2'
                        color='#991b1b'
                        sx={{ fontSize: '13px', fontWeight: 500 }}
                      >
                        📈 개선 필요: {categoryNames[lowest[0]]} (
                        {lowest[1].toFixed(1)}점)
                      </Typography>
                    </Box>
                  )}

                  <Box
                    sx={{
                      p: 2,
                      bgcolor: '#f0f9ff',
                      borderRadius: 2,
                      border: '1px solid #bae6fd',
                    }}
                  >
                    <Typography
                      variant='body2'
                      color='#0c4a6e'
                      sx={{ fontSize: '13px', fontWeight: 500 }}
                    >
                      💡 전체 평균: {(totalScore / 10).toFixed(1)}점
                    </Typography>
                  </Box>
                </>
              );
            })()}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EvaluationSummary;
