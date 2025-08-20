import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { CreditCard, Plus, Settings, TrendingUp, Users } from 'lucide-react';

const MembershipsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CreditCard size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Memberships
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage membership plans, pricing, benefits, and member enrollment. Track membership performance and renewals.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Create Membership Plan
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Design new membership plans with custom pricing, benefits, and duration options.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Create Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Settings size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Manage Plans
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Edit existing membership plans, update pricing, and modify benefits and restrictions.
              </Typography>
              <Button variant="outlined" startIcon={<Settings size={16} />}>
                Manage Plans
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
                  Member Enrollment
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enroll members in plans, manage upgrades and downgrades, and track enrollment status.
              </Typography>
              <Button variant="outlined" startIcon={<Users size={16} />}>
                Manage Enrollment
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Membership Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View membership performance, renewal rates, and revenue analytics by plan type.
              </Typography>
              <Button variant="outlined" startIcon={<TrendingUp size={16} />}>
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MembershipsPage;