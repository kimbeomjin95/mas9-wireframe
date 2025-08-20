import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Users, Plus, Search } from 'lucide-react';

const ProfilesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Users size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Profiles
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage member profiles, view member information, and track member activities.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Add New Member
        </Button>
        <Button variant="outlined" startIcon={<Search size={16} />}>
          Search Members
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Member Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage all member profiles in your system. Track member information, membership status, and activity history.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilesPage;