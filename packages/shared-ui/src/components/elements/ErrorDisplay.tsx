import React from 'react';
import { Alert, AlertProps, Typography } from '@mui/material';

export interface ErrorDisplayProps extends Omit<AlertProps, 'severity'> {
  message: string;
  title?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  message,
  title = '오류',
  ...props
}) => {
  return (
    <Alert severity="error" {...props}>
      {title && (
        <Typography variant="subtitle2" component="div" gutterBottom>
          {title}
        </Typography>
      )}
      <Typography variant="body2">{message}</Typography>
    </Alert>
  );
};