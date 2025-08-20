import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Users, Plus, UserPlus } from 'lucide-react';

const StaffMembersPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Users size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Staff Members
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage staff members, roles, permissions, and staff information.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Add Staff
        </Button>
        <Button variant="outlined" startIcon={<UserPlus size={16} />}>
          Invite Staff
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Staff Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add, edit, and manage staff members including instructors, administrators, and support staff with role-based permissions.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StaffMembersPage;