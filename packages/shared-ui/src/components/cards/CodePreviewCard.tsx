import React from 'react';
import { Box, Card, CardContent, CardHeader, Button } from '@mui/material';
import { Copy, Download } from 'lucide-react';
import { LoadingSpinner } from '../elements/LoadingSpinner';
import { ErrorDisplay } from '../elements/ErrorDisplay';
import { EmptyState } from '../elements/EmptyState';

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