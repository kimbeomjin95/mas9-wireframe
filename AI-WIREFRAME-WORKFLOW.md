# 🚀 AI 화면설계서 생성 도구 구현 워크플로우

## 📋 프로젝트 개요
- **프로젝트명**: AI Wireframe Generator (mas9-wireframe)
- **목표**: 관리자가 AI를 통해 MUI 기반 화면설계서를 실시간 생성하는 웹 도구
- **전략**: MVP 우선, 체계적 단계별 구현
- **예상 소요시간**: 총 4-6주

## 🏗️ 전체 아키텍처

```
mas9-wireframe/
├── apps/
│   └── fr/                 # Frontend Admin Tool
├── packages/
│   ├── shared-ui/          # MUI 컴포넌트 라이브러리  
│   ├── shared-types/       # TypeScript 타입
│   └── shared-utils/       # 공통 유틸리티
├── turbo.json             # Turborepo 설정
├── package.json           # Root 패키지 설정
└── .github/workflows/     # 자동 배포
```

---

## 📅 Phase 0: 프로젝트 초기 설정 및 환경 구성
**목표**: Turborepo 모노레포 구조와 기본 환경 설정  
**소요시간**: 1-2일  
**담당자**: DevOps/Architecture

### 🔧 Phase 0.1: Turborepo 모노레포 설정
**병렬 처리 가능**: ✅ 독립적 작업

- [ ] **0.1.1** Root package.json 설정
  - pnpm workspace 설정
  - turbo, typescript, eslint 설치
  - scripts 정의 (dev, build, lint, format)
  
- [ ] **0.1.2** turbo.json 구성
  - 빌드 파이프라인 정의
  - 캐시 전략 설정
  - 앱별 의존성 매핑

- [ ] **0.1.3** TypeScript 설정
  - packages/typescript-config 생성
  - 공통 tsconfig.json
  - 앱별 tsconfig 상속 구조

### 🔧 Phase 0.2: 공통 패키지 구조 설정
**병렬 처리 가능**: ✅ Phase 0.1과 병렬

- [ ] **0.2.1** packages/shared-types 초기화
  - 기본 타입 정의 (User, Auth 등)
  - API 응답 타입 템플릿
  - export index.ts 설정

- [ ] **0.2.2** packages/shared-utils 초기화  
  - API 클라이언트 유틸리티
  - 날짜/문자열 처리 헬퍼
  - 상수 정의

- [ ] **0.2.3** packages/shared-ui 초기화
  - MUI 테마 설정
  - 공통 컴포넌트 기본 구조
  - Storybook 설정 (선택사항)

### 🔧 Phase 0.3: apps/fr 앱 초기화
**의존성**: Phase 0.1 완료 후

- [ ] **0.3.1** Vite + React + TypeScript 설정
  - Vite 프로젝트 생성
  - React 18, TypeScript 5.x 설정
  - 환경변수 설정 (.env, .env.local)

- [ ] **0.3.2** MUI 및 의존성 설치
  ```bash
  pnpm add @mui/material @emotion/react @emotion/styled
  pnpm add @mui/x-data-grid @mui/x-date-pickers  
  pnpm add lucide-react zustand
  pnpm add @supabase/supabase-js
  ```

- [ ] **0.3.3** 기본 폴더 구조 생성
  ```
  src/
  ├── components/     # UI 컴포넌트
  ├── pages/         # 페이지 컴포넌트
  ├── hooks/         # 커스텀 훅
  ├── services/      # API 서비스
  ├── store/         # Zustand 상태관리
  ├── types/         # 로컬 타입
  └── utils/         # 로컬 유틸리티
  ```

**🎯 Phase 0 완료 기준:**
- [ ] pnpm dev 명령어 실행 성공
- [ ] 패키지 간 import 정상 작동
- [ ] TypeScript 컴파일 오류 없음
- [ ] ESLint 규칙 적용 확인

---

## 🔐 Phase 1: Supabase 인증 시스템 구현
**목표**: 관리자 로그인 시스템 구축  
**소요시간**: 2-3일  
**담당자**: Backend/Security

### 🔧 Phase 1.1: Supabase 프로젝트 설정
**선행 작업**: Phase 0 완료

- [ ] **1.1.1** Supabase 프로젝트 생성
  - 새 프로젝트 생성 및 설정
  - Database URL 및 API Keys 확보
  - Row Level Security (RLS) 설정

- [ ] **1.1.2** 환경변수 설정
  ```typescript
  // .env
  VITE_SUPABASE_URL=your-project-url
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```

- [ ] **1.1.3** 관리자 계정 생성
  - Supabase Auth 대시보드에서 수동 생성
  - 테스트용 관리자 이메일/패스워드 설정

### 🔧 Phase 1.2: 인증 서비스 구현
**병렬 처리 가능**: ✅ UI 구현과 병렬

- [ ] **1.2.1** Supabase 클라이언트 설정
  ```typescript
  // services/supabase.ts
  import { createClient } from '@supabase/supabase-js'
  
  export const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  )
  ```

- [ ] **1.2.2** 인증 서비스 구현
  - 로그인/로그아웃 기능
  - 세션 상태 관리
  - 토큰 자동 갱신

- [ ] **1.2.3** Zustand 인증 스토어 생성
  ```typescript
  // store/authStore.ts
  interface AuthState {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
  }
  ```

### 🔧 Phase 1.3: 로그인 페이지 UI 구현
**병렬 처리 가능**: ✅ Phase 1.2와 병렬

- [ ] **1.3.1** 로그인 폼 컴포넌트
  - MUI TextField, Button 사용
  - 폼 validation (yup + react-hook-form)
  - 에러 처리 및 로딩 상태

- [ ] **1.3.2** 로그인 페이지 레이아웃
  - 중앙 정렬 로그인 카드
  - 브랜딩 요소 (로고, 제목)
  - 반응형 디자인

- [ ] **1.3.3** 라우팅 설정
  - React Router 설치 및 설정
  - 보호된 라우트 (ProtectedRoute) 구현
  - 인증 상태에 따른 리다이렉션

**🎯 Phase 1 완료 기준:**
- [ ] 관리자 계정으로 로그인 성공
- [ ] 세션 유지 및 자동 로그아웃 테스트
- [ ] 인증되지 않은 사용자 접근 차단 확인

---

## 🎨 Phase 2: Admin Layout & UI 구현  
**목표**: MUI 기반 관리자 대시보드 레이아웃  
**소요시간**: 3-4일  
**담당자**: Frontend/UI

### 🔧 Phase 2.1: MUI 테마 및 레이아웃 설계
**선행 작업**: Phase 1 완료

- [ ] **2.1.1** MUI 테마 커스터마이징
  ```typescript
  // theme/theme.ts
  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  })
  ```

- [ ] **2.1.2** 반응형 레이아웃 구조 설계
  - Desktop: Sidebar + Main Content
  - Mobile: Bottom Navigation + Drawer
  - 브레이크포인트별 동작 정의

### 🔧 Phase 2.2: Header 컴포넌트 구현
**병렬 처리 가능**: ✅ Sidebar와 병렬

- [ ] **2.2.1** AppBar 헤더 구현
  ```typescript
  // components/layout/Header.tsx
  - Logo 및 브랜딩
  - 사용자 프로필 메뉴
  - 모바일 햄버거 메뉴 버튼
  ```

- [ ] **2.2.2** 사용자 메뉴 드롭다운
  - 사용자 정보 표시
  - 로그아웃 기능
  - Lucide Icons 적용

### 🔧 Phase 2.3: Sidebar 네비게이션 구현
**병렬 처리 가능**: ✅ Header와 병렬

- [ ] **2.3.1** Drawer 기반 사이드바
  ```typescript
  // components/layout/Sidebar.tsx
  메뉴 항목:
  - 📊 Dashboard
  - 👥 사용자관리  
  - 📦 상품관리
  - 🛒 주문관리
  - 📈 통계
  - ⚙️ 설정
  ```

- [ ] **2.3.2** 네비게이션 상태 관리
  - 선택된 메뉴 하이라이트
  - 모바일에서 자동 닫기
  - Lucide Icons 매핑

- [ ] **2.3.3** 메뉴 클릭 핸들러
  - 메뉴 선택 시 상태 업데이트
  - 향후 AI 생성 트리거 준비

### 🔧 Phase 2.4: 메인 콘텐츠 영역 구현
**의존성**: Phase 2.2, 2.3 완료 후

- [ ] **2.4.1** 2-Panel 레이아웃 구성
  ```typescript
  <Grid container spacing={2}>
    <Grid item xs={12} md={8}>
      {/* 좌측: 생성된 화면 미리보기 */}
    </Grid>
    <Grid item xs={12} md={4}>  
      {/* 우측: 기능 설명 및 코드 복사 */}
    </Grid>
  </Grid>
  ```

- [ ] **2.4.2** 좌측 패널: 미리보기 영역
  - Card 기반 컨테이너
  - 로딩 상태 표시
  - 오류 처리 UI

- [ ] **2.4.3** 우측 패널: 설명 및 액션
  - 기능 설명 리스트
  - 코드 복사 버튼
  - 다운로드/공유 기능 (추후)

**🎯 Phase 2 완료 기준:**
- [ ] 반응형 Admin Layout 정상 작동
- [ ] 모든 메뉴 항목 네비게이션 확인  
- [ ] 모바일/데스크톱 UI 호환성 테스트

---

## 🤖 Phase 3: Claude API 연동 및 프롬프트 시스템
**목표**: AI 기반 MUI 코드 생성 시스템  
**소요시간**: 4-5일  
**담당자**: AI/Backend

### 🔧 Phase 3.1: Claude API 클라이언트 설정
**선행 작업**: Phase 2 완료

- [ ] **3.1.1** API 키 및 환경 설정
  ```typescript
  // .env
  VITE_CLAUDE_API_KEY=your-claude-api-key
  VITE_CLAUDE_API_BASE_URL=https://api.anthropic.com
  ```

- [ ] **3.1.2** Claude API 클라이언트 구현
  ```typescript
  // services/claude.ts
  class ClaudeApiClient {
    async generateMuiCode(menuType: string): Promise<GeneratedCode>
    async generateDescription(code: string): Promise<FeatureDescription>
  }
  ```

- [ ] **3.1.3** API 에러 처리 및 재시도 로직
  - Rate limiting 처리
  - 네트워크 오류 대응
  - 사용자 친화적 에러 메시지

### 🔧 Phase 3.2: 프롬프트 템플릿 시스템 구축
**병렬 처리 가능**: ✅ API 클라이언트와 병렬

- [ ] **3.2.1** 메뉴별 프롬프트 템플릿 정의
  ```typescript
  // utils/prompts.ts
  const MENU_PROMPTS = {
    'dashboard': '관리자 대시보드를 위한 MUI 컴포넌트 생성...',
    'users': '사용자 관리 페이지를 위한 DataGrid 컴포넌트...',
    'products': '상품 관리 CRUD 인터페이스...',
    // ... 기타 메뉴
  }
  ```

- [ ] **3.2.2** 동적 프롬프트 생성 시스템
  - 메뉴 컨텍스트에 따른 프롬프트 조합
  - MUI 컴포넌트 라이브러리 참조
  - 한국어 UI 텍스트 지원

- [ ] **3.2.3** 코드 품질 검증 프롬프트
  - 생성된 코드의 구문 검증
  - MUI 베스트 프랙티스 적용
  - TypeScript 타입 안정성

### 🔧 Phase 3.3: 코드 생성 서비스 구현
**의존성**: Phase 3.1, 3.2 완료 후

- [ ] **3.3.1** 메뉴 선택 핸들러 구현
  ```typescript
  // hooks/useWireframeGeneration.ts
  const handleMenuSelect = async (menuType: MenuType) => {
    setLoading(true)
    try {
      const code = await claudeApi.generateMuiCode(menuType)
      const description = await claudeApi.generateDescription(code)
      updateState({ code, description })
    } catch (error) {
      handleError(error)
    } finally {
      setLoading(false)
    }
  }
  ```

- [ ] **3.3.2** 생성된 코드 파싱 및 검증
  - JSX 구문 검증
  - import 문 정리
  - MUI 컴포넌트 유효성 검사

- [ ] **3.3.3** 상태 관리 시스템 연동
  - Zustand 스토어에 생성 결과 저장
  - 로딩 상태 및 에러 상태 관리
  - 캐시 및 히스토리 기능

**🎯 Phase 3 완료 기준:**
- [ ] 메뉴 선택 시 Claude API 호출 성공
- [ ] 유효한 MUI 코드 생성 확인
- [ ] 에러 처리 및 사용자 피드백 정상 작동

---

## 🖥️ Phase 4: 실시간 렌더링 및 코드 표시 시스템
**목표**: 생성된 MUI 코드의 실시간 미리보기  
**소요시간**: 3-4일  
**담당자**: Frontend/Full-Stack

### 🔧 Phase 4.1: 동적 컴포넌트 렌더링 시스템
**선행 작업**: Phase 3 완료

- [ ] **4.1.1** JSX 코드 동적 실행 환경 구축
  ```typescript
  // components/preview/CodeRenderer.tsx
  const CodeRenderer = ({ generatedCode }: { generatedCode: string }) => {
    const RenderedComponent = useMemo(() => {
      return new Function('React', 'MUI', 'Icons', `
        return ${generatedCode}
      `)(React, MUI, Icons)
    }, [generatedCode])
    
    return <RenderedComponent />
  }
  ```

- [ ] **4.1.2** 안전한 코드 실행 환경
  - 샌드박스 환경 설정
  - 보안 검증 (XSS 방지)
  - 런타임 에러 캐치

- [ ] **4.1.3** MUI 컴포넌트 의존성 관리
  - 필요한 MUI 컴포넌트 동적 import
  - Lucide Icons 매핑
  - 테마 컨텍스트 제공

### 🔧 Phase 4.2: 좌측 패널 미리보기 구현
**병렬 처리 가능**: ✅ 우측 패널과 병렬

- [ ] **4.2.1** 미리보기 컨테이너 구현
  ```typescript
  // components/preview/PreviewPanel.tsx
  <Card sx={{ minHeight: '600px', p: 2 }}>
    <CardHeader title="생성된 화면 미리보기" />
    <CardContent>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {code && <CodeRenderer generatedCode={code} />}
    </CardContent>
  </Card>
  ```

- [ ] **4.2.2** 반응형 미리보기 프레임
  - 스케일링 및 줌 기능
  - 모바일/데스크톱 미리보기 토글
  - 전체화면 모드

- [ ] **4.2.3** 렌더링 최적화
  - 메모이제이션으로 불필요한 재렌더링 방지
  - 로딩 상태 최적화
  - 에러 바운더리 설정

### 🔧 Phase 4.3: 우측 패널 설명 및 액션 구현
**병렬 처리 가능**: ✅ 좌측 패널과 병렬

- [ ] **4.3.1** 기능 설명 리스트 구현
  ```typescript
  // components/description/DescriptionPanel.tsx
  <List>
    {features.map((feature, index) => (
      <ListItem key={index}>
        <ListItemIcon>
          <Chip label={index + 1} size="small" />
        </ListItemIcon>
        <ListItemText 
          primary={feature.title}
          secondary={feature.description}
        />
      </ListItem>
    ))}
  </List>
  ```

- [ ] **4.3.2** 코드 복사 기능 구현
  - 클립보드 API 활용
  - 복사 성공 알림
  - 포맷팅된 코드 복사

- [ ] **4.3.3** 추가 액션 버튼들
  ```typescript
  <Stack direction="row" spacing={1}>
    <Button startIcon={<Copy />} onClick={handleCopyCode}>
      코드 복사
    </Button>
    <Button startIcon={<Download />} onClick={handleDownload}>
      파일 다운로드
    </Button>
  </Stack>
  ```

### 🔧 Phase 4.4: 상태 동기화 및 UX 개선
**의존성**: Phase 4.1, 4.2, 4.3 완료 후

- [ ] **4.4.1** 패널 간 상태 동기화
  - 생성 완료 시 양쪽 패널 동시 업데이트
  - 스크롤 위치 동기화
  - 선택된 요소 하이라이트

- [ ] **4.4.2** 로딩 및 에러 UX 개선
  - 스켈레톤 로더 적용
  - 단계별 진행 표시기
  - 상세한 에러 메시지

- [ ] **4.4.3** 접근성 및 사용성 개선
  - 키보드 내비게이션
  - Screen reader 지원
  - 툴팁 및 도움말

**🎯 Phase 4 완료 기준:**
- [ ] 생성된 MUI 코드가 좌측 패널에 정상 렌더링
- [ ] 기능 설명이 우측 패널에 번호와 함께 표시
- [ ] 코드 복사 기능 정상 작동
- [ ] 에러 상황에서도 안정적인 UX 제공

---

## 🚀 Phase 5: 배포 설정 및 최적화
**목표**: GitHub Pages 자동 배포 및 성능 최적화  
**소요시간**: 2-3일  
**담당자**: DevOps/Performance

### 🔧 Phase 5.1: Vite 빌드 설정 최적화
**선행 작업**: Phase 4 완료

- [ ] **5.1.1** GitHub Pages용 Vite 설정
  ```typescript
  // vite.config.ts
  export default defineConfig({
    base: '/mas9-wireframe/',
    build: {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            mui: ['@mui/material', '@mui/icons-material'],
          }
        }
      }
    }
  })
  ```

- [ ] **5.1.2** 환경별 설정 파일
  - .env.production 설정
  - API 엔드포인트 환경변수
  - 빌드 최적화 플래그

### 🔧 Phase 5.2: GitHub Actions 워크플로우 구축
**병렬 처리 가능**: ✅ 빌드 설정과 병렬

- [ ] **5.2.1** 자동 빌드 워크플로우
  ```yaml
  # .github/workflows/deploy.yml
  name: Deploy to GitHub Pages
  on:
    push:
      branches: [ main ]
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: pnpm/action-setup@v2
        - name: Install dependencies
          run: pnpm install
        - name: Build
          run: pnpm build:fr
        - name: Deploy
          uses: peaceiris/actions-gh-pages@v3
  ```

- [ ] **5.2.2** GitHub Secrets 설정
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_ANON_KEY  
  - VITE_CLAUDE_API_KEY
  - GH_PAGES_DEPLOY_TOKEN

- [ ] **5.2.3** 배포 후 검증 스크립트
  - 배포된 사이트 헬스체크
  - API 연결 테스트
  - 기본 기능 동작 확인

### 🔧 Phase 5.3: 성능 최적화 및 SEO
**병렬 처리 가능**: ✅ 배포 설정과 병렬

- [ ] **5.3.1** 번들 크기 최적화
  - Tree shaking 설정
  - Dynamic import 적용
  - 불필요한 의존성 제거

- [ ] **5.3.2** 런타임 성능 최적화
  - React.memo 적용
  - 이미지 lazy loading
  - 코드 스플리팅

- [ ] **5.3.3** PWA 및 오프라인 대응
  - Service Worker 등록
  - Cache 전략 수립
  - 오프라인 UI 안내

### 🔧 Phase 5.4: 모니터링 및 분석 설정
**의존성**: Phase 5.1, 5.2, 5.3 완료 후

- [ ] **5.4.1** 에러 추적 시스템
  - Sentry 또는 LogRocket 연동
  - 클라이언트 에러 모니터링
  - API 요청 실패 추적

- [ ] **5.4.2** 사용량 분석
  - Google Analytics 설정
  - 사용자 플로우 추적
  - AI 생성 요청 통계

- [ ] **5.4.3** 성능 모니터링
  - Core Web Vitals 측정
  - API 응답 시간 모니터링
  - 사용자 경험 지표 수집

**🎯 Phase 5 완료 기준:**
- [ ] GitHub Pages 자동 배포 성공
- [ ] 프로덕션 환경에서 모든 기능 정상 작동
- [ ] 성능 지표 목표 달성 (FCP < 2s, LCP < 3s)
- [ ] 에러 모니터링 정상 작동

---

## ⚡ 병렬 처리 가능한 작업 스트림

### 🔄 Stream A: 인프라 & 설정
- Phase 0.1: Turborepo 설정
- Phase 0.2: 공통 패키지
- Phase 1.1: Supabase 설정
- Phase 5.1: 빌드 설정

### 🔄 Stream B: 인증 & 보안
- Phase 1.2: 인증 서비스
- Phase 1.3: 로그인 UI
- Phase 5.2: 배포 보안

### 🔄 Stream C: UI & 레이아웃  
- Phase 2.1: 테마 설계
- Phase 2.2: Header 구현
- Phase 2.3: Sidebar 구현
- Phase 4.2: 미리보기 패널

### 🔄 Stream D: AI & 코드 생성
- Phase 3.1: Claude API
- Phase 3.2: 프롬프트 시스템
- Phase 4.1: 렌더링 시스템
- Phase 4.3: 설명 패널

## 🎯 마일스톤 및 검증 지점

### 🚩 Milestone 1: 기반 구조 완성 (Week 1)
- Turborepo 모노레포 정상 작동
- 기본 패키지 구조 및 의존성 해결
- Supabase 인증 시스템 동작

### 🚩 Milestone 2: Admin UI 완성 (Week 2-3)  
- 관리자 로그인 플로우 완성
- 반응형 Admin Layout 구축
- 메뉴 네비게이션 시스템 완성

### 🚩 Milestone 3: AI 연동 완성 (Week 3-4)
- Claude API 연동 및 코드 생성
- 메뉴별 프롬프트 템플릿 완성
- 에러 처리 및 재시도 로직 구현

### 🚩 Milestone 4: 실시간 렌더링 완성 (Week 4-5)
- 생성된 코드 실시간 미리보기
- 기능 설명 및 코드 복사 기능
- UX/UI 최적화 완료

### 🚩 Milestone 5: 프로덕션 배포 (Week 5-6)
- GitHub Pages 자동 배포
- 성능 최적화 및 모니터링
- 사용자 테스트 및 버그 수정

## ⚠️ 리스크 및 대응 방안

### 🔴 높은 리스크
- **Claude API 제한**: Rate limiting 대응 및 프롬프트 최적화
- **동적 코드 실행 보안**: 샌드박스 환경 및 코드 검증 강화
- **GitHub Pages 제한**: 정적 사이트 제약 사항 사전 검토

### 🟡 중간 리스크  
- **MUI 버전 호환성**: 최신 버전 고정 및 호환성 테스트
- **Turborepo 빌드 복잡성**: 단계별 빌드 검증 및 캐시 최적화

### 🟢 낮은 리스크
- **UI/UX 개선**: 지속적 개선 및 사용자 피드백 반영
- **성능 최적화**: 점진적 개선 및 모니터링

---

## 📊 예상 소요 시간 및 리소스

| Phase | 작업 내용 | 소요 시간 | 주요 스킬 |
|-------|-----------|-----------|-----------|
| **Phase 0** | 프로젝트 설정 | 1-2일 | DevOps, TypeScript |
| **Phase 1** | 인증 시스템 | 2-3일 | React, Supabase |  
| **Phase 2** | Admin Layout | 3-4일 | React, MUI |
| **Phase 3** | Claude API | 4-5일 | AI, API 연동 |
| **Phase 4** | 실시간 렌더링 | 3-4일 | React, JavaScript |
| **Phase 5** | 배포 최적화 | 2-3일 | DevOps, 성능 |
| **총 소요 시간** | **전체** | **15-21일** | **Full-Stack** |

## ✅ 다음 단계: 구현 시작

이 워크플로우를 바탕으로 **Phase 0**부터 체계적으로 구현을 시작하세요. 각 Phase의 완료 기준을 충족한 후 다음 단계로 진행하며, 병렬 처리 가능한 작업들을 활용하여 개발 속도를 최적화하세요.

**🚀 첫 번째 실행 명령어:**
```bash
# Phase 0.1 시작
pnpm init
pnpm add -w turbo @turbo/gen typescript @types/node
```

---

*이 워크플로우는 AI 화면설계서 생성 도구의 MVP 완성을 목표로 하며, 각 단계별로 검증과 최적화를 거쳐 안정적인 프로덕션 서비스 구축을 지향합니다.*