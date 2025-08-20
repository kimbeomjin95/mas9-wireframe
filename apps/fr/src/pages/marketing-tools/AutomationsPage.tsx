import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Zap, Plus, PlayCircle, Settings, BarChart, Workflow } from 'lucide-react';

const AutomationsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Zap size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Automations
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create automated workflows for marketing campaigns, member communications, and business processes to save time and improve efficiency.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Create Automation
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Build new automated workflows with triggers, conditions, and actions.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Create Workflow
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Workflow size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Workflow Builder
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Design complex automation flows with visual workflow builder and logic branching.
              </Typography>
              <Button variant="outlined" startIcon={<Workflow size={16} />}>
                Build Workflow
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PlayCircle size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Active Automations
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Monitor running automations, pause workflows, and track execution status.
              </Typography>
              <Button variant="outlined" startIcon={<PlayCircle size={16} />}>
                View Active
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
                  Configure Triggers
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set up automation triggers based on member actions, dates, or system events.
              </Typography>
              <Button variant="outlined" startIcon={<Settings size={16} />}>
                Configure
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
                  Automation Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track automation performance, success rates, and efficiency metrics.
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

export default AutomationsPage;