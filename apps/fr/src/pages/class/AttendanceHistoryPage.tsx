import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { UserCheck, Download, Filter } from 'lucide-react';

const AttendanceHistoryPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <UserCheck size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Attendance History
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Track and review member attendance across all classes and time periods.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Download size={16} />}>
          Export Report
        </Button>
        <Button variant="outlined" startIcon={<Filter size={16} />}>
          Filter History
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Attendance Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View detailed attendance records, track patterns, and generate reports for individual members or entire classes.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AttendanceHistoryPage;