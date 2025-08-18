import { useAuthStore } from '../store/authStore';
import type { LoginCredentials } from '@mas9/shared-types';

/**
 * 인증 관련 상태와 액션을 제공하는 커스텀 훅
 */
export const useAuth = () => {
  const {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError,
  } = useAuthStore();

  // useAuth 호출 시마다 현재 상태 로그
  console.log('🎣 useAuth 훅 호출:', {
    isAuthenticated,
    isLoading,
    hasUser: !!user,
    userEmail: user?.email,
    hasSession: !!session,
    timestamp: new Date().toLocaleTimeString()
  });

  /**
   * 로그인 핸들러
   */
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      console.log('🚀 로그인 핸들러 호출:', credentials.email);
      await login(credentials);
      console.log('✅ 로그인 성공');
      return { success: true };
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '로그인에 실패했습니다.' 
      };
    }
  };

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = async () => {
    try {
      await logout();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : '로그아웃에 실패했습니다.' 
      };
    }
  };

  return {
    // State
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    handleLogin,
    handleLogout,
    clearError,
  };
};