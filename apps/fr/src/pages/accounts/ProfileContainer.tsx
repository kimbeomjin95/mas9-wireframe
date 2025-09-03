import React, { useState } from 'react';
import { Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import ProfilesPage from './ProfilesPage';
import ProfileMemoPage from './ProfileMemoPage';

const ProfileContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {/* Header Section - 피그마와 정확히 일치 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant='h4'
            fontWeight={600}
            sx={{ color: '#1a1a1a', mb: 0.5 }}
          >
            Accounts
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            View, add, edit and delete school members' details.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant='outlined'
            size='medium'
            sx={{
              color: '#374151',
              borderColor: '#d1d5db',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Export
          </Button>
          <Button
            variant='outlined'
            size='medium'
            endIcon={<ChevronDown size={16} />}
            sx={{
              color: '#374151',
              borderColor: '#d1d5db',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Action
          </Button>
          <Button
            variant='contained'
            size='medium'
            sx={{
              bgcolor: '#dc2626',
              '&:hover': { bgcolor: '#b91c1c' },
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: 'none',
            }}
          >
            Add member
          </Button>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#dc2626',
            },
            '& .MuiTab-root': {
              color: '#6b7280',
              fontWeight: 500,
              textTransform: 'none',
              '&.Mui-selected': {
                color: '#dc2626',
              },
            },
          }}
        >
          <Tab label='List' />
          <Tab label='Memo' />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && <ProfilesPage />}
      {activeTab === 1 && <ProfileMemoPage />}
    </Box>
  );
};

export default ProfileContainer;
