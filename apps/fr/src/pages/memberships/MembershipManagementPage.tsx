import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { CreditCard, Plus, BarChart3 } from 'lucide-react';

const MembershipManagementPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <CreditCard size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Memberships
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Manage membership plans, pricing, and member subscriptions.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Plan
        </Button>
        <Button variant="outlined" startIcon={<BarChart3 size={16} />}>
          View Analytics
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Membership Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and manage different membership tiers, set pricing, and track member subscriptions and renewals.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MembershipManagementPage;