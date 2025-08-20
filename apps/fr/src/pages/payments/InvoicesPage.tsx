import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Receipt, Plus, Send } from 'lucide-react';

const InvoicesPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Receipt size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Invoices
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create, manage, and send invoices to customers for classes and services.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Invoice
        </Button>
        <Button variant="outlined" startIcon={<Send size={16} />}>
          Send Invoices
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Invoice Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Generate and manage invoices for memberships, classes, and additional services with automated billing options.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default InvoicesPage;