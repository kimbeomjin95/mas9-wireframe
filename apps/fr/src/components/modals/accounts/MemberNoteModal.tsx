import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { ResponsiveDialog } from '@mas9/shared-ui';
import { User, Calendar, Edit3 } from 'lucide-react';

interface MemberNoteModalProps {
  onClose: () => void;
  onConfirm?: (isConfirm: boolean) => void;
  data?: {
    memberName?: string;
    note?: string;
    createdDate?: string;
    device?: string;
  };
}

const MemberNoteModal: React.FC<MemberNoteModalProps> = ({
  onClose,
  onConfirm,
  data,
}) => {
  const handleEdit = () => {
    onConfirm?.(true);
    onClose();
  };

  const handleClose = () => {
    onConfirm?.(false);
    onClose();
  };

  return (
    <ResponsiveDialog
      open={true}
      title='Member Note'
      onClose={onClose}
      size='md'
      actions={
        <Stack direction='row' spacing={2} sx={{ p: 2 }}>
          <Button 
            variant='outlined' 
            onClick={handleClose}
            sx={{ 
              color: '#374151',
              borderColor: '#d1d5db'
            }}
          >
            Close
          </Button>
          <Button 
            variant='contained' 
            onClick={handleEdit}
            startIcon={<Edit3 size={16} />}
            sx={{ 
              bgcolor: '#dc2626',
              '&:hover': { bgcolor: '#b91c1c' }
            }}
          >
            Edit Note
          </Button>
        </Stack>
      }
    >
      <Box sx={{ p: 3 }}>
        {/* Member Info Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          mb: 3,
          p: 2,
          backgroundColor: '#f8f9fa',
          borderRadius: 2
        }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: '#e3f2fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={24} color="#1976d2" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
              {data?.memberName || 'Member Name'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Calendar size={14} color="#6b7280" />
              <Typography variant='caption' color='text.secondary'>
                Note created: {data?.createdDate || '2024-01-15'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Note Content */}
        <Box sx={{ mb: 3 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
            Member Note
          </Typography>
          <Box sx={{
            p: 3,
            backgroundColor: '#fafafa',
            borderRadius: 2,
            border: '1px solid #e0e0e0',
            minHeight: 120
          }}>
            <Typography variant='body1' sx={{ 
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap'
            }}>
              {data?.note || 'No note available for this member.'}
            </Typography>
          </Box>
        </Box>

        {/* Device Info (Debug) */}
        {data?.device && (
          <Box sx={{
            p: 2,
            backgroundColor: '#e3f2fd',
            borderRadius: 1,
            border: '1px solid #bbdefb'
          }}>
            <Typography variant='caption' color='text.secondary'>
              Displayed on: {data.device}
            </Typography>
          </Box>
        )}
      </Box>
    </ResponsiveDialog>
  );
};

export default MemberNoteModal;