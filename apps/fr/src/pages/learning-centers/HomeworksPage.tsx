import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { FileText, Plus, CheckSquare, Clock, Users, BarChart } from 'lucide-react';

const HomeworksPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <FileText size={32} style={{ marginRight: 12 }} />
        <Typography variant="h4" component="h1">
          Homeworks
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Assign, track, and grade homework assignments for students. Monitor completion rates and provide feedback on submissions.
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Plus size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Create Assignment
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create new homework assignments with instructions, due dates, and grading criteria.
              </Typography>
              <Button variant="contained" startIcon={<Plus size={16} />}>
                Create Assignment
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckSquare size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Review Submissions
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Review and grade student submissions, provide feedback, and track completion status.
              </Typography>
              <Button variant="outlined" startIcon={<CheckSquare size={16} />}>
                Review Work
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Clock size={24} style={{ marginRight: 8 }} />
                <Typography variant="h6">
                  Due Date Tracking
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Monitor assignment due dates and send reminders to students with pending work.
              </Typography>
              <Button variant="outlined" startIcon={<Clock size={16} />}>
                Track Due Dates
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
                  Student Progress
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Track individual student progress and identify students who need additional support.
              </Typography>
              <Button variant="outlined" startIcon={<Users size={16} />}>
                View Progress
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
                  Assignment Analytics
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Analyze homework completion rates, average grades, and class performance trends.
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

export default HomeworksPage;