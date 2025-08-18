import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@mas9/shared-ui';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 인증이 필요한 라우트를 보호하는 컴포넌트
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, user, session } = useAuth();
  const location = useLocation();
  const [checkDelay, setCheckDelay] = useState(true);

  console.log('🎯 ===== ProtectedRoute 컴포넌트 시작 =====');
  console.log('🛡️ ProtectedRoute 상태:', { 
    isAuthenticated, 
    isLoading, 
    hasUser: !!user,
    hasSession: !!session,
    userEmail: user?.email,
    currentPath: location.pathname,
    fullURL: window.location.href,
    checkDelay,
    timestamp: new Date().toLocaleTimeString()
  });
  console.log('👶 children 존재:', !!children);

  // 초기 로드 시 짧은 지연으로 인증 상태 안정화 대기
  useEffect(() => {
    // 이미 인증된 사용자가 있으면 즉시 진행, 없으면 짧은 대기
    const delay = isAuthenticated && user ? 50 : 150;
    const timer = setTimeout(() => {
      console.log('⏰ 인증 체크 지연 완료');
      setCheckDelay(false);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, user]);

  // 로딩 중이거나 체크 지연 중이면 로딩 스피너 표시
  if (isLoading || checkDelay) {
    console.log('⏳ 인증 상태 확인 중...', { isLoading, checkDelay });
    return (
      <LoadingSpinner 
        fullHeight 
        message="인증 상태를 확인하고 있습니다..." 
      />
    );
  }

  // 인증되지 않은 경우 또는 사용자 정보가 없는 경우 로그인 페이지로 리다이렉션
  if (!isAuthenticated || !user) {
    console.log('🚪 인증되지 않음 - 로그인 페이지로 리다이렉션', { isAuthenticated, hasUser: !!user });
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // 인증된 경우 자식 컴포넌트 렌더링
  console.log('✅ 인증됨 - 보호된 컴포넌트 렌더링', user.email);
  return <>{children}</>;
};