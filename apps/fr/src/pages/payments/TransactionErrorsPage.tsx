import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { AlertTriangle, RefreshCw, Search } from 'lucide-react';

const TransactionErrorsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AlertTriangle size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Transaction Errors
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Monitor and resolve payment transaction errors and failed payment attempts.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<RefreshCw size={16} />}>
          Retry Failed
        </Button>
        <Button variant="outlined" startIcon={<Search size={16} />}>
          Search Errors
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Error Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage failed transactions, payment errors, and retry failed payment attempts to ensure revenue recovery.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionErrorsPage;