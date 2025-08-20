import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Mail, Send, Users, Template, BarChart } from 'lucide-react';

const MessagesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Mail size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Messages
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Send targeted messages to members, manage email campaigns, and track communication effectiveness across all channels.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Send size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Send Message
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Compose and send emails to individual members or groups with personalized content.
              </Typography>
              <Button variant="contained" startIcon={<Send size={16} />}>
                Compose
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Template size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Email Templates
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create and manage reusable email templates for common communications.
              </Typography>
              <Button variant="outlined" startIcon={<Template size={16} />}>
                Manage Templates
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Users size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Bulk Messaging
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Send messages to multiple recipients with targeted filtering and segmentation.
              </Typography>
              <Button variant="outlined" startIcon={<Users size={16} />}>
                Bulk Send
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BarChart size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Message Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track open rates, click-through rates, and engagement metrics for all messages.
              </Typography>
              <Button variant="outlined" startIcon={<BarChart size={16} />}>
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessagesPage;