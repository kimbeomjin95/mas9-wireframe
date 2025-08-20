import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Megaphone, Plus, Edit } from 'lucide-react';

const AnnouncementsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Megaphone size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Announcements
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create and manage important announcements for members and staff.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Announcement
        </Button>
        <Button variant="outlined" startIcon={<Edit size={16} />}>
          Manage Posts
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Announcement Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Post important updates, news, and announcements that will be visible to members and staff.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnnouncementsPage;
