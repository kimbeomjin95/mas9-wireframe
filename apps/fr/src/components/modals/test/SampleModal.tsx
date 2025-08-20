import React from 'react';
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { CustomDialog } from '@mas9/shared-ui';

interface SampleModalProps {
  onClose: () => void;
  onConfirm?: (isConfirm: boolean) => void;
  data?: any;
}

const SampleModal: React.FC<SampleModalProps> = ({ onClose, onConfirm, data }) => {
  const handleConfirm = () => {
    onConfirm?.(true);
    onClose();
  };

  const handleCancel = () => {
    onConfirm?.(false);
    onClose();
  };

  return (
    <CustomDialog
      open={true}
      title="샘플 모달"
      onClose={onClose}
      size="sm"
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
        <Typography variant="body1" gutterBottom>
          이것은 샘플 모달입니다. 여기에 필요한 컨텐츠를 추가할 수 있습니다.
        </Typography>
        
        {data && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              전달받은 데이터:
            </Typography>
            <Typography variant="body2">
              {JSON.stringify(data, null, 2)}
            </Typography>
          </Box>
        )}

        <TextField
          fullWidth
          label="메모"
          placeholder="메모를 입력하세요"
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
      </Box>
    </CustomDialog>
  );
};

export default SampleModal;