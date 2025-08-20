import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  FormControlLabel, 
  Switch,
  Divider 
} from '@mui/material';
import { CustomDialog } from '@mas9/shared-ui';
import { Bell, Mail, MessageSquare } from 'lucide-react';

interface NotificationSettingsModalProps {
  onClose: () => void;
  onConfirm?: (isConfirm: boolean) => void;
  data?: {
    clubUserId?: string;
  };
}

const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({ 
  onClose, 
  onConfirm, 
  data 
}) => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    console.log('알림 설정 저장:', settings);
    console.log('사용자 ID:', data?.clubUserId);
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
      title="알림 설정"
      onClose={onClose}
      size="sm"
      actions={
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="contained" onClick={handleSave}>
            저장
          </Button>
        </Stack>
      }
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          원하는 알림 방식을 선택해주세요.
        </Typography>

        <Stack spacing={2} sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Mail size={20} style={{ marginRight: 12, color: '#666' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
              }
              label="이메일 알림"
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bell size={20} style={{ marginRight: 12, color: '#666' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                />
              }
              label="푸시 알림"
              sx={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MessageSquare size={20} style={{ marginRight: 12, color: '#666' }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.smsNotifications}
                  onChange={() => handleToggle('smsNotifications')}
                />
              }
              label="SMS 알림"
              sx={{ flex: 1 }}
            />
          </Box>

          <Divider sx={{ my: 1 }} />

          <FormControlLabel
            control={
              <Switch
                checked={settings.marketingEmails}
                onChange={() => handleToggle('marketingEmails')}
              />
            }
            label="마케팅 이메일 수신"
          />
        </Stack>

        {data?.clubUserId && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              사용자 ID: {data.clubUserId}
            </Typography>
          </Box>
        )}
      </Box>
    </CustomDialog>
  );
};

export default NotificationSettingsModal;