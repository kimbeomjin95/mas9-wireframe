import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Clock, Play, Square } from 'lucide-react';

const ClockInOutPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Clock size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Clock In/Out
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Track staff work hours with clock in/out functionality and time management.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Play size={16} />}>
          Clock In
        </Button>
        <Button variant="outlined" startIcon={<Square size={16} />}>
          Clock Out
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Time Tracking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor staff work hours, break times, and attendance with automatic time tracking and reporting capabilities.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClockInOutPage;