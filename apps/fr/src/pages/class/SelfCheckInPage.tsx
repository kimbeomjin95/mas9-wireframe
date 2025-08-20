import React from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { Scan, QrCode, Settings } from 'lucide-react';

const SelfCheckInPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Scan size={24} style={{ marginRight: 8 }} />
        <Typography variant="h4" component="h1">
          Self Check-in
        </Typography>
      </Box>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Enable members to check themselves in using QR codes or self-service kiosks.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" startIcon={<QrCode size={16} />}>
          Generate QR Code
        </Button>
        <Button variant="outlined" startIcon={<Settings size={16} />}>
          Kiosk Settings
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Self-Service Check-in
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Set up self-service check-in stations and QR code systems for members to independently check in to classes.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SelfCheckInPage;