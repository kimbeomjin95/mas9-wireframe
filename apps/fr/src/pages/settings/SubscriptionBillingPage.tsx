import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { DollarSign, CreditCard, Receipt } from 'lucide-react';

const SubscriptionBillingPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <DollarSign size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">Subscription & Billing</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage your subscription plan, billing information, and payment history.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<CreditCard size={16} />}>Update Billing</Button>
        <Button variant="outlined" startIcon={<Receipt size={16} />}>View Invoices</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Billing Overview</Typography>
          <Typography variant="body2" color="text.secondary">
            View your current subscription plan, manage billing details, and access payment history.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubscriptionBillingPage;
