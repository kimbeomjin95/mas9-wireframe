import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { FileEdit, Plus, Share, BarChart, Settings, Eye } from 'lucide-react';

const FormsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FileEdit size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Forms
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create custom forms for registration, surveys, feedback collection, and lead generation to streamline data collection.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Create Form
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Build custom forms with drag-and-drop fields, validation rules, and conditional logic.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Create New Form
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
                  Manage Forms
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Edit existing forms, update fields, and configure submission settings.
              </Typography>
              <Button variant="outlined" startIcon={<Settings size={16} />}>
                Manage Forms
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Share size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Share & Embed
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Generate shareable links and embed codes to distribute forms across channels.
              </Typography>
              <Button variant="outlined" startIcon={<Share size={16} />}>
                Share Forms
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Eye size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  View Submissions
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Review form submissions, export data, and manage response workflows.
              </Typography>
              <Button variant="outlined" startIcon={<Eye size={16} />}>
                View Responses
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
                  Form Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track form performance, completion rates, and conversion analytics.
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

export default FormsPage;