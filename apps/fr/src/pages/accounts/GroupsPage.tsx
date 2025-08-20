import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Users2, Plus, Settings } from 'lucide-react';

const GroupsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Users2 size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Groups
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create and manage member groups, organize classes, and set group permissions.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Group
        </Button>
        <Button variant="outlined" startIcon={<Settings size={16} />}>
          Group Settings
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Group Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organize members into groups for better class management and communication. Set group-specific permissions and access levels.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GroupsPage;