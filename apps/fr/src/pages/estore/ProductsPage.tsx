import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Package, Plus, Edit } from 'lucide-react';

const ProductsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Package size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Products
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage your product catalog, inventory, pricing, and product information.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Add Product
        </Button>
        <Button variant="outlined" startIcon={<Edit size={16} />}>
          Manage Inventory
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Product Catalog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and manage your product catalog including product details, pricing, inventory levels, and product images.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductsPage;