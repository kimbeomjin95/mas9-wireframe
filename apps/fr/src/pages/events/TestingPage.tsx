import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Award, Plus, Users, CheckCircle, BarChart, Calendar } from 'lucide-react';

const TestingPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Award size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Testing
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage belt testing, rank promotions, and advancement evaluations. Track student progress and certification requirements.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Schedule Testing
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create new testing sessions with requirements, evaluators, and time slots.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Schedule Test
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
                  Manage Candidates
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Register students for testing and track their eligibility and requirements.
              </Typography>
              <Button variant="outlined" startIcon={<Users size={16} />}>
                Manage Candidates
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircle size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Testing Results
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Record test results, approve promotions, and update student ranks.
              </Typography>
              <Button variant="outlined" startIcon={<CheckCircle size={16} />}>
                Record Results
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Calendar size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Testing Calendar
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View upcoming tests, manage schedules, and track testing frequency.
              </Typography>
              <Button variant="outlined" startIcon={<Calendar size={16} />}>
                View Calendar
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
                  Promotion Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track promotion rates, testing success, and advancement statistics.
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

export default TestingPage;