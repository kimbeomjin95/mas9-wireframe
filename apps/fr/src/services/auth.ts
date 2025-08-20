import { supabase, isDemoMode } from './supabase';
import type { User, AuthError, LoginCredentials } from '@mas9/shared-types';

export class AuthService {
  /**
   * 이메일과 패스워드로 로그인
   */
  async login(credentials: LoginCredentials) {
    try {
      console.log('🔐 로그인 시도:', credentials.email);
      console.log('📋 데모 모드 상태:', isDemoMode);
      
      // 데모 모드인 경우 가짜 인증
      if (isDemoMode) {
        console.log('🎭 데모 모드로 로그인 진행');
        return this.demoLogin(credentials);
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(this.getErrorMessage(error.message));
      }

      if (!data.user) {
        throw new Error('로그인에 실패했습니다.');
      }

      return {
        user: this.mapUser(data.user),
        session: data.session,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('로그인 중 오류가 발생했습니다.');
    }
  }

  /**
   * 로그아웃
   */
  async logout() {
    try {
      console.log('🚪 로그아웃 시작...');
      
      // 데모 모드인 경우 가짜 로그아웃
      if (isDemoMode) {
        console.log('🎭 데모 모드 로그아웃');
        await this.demoLogout();
        return;
      }

      console.log('🔐 Supabase 로그아웃 실행');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('❌ Supabase 로그아웃 에러:', error);
        throw new Error('로그아웃 중 오류가 발생했습니다.');
      }
      
      console.log('✅ 로그아웃 완료');
    } catch (error) {
      console.error('💥 로그아웃 처리 중 예외:', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('로그아웃 중 오류가 발생했습니다.');
    }
  }

  /**
   * 현재 세션 확인
   */
  async getCurrentSession() {
    try {
      console.log('🔍 현재 세션 확인 중...');
      
      // 데모 모드인 경우 세션 스토리지에서 세션 확인
      if (isDemoMode) {
        console.log('🎭 데모 모드 세션 확인');
        const demoUser = sessionStorage.getItem('demo_user');
        if (demoUser) {
          const user = JSON.parse(demoUser);
          console.log('✅ 데모 사용자 세션 발견');
          return {
            user,
            session: { user, access_token: 'demo-token' },
          };
        }
        console.log('❌ 데모 사용자 세션 없음');
        return null;
      }

      console.log('🔐 Supabase 세션 확인');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('📊 세션 확인 결과:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        userEmail: session?.user?.email,
        hasError: !!error
      });
      
      if (error) {
        console.error('❌ 세션 확인 에러:', error);
        throw new Error('세션 확인 중 오류가 발생했습니다.');
      }

      if (!session) {
        console.log('❌ 활성 세션 없음');
        return null;
      }

      console.log('✅ 활성 세션 발견');
      return {
        user: this.mapUser(session.user),
        session,
      };
    } catch (error) {
      console.error('💥 세션 확인 중 예외:', error);
      return null;
    }
  }

  /**
   * 인증 상태 변화 구독
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    // 데모 모드에서는 구독하지 않음 (빈 객체 반환)
    if (isDemoMode) {
      console.log('🎭 데모 모드 - auth 상태 변화 구독 건너뜀');
      return {
        unsubscribe: () => {},
      };
    }

    console.log('📡 Supabase auth 상태 변화 구독 시작');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔄 Auth 상태 변화 이벤트:', event, {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email
        });

        if (session?.user) {
          console.log('✅ 세션에서 사용자 정보 발견');
          callback(this.mapUser(session.user));
        } else {
          console.log('❌ 세션에 사용자 정보 없음');
          callback(null);
        }
      }
    );

    return subscription;
  }

  /**
   * Supabase User를 앱 User 타입으로 변환
   */
  private mapUser(supabaseUser: any): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      created_at: supabaseUser.created_at,
      updated_at: supabaseUser.updated_at || supabaseUser.created_at,
    };
  }

  /**
   * 에러 메시지를 사용자 친화적으로 변환
   */
  private getErrorMessage(error: string): string {
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': '이메일 또는 패스워드가 잘못되었습니다.',
      'Email not confirmed': '이메일 인증이 필요합니다.',
      'Too many requests': '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.',
      'User not found': '사용자를 찾을 수 없습니다.',
      'Invalid email': '올바른 이메일 주소를 입력해주세요.',
      'Password should be at least 6 characters': '패스워드는 최소 6자 이상이어야 합니다.',
    };

    return errorMessages[error] || '로그인 중 오류가 발생했습니다.';
  }

  /**
   * 데모 모드 로그인 (개발용)
   */
  private async demoLogin(credentials: LoginCredentials) {
    console.log('🎭 데모 로그인 시작:', {
      email: credentials.email,
      password: credentials.password.replace(/./g, '*'),
    });
    
    // 시뮬레이션을 위한 지연
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 데모 계정 체크 (admin@demo.com / 123456)
    if (credentials.email === 'admin@demo.com' && credentials.password === '123456') {
      console.log('✅ 데모 계정 인증 성공');
      
      const demoUser: User = {
        id: 'demo-user-id',
        email: 'admin@demo.com',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // 세션 스토리지에 저장
      sessionStorage.setItem('demo_user', JSON.stringify(demoUser));
      console.log('💾 데모 사용자 세션스토리지 저장 완료');

      const loginResult = {
        user: demoUser,
        session: { user: demoUser, access_token: 'demo-token' },
      };

      console.log('🎉 데모 로그인 완료:', loginResult);
      return loginResult;
    } else {
      console.log('❌ 잘못된 데모 계정 정보');
      throw new Error('데모 계정: admin@demo.com / 123456을 사용해주세요.');
    }
  }

  /**
   * 데모 모드 로그아웃
   */
  private async demoLogout() {
    console.log('🎭 데모 사용자 세션스토리지에서 제거');
    sessionStorage.removeItem('demo_user');
    
    // 추가 세션 데이터 정리
    console.log('🧹 추가 세션 데이터 정리');
    sessionStorage.removeItem('auth_state');
    sessionStorage.clear();
    
    console.log('✅ 데모 로그아웃 완료');
  }
}

// 싱글톤 인스턴스 생성
export const authService = new AuthService();