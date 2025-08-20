import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { MessageSquare, Plus, Settings } from 'lucide-react';

const ConversationsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <MessageSquare size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">Conversations</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage conversations and chat communications with members.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>New Conversation</Button>
        <Button variant="outlined" startIcon={<Settings size={16} />}>Chat Settings</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Chat Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor and manage all conversations between staff and members.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConversationsPage;
