import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  Container,
} from '@mui/material';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // 프로덕션에서는 에러 로깅 서비스로 전송
    if (import.meta.env.PROD && import.meta.env.VITE_DEMO_MODE !== 'true') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback: Fallback } = this.props;

    if (hasError) {
      if (Fallback) {
        return <Fallback error={error} resetError={this.handleReset} />;
      }

      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ mb: 3 }}>
                <AlertTriangle size={64} color="#f57c00" />
              </Box>

              <Typography variant="h4" component="h1" gutterBottom color="error">
                문제가 발생했습니다
              </Typography>

              <Typography variant="body1" color="text.secondary" paragraph>
                예상치 못한 오류가 발생했습니다. 
                페이지를 새로고침하거나 홈으로 돌아가 다시 시도해주세요.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    오류 정보:
                  </Typography>
                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                    {error.message}
                  </Typography>
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={<RefreshCw size={18} />}
                  onClick={this.handleReset}
                  color="primary"
                >
                  다시 시도
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<RefreshCw size={18} />}
                  onClick={this.handleReload}
                >
                  페이지 새로고침
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Home size={18} />}
                  onClick={this.handleGoHome}
                >
                  홈으로 가기
                </Button>
              </Box>

              {/* 개발 모드에서만 상세 오류 정보 표시 */}
              {import.meta.env.DEV && errorInfo && (
                <Box sx={{ mt: 4, textAlign: 'left' }}>
                  <Typography variant="h6" gutterBottom>
                    개발자 정보 (개발 모드에서만 표시)
                  </Typography>
                  <Alert severity="info">
                    <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap', fontSize: '0.75rem' }}>
                      {errorInfo.componentStack}
                    </Typography>
                  </Alert>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      );
    }

    return children;
  }
}

// 함수형 컴포넌트용 Hook
export const useErrorHandler = () => {
  const handleError = React.useCallback((error: Error, errorInfo?: any) => {
    // 에러 로깅
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    
    // 프로덕션에서는 에러 리포팅 서비스로 전송
    if (import.meta.env.PROD && import.meta.env.VITE_DEMO_MODE !== 'true') {
      // 여기에 실제 에러 리포팅 로직 추가
    }
  }, []);

  return { handleError };
};

// 비동기 작업용 에러 처리 Hook
export const useAsyncError = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const throwError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return throwError;
};