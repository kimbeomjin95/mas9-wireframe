import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CheckSquare, Users, Calendar } from 'lucide-react';

const BulkActionsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CheckSquare size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Bulk Actions
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Perform bulk check-in operations and manage multiple member actions simultaneously.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Users size={16} />}>
          Bulk Check-in
        </Button>
        <Button variant="outlined" startIcon={<Calendar size={16} />}>
          Schedule Actions
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Bulk Operations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Efficiently manage multiple member check-ins, attendance updates, and other bulk operations for classes and events.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BulkActionsPage;