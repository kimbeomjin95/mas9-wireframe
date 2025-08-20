import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Mail, Send, Users } from 'lucide-react';

const MessagingPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Mail size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Messages
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Send emails and manage communication with members, staff, and groups.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Send size={16} />}>
          Send Message
        </Button>
        <Button variant="outlined" startIcon={<Users size={16} />}>
          Group Message
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Email Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and send targeted email campaigns, newsletters, and announcements to members and staff.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MessagingPage;