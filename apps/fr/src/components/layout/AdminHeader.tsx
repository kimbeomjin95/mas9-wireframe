import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  User,
  LogOut,
  Settings,
  Palette,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AdminHeaderProps {
  onMenuToggle?: () => void;
  title?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onMenuToggle,
  title = 'MAS9 Wireframe',
}) => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    handleProfileMenuClose();
    await handleLogout();
    console.log('🔄 로그아웃 완료 - 로그인 페이지로 이동');
    navigate('/login', { replace: true });
  };

  const handleSettingsClick = () => {
    handleProfileMenuClose();
    // 추후 설정 페이지 네비게이션 구현
    console.log('Settings clicked');
  };

  const getUserDisplayName = () => {
    if (!user?.email) return 'Admin';
    return user.email.includes('@') ? user.email.split('@')[0] : user.email;
  };

  const getAvatarLetter = () => {
    const displayName = getUserDisplayName();
    return displayName?.charAt(0)?.toUpperCase() || 'A';
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: (theme) => theme.shadows[1],
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: 64 }}>
          {/* 메뉴 토글 버튼 */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle menu"
            onClick={onMenuToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon size={24} />
          </IconButton>

          {/* 앱 제목 */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Palette size={28} color="#1976d2" />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                ml: 1,
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              {title}
            </Typography>
            
            {/* 데모 모드 표시 */}
            {import.meta.env.VITE_DEMO_MODE === 'true' && (
              <Chip
                label="DEMO"
                size="small"
                color="warning"
                sx={{ ml: 2, fontSize: '0.75rem' }}
              />
            )}
          </Box>

          {/* 사용자 정보 영역 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* 사용자 이름 (데스크톱에서만 표시) */}
            <Typography
              variant="body2"
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'text.secondary',
              }}
            >
              안녕하세요, <strong>{getUserDisplayName()}</strong>님
            </Typography>

            {/* 프로필 버튼 */}
            <IconButton
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={isMenuOpen ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? 'true' : undefined}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: 'primary.main',
                  fontSize: '1rem',
                }}
              >
                {getAvatarLetter()}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 프로필 메뉴 */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow: (theme) => theme.shadows[3],
            },
          },
        }}
      >
        {/* 사용자 정보 */}
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {getUserDisplayName()}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {user?.email}
          </Typography>
        </Box>

        {/* 메뉴 아이템들 */}
        <MenuItem onClick={() => console.log('Profile clicked')}>
          <ListItemIcon>
            <User size={20} />
          </ListItemIcon>
          <ListItemText>프로필</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          <ListItemText>설정</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogoutClick}>
          <ListItemIcon>
            <LogOut size={20} />
          </ListItemIcon>
          <ListItemText>로그아웃</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};