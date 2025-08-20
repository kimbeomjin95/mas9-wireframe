import React from 'react';
import { Box, Typography, Button, Card, CardContent, Alert } from '@mui/material';
import { TestTube, Smartphone, Monitor } from 'lucide-react';
import { useView, showToast, useModals } from '@mas9/shared-ui';

const PublicTestPage: React.FC = () => {
  const { IS_MOBILE, IS_TABLET, viewType } = useView();
  const { openModal } = useModals();

  // 테스트 함수들
  const handleSuccessToast = () => {
    showToast('✅ 성공 메시지 테스트!', { type: 'success' });
  };

  const handleErrorToast = () => {
    showToast('❌ 에러 메시지 테스트!', { type: 'error' });
  };

  const handleInfoToast = () => {
    showToast('ℹ️ 정보 메시지 테스트!', { type: 'info' });
  };

  const handleWarningToast = () => {
    showToast('⚠️ 경고 메시지 테스트!', { type: 'warning' });
  };

  const handleCustomToast = () => {
    showToast('🎉 커스텀 위치 토스트!', {
      type: 'success',
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false
    });
  };

  const handleModalTest = async () => {
    try {
      showToast('📋 모달 시스템이 준비되었습니다!', { 
        type: 'info',
        position: 'top-right' 
      });
      console.log('Modal system is ready for implementation');
    } catch (error) {
      showToast('모달 테스트 실패', { type: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TestTube size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          공통 Hooks 테스트 페이지
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        shared-ui 패키지의 공통 hooks와 utils를 테스트할 수 있는 페이지입니다.
      </Typography>

      {/* ViewProvider 테스트 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {IS_MOBILE ? <Smartphone size={20} /> : <Monitor size={20} />}
            <Typography variant="h6" sx={{ ml: 1 }}>
              디바이스 감지 (ViewProvider)
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              현재 디바이스: {IS_MOBILE ? '모바일' : IS_TABLET ? '태블릿' : 'PC'} | 
              ViewType: {viewType} | 
              IS_MOBILE: {IS_MOBILE ? 'true' : 'false'}
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* Toast 테스트 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Toast 테스트
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
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
              color="info"
              onClick={handleInfoToast}
              data-testid="info-toast-btn"
            >
              Info Toast
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
              variant="outlined" 
              onClick={handleCustomToast}
              data-testid="custom-toast-btn"
            >
              Custom Toast
            </Button>
            <Button 
              variant="outlined" 
              onClick={handleModalTest}
              data-testid="modal-test-btn"
            >
              Modal Test
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 반응형 테스트 */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            반응형 UI 테스트
          </Typography>
          <Box 
            sx={{
              p: 2,
              border: '2px solid',
              borderColor: IS_MOBILE ? 'primary.main' : IS_TABLET ? 'warning.main' : 'success.main',
              borderRadius: 1,
              backgroundColor: IS_MOBILE ? 'primary.light' : IS_TABLET ? 'warning.light' : 'success.light',
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {IS_MOBILE && '📱 모바일 UI'}
              {IS_TABLET && '📟 태블릿 UI'}
              {!IS_MOBILE && !IS_TABLET && '💻 데스크톱 UI'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PublicTestPage;