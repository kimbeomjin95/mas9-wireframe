import React from 'react';
import { Box, Typography, Paper, Button, Stack, Alert } from '@mui/material';
import { showToast, useView } from '@mas9/shared-ui';
import { Smartphone, Monitor, TestTube } from 'lucide-react';

const ToastPage: React.FC = () => {
  // 공통 hooks 사용
  const { IS_MOBILE, IS_TABLET, viewType } = useView();

  const handleSuccessToast = () => {
    showToast('✅ 성공적으로 처리되었습니다!', { type: 'success' });
  };

  const handleErrorToast = () => {
    showToast('❌ 오류가 발생했습니다!', { type: 'error' });
  };

  const handleWarningToast = () => {
    showToast('⚠️ 경고: 주의가 필요합니다!', { type: 'warning' });
  };

  const handleInfoToast = () => {
    showToast('ℹ️ 정보를 확인하세요!', { type: 'info' });
  };

  const handleCustomToast = () => {
    showToast('🎉 커스텀 위치 토스트!', {
      type: 'success',
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false
    });
  };

  const handlePositionToast = () => {
    showToast('📍 다양한 위치에서 표시되는 토스트!', {
      type: 'info',
      position: 'bottom-right',
      autoClose: 3000
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TestTube size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Toast Components
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        showToast 공통 훅을 사용하여 다양한 유형의 알림 메시지를 표시할 수 있습니다.
      </Typography>

      {/* ViewProvider 정보 섹션 */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TestTube size={20} style={{ marginRight: 8 }} />
          <Typography variant="h6">공통 Hooks 상태</Typography>
        </Box>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {IS_MOBILE ? <Smartphone size={16} /> : <Monitor size={16} />}
            <Typography variant="body2">
              현재 디바이스: {IS_MOBILE ? '모바일' : IS_TABLET ? '태블릿' : 'PC'} | 
              ViewType: {viewType} | 
              IS_MOBILE: {IS_MOBILE ? 'true' : 'false'}
            </Typography>
          </Box>
        </Alert>
      </Paper>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          기본 Toast Types
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleSuccessToast}
            data-testid="success-toast-btn"
          >
            Success Toast
          </Button>
          
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleErrorToast}
            data-testid="error-toast-btn"
          >
            Error Toast
          </Button>
          
          <Button 
            variant="contained" 
            color="warning" 
            onClick={handleWarningToast}
            data-testid="warning-toast-btn"
          >
            Warning Toast
          </Button>
          
          <Button 
            variant="contained" 
            color="info" 
            onClick={handleInfoToast}
            data-testid="info-toast-btn"
          >
            Info Toast
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          고급 Toast Options
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
          <Button 
            variant="outlined" 
            onClick={handleCustomToast}
            data-testid="custom-toast-btn"
          >
            Custom Position Toast
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={handlePositionToast}
            data-testid="position-toast-btn"
          >
            Bottom Right Toast
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          showToast Hook 사용법
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          @mas9/shared-ui의 showToast 훅을 사용하여 일관된 스타일의 토스트 메시지를 표시합니다.
        </Typography>

        <Typography variant="body2" component="pre" sx={{ 
          bgcolor: 'grey.100', 
          p: 2, 
          borderRadius: 1,
          fontFamily: 'monospace',
          overflow: 'auto'
        }}>
{`// 기본 사용법
showToast('메시지', { type: 'success' });

// 고급 옵션
showToast('메시지', {
  type: 'info',
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false
});`}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ToastPage;