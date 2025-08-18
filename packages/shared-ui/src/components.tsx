import React from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  AlertProps,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  ButtonProps,
} from '@mui/material';
import { Copy, Download } from 'lucide-react';

export interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullHeight?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  message = '로딩 중...',
  fullHeight = false,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      p={3}
      minHeight={fullHeight ? '200px' : 'auto'}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

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

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      textAlign="center"
      minHeight="200px"
    >
      {icon && (
        <Box mb={2} color="text.secondary">
          {icon}
        </Box>
      )}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
};

export interface CodePreviewCardProps {
  title: string;
  code: string;
  onCopy?: () => void;
  onDownload?: () => void;
  isLoading?: boolean;
  error?: string;
}

export const CodePreviewCard: React.FC<CodePreviewCardProps> = ({
  title,
  code,
  onCopy,
  onDownload,
  isLoading = false,
  error,
}) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title={title}
        action={
          <Box display="flex" gap={1}>
            {onCopy && (
              <Button
                size="small"
                startIcon={<Copy size={16} />}
                onClick={onCopy}
                disabled={isLoading || !!error}
              >
                복사
              </Button>
            )}
            {onDownload && (
              <Button
                size="small"
                startIcon={<Download size={16} />}
                onClick={onDownload}
                disabled={isLoading || !!error}
              >
                다운로드
              </Button>
            )}
          </Box>
        }
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        {isLoading && <LoadingSpinner message="코드 생성 중..." />}
        {error && <ErrorDisplay message={error} />}
        {!isLoading && !error && code && (
          <Box
            component="pre"
            sx={{
              bgcolor: 'grey.50',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {code}
          </Box>
        )}
        {!isLoading && !error && !code && (
          <EmptyState
            title="생성된 코드가 없습니다"
            description="메뉴를 선택하여 코드를 생성해보세요."
          />
        )}
      </CardContent>
    </Card>
  );
};

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