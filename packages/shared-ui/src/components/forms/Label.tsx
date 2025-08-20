import React, { FC } from 'react';
import { Typography, SxProps } from '@mui/material';
import { COLORS } from '../../constants/colors';

export interface LabelProps {
  label: string;
  required?: boolean;
  sx?: SxProps;
  fontWeight?: string | number;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline';
  isTooltip?: boolean;
  title?: string;
  isDefaultSx?: boolean;
}

export const Label: FC<LabelProps> = ({
  label,
  required = false,
  sx,
  variant = 'subtitle1',
  fontWeight,
  isTooltip = false,
  title,
  isDefaultSx = true,
  ...rest
}) => {
  return (
    <Typography
      sx={{
        position: 'relative',
        ...(isDefaultSx && {
          mb: 1,
        }),
        ...(isTooltip && {
          display: 'flex',
          alignItems: 'center',
        }),
        ...sx,
      }}
      {...rest}
      fontWeight={fontWeight}
      variant={variant}
      color={COLORS.TEXT.BLACK_PRIMARY}
    >
      {label}
      {required && <span style={{ color: COLORS.PRIMARY.RED }}>*</span>}
      {/* TODO: TooltipInfo 컴포넌트 추가 필요 시 구현 */}
      {/* {isTooltip && <TooltipInfo content={title} placement="top" />} */}
    </Typography>
  );
};