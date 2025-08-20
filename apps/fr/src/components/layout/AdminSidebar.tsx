import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LayoutDashboard,
  Wand2,
  FileText,
  History,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  open: boolean;
  collapsed?: boolean;
  onClose?: () => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  description?: string;
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: '메인',
    items: [
      {
        id: 'dashboard',
        label: '대시보드',
        icon: <LayoutDashboard size={20} />,
        path: '/dashboard',
        description: '전체 현황 보기',
      },
      {
        id: 'wireframe',
        label: 'AI 화면설계',
        icon: <Wand2 size={20} />,
        path: '/wireframe',
        description: 'AI로 화면 생성',
      },
    ],
  },
  {
    title: '관리',
    items: [
      {
        id: 'templates',
        label: '템플릿 관리',
        icon: <FileText size={20} />,
        path: '/templates',
        description: '저장된 템플릿',
      },
      {
        id: 'history',
        label: '생성 이력',
        icon: <History size={20} />,
        path: '/history',
        description: '과거 생성 기록',
      },
    ],
  },
  {
    title: '설정',
    items: [
      {
        id: 'settings',
        label: '시스템 설정',
        icon: <Settings size={20} />,
        path: '/settings',
        description: 'API 키 및 설정',
      },
      {
        id: 'help',
        label: '도움말',
        icon: <HelpCircle size={20} />,
        path: '/help',
        description: '사용법 안내',
      },
    ],
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ open, collapsed = false, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActiveItem = (path: string) => {
    return location.pathname === path;
  };

  const drawerWidth = 280;
  const collapsedWidth = 72;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 여백 (헤더 높이만큼) */}
      <Box sx={{ height: 64 }} />

      {/* 메뉴 섹션들 */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1, pt: collapsed ? 2 : 0 }}>
        {MENU_SECTIONS.map((section, sectionIndex) => (
          <Box key={section.title} sx={{ mb: collapsed ? 1 : 2 }}>
            {/* 섹션 제목 */}
            {!collapsed && (
              <Typography
                variant="overline"
                sx={{
                  px: 2,
                  py: 1,
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                  letterSpacing: 1,
                }}
              >
                {section.title}
              </Typography>
            )}

            {/* 섹션 메뉴 아이템들 */}
            <List disablePadding>
              {section.items.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ mb: collapsed ? 1 : 0.5 }}>
                  <ListItemButton
                    onClick={() => handleMenuItemClick(item.path)}
                    selected={isActiveItem(item.path)}
                    sx={{
                      borderRadius: 2,
                      mx: collapsed ? 0.5 : 1,
                      px: collapsed ? 0.5 : 1,
                      minHeight: 48,
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 'auto' : 40,
                        justifyContent: 'center',
                        color: isActiveItem(item.path) ? 'inherit' : 'text.secondary',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.label}
                        secondary={item.description}
                        primaryTypographyProps={{
                          fontSize: '0.95rem',
                          fontWeight: isActiveItem(item.path) ? 600 : 500,
                        }}
                        secondaryTypographyProps={{
                          fontSize: '0.75rem',
                          color: isActiveItem(item.path) ? 'inherit' : 'text.secondary',
                          sx: { opacity: 0.8 },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {/* 섹션 구분선 (마지막 섹션 제외) */}
            {!collapsed && sectionIndex < MENU_SECTIONS.length - 1 && (
              <Divider sx={{ mx: 2, my: 1 }} />
            )}
          </Box>
        ))}
      </Box>

      {/* 하단 정보 */}
      {!collapsed && (
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
            AI Wireframe Generator
          </Typography>
          <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
            v1.0.0
          </Typography>
        </Box>
      )}
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={open}
      onClose={onClose}
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      ModalProps={{
        keepMounted: true, // 모바일에서 성능 향상
      }}
    >
      {drawerContent}
    </Drawer>
  );
};