import React from 'react';
import {
  Box,
  Typography,
  Slider,
  TextField,
} from '@mui/material';
import { COLORS } from '@mas9/shared-ui';
import { getScoreColor } from '../../utils/evaluationHelpers';

interface ScoreSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  comment?: string;
  onCommentChange?: (comment: string) => void;
  min?: number;
  max?: number;
  showComment?: boolean;
  customColor?: string;
}

const ScoreSlider: React.FC<ScoreSliderProps> = ({
  label,
  value,
  onChange,
  comment = '',
  onCommentChange,
  min = 0,
  max = 10,
  showComment = true,
  customColor,
}) => {
  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    onChange(Array.isArray(newValue) ? (newValue[0] ?? 0) : (newValue ?? 0));
  };

  const scoreColor = customColor || getScoreColor(value);

  return (
    <Box sx={{ mb: 3 }}>
      {/* 라벨과 점수 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ color: COLORS.TEXT.BLACK_PRIMARY, fontSize: '14px' }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: scoreColor,
            color: 'white',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            minWidth: 60,
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" fontWeight={600} sx={{ fontSize: '14px' }}>
            {value}점
          </Typography>
        </Box>
      </Box>

      {/* 슬라이더 */}
      <Box sx={{ px: 1, mb: 2 }}>
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={min}
          max={max}
          step={1}
          marks={Array.from({ length: max - min + 1 }, (_, i) => ({
            value: min + i,
            label: (min + i) === 0 ? '미입력' : (min + i).toString(),
          }))}
          sx={{
            color: value === 0 ? '#9ca3af' : scoreColor,
            height: 8,
            '& .MuiSlider-track': {
              border: 'none',
              background: value === 0 ? '#e5e7eb' : `linear-gradient(90deg, #ef4444 0%, #f97316 25%, #f59e0b 50%, #10b981 100%)`,
            },
            '& .MuiSlider-rail': {
              bgcolor: '#e5e7eb',
              height: 8,
            },
            '& .MuiSlider-thumb': {
              height: 20,
              width: 20,
              bgcolor: 'white',
              border: `3px solid ${value === 0 ? '#9ca3af' : scoreColor}`,
              '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: `0 0 0 8px ${value === 0 ? '#9ca3af' : scoreColor}20`,
              },
            },
            '& .MuiSlider-mark': {
              bgcolor: '#9ca3af',
              height: 4,
              width: 2,
              '&.MuiSlider-markActive': {
                bgcolor: 'white',
              },
            },
            '& .MuiSlider-markLabel': {
              fontSize: '11px',
              color: '#6b7280',
              top: 28,
            },
          }}
        />
      </Box>

      {/* 점수 범위 표시 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, px: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
          매우 부족
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '11px' }}>
          우수
        </Typography>
      </Box>

      {/* 코멘트 입력 */}
      {showComment && onCommentChange && (
        <TextField
          fullWidth
          size="small"
          placeholder={`${label}에 대한 코멘트를 입력하세요`}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          multiline
          rows={2}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: '#f8fafc',
              fontSize: '13px',
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
              fontSize: '13px',
            },
          }}
        />
      )}
    </Box>
  );
};

export default ScoreSlider;