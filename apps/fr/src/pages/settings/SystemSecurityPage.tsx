import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Shield, Lock, Users } from 'lucide-react';

const SystemSecurityPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Shield size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">System & Security</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage system security settings, user permissions, and access controls.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Lock size={16} />}>Security Settings</Button>
        <Button variant="outlined" startIcon={<Users size={16} />}>User Permissions</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Security Configuration</Typography>
          <Typography variant="body2" color="text.secondary">
            Configure password policies, two-factor authentication, and user access permissions.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SystemSecurityPage;
