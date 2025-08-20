import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Stack,
  Alert,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { showToast, useView } from '@mas9/shared-ui';
import { useModal } from '@/hooks/useModal';
import { TEST_MODALS, PROFILE_NOTIFICATION_MODALS } from '@/constants/modals';
import { Smartphone, Monitor, TestTube } from 'lucide-react';

const ModalPage: React.FC = () => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  
  // 공통 hooks 사용
  const { IS_MOBILE, IS_TABLET, viewType } = useView();
  const { openModal } = useModal();

  const handleBasicModalOpen = () => setBasicModalOpen(true);
  const handleBasicModalClose = () => setBasicModalOpen(false);

  const handleConfirmModalOpen = () => setConfirmModalOpen(true);
  const handleConfirmModalClose = () => setConfirmModalOpen(false);

  const handleFormModalOpen = () => setFormModalOpen(true);
  const handleFormModalClose = () => setFormModalOpen(false);

  // 공통 모달 테스트 함수들
  const handleModalTest = async () => {
    try {
      const result = await openModal(TEST_MODALS.TEST_SAMPLE_MODAL, {
        title: '샘플 모달 테스트',
        data: { message: 'Modal Page에서 열었습니다!' }
      });
      
      showToast(`모달 결과: ${result}`, { 
        type: 'success',
        position: 'top-right' 
      });
    } catch (error) {
      showToast('모달 테스트 실패', { type: 'error' });
    }
  };

  const handleResponsiveModalTest = async () => {
    try {
      const result = await openModal(TEST_MODALS.TEST_RESPONSIVE_MODAL, {
        title: '반응형 모달 테스트',
        data: { 
          message: IS_MOBILE ? '모바일에서 BottomSheet로 표시됩니다' : 'PC에서 Dialog로 표시됩니다',
          device: IS_MOBILE ? 'Mobile' : IS_TABLET ? 'Tablet' : 'PC'
        }
      });
      
      showToast(`반응형 모달 결과: ${result}`, { 
        type: 'info',
        position: 'top-right' 
      });
    } catch (error) {
      showToast('반응형 모달 테스트 실패', { type: 'error' });
    }
  };

  const handleNotificationModalTest = async () => {
    try {
      const result = await openModal(PROFILE_NOTIFICATION_MODALS.PROFILE_NOTIFICATION_SETTINGS, {
        title: '알림 설정',
        userData: {
          id: 1,
          name: '홍길동',
          email: 'hong@example.com',
          notifications: {
            email: true,
            push: false,
            sms: true
          }
        }
      });
      
      showToast(`알림 설정 모달 결과: ${result}`, { 
        type: 'warning',
        position: 'top-right' 
      });
    } catch (error) {
      showToast('알림 설정 모달 테스트 실패', { type: 'error' });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TestTube size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Modal Components
        </Typography>
      </Box>
      
      {/* 공통 Hooks 테스트 섹션 */}
      <Card sx={{ mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TestTube size={20} style={{ marginRight: 8 }} />
            <Typography variant="h6">공통 Modal System 테스트</Typography>
          </Box>
          
          {/* ViewProvider 테스트 */}
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

          {/* 공통 모달 테스트 버튼들 */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleModalTest}
              data-testid="modal-test-btn"
            >
              샘플 모달
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleResponsiveModalTest}
              data-testid="responsive-modal-btn"
            >
              반응형 모달
            </Button>
            <Button 
              size="small" 
              variant="outlined" 
              onClick={handleNotificationModalTest}
              data-testid="notification-modal-btn"
            >
              알림 설정 모달
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          기본 Modal Types (MUI Dialog 기반)
        </Typography>
        
        <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
          <Button variant="contained" onClick={handleBasicModalOpen}>
            Basic Modal
          </Button>
          
          <Button variant="contained" color="warning" onClick={handleConfirmModalOpen}>
            Confirm Modal
          </Button>
          
          <Button variant="contained" color="info" onClick={handleFormModalOpen}>
            Form Modal
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Modal Usage
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          이 프로젝트에서는 두 가지 모달 시스템을 사용합니다:
        </Typography>
        
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>1. 공통 모달 시스템:</strong> useModal hook과 모달 상수를 사용하여 도메인별로 관리되는 반응형 모달
          </Typography>
        </Alert>
        
        <Alert severity="warning">
          <Typography variant="body2">
            <strong>2. 기본 MUI Dialog:</strong> 간단한 확인/입력용 모달을 위한 전통적인 방식
          </Typography>
        </Alert>
      </Paper>

      {/* Basic Modal */}
      <Dialog open={basicModalOpen} onClose={handleBasicModalClose}>
        <DialogTitle>Basic Modal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이것은 기본적인 모달 창입니다. 사용자에게 정보를 표시하거나 간단한 확인을 받을 때 사용됩니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBasicModalClose}>닫기</Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Modal */}
      <Dialog open={confirmModalOpen} onClose={handleConfirmModalClose}>
        <DialogTitle>확인</DialogTitle>
        <DialogContent>
          <DialogContentText>
            정말로 이 작업을 수행하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmModalClose}>취소</Button>
          <Button 
            onClick={() => {
              // 확인 로직 처리
              handleConfirmModalClose();
            }} 
            color="warning" 
            variant="contained"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>

      {/* Form Modal */}
      <Dialog open={formModalOpen} onClose={handleFormModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Form Modal</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            이것은 폼이 포함된 모달입니다. 사용자 입력을 받아야 할 때 사용됩니다.
          </DialogContentText>
          {/* 여기에 실제 폼 컴포넌트들이 들어갈 수 있습니다 */}
          <Box sx={{ 
            border: '2px dashed', 
            borderColor: 'divider', 
            p: 3, 
            textAlign: 'center',
            borderRadius: 1
          }}>
            <Typography color="text.secondary">
              Form Components Area
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormModalClose}>취소</Button>
          <Button variant="contained" color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalPage;