import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { LayoutDashboard, Users, BookOpen, DollarSign } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <LayoutDashboard size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Home
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome to your franchise management dashboard. Monitor key metrics and access important features.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Users size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Member Overview
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                View total member count and activity status across all programs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BookOpen size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Class Status
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Monitor ongoing classes and attendance rates for all programs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DollarSign size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Payment Summary
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Review recent transactions and revenue performance metrics.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;