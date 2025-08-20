import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { TrendingUp, BarChart, PieChart } from 'lucide-react';

const InsightsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TrendingUp size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Insights
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Get actionable insights and analytics about your business performance and trends.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<BarChart size={16} />}>
          View Analytics
        </Button>
        <Button variant="outlined" startIcon={<PieChart size={16} />}>
          Custom Reports
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Business Intelligence
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Analyze business performance with detailed insights on revenue, enrollment, retention, and operational efficiency.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InsightsPage;