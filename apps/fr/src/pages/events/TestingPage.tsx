import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Award, Plus, Users } from 'lucide-react';

const TestingPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Award size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">Testing</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage belt testing, promotions, and ranking evaluations.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>Schedule Test</Button>
        <Button variant="outlined" startIcon={<Users size={16} />}>View Candidates</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Testing Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule belt tests, track candidate progress, and manage promotion ceremonies.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TestingPage;