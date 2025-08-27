import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  X,
  FileText,
  MapPin,
  Component,
  Info,
} from 'lucide-react';
import { getWireframeContent, WireframeSection } from '@/config/wireframe-config';

interface WireframeDrawerProps {
  open: boolean;
  onClose: () => void;
  pageId: string;
}

export const WireframeDrawer: React.FC<WireframeDrawerProps> = ({
  open,
  onClose,
  pageId,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const wireframeContent = getWireframeContent(pageId);

  if (!wireframeContent) {
    return null;
  }

  const drawerWidth = isMobile ? '100%' : 400;

  const SectionItem: React.FC<{ section: WireframeSection }> = ({ section }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 1,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
        <Chip
          label={section.id}
          size="small"
          color="primary"
          sx={{
            minWidth: 28,
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 0.5 }}>
            {section.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
            {section.description}
          </Typography>
          
          {section.component && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
              <Component size={14} color={theme.palette.text.disabled} />
              <Typography variant="caption" color="text.disabled">
                {section.component}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth,
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FileText size={20} />
            <Typography variant="h6" fontWeight={600}>
              화면설계서
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: 'inherit' }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Box sx={{ p: 3 }}>
            {/* Page Info */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                {wireframeContent.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {wireframeContent.description}
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Stats */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                p: 2,
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={600} color="primary.main">
                  {wireframeContent.sections.length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  총 구성요소
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={600} color="success.main">
                  100%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  구현완료
                </Typography>
              </Box>
            </Box>

            {/* Instructions */}
            <Box
              sx={{
                p: 2,
                mb: 3,
                bgcolor: 'info.light',
                borderRadius: 2,
                border: 1,
                borderColor: 'info.main',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Info size={16} color={theme.palette.info.main} />
                <Typography variant="subtitle2" fontWeight={600} color="info.main">
                  사용 방법
                </Typography>
              </Box>
              <Typography variant="body2" color="info.dark">
                각 번호를 클릭하면 해당 구성요소가 화면에서 하이라이트됩니다.
                설계서를 참고하여 기능을 이해하고 개발에 활용하세요.
              </Typography>
            </Box>

            {/* Sections List */}
            <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
              구성요소 목록
            </Typography>
            
            <Box>
              {wireframeContent.sections.map((section) => (
                <SectionItem key={section.id} section={section} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            🎨 MAS9 Wireframe Design System
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};