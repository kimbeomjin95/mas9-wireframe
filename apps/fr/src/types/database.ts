export interface Database {
  public: {
    Tables: {
      // Supabase 기본 auth 테이블은 별도 스키마에 있으므로 여기서는 빈 객체
    };
    Views: {
      // 뷰 정의
    };
    Functions: {
      // 함수 정의  
    };
    Enums: {
      // 열거형 정의
    };
  };
}

// Supabase Auth 사용자 타입 확장
export interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}