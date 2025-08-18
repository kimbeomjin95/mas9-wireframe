import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
} from '@mui/material';
// 아이콘 import 제거 (사용하지 않음)
import { LoginForm } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth();

  /**
   * 이미 인증된 사용자는 대시보드로 자동 리다이렉션
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      console.log('🎯 이미 로그인된 사용자 - 대시보드로 리다이렉션');
      window.location.replace('/mas9-wireframe/dashboard');
    }
  }, [isAuthenticated, user, isLoading]);

  /**
   * 로그인 성공 시 대시보드로 이동
   */
  const handleLoginSuccess = () => {
    console.log('🎯 로그인 성공 콜백 - authStore에서 리다이렉션 처리');
    // authStore의 login 함수에서 리다이렉션을 처리하므로 여기서는 아무것도 하지 않음
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `radial-gradient(ellipse at top left, ${theme.palette.primary.main}08 0%, transparent 50%), 
                    radial-gradient(ellipse at top right, ${theme.palette.secondary.main}08 0%, transparent 50%),
                    radial-gradient(ellipse at bottom, ${theme.palette.primary.main}05 0%, transparent 70%)`,
        backgroundColor: theme.palette.mode === 'dark' ? '#0a0e1a' : '#f8fafc',
      }}
    >
      {/* 배경 장식 요소들 */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '8%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.secondary.main}15, ${theme.palette.primary.main}15)`,
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            py: 4,
          }}
        >
          {/* 중앙 로그인 폼만 */}
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 450,
              p: 0,
              borderRadius: 4,
              background: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.05)' 
                : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.divider}30`,
              boxShadow: `0 20px 60px ${theme.palette.primary.main}08`,
            }}
          >
            <LoginForm onSuccess={handleLoginSuccess} />
          </Paper>
        </Box>
      </Container>
      
      {/* 글로벌 애니메이션 스타일 */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </Box>
  );
};