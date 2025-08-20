import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CreditCard, Settings, Shield } from 'lucide-react';

const PaymentsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CreditCard size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">Payments</Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Configure payment processing, gateways, and billing settings.
      </Typography>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Settings size={16} />}>Payment Settings</Button>
        <Button variant="outlined" startIcon={<Shield size={16} />}>Security Settings</Button>
      </Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Payment Configuration</Typography>
          <Typography variant="body2" color="text.secondary">
            Set up payment gateways, configure billing cycles, and manage payment security settings.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentsPage;
