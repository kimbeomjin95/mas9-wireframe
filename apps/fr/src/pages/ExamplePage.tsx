import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Smartphone, Monitor, Tablet } from 'lucide-react';
import { useView, showToast, useModals } from '@mas9/shared-ui';

const ExamplePage: React.FC = () => {
  const { IS_MOBILE, IS_TABLET, viewType } = useView();
  const { openModal, COMMON_MODAL_ROUTES } = useModals();

  const handleToastTest = () => {
    showToast('🎉 공통 토스트 테스트 성공!', {
      type: 'success',
      position: 'top-center',
    });
  };

  const handleModalTest = () => {
    // 실제 모달 컴포넌트가 있을 때 사용
    console.log('모달 테스트 - COMMON_MODAL_ROUTES:', COMMON_MODAL_ROUTES);
    showToast('모달 기능은 실제 모달 컴포넌트가 추가되면 사용 가능합니다.', {
      type: 'info',
    });
  };

  const getDeviceIcon = () => {
    if (IS_MOBILE) return <Smartphone size={24} />;
    if (IS_TABLET) return <Tablet size={24} />;
    return <Monitor size={24} />;
  };

  const getDeviceText = () => {
    if (IS_MOBILE) return '모바일';
    if (IS_TABLET) return '태블릿';
    return 'PC';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        공통 Hooks 테스트 페이지
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        shared-ui 패키지의 공통 hooks와 utils를 테스트할 수 있는 페이지입니다.
      </Typography>

      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* ViewProvider 테스트 */}
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getDeviceIcon()}
              <Typography variant="h6" sx={{ ml: 1 }}>
                디바이스 감지 (ViewProvider)
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              현재 디바이스: <strong>{getDeviceText()}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ViewType: <strong>{viewType}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              IS_MOBILE: <strong>{IS_MOBILE ? 'true' : 'false'}</strong> | 
              IS_TABLET: <strong>{IS_TABLET ? 'true' : 'false'}</strong>
            </Typography>
          </CardContent>
        </Card>

        {/* Toast 테스트 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Toast 알림 테스트
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              공통 showToast 함수를 사용한 알림 테스트
            </Typography>
            <Button variant="contained" onClick={handleToastTest}>
              토스트 테스트
            </Button>
          </CardContent>
        </Card>

        {/* Modal 테스트 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Modal 시스템 테스트
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              공통 useModals hook과 ModalsProvider 테스트
            </Typography>
            <Button variant="outlined" onClick={handleModalTest}>
              모달 테스트
            </Button>
          </CardContent>
        </Card>

        {/* 반응형 테스트 */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              반응형 UI 테스트
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              현재 화면 크기에 따른 UI 변화를 확인하세요.
            </Typography>
            <Box 
              sx={{
                p: 2,
                border: '2px solid',
                borderColor: IS_MOBILE ? 'primary.main' : IS_TABLET ? 'warning.main' : 'success.main',
                borderRadius: 1,
                backgroundColor: IS_MOBILE ? 'primary.light' : IS_TABLET ? 'warning.light' : 'success.light',
                color: IS_MOBILE ? 'primary.contrastText' : IS_TABLET ? 'warning.contrastText' : 'success.contrastText',
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
    </Box>
  );
};

export default ExamplePage;