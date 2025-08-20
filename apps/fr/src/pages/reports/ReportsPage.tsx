import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { BarChart3, Download, Calendar } from 'lucide-react';

const ReportsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <BarChart3 size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Reports
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Generate and access comprehensive reports for financial, operational, and performance analysis.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Calendar size={16} />}>
          Schedule Report
        </Button>
        <Button variant="outlined" startIcon={<Download size={16} />}>
          Export Reports
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Report Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create, schedule, and manage various reports including financial statements, attendance reports, and performance metrics.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;