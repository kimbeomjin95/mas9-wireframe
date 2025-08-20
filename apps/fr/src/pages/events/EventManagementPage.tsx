import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Calendar, Plus, Settings } from 'lucide-react';

const EventManagementPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Calendar size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">Event Management</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create and manage events, workshops, and special programs.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>Create Event</Button>
        <Button variant="outlined" startIcon={<Settings size={16} />}>Event Settings</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Event Overview</Typography>
          <Typography variant="body2" color="text.secondary">
            Organize and manage all your events, workshops, and special programs in one place.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventManagementPage;
