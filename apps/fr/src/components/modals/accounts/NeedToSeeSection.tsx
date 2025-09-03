import React, { useState } from 'react';
import {
  Box,
  Typography,
  Alert,
} from '@mui/material';
import { IOSSwitch } from '@/components/common/IOSSwitch';
import {
  Building,
  Info,
} from 'lucide-react';

interface NeedToSeeSectionProps {
  memberName?: string;
  initialEnabled?: boolean;
  initialMessage?: string;
  onToggle?: (enabled: boolean) => void;
}

const NeedToSeeSection: React.FC<NeedToSeeSectionProps> = ({
  memberName = 'Member',
  initialEnabled = false,
  initialMessage = 'Please come to the office for a moment.',
  onToggle,
}) => {
  const [enabled, setEnabled] = useState(initialEnabled);
  const message = initialMessage;

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEnabled = event.target.checked;
    setEnabled(newEnabled);
    onToggle?.(newEnabled);
  };


  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          mt: 3
        }}
      >
        {/* Header */}
        <Box sx={{ 
          px: 3, 
          py: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2.5,
          borderBottom: '1px solid #f0f0f0'
        }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50px',
              backgroundColor: enabled ? '#fef2f2' : '#f8f9fa',
              border: enabled ? '2px solid #fecaca' : '2px solid #e9ecef',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Building size={20} color={enabled ? '#dc2626' : '#6b7280'} />
          </Box>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 600,
              color: '#222222',
              letterSpacing: '-0.66px',
            }}
          >
            Need to See
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Toggle Switch */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 3
          }}>
            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600,
                  color: '#222222',
                  mb: 0.5
                }}
              >
                Check-in Notification
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                {enabled ? 'Enabled - Notification will be sent during self check-in' : 'Disabled'}
              </Typography>
            </Box>
            <IOSSwitch
              checked={enabled}
              onChange={handleToggle}
            />
          </Box>

          {/* Message Section */}
          {enabled && (
            <>
              <Box sx={{ 
                p: 3,
                backgroundColor: '#fef2f2',
                borderRadius: 2,
                border: '1px solid #fecaca',
                mb: 2
              }}>
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#991b1b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Info size={16} />
                    Notification Message
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#7f1d1d',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    lineHeight: 1.5
                  }}
                >
                  "{message}"
                </Typography>
              </Box>

              {/* Info Alert */}
              <Alert 
                severity="info" 
                sx={{ 
                  backgroundColor: '#eff6ff',
                  color: '#1e40af',
                  '& .MuiAlert-icon': {
                    color: '#3b82f6'
                  },
                  fontSize: '0.875rem'
                }}
              >
                <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                  When <strong>{memberName}</strong> performs self check-in, the configured message will be sent to the gym app.
                </Typography>
              </Alert>
            </>
          )}

          {/* Disabled State Info */}
          {!enabled && (
            <Alert 
              severity="warning" 
              sx={{ 
                backgroundColor: '#fefce8',
                color: '#a16207',
                '& .MuiAlert-icon': {
                  color: '#eab308'
                },
                fontSize: '0.875rem'
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                Need to See feature is currently disabled. When enabled, members will receive notifications during self check-in.
              </Typography>
            </Alert>
          )}
        </Box>
      </Box>

    </>
  );
};

export default NeedToSeeSection;