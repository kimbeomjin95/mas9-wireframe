import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Tags, Plus, Edit } from 'lucide-react';

const TagsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Tags size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Tags
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Create and manage tags to categorize members, classes, and content effectively.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<Plus size={16} />}>
          Create Tag
        </Button>
        <Button variant="outlined" startIcon={<Edit size={16} />}>
          Manage Tags
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tag Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use tags to organize and categorize members, classes, and other content. Create custom tags for better filtering and organization.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagsPage;