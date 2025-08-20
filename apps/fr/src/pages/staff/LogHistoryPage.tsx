import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { FileBarChart, Download, Filter } from 'lucide-react';

const LogHistoryPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FileBarChart size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Log History
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View and analyze staff activity logs, system access, and work history records.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Filter size={16} />}>
          Filter Logs
        </Button>
        <Button variant="outlined" startIcon={<Download size={16} />}>
          Export Reports
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Activity Monitoring
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track staff activities, system access logs, and work patterns to ensure accountability and optimize operations.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LogHistoryPage;