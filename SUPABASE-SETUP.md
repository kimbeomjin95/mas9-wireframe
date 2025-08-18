# 🔐 Supabase 설정 가이드

이 가이드는 AI Wireframe Generator에서 사용할 Supabase 인증 시스템을 설정하는 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 생성 및 프로젝트 설정
1. [Supabase](https://supabase.com)에 접속하여 계정을 생성합니다
2. "New Project" 버튼을 클릭합니다
3. 프로젝트 정보를 입력합니다:
   - **Name**: `mas9-wireframe-auth`
   - **Database Password**: 강력한 패스워드 생성
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 사용자의 경우)

### 1.2 API 키 확보
1. 프로젝트 생성 완료 후 `Settings` > `API` 메뉴로 이동
2. 다음 정보를 복사합니다:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## 2. 환경변수 설정

### 2.1 .env.local 파일 생성
```bash
cd apps/fr
cp .env.local.example .env.local
```

### 2.2 실제 키 값 입력
`.env.local` 파일을 열고 다음과 같이 수정:

```env
# Supabase Configuration
VITE_SUPABASE_URL="https://your-actual-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-actual-anon-key"

# Claude API Configuration
VITE_CLAUDE_API_KEY="your-claude-api-key"

# Development Mode
VITE_DEMO_MODE="false"
```

## 3. 관리자 계정 생성

### 3.1 Authentication 설정
1. Supabase 대시보드에서 `Authentication` > `Settings` 메뉴로 이동
2. `Site URL` 설정:
   - **Local Development**: `http://localhost:3000`
   - **Production**: `https://your-username.github.io`
3. `Redirect URLs` 추가:
   - **Local**: `http://localhost:3000/mas9-wireframe/**`
   - **Production**: `https://your-username.github.io/mas9-wireframe/**`

### 3.2 수동 사용자 생성
1. `Authentication` > `Users` 메뉴로 이동
2. "Add user" 버튼 클릭
3. 관리자 계정 정보 입력:
   ```
   Email: admin@yourcompany.com
   Password: your-secure-password
   Email Confirm: true (체크)
   ```
4. "Add user" 버튼으로 계정 생성

## 4. 보안 설정 (선택사항)

### 4.1 이메일 도메인 제한
특정 도메인만 가입 허용하려면:
1. `Authentication` > `Settings` > `Auth policies`
2. Custom SQL policy 추가:
```sql
-- 특정 도메인만 허용
CREATE POLICY "Restrict signup to company domain" ON auth.users
FOR INSERT WITH CHECK (
  email LIKE '%@yourcompany.com'
);
```

### 4.2 Row Level Security (RLS) 활성화
현재 프로젝트는 사용자 테이블을 사용하지 않지만, 향후 확장을 위해:
1. `Table editor`에서 테이블 생성 시 RLS 활성화
2. 적절한 정책 설정

## 5. 테스트

### 5.1 연결 테스트
1. 개발 서버 실행:
   ```bash
   pnpm dev --filter=fr
   ```
2. 브라우저에서 `http://localhost:3000/mas9-wireframe/` 접속
3. 로그인 화면에서 생성한 관리자 계정으로 로그인 테스트

### 5.2 문제 해결
- **"Invalid API key"**: .env.local 파일의 키 값 확인
- **"Network error"**: CORS 설정 및 Site URL 확인
- **"Invalid credentials"**: 사용자 계정 존재 여부 확인

## 6. 프로덕션 배포 시 주의사항

### 6.1 GitHub Secrets 설정
```
VITE_SUPABASE_URL=your-production-supabase-url
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### 6.2 도메인 설정 업데이트
- Supabase 대시보드에서 Site URL을 프로덕션 도메인으로 변경
- Redirect URLs에 프로덕션 URL 추가

---

이 설정을 완료하면 AI Wireframe Generator에서 안전한 인증 시스템을 사용할 수 있습니다. 문제가 발생하면 Supabase 문서를 참고하거나 이슈를 등록해주세요.