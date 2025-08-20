import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

export interface ActionButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  loading?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  icon,
  loading = false,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} /> : icon}
    >
      {children}
    </Button>
  );
};