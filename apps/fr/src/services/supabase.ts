import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

// 디버깅용 로그 추가
console.log('🌍 환경변수 상태:', {
  VITE_DEMO_MODE: import.meta.env.VITE_DEMO_MODE,
  isDemoMode,
  NODE_ENV: import.meta.env.NODE_ENV,
  DEV: import.meta.env.DEV,
  MODE: import.meta.env.MODE
});

// 데모 모드가 아닌 경우에만 실제 키 검증
if (!isDemoMode && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(
    '⚠️ Supabase 키가 설정되지 않았습니다. 데모 모드를 사용하려면 VITE_DEMO_MODE=true로 설정하세요.'
  );
}

// 데모 모드인 경우 가짜 값 사용
const finalUrl = supabaseUrl || 'https://demo.supabase.co';
const finalKey = supabaseAnonKey || 'demo-key';

export const supabase = createClient<Database>(finalUrl, finalKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export { isDemoMode };
export default supabase;