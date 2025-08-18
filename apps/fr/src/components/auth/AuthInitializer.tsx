import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingSpinner } from '@mas9/shared-ui';
import { useAuthStore } from '../../store/authStore';

interface AuthInitializerProps {
  children: React.ReactNode;
}

/**
 * 앱 시작 시 인증 상태를 초기화하는 컴포넌트
 */
export const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const { initializeAuth, isLoading, isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  
  // 로그인 페이지인지 확인
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    console.log('🏁 AuthInitializer 마운트 - 인증 초기화 시작');
    const init = async () => {
      try {
        await initializeAuth();
        console.log('✅ 인증 초기화 완료');
        
        // 로그인 페이지에서는 즉시 진행, 다른 페이지에서는 조건부 대기
        let delay = 0;
        if (!isLoginPage) {
          delay = isAuthenticated && user ? 100 : 200;
        }
        
        setTimeout(() => {
          setInitialized(true);
          setShowLoading(false);
        }, delay);
      } catch (error) {
        console.error('❌ 인증 초기화 실패:', error);
        setInitialized(true);
        setShowLoading(false);
      }
    };
    
    init();
  }, [initializeAuth, isLoginPage, isAuthenticated, user]);

  // 로그인 페이지에서는 로딩을 표시하지 않음
  const shouldShowLoading = !isLoginPage && (isLoading || !initialized) && showLoading;

  if (shouldShowLoading) {
    console.log('⏳ 초기화 대기 중:', { isLoading, initialized, showLoading, isLoginPage });
    return (
      <LoadingSpinner 
        fullHeight 
        message="인증 상태를 확인하고 있습니다..." 
      />
    );
  }

  console.log('🚀 AuthInitializer 완료 - 앱 렌더링 시작');
  return <>{children}</>;
};