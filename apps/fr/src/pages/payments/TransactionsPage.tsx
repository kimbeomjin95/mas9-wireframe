import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CreditCard, Download, Filter } from 'lucide-react';

const TransactionsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CreditCard size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Transactions
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        View and manage all payment transactions, refunds, and payment history.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Filter size={16} />}>
          Filter Transactions
        </Button>
        <Button variant="outlined" startIcon={<Download size={16} />}>
          Export Data
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transaction Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor all payment transactions including successful payments, refunds, chargebacks, and transaction details.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionsPage;