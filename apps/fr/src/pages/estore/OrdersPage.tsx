import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { ShoppingBag, Plus, Search } from 'lucide-react';

const OrdersPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ShoppingBag size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Orders
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage customer orders, process payments, and track order fulfillment.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Order
        </Button>
        <Button variant="outlined" startIcon={<Search size={16} />}>
          Search Orders
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage all customer orders including order status, payment information, shipping details, and order history.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrdersPage;