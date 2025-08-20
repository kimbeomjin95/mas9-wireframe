import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Building, Settings, MapPin } from 'lucide-react';

const SchoolSetupPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Building size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">School Setup</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Configure your school information, location, and basic settings.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Settings size={16} />}>Edit Settings</Button>
        <Button variant="outlined" startIcon={<MapPin size={16} />}>Update Location</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>School Configuration</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your school's basic information, location details, contact information, and operational settings.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SchoolSetupPage;