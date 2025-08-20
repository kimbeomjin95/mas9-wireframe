import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Calendar, Plus, Users, Settings, BarChart } from 'lucide-react';

const EventsManagementPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Calendar size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Events Management
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create, manage, and track special events, workshops, competitions, and promotional activities for your martial arts school.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Create Event
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set up new events with schedules, registration requirements, and capacity limits.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Create Event
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
                  Event Calendar
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View all events in calendar format and manage scheduling conflicts.
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
                <Users size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Registration Management
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage event registrations, waitlists, and participant communications.
              </Typography>
              <Button variant="outlined" startIcon={<Users size={16} />}>
                Manage Registration
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
                  Event Settings
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Configure event types, pricing, policies, and registration workflows.
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
                  Event Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track event performance, attendance rates, and revenue analytics.
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

export default EventsManagementPage;