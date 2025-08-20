import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { RefreshCw, Plus, Settings } from 'lucide-react';

const AutopaysPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <RefreshCw size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Autopays
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage automatic payment schedules and recurring billing for memberships and services.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Setup Autopay
        </Button>
        <Button variant="outlined" startIcon={<Settings size={16} />}>
          Manage Schedules
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Automatic Billing
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure and manage automatic payment schedules for recurring memberships, tuition, and service fees.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AutopaysPage;