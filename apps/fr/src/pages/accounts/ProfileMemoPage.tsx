import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { User, Edit3, Workflow, Database, FileText } from 'lucide-react';
import { useModal } from '@/hooks/useModal';
import { showToast, useView } from '@mas9/shared-ui';
import { PROFILE_MODALS } from '@/constants/modals';
import NeedToSeeSection from '../../components/modals/accounts/NeedToSeeSection';

const ProfileMemoPage: React.FC = () => {
  const { openModal } = useModal();
  const { IS_MOBILE, IS_TABLET } = useView();

  const handleViewNote = async () => {
    try {
      const result = await openModal(PROFILE_MODALS.NOTES_LIST_MODAL, {
        title: 'Member Notes',
        data: {
          memberName: 'John Doe',
          notes: [
            {
              id: '1',
              type: 'regular',
              content:
                'Member showed great improvement in class attendance and participation.',
              createdAt: '06/19/2025 12:58 AM',
            },
            {
              id: '2',
              type: 'reminder',
              content: 'Follow up on membership renewal',
              createdAt: '06/18/2025 10:30 AM',
              reminderTime: '06/25/2025 09:00 AM',
              isActive: true,
            },
          ],
        },
      });

      if (result) {
        showToast('Notes updated successfully', {
          type: 'success',
          position: 'top-right',
        });
      }
    } catch (error) {
      showToast('Failed to open notes modal', { type: 'error' });
    }
  };

  const handleNeedToSeeToggle = (enabled: boolean) => {
    showToast(enabled ? 'Need to See activated' : 'Need to See deactivated', {
      type: 'info',
      position: 'top-right',
    });
  };

  const handleNeedToSeeMessageUpdate = (message: string) => {
    showToast('Notification message updated', {
      type: 'success',
      position: 'top-right',
    });
  };

  const handleFlowChart = () => {
    showToast('Flow Chart feature coming soon', { type: 'info' });
  };

  const handleJsonData = () => {
    showToast('JSON Data structure feature coming soon', { type: 'info' });
  };

  const handleDescription = () => {
    showToast('Description feature coming soon', { type: 'info' });
  };
  // DetailBox 컴포넌트 - 피그마 디자인 기준
  const DetailBox = ({ label, value, showEdit = false, sx }: any) => (
    <Box
      sx={{
        ...sx,
        borderBottom: '1px solid #dcdfe4',
        px: 3,
        py: 1.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        position: 'relative',
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: '#8b8b8b',
          letterSpacing: '-0.48px',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: '#222222',
          letterSpacing: '-0.48px',
        }}
      >
        {value}
      </Typography>
      {showEdit && (
        <IconButton
          size='small'
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            p: 1,
          }}
        >
          <Edit3 size={18} />
        </IconButton>
      )}
    </Box>
  );

  // Row 컴포넌트 - 2개의 DetailBox를 나란히 배치
  const DetailRow = ({ left, right }: any) => (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <DetailBox {...left} sx={{ flex: 1 }} />
      <DetailBox {...right} sx={{ flex: 1 }} />
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {/* Fixed Header Area */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          px: 2,
          py: 1.5,
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow:
            '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Flow Chart Icon */}
        <IconButton
          size='small'
          onClick={handleFlowChart}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e5e7eb',
            '&:hover': {
              backgroundColor: '#e9ecef',
              borderColor: '#dc2626',
            },
          }}
        >
          <Workflow size={20} color='#6b7280' />
        </IconButton>

        {/* JSON Data Structure Icon */}
        <IconButton
          size='small'
          onClick={handleJsonData}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e5e7eb',
            '&:hover': {
              backgroundColor: '#e9ecef',
              borderColor: '#dc2626',
            },
          }}
        >
          <Database size={20} color='#6b7280' />
        </IconButton>

        {/* Description Icon */}
        <IconButton
          size='small'
          onClick={handleDescription}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e5e7eb',
            '&:hover': {
              backgroundColor: '#e9ecef',
              borderColor: '#dc2626',
            },
          }}
        >
          <FileText size={20} color='#6b7280' />
        </IconButton>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '20px',
          boxShadow:
            '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2.5,
            borderBottom: 0,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50px',
              backgroundColor: '#FFF',
              boxShadow: '0px 3px 14px 0px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <User size={24} />
          </Box>
          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 600,
              color: '#222222',
              letterSpacing: '-0.66px',
            }}
          >
            Basic Details
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ py: '15px' }}>
          {/* First Row */}
          <DetailRow
            left={{
              label: 'Member ID',
              value: '1234',
              showEdit: true,
            }}
            right={{
              label: 'Group',
              value: '-',
            }}
          />

          {/* Second Row */}
          <DetailRow
            left={{
              label: 'Ranking System',
              value: 'Regular, Regular, Regular',
            }}
            right={{
              label: 'Rank',
              value: 'White',
            }}
          />

          {/* Third Row */}
          <DetailRow
            left={{
              label: 'Membership',
              value: 'Membership, Membership, Membership',
            }}
            right={{
              label: 'Class',
              value: 'Class name, Class name, Class name, Class name',
            }}
          />

          {/* Fourth Row - Tag and Notes */}
          <Box sx={{ display: 'flex', width: '100%' }}>
            {/* Tag Section */}
            <Box
              sx={{
                flex: 1,
                borderBottom: '1px solid #dcdfe4',
                px: 3,
                py: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#8b8b8b',
                  letterSpacing: '-0.48px',
                }}
              >
                Tag
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  height: 32,
                }}
              >
                <Chip
                  label='{Tag Example 1}'
                  variant='outlined'
                  sx={{
                    height: 32,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.16px',
                    borderColor: '#8c8ca1',
                    color: '#222222',
                    borderRadius: '8px',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.375,
                    },
                  }}
                />
                <Chip
                  label='{Tag Example 2}'
                  variant='outlined'
                  sx={{
                    height: 32,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.16px',
                    borderColor: '#8c8ca1',
                    color: '#222222',
                    borderRadius: '8px',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.375,
                    },
                  }}
                />
                <Chip
                  label='{Tag Example}'
                  variant='outlined'
                  sx={{
                    height: 32,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.16px',
                    borderColor: '#8c8ca1',
                    color: '#222222',
                    borderRadius: '8px',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.375,
                    },
                  }}
                />
                <Chip
                  label='+ 5 more'
                  variant='outlined'
                  sx={{
                    height: 32,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.16px',
                    borderColor: '#8c8ca1',
                    color: '#222222',
                    borderRadius: '8px',
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.375,
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Notes Section */}
            <Box
              sx={{
                flex: 1,
                borderBottom: '1px solid #dcdfe4',
                px: 3,
                py: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#8b8b8b',
                  letterSpacing: '-0.48px',
                }}
              >
                Notes
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 4,
                  alignItems: 'flex-start',
                  pr: '22px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#222222',
                    letterSpacing: '-0.48px',
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Simple note about this member Simple note about this member
                </Typography>
                <Typography
                  sx={{
                    color: '#dd1921',
                    fontSize: 16,
                    fontWeight: 400,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={handleViewNote}
                >
                  View
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Need to See Section */}
      <NeedToSeeSection
        memberName='John Doe'
        initialEnabled={false}
        initialMessage='Please come to the office for a moment.'
        onToggle={handleNeedToSeeToggle}
      />
    </Box>
  );
};

export default ProfileMemoPage;
