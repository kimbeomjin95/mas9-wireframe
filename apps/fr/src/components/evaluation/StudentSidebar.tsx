import React from 'react';
import {
  Box,
  Typography,
  Stack,
  LinearProgress,
} from '@mui/material';
import { Users } from 'lucide-react';
import { COLORS } from '@mas9/shared-ui';
import { EvaluationStatus } from '../../types/evaluation';
import StudentCard from './StudentCard';

interface StudentSidebarProps {
  students: Array<{
    id: number;
    fullName: string;
    avatar?: string;
    oldRankName: string;
    newRankName: string;
  }>;
  currentStudentId: number;
  evaluationStatuses: Record<number, EvaluationStatus>;
  onStudentSelect: (studentId: number) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  students,
  currentStudentId,
  evaluationStatuses,
  onStudentSelect,
}) => {
  const completedCount = Object.values(evaluationStatuses).filter(
    status => status === 'saved'
  ).length;

  const progressPercentage = students.length > 0 ? (completedCount / students.length) * 100 : 0;

  return (
    <Box
      sx={{
        width: 320,
        height: '100%',
        borderRight: '1px solid #e5e7eb',
        bgcolor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 헤더 */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              bgcolor: COLORS.PRIMARY.RED,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Users size={20} color="white" />
          </Box>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ color: COLORS.TEXT.BLACK_PRIMARY, fontSize: '18px' }}
          >
            평가 대상
          </Typography>
        </Box>

        {/* 진행률 표시 */}
        <Box sx={{ p: 2, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '13px' }}>
              진행률
            </Typography>
            <Typography
              variant="body2"
              fontWeight={500}
              sx={{ fontSize: '13px', color: COLORS.TEXT.BLACK_PRIMARY }}
            >
              {completedCount}/{students.length}
            </Typography>
          </Box>
          <LinearProgress
            value={progressPercentage}
            variant="determinate"
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#e5e7eb',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: completedCount === students.length ? '#10b981' : COLORS.PRIMARY.RED,
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '11px' }}
            >
              {progressPercentage.toFixed(0)}% 완료
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '11px' }}
            >
              {Object.values(evaluationStatuses).filter(s => s === 'in_progress').length}명 진행중
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 학생 목록 */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        <Stack spacing={1.5}>
          {students.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              isActive={student.id === currentStudentId}
              status={evaluationStatuses[student.id] || 'pending'}
              onClick={() => onStudentSelect(student.id)}
            />
          ))}
        </Stack>
      </Box>

      {/* 하단 요약 */}
      <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: '#6b7280', fontSize: '16px' }}
            >
              {Object.values(evaluationStatuses).filter(s => s === 'pending').length}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
              대기
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: '#2563eb', fontSize: '16px' }}
            >
              {Object.values(evaluationStatuses).filter(s => s === 'in_progress').length}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
              진행중
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ color: '#10b981', fontSize: '16px' }}
            >
              {completedCount}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
              저장됨
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentSidebar;