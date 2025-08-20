import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { GraduationCap, Plus, BookOpen, Video, Users, BarChart } from 'lucide-react';

const LearningCentersPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <GraduationCap size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Learning Centers
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Create and manage digital learning content, courses, tutorials, and educational resources for students to access online.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Create Content
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add new learning materials, tutorials, and educational content for students.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Create Content
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BookOpen size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Course Management
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Organize content into structured courses and learning paths for different skill levels.
              </Typography>
              <Button variant="outlined" startIcon={<BookOpen size={16} />}>
                Manage Courses
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Video size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Video Library
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload and manage video tutorials, technique demonstrations, and instructional content.
              </Typography>
              <Button variant="outlined" startIcon={<Video size={16} />}>
                Video Library
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
                  Student Access
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage student access permissions and track learning progress across content.
              </Typography>
              <Button variant="outlined" startIcon={<Users size={16} />}>
                Manage Access
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
                  Learning Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track content engagement, completion rates, and learning outcomes.
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

export default LearningCentersPage;