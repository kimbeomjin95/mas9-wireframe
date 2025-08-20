import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { BookOpen, Plus, Calendar } from 'lucide-react';

const ClassManagementPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <BookOpen size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Class Management
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create and manage classes, schedules, and instructors.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Class
        </Button>
        <Button variant="outlined" startIcon={<Calendar size={16} />}>
          View Schedule
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Class Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all your classes including schedules, instructors, capacity, and enrollment status.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ClassManagementPage;