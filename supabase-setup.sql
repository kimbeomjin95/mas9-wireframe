-- AI Wireframe Generator - Supabase Setup Script
-- 이 파일을 Supabase SQL Editor에 복사해서 실행하세요

-- 1. 프로필 테이블 생성 (auth.users를 확장)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 와이어프레임 히스토리 테이블 생성
CREATE TABLE IF NOT EXISTS public.wireframe_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    component_type TEXT NOT NULL,
    ui_library TEXT DEFAULT 'mui',
    code TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. RLS (Row Level Security) 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wireframe_history ENABLE ROW LEVEL SECURITY;

-- 4. 프로필 정책 설정
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- 5. 와이어프레임 히스토리 정책 설정
CREATE POLICY "Users can view own wireframes" 
    ON public.wireframe_history FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wireframes" 
    ON public.wireframe_history FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wireframes" 
    ON public.wireframe_history FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wireframes" 
    ON public.wireframe_history FOR DELETE 
    USING (auth.uid() = user_id);

-- 6. 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id, 
        NEW.email, 
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        CASE WHEN NEW.email = 'admin@demo.com' THEN 'admin' ELSE 'user' END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. 업데이트 트리거 적용
CREATE OR REPLACE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER handle_wireframe_history_updated_at
    BEFORE UPDATE ON public.wireframe_history
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 완료 메시지
SELECT 'Supabase setup completed! Now create a user account in Authentication > Users' as message;