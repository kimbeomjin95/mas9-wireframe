import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

export interface TableSummaryHeaderProps {
  count?: number;
  sx?: SxProps<Theme>;
}

export const TableSummaryHeader: React.FC<TableSummaryHeaderProps> = ({ 
  count, 
  sx 
}) => {
  if (count === undefined) return null;

  return (
    <Box sx={sx}>
      <Typography variant="body2" color="text.secondary">
        총 {count.toLocaleString()}건
      </Typography>
    </Box>
  );
};