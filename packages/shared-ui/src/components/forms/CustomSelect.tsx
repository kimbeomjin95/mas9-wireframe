import React from 'react';
import { FormControl, Select, styled, SelectProps, FormControlProps } from '@mui/material';
import { COLORS } from '../../constants/colors';

const INPUT_RADIUS = '15px';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: COLORS.DISABLED.TEXT_PRIMARY,
    fontSize: '14px',
    lineHeight: '18.688px',
    fontWeight: '400',
    '&.MuiInputLabel-shrink': {
      fontSize: '17px',
      lineHeight: '17px',
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: INPUT_RADIUS,
  
  // Select input styles
  '& .MuiSelect-select': {
    fontSize: '14px',
    lineHeight: '18.688px',
    fontWeight: '400',
    // MUI Select의 기본 padding을 유지하여 높이를 TextField와 맞춤
    padding: '16.5px 14px',
  },

  // Disabled states
  '&.Mui-disabled': {
    backgroundColor: COLORS.BACKGROUND.GRAY_MEDIUM,
    color: COLORS.TEXT.BLACK_PRIMARY,
    '& fieldset': {
      border: 'none',
    },
  },

  // Default fieldset
  '& fieldset': {
    borderRadius: INPUT_RADIUS,
    border: `thin solid ${COLORS.BORDER.GRAY}`,
  },

  // Focus state
  '&.Mui-focused fieldset': {
    borderColor: COLORS.PRIMARY.RED,
    borderWidth: '2px',
  },

  // Hover state
  '&:hover:not(.Mui-focused):not(.Mui-error) fieldset': {
    borderColor: COLORS.TEXT.GRAY_LIGHTER,
  },

  // Error state
  '&.Mui-error fieldset': {
    borderColor: COLORS.PRIMARY.RED,
  },
}));

export interface CustomSelectProps extends Omit<SelectProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
  formControlProps?: Omit<FormControlProps, 'children'>;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  formControlProps,
  children,
  ...selectProps
}) => {
  return (
    <StyledFormControl variant="outlined" {...formControlProps}>
      <StyledSelect {...selectProps}>
        {children}
      </StyledSelect>
    </StyledFormControl>
  );
};