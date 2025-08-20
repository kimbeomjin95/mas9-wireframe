import React from 'react';
import { TextField, styled, TextFieldProps } from '@mui/material';
import { COLORS } from '../../constants/colors';

const INPUT_RADIUS = '15px';

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: INPUT_RADIUS,
  
  // Label styles
  '& label': {
    color: COLORS.DISABLED.TEXT_PRIMARY,
    '&.MuiInputLabel-shrink': {
      fontSize: '17px',
      lineHeight: '17px',
    },
  },

  // Select styles
  '& .MuiSelect-select': {
    // padding: '14px', // 주석 처리된 원본 스타일 유지
  },

  // Input styles
  '& input': {
    borderRadius: INPUT_RADIUS,
  },

  // Typography for input, textarea, label
  '& input, & textarea, & label': {
    fontSize: '14px',
    lineHeight: '18.688px',
    fontWeight: '400',
  },

  // Disabled states
  '& .Mui-disabled': {
    '&.MuiInputBase-root': {
      background: COLORS.BACKGROUND.GRAY_MEDIUM,
      borderRadius: INPUT_RADIUS,
    },
    '&.MuiInputBase-multiline': {
      borderRadius: INPUT_RADIUS,
    },
    '& input, & textarea, &.MuiInputBase-multiline': {
      backgroundColor: COLORS.BACKGROUND.GRAY_MEDIUM,
      color: COLORS.TEXT.BLACK_PRIMARY,
    },
    '& fieldset': {
      border: 'none',
    },
  },

  // Default fieldset
  '& fieldset': {
    borderRadius: INPUT_RADIUS,
    border: `thin solid ${COLORS.BORDER.GRAY}`,
  },

  // Error/helper text
  '& .MuiFormHelperText-root': {
    color: COLORS.PRIMARY.RED,
  },

  // Focus state
  '&:focus-within fieldset': {
    borderColor: COLORS.PRIMARY.RED,
    borderWidth: '2px',
  },

  // Hover state
  '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
    borderColor: COLORS.TEXT.GRAY_LIGHTER,
  },
}));

export interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

export const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
  return <StyledTextField variant="outlined" {...props} />;
};