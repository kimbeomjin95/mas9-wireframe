import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Workflow, Database, FileText } from 'lucide-react';

interface ActionHeaderToolbarProps {
  onFlowChart?: () => void;
  onJsonData?: () => void;
  onDescription?: () => void;
}

const ActionHeaderToolbar: React.FC<ActionHeaderToolbarProps> = ({
  onFlowChart,
  onJsonData,
  onDescription,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        mb: 3,
        px: 2,
        py: 1.5,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow:
          '0px 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 5px 22px 0px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Flow Chart Icon */}
      <IconButton
        size="small"
        onClick={onFlowChart}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e5e7eb',
          '&:hover': {
            backgroundColor: '#e9ecef',
            borderColor: '#dc2626',
          },
        }}
      >
        <Workflow size={20} color="#6b7280" />
      </IconButton>

      {/* JSON Data Structure Icon */}
      <IconButton
        size="small"
        onClick={onJsonData}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e5e7eb',
          '&:hover': {
            backgroundColor: '#e9ecef',
            borderColor: '#dc2626',
          },
        }}
      >
        <Database size={20} color="#6b7280" />
      </IconButton>

      {/* Description Icon */}
      <IconButton
        size="small"
        onClick={onDescription}
        sx={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #e5e7eb',
          '&:hover': {
            backgroundColor: '#e9ecef',
            borderColor: '#dc2626',
          },
        }}
      >
        <FileText size={20} color="#6b7280" />
      </IconButton>
    </Box>
  );
};

export default ActionHeaderToolbar;