import React, { useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
}) => {
  console.log('🎯 ===== AdminLayout 컴포넌트 시작 =====');
  console.log('🏗️ AdminLayout 렌더링:', { title, timestamp: new Date().toLocaleTimeString() });
  console.log('📍 현재 URL:', window.location.href);
  console.log('👶 children 타입:', typeof children);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // 모바일에서는 초기에 닫혀있고, 데스크톱에서는 초기에 열려있음
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  // 데스크톱에서만 사이드바 접힘 상태 관리
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    if (isMobile) {
      // 모바일에서는 열기/닫기
      setSidebarOpen(prev => !prev);
    } else {
      // 데스크톱에서는 접기/펼치기
      if (!sidebarOpen) {
        setSidebarOpen(true);
        setSidebarCollapsed(false);
      } else {
        setSidebarCollapsed(prev => !prev);
      }
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const drawerWidth = 280;
  const collapsedWidth = 72;
  
  // 현재 사이드바 너비 계산
  const currentSidebarWidth = isMobile ? 0 : (sidebarOpen ? (sidebarCollapsed ? collapsedWidth : drawerWidth) : 0);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* 헤더 */}
      <AdminHeader
        onMenuToggle={handleSidebarToggle}
        title={title}
      />

      {/* 사이드바 */}
      <AdminSidebar
        open={sidebarOpen}
        collapsed={!isMobile && sidebarCollapsed}
        onClose={handleSidebarClose}
      />

      {/* 메인 콘텐츠 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          // 데스크톱에서 사이드바 상태에 따라 마진 적용
          ml: {
            xs: 0, // 모바일에서는 마진 없음
            md: `${currentSidebarWidth}px`, // 데스크톱에서 사이드바 너비에 따라
          },
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* 헤더 높이만큼 상단 여백 */}
        <Box sx={{ height: 64 }} />

        {/* 실제 콘텐츠 영역 */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, md: 3 },
            backgroundColor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};