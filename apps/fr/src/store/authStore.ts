import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User, AuthState, LoginCredentials } from '@mas9/shared-types';
import { authService } from '../services/auth';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      // State
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginCredentials) => {
        try {
          console.log('🔐 Store 로그인 시작');
          set({ isLoading: true, error: null });

          const result = await authService.login(credentials);

          console.log('✅ 로그인 성공 - 상태 업데이트');
          set({
            user: result.user,
            session: result.session as any,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log('🎯 로그인 완료 - 상태 확인:', {
            user: result.user,
            isAuthenticated: true
          });

          // 상태 업데이트 후 즉시 리다이렉션
          console.log('🚀 대시보드로 즉시 이동');
          window.location.replace('/mas9-wireframe/dashboard');

        } catch (error) {
          console.error('❌ Store 로그인 에러:', error);
          const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
          
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: { message: errorMessage, code: 'LOGIN_ERROR' },
          });

          throw error;
        }
      },

      logout: async () => {
        try {
          console.log('🚪 Store 로그아웃 시작');
          // 로그아웃 시에는 로딩 상태를 표시하지 않음
          set({ error: null });

          await authService.logout();

          console.log('🧹 인증 상태 완전 초기화');
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          console.log('✅ Store 로그아웃 완료');
          
          // 로그아웃 후 즉시 로그인 페이지로 이동
          console.log('🔄 로그인 페이지로 즉시 이동');
          window.location.replace('/mas9-wireframe/login');
          
        } catch (error) {
          console.error('💥 Store 로그아웃 에러:', error);
          const errorMessage = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
          
          set({
            isLoading: false,
            error: { message: errorMessage, code: 'LOGOUT_ERROR' },
          });

          // 에러가 있어도 로그인 페이지로 이동
          window.location.replace('/mas9-wireframe/login');
        }
      },

      initializeAuth: async () => {
        try {
          console.log('🏁 authStore 초기화 시작');
          set({ isLoading: true, error: null });

          const result = await authService.getCurrentSession();
          console.log('📋 세션 확인 결과:', {
            hasResult: !!result,
            hasUser: !!result?.user,
            userEmail: result?.user?.email
          });

          if (result) {
            console.log('✅ 세션 발견 - authStore 상태 업데이트');
            set({
              user: result.user,
              session: result.session as any,
              isAuthenticated: true,
              isLoading: false,
            });
            
            // 상태 업데이트 확인
            console.log('🔍 authStore 상태 업데이트 완료:', {
              user: result.user,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            console.log('❌ 세션 없음 - 비인증 상태로 설정');
            set({
              user: null,
              session: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }

          // 인증 상태 변화 구독 (데모 모드 포함)
          console.log('📡 인증 상태 변화 구독 시작');
          const subscription = authService.onAuthStateChange((user: User | null) => {
            console.log('🔄 인증 상태 변화 콜백:', {
              hasUser: !!user,
              userEmail: user?.email
            });
            
            if (user) {
              console.log('✅ 상태 변화로 사용자 정보 업데이트');
              set((state) => ({
                ...state,
                user,
                isAuthenticated: true,
              }));
            } else {
              console.log('❌ 상태 변화로 로그아웃 처리');
              set({
                user: null,
                session: null,
                isAuthenticated: false,
              });
            }
          });

          console.log('📡 구독 객체:', subscription);

        } catch (error) {
          console.error('💥 Auth 초기화 에러:', error);
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            error: { message: '인증 초기화에 실패했습니다.', code: 'INIT_ERROR' },
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);