import React from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Chip,
} from '@mui/material';
import { COLORS } from '@mas9/shared-ui';
import { EvaluationStatus } from '../../types/evaluation';

interface StudentCardProps {
  student: {
    id: number;
    fullName: string;
    avatar?: string;
    oldRankName: string;
    newRankName: string;
  };
  isActive: boolean;
  status: EvaluationStatus;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isActive,
  status,
  onClick,
}) => {
  const getStatusConfig = (status: EvaluationStatus) => {
    switch (status) {
      case 'pending':
        return { label: '대기', color: '#6b7280', bgcolor: '#f3f4f6' };
      case 'in_progress':
        return { label: '진행중', color: '#2563eb', bgcolor: '#dbeafe' };
      case 'saved':
        return { label: '완료', color: '#059669', bgcolor: '#d1fae5' };
      default:
        return { label: '대기', color: '#6b7280', bgcolor: '#f3f4f6' };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Card
      sx={{
        p: 2,
        cursor: 'pointer',
        border: isActive ? `2px solid ${COLORS.PRIMARY.RED}` : '1px solid #e5e7eb',
        bgcolor: isActive ? '#fef2f2' : 'white',
        borderRadius: 3,
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: isActive ? '#fef2f2' : '#f9fafb',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={student.avatar || '/api/placeholder/40/40'}
          sx={{
            width: 40,
            height: 40,
            border: isActive ? `2px solid ${COLORS.PRIMARY.RED}` : 'none',
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            fontWeight={isActive ? 600 : 500}
            sx={{
              color: isActive ? COLORS.PRIMARY.RED : COLORS.TEXT.BLACK_PRIMARY,
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {student.fullName}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: '12px',
              display: 'block',
              mt: 0.5,
            }}
          >
            {student.oldRankName} → {student.newRankName}
          </Typography>
        </Box>
        <Chip
          label={statusConfig.label}
          size="small"
          sx={{
            bgcolor: statusConfig.bgcolor,
            color: statusConfig.color,
            fontSize: '11px',
            fontWeight: 500,
            height: 24,
            '& .MuiChip-label': {
              px: 1.5,
            },
          }}
        />
      </Box>
    </Card>
  );
};

export default StudentCard;