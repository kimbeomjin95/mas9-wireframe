# MAS9 Wireframe

MUI 기반 화면설계서를 실시간으로 생성하는 AI 도구입니다.

## 🚀 주요 기능

- **AI 화면 생성**: Claude API를 활용한 React 컴포넌트 자동 생성
- **실시간 코드 편집**: 생성된 코드의 실시간 미리보기 및 편집
- **템플릿 관리**: 생성한 화면의 저장 및 재사용
- **이력 관리**: 모든 생성 기록 추적 및 관리
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **데모 모드**: API 키 없이도 테스트 가능

## 🛠 기술 스택

### Frontend
- **React 18** - 모던 React 기반 UI
- **TypeScript 5.x** - 타입 안전성
- **Material-UI (MUI)** - 디자인 시스템
- **Vite** - 빠른 빌드 도구
- **Zustand** - 경량 상태 관리
- **React Router v6** - 클라이언트 사이드 라우팅

### Backend & Services
- **Claude API** - AI 코드 생성
- **Supabase** - 인증 시스템
- **Local Storage** - 클라이언트 사이드 저장

### Infrastructure
- **Turborepo** - 모노레포 관리
- **pnpm** - 패키지 관리자
- **GitHub Actions** - CI/CD
- **GitHub Pages** - 배포

## 📁 프로젝트 구조

```
mas9-wireframe/
├── apps/
│   └── fr/                     # 메인 애플리케이션
│       ├── src/
│       │   ├── components/      # UI 컴포넌트
│       │   ├── pages/          # 페이지 컴포넌트
│       │   ├── services/       # 비즈니스 로직
│       │   ├── hooks/          # 커스텀 훅
│       │   └── store/          # 상태 관리
│       └── public/             # 정적 파일
├── packages/
│   ├── shared-types/           # 공유 타입 정의
│   ├── shared-utils/           # 공유 유틸리티
│   ├── shared-ui/              # 공유 UI 컴포넌트
│   ├── eslint-config/          # ESLint 설정
│   └── typescript-config/      # TypeScript 설정
└── .github/workflows/          # GitHub Actions
```

## 🚀 시작하기

### 사전 요구사항

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작 (fr 앱)
pnpm dev --filter=fr

# 또는 환경별 실행
pnpm start:home     # Home 환경
pnpm start:stg      # Staging 환경
pnpm start:prod     # Production 환경
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build --filter=fr

# 모든 패키지 빌드
pnpm build
```

## 🔧 환경 설정

`apps/fr/.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```env
# Application
VITE_APP_TITLE="MAS9 Wireframe"
VITE_APP_DESCRIPTION="MUI 기반 화면설계서 실시간 생성 도구"

# Demo Mode (API 키 없이 테스트)
VITE_DEMO_MODE="true"

# Claude API (선택사항)
VITE_CLAUDE_API_KEY="your-claude-api-key"
VITE_CLAUDE_API_URL="https://api.anthropic.com/v1/messages"

# Supabase (선택사항)
VITE_SUPABASE_URL="your-supabase-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## 💡 사용법

### 1. 로그인
- **데모 모드**: `admin@demo.com` / `123456`
- **실제 환경**: Supabase 인증 사용

### 2. AI 화면 생성
1. 사이드바에서 "AI 화면설계" 선택
2. 원하는 화면 설명 입력
3. 컴포넌트 타입 선택 (페이지, 컴포넌트, 폼 등)
4. 고급 옵션 설정 (스타일링, 인터랙션 포함 여부)
5. "화면 생성하기" 버튼 클릭

### 3. 코드 관리
- **미리보기**: 생성된 코드를 새 탭에서 확인
- **다운로드**: TypeScript 파일로 저장
- **재사용**: 이전 생성 이력을 기반으로 새로운 컴포넌트 생성

## 🏗 개발 명령어

```bash
# 린팅
pnpm lint

# 코드 포맷팅
pnpm format

# 타입 체크
pnpm type-check

# 특정 앱만 실행
pnpm dev --filter=fr

# Docker (선택사항)
pnpm docker:build
pnpm docker:push
```

## 📦 배포

### GitHub Pages 자동 배포

1. GitHub 저장소의 Settings > Pages 설정
2. Source를 "GitHub Actions"로 선택
3. `main` 브랜치에 푸시하면 자동 배포

### 수동 배포

```bash
# 프로덕션 빌드
pnpm build --filter=fr

# dist 폴더를 웹 서버에 업로드
```

## 🔍 주요 컴포넌트

### WireframeRequestForm
AI 화면 생성 요청을 위한 폼 컴포넌트
- 화면 설명 입력
- 컴포넌트 타입 선택
- 고급 옵션 설정

### CodeDisplay
생성된 코드를 표시하고 관리하는 컴포넌트
- 구문 강조 표시
- 코드 복사/다운로드
- 미리보기 기능

### HistoryPanel
생성 이력을 관리하는 컴포넌트
- 이력 목록 표시
- 재사용 기능
- 이력 삭제 관리

### AdminLayout
관리자 페이지의 공통 레이아웃
- 헤더 및 사이드바
- 반응형 네비게이션
- 사용자 정보 표시

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing-feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🔗 링크

- [Live Demo](https://kimbeomjin95.github.io/mas9-wireframe/)
- [GitHub Repository](https://github.com/kimbeomjin95/mas9-wireframe)
- [Issue Tracker](https://github.com/kimbeomjin95/mas9-wireframe/issues)

## 📞 지원

질문이나 문제가 있다면 [GitHub Issues](https://github.com/kimbeomjin95/mas9-wireframe/issues)를 통해 문의해 주세요.

---

🎉 **현재 상태**: Public 저장소로 GitHub Pages 배포 완료!