import React, { useState } from 'react';
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
  Collapse,
  Chip,
} from '@mui/material';
import { ChevronDown, ChevronRight, Globe, Laptop } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuList, type MenuItem } from '../../constants/menuConfig';

interface AdminSidebarProps {
  open: boolean;
  collapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}

// 1depth 애플리케이션 메뉴
const APP_SECTIONS = [
  {
    id: 'user-app',
    title: 'User App',
    icon: <Globe size={20} />,
    disabled: true,
  },
  {
    id: 'fr-app',
    title: 'Fr',
    icon: <Laptop size={20} />,
    disabled: false,
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  open,
  collapsed = false,
  onClose,
  onToggleCollapse,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedApp, setSelectedApp] = useState<string>('fr-app');
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleMenuItemClick = (path: string) => {
    if (path === '-') return; // 서브메뉴가 있는 경우
    navigate(path);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const isActiveItem = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenuExpand = (menuId: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isMenuExpanded = (menuId: string) => {
    return expandedMenus.includes(menuId);
  };

  const drawerWidth = 280;
  const collapsedWidth = 72;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 상단 여백 (헤더 높이만큼) */}
      <Box sx={{ height: 64 }} />

      {/* 앱 선택 영역 */}
      {!collapsed && (
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant='caption'
            sx={{ color: 'text.secondary', fontSize: '0.7rem' }}
          >
            APPLICATION
          </Typography>
          <Box sx={{ mt: 1, mb: 2 }}>
            {APP_SECTIONS.map((app) => (
              <Box
                key={app.id}
                onClick={() => !app.disabled && setSelectedApp(app.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1,
                  mb: 0.5,
                  borderRadius: 1,
                  cursor: app.disabled ? 'not-allowed' : 'pointer',
                  backgroundColor:
                    selectedApp === app.id ? 'primary.main' : 'transparent',
                  color:
                    selectedApp === app.id
                      ? 'primary.contrastText'
                      : app.disabled
                        ? 'text.disabled'
                        : 'text.primary',
                  opacity: app.disabled ? 0.5 : 1,
                  '&:hover': {
                    backgroundColor: app.disabled
                      ? 'transparent'
                      : selectedApp === app.id
                        ? 'primary.dark'
                        : 'action.hover',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {app.icon}
                  <Typography
                    variant='body2'
                    sx={{ fontSize: '0.85rem', fontWeight: 500 }}
                  >
                    {app.title}
                  </Typography>
                </Box>
                {app.disabled && (
                  <Chip
                    label='준비중'
                    size='small'
                    sx={{ fontSize: '0.6rem', height: 16 }}
                  />
                )}
              </Box>
            ))}
          </Box>
          <Divider sx={{ mb: 2 }} />
        </Box>
      )}

      {/* Fr 앱 메뉴들 */}
      {selectedApp === 'fr-app' && (
        <Box
          sx={{ flexGrow: 1, overflowY: 'auto', px: 1, pt: collapsed ? 2 : 0 }}
        >
          <List disablePadding>
            {menuList.map((menu) => (
              <Box key={menu.menuId}>
                <ListItem disablePadding sx={{ mb: collapsed ? 1 : 0.5 }}>
                  <ListItemButton
                    onClick={() => {
                      if (collapsed && onToggleCollapse) {
                        // collapsed 상태에서 아이콘 클릭 시 사이드바 펼치기
                        onToggleCollapse();
                      } else if (menu.subMenu.length > 0) {
                        toggleMenuExpand(menu.menuId);
                      } else {
                        handleMenuItemClick(menu.menuUrl);
                      }
                    }}
                    selected={
                      menu.subMenu.length === 0 && isActiveItem(menu.menuUrl)
                    }
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
                        color:
                          menu.subMenu.length === 0 &&
                          isActiveItem(menu.menuUrl)
                            ? 'inherit'
                            : 'text.secondary',
                      }}
                    >
                      {menu.ico && <menu.ico size={20} />}
                    </ListItemIcon>
                    {!collapsed && (
                      <>
                        <ListItemText
                          primary={menu.menuNm}
                          primaryTypographyProps={{
                            fontSize: '0.95rem',
                            fontWeight:
                              menu.subMenu.length === 0 &&
                              isActiveItem(menu.menuUrl)
                                ? 600
                                : 500,
                          }}
                        />
                        {menu.subMenu.length > 0 && (
                          <Box sx={{ ml: 1 }}>
                            {isMenuExpanded(menu.menuId) ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </Box>
                        )}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>

                {/* 서브메뉴 */}
                {!collapsed && menu.subMenu.length > 0 && (
                  <Collapse
                    in={isMenuExpanded(menu.menuId)}
                    timeout='auto'
                    unmountOnExit
                  >
                    <List component='div' disablePadding sx={{ pl: 3 }}>
                      {menu.subMenu.map((subMenu) => (
                        <ListItem
                          key={subMenu.menuId}
                          disablePadding
                          sx={{ mb: 0.3 }}
                        >
                          <ListItemButton
                            onClick={() => handleMenuItemClick(subMenu.menuUrl)}
                            selected={isActiveItem(subMenu.menuUrl)}
                            sx={{
                              borderRadius: 1,
                              minHeight: 40,
                              '&.Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText',
                                '&:hover': {
                                  backgroundColor: 'primary.dark',
                                },
                              },
                              '&:hover': {
                                backgroundColor: 'action.hover',
                              },
                            }}
                          >
                            <ListItemText
                              primary={subMenu.menuNm}
                              primaryTypographyProps={{
                                fontSize: '0.85rem',
                                fontWeight: isActiveItem(subMenu.menuUrl)
                                  ? 600
                                  : 400,
                              }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Box>
            ))}
          </List>
        </Box>
      )}

      {/* 하단 정보 */}
      {!collapsed && (
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography
            variant='caption'
            color='text.secondary'
            textAlign='center'
            display='block'
          >
            MAS9 Wireframe
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            textAlign='center'
            display='block'
          >
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
