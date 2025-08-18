import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Design,
  History,
  Settings,
  Help,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

const drawerWidth = 280;

const menuItems = [
  {
    text: '대시보드',
    icon: Dashboard,
    path: '/dashboard',
    description: '프로젝트 현황 및 통계'
  },
  {
    text: '화면 설계',
    icon: Design,
    path: '/wireframe',
    description: 'AI 화면설계서 생성'
  },
  {
    text: '히스토리',
    icon: History,
    path: '/history',
    description: '생성 이력 관리'
  },
];

const bottomMenuItems = [
  {
    text: '설정',
    icon: Settings,
    path: '/settings',
    description: '시스템 설정'
  },
  {
    text: '도움말',
    icon: Help,
    path: '/help',
    description: '사용 가이드'
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  onClose, 
  variant = 'permanent' 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile || variant === 'temporary') {
      onClose();
    }
  };

  const isSelected = (path: string) => location.pathname === path;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 여백 (헤더 공간) */}
      <Toolbar />
      
      {/* 네비게이션 섹션 */}
      <Box sx={{ px: 2, py: 1 }}>
        <Typography 
          variant="overline" 
          sx={{ 
            color: theme.palette.text.secondary,
            fontWeight: 600,
            letterSpacing: '0.1em'
          }}
        >
          메뉴
        </Typography>
      </Box>

      {/* 메인 메뉴 */}
      <List sx={{ flex: 1, px: 1 }}>
        {menuItems.map((item) => {
          const selected = isSelected(item.path);
          const Icon = item.icon;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={selected}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main + '15',
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.main + '20',
                    },
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: selected ? 600 : 500,
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* 하단 메뉴 */}
      <List sx={{ px: 1, pb: 2 }}>
        {bottomMenuItems.map((item) => {
          const selected = isSelected(item.path);
          const Icon = item.icon;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={selected}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main + '15',
                    borderLeft: `3px solid ${theme.palette.primary.main}`,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiListItemText-primary': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    },
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  py: 1.5,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  secondary={item.description}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: selected ? 600 : 500,
                  }}
                  secondaryTypographyProps={{
                    fontSize: '0.75rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          boxShadow: variant === 'temporary' ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};