import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { MessageCircle, Settings, Bell } from 'lucide-react';

const CommunicationPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MessageCircle size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">Communication</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Configure email, SMS, and notification settings for your school.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Settings size={16} />}>Email Settings</Button>
        <Button variant="outlined" startIcon={<Bell size={16} />}>Notifications</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Communication Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            Set up email templates, SMS configurations, and push notification preferences.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CommunicationPage;
