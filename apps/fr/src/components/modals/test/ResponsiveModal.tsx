import React from 'react';
import { Box, Typography, Button, Stack, Card, CardContent } from '@mui/material';
import { ResponsiveDialog } from '@mas9/shared-ui';
import { Smartphone, Monitor, Tablet } from 'lucide-react';

interface ResponsiveModalProps {
  onClose: () => void;
  onConfirm?: (isConfirm: boolean) => void;
  data?: any;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({ onClose, onConfirm, data }) => {
  const handleConfirm = () => {
    onConfirm?.(true);
    onClose();
  };

  const handleCancel = () => {
    onConfirm?.(false);
    onClose();
  };

  return (
    <ResponsiveDialog
      open={true}
      title="반응형 모달"
      onClose={onClose}
      size="md"
      actions={
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            확인
          </Button>
        </Stack>
      }
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          반응형 모달 테스트
        </Typography>
        
        <Typography variant="body1" gutterBottom>
          이 모달은 디바이스에 따라 다르게 표시됩니다:
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Monitor size={20} style={{ marginRight: 8 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  PC (데스크톱)
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                일반 Dialog 형태로 표시됩니다
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Tablet size={20} style={{ marginRight: 8 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  태블릿
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                일반 Dialog 형태로 표시됩니다
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Smartphone size={20} style={{ marginRight: 8 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  모바일
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                BottomSheet 형태로 표시됩니다
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {data && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              전달받은 데이터:
            </Typography>
            <pre style={{ fontSize: '12px', margin: 0 }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </Box>
        )}
      </Box>
    </ResponsiveDialog>
  );
};

export default ResponsiveModal;