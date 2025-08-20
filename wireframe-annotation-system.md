# 화면설계서 주석 시스템 설계문서

## 📋 개요

화면설계서에서 UI 요소들에 번호 라벨을 추가하고, 해당 번호를 클릭하면 상세 설명이 포함된 Drawer가 열리는 인터랙티브 주석 시스템입니다.

## 🎯 핵심 기능

### 1. 번호 라벨 시스템
- UI 요소에 순차적 번호 Badge 표시
- 클릭 가능한 인터랙티브 라벨
- 시각적으로 눈에 띄는 디자인

### 2. 상세 설명 Drawer
- 번호 클릭 시 우측에서 슬라이드 오픈
- 각 번호별 상세 설명 표시
- 스크롤 가능한 리스트 구조

### 3. 스크롤 연동
- 번호 클릭 시 해당 UI 요소로 자동 스크롤
- 부드러운 애니메이션 효과
- 현재 보고 있는 요소 하이라이트

## 🏗️ 시스템 아키텍처

```
┌─────────────────────────────────────┐
│           Main Content              │
│  ┌─────────────────────────────┐   │
│  │   UI Component with Badge   │   │
│  │        ①  ②  ③  ④         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
                                      │
                              ┌───────────────┐
                              │    Drawer     │
                              │               │
                              │ ① Description │
                              │ ② Description │
                              │ ③ Description │
                              │ ④ Description │
                              └───────────────┘
```

## 🔧 기술 스택

- **React 18** - 컴포넌트 기반 UI
- **TypeScript** - 타입 안전성
- **Material-UI** - Badge, Drawer, 애니메이션
- **Custom Hooks** - 상태 관리 및 로직 분리
- **Intersection Observer** - 스크롤 감지
- **Smooth Scroll API** - 부드러운 스크롤

## 📚 Hook 설계

### 1. useWireframeAnnotation
```typescript
interface AnnotationItem {
  id: string;
  number: number;
  title: string;
  description: string;
  elementRef: RefObject<HTMLElement>;
}

const useWireframeAnnotation = () => {
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<number | null>(null);
  
  const addAnnotation = (item: AnnotationItem) => void;
  const removeAnnotation = (id: string) => void;
  const scrollToAnnotation = (number: number) => void;
  const handleBadgeClick = (number: number) => void;
  
  return {
    annotations,
    drawerOpen,
    selectedAnnotation,
    addAnnotation,
    removeAnnotation,
    scrollToAnnotation,
    handleBadgeClick,
    setDrawerOpen
  };
};
```

### 2. useScrollHighlight
```typescript
const useScrollHighlight = (annotations: AnnotationItem[]) => {
  const [visibleAnnotations, setVisibleAnnotations] = useState<number[]>([]);
  
  // Intersection Observer로 화면에 보이는 요소 감지
  // 현재 보고 있는 번호 하이라이트
  
  return {
    visibleAnnotations,
    highlightedAnnotation: number | null
  };
};
```

### 3. useAnnotationPersistence
```typescript
const useAnnotationPersistence = () => {
  const saveAnnotations = (annotations: AnnotationItem[]) => void;
  const loadAnnotations = () => AnnotationItem[];
  const exportToPDF = () => void;
  const exportToImage = () => void;
  
  return {
    saveAnnotations,
    loadAnnotations,
    exportToPDF,
    exportToImage
  };
};
```

## 🎨 컴포넌트 구조

### 1. AnnotationBadge
```typescript
interface AnnotationBadgeProps {
  number: number;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  onClick: (number: number) => void;
  isHighlighted?: boolean;
}

const AnnotationBadge: React.FC<AnnotationBadgeProps> = ({
  number,
  position,
  onClick,
  isHighlighted
}) => {
  return (
    <Badge
      badgeContent={number}
      color={isHighlighted ? "primary" : "secondary"}
      sx={{
        position: 'absolute',
        [position]: 8,
        cursor: 'pointer',
        '& .MuiBadge-badge': {
          fontSize: '0.75rem',
          minWidth: 20,
          height: 20,
          borderRadius: '50%',
          animation: isHighlighted ? 'pulse 1s infinite' : 'none'
        }
      }}
      onClick={() => onClick(number)}
    />
  );
};
```

### 2. AnnotationDrawer
```typescript
interface AnnotationDrawerProps {
  open: boolean;
  annotations: AnnotationItem[];
  selectedAnnotation: number | null;
  onClose: () => void;
  onAnnotationClick: (number: number) => void;
}

const AnnotationDrawer: React.FC<AnnotationDrawerProps> = ({
  open,
  annotations,
  selectedAnnotation,
  onClose,
  onAnnotationClick
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ width: 400 }}
    >
      <Box sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          화면설계서 주석
        </Typography>
        <List>
          {annotations.map((annotation) => (
            <AnnotationListItem
              key={annotation.id}
              annotation={annotation}
              isSelected={selectedAnnotation === annotation.number}
              onClick={onAnnotationClick}
            />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
```

### 3. AnnotationListItem
```typescript
interface AnnotationListItemProps {
  annotation: AnnotationItem;
  isSelected: boolean;
  onClick: (number: number) => void;
}

const AnnotationListItem: React.FC<AnnotationListItemProps> = ({
  annotation,
  isSelected,
  onClick
}) => {
  return (
    <ListItem
      button
      selected={isSelected}
      onClick={() => onClick(annotation.number)}
      sx={{
        mb: 1,
        borderRadius: 1,
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.main' : 'divider'
      }}
    >
      <ListItemIcon>
        <Chip label={annotation.number} size="small" color="primary" />
      </ListItemIcon>
      <ListItemText
        primary={annotation.title}
        secondary={annotation.description}
        secondaryTypographyProps={{
          noWrap: false,
          sx: { whiteSpace: 'pre-wrap' }
        }}
      />
    </ListItem>
  );
};
```

### 4. AnnotatedContainer
```typescript
interface AnnotatedContainerProps {
  children: React.ReactNode;
  annotationNumber?: number;
  annotationTitle?: string;
  annotationDescription?: string;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const AnnotatedContainer: React.FC<AnnotatedContainerProps> = ({
  children,
  annotationNumber,
  annotationTitle,
  annotationDescription,
  badgePosition = 'top-right'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { handleBadgeClick, addAnnotation } = useWireframeAnnotation();
  
  useEffect(() => {
    if (annotationNumber && annotationTitle && annotationDescription) {
      addAnnotation({
        id: `annotation-${annotationNumber}`,
        number: annotationNumber,
        title: annotationTitle,
        description: annotationDescription,
        elementRef: containerRef
      });
    }
  }, [annotationNumber, annotationTitle, annotationDescription]);
  
  return (
    <Box
      ref={containerRef}
      sx={{ position: 'relative', display: 'inline-block' }}
      data-annotation={annotationNumber}
    >
      {children}
      {annotationNumber && (
        <AnnotationBadge
          number={annotationNumber}
          position={badgePosition}
          onClick={handleBadgeClick}
        />
      )}
    </Box>
  );
};
```

## 🎬 사용 예시

```typescript
const WireframeWithAnnotations: React.FC = () => {
  const {
    annotations,
    drawerOpen,
    selectedAnnotation,
    setDrawerOpen,
    handleBadgeClick
  } = useWireframeAnnotation();
  
  return (
    <Box>
      {/* 메인 화면설계서 콘텐츠 */}
      <Box sx={{ p: 3 }}>
        <AnnotatedContainer
          annotationNumber={1}
          annotationTitle="헤더 영역"
          annotationDescription="사용자 정보와 메뉴가 표시되는 상단 헤더입니다."
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">MAS9 Wireframe</Typography>
            </Toolbar>
          </AppBar>
        </AnnotatedContainer>
        
        <AnnotatedContainer
          annotationNumber={2}
          annotationTitle="네비게이션 메뉴"
          annotationDescription="3-depth 구조의 사이드바 메뉴입니다."
          badgePosition="top-left"
        >
          <Paper sx={{ width: 280, height: 400 }}>
            <List>
              <ListItem>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Accounts" />
              </ListItem>
            </List>
          </Paper>
        </AnnotatedContainer>
      </Box>
      
      {/* 주석 Drawer */}
      <AnnotationDrawer
        open={drawerOpen}
        annotations={annotations}
        selectedAnnotation={selectedAnnotation}
        onClose={() => setDrawerOpen(false)}
        onAnnotationClick={handleBadgeClick}
      />
    </Box>
  );
};
```

## 🎯 구현 우선순위

### Phase 1: 기본 기능
1. AnnotationBadge 컴포넌트 구현
2. useWireframeAnnotation Hook 구현
3. 기본 Drawer 열기/닫기 기능

### Phase 2: 고급 기능
1. 스크롤 연동 (scrollToAnnotation)
2. AnnotationDrawer 완전 구현
3. useScrollHighlight Hook 구현

### Phase 3: 확장 기능
1. 주석 편집 기능
2. 내보내기 기능 (PDF/이미지)
3. 키보드 네비게이션
4. 검색 기능

## 🎨 디자인 고려사항

### 1. Badge 디자인
- 크기: 20px x 20px
- 색상: Primary (선택됨), Secondary (기본)
- 애니메이션: 선택 시 pulse 효과
- 위치: 요소 모서리 (8px 오프셋)

### 2. Drawer 디자인
- 너비: 400px
- 위치: 우측에서 슬라이드
- 배경: 반투명 오버레이
- 스크롤: 내용이 많을 때 세로 스크롤

### 3. 하이라이트 효과
- 선택된 요소: 2px primary border
- 호버 효과: 약간의 그림자 추가
- 애니메이션: 0.3초 ease transition

## 🧪 테스트 전략

### 1. 단위 테스트
- Hook 로직 테스트
- 컴포넌트 렌더링 테스트
- 이벤트 핸들러 테스트

### 2. 통합 테스트
- Drawer 열기/닫기 플로우
- 스크롤 연동 동작
- 번호 클릭 → 상세보기 플로우

### 3. E2E 테스트
- 전체 주석 시스템 워크플로우
- 다양한 화면 크기에서 동작 확인
- 성능 테스트 (많은 주석이 있을 때)

## 📈 확장 가능성

1. **다중 페이지 지원**: 여러 화면설계서 관리
2. **협업 기능**: 실시간 주석 공유
3. **버전 관리**: 주석 히스토리 추적
4. **템플릿 시스템**: 재사용 가능한 주석 템플릿
5. **AI 연동**: 자동 주석 생성 제안

## 🌟 서비스 특화 설계 추가 사항

### 1. MAS9 서비스 구조 반영
```typescript
interface ServiceAnnotationConfig {
  // 실제 서비스 페이지별 주석 설정
  servicePage: 'home' | 'accounts' | 'class' | 'payments' | 'reports' | 'settings';
  serviceFeature: string; // 각 페이지의 세부 기능
  businessContext: string; // 비즈니스 맥락 설명
  userRole: 'admin' | 'teacher' | 'student' | 'parent'; // 사용자 역할별 설명
}

const useServiceAnnotation = (config: ServiceAnnotationConfig) => {
  // 서비스별 맞춤 주석 로직
  const getContextualDescription = (feature: string, userRole: string) => {
    // 실제 서비스 기능에 맞는 설명 생성
  };
};
```

### 2. 비즈니스 도메인 특화 기능
- **사용자 역할별 설명**: 관리자/강사/학생/학부모 관점에서 다른 설명 제공
- **워크플로우 설명**: 실제 업무 프로세스 단계별 안내
- **데이터 연동 설명**: API 호출, 데이터 흐름 설명
- **권한 체계 설명**: 각 기능별 접근 권한 안내

### 3. 개발자 도구 통합
```typescript
interface DevAnnotationFeatures {
  // 개발 관련 메타 정보
  componentPath: string; // 실제 컴포넌트 파일 경로
  apiEndpoint?: string; // 연결된 API 엔드포인트
  relatedComponents: string[]; // 연관 컴포넌트들
  dataFlow: string; // 데이터 흐름 설명
  businessLogic: string; // 비즈니스 로직 설명
}

const useDevAnnotation = () => {
  const generateDevDoc = () => {
    // 자동 개발 문서 생성
  };
  
  const exportToConfluence = () => {
    // Confluence 등 문서 도구 연동
  };
};
```

### 4. 사용자 가이드 생성 기능
```typescript
interface UserGuideGenerator {
  generateStepByStep: () => string[]; // 단계별 사용 가이드
  generateVideoScript: () => string; // 동영상 스크립트
  generateFAQ: () => {question: string, answer: string}[]; // FAQ 자동 생성
  generateTooltips: () => {element: string, tooltip: string}[]; // 툴팁 생성
}
```

### 5. 접근성 및 국제화
```typescript
interface A11yAnnotation {
  ariaLabel: string; // 스크린 리더용 설명
  keyboardShortcut?: string; // 키보드 단축키
  colorBlindFriendly: boolean; // 색맹 친화적 표시
  screenReaderScript: string; // 스크린 리더 스크립트
}

interface I18nAnnotation {
  ko: string; // 한국어 설명
  en: string; // 영어 설명
  ja?: string; // 일본어 설명 (선택)
}
```

### 6. 품질 관리 시스템
```typescript
interface QualityAssurance {
  reviewStatus: 'draft' | 'review' | 'approved' | 'published';
  reviewer: string; // 검토자
  lastUpdated: Date; // 마지막 업데이트
  version: string; // 버전 관리
  changeLog: string[]; // 변경 이력
  
  // 품질 지표
  completeness: number; // 완성도 (0-100%)
  accuracy: number; // 정확도
  usefulness: number; // 유용성 평가
}
```

### 7. 데이터 분석 및 개선
```typescript
interface AnnotationAnalytics {
  viewCount: number; // 조회수
  clickCount: number; // 클릭수
  averageReadTime: number; // 평균 읽기 시간
  userFeedback: {rating: number, comment: string}[]; // 사용자 피드백
  
  // 개선 제안
  suggestedImprovements: string[];
  relatedQuestions: string[]; // 관련 질문들
}

const useAnnotationImprovement = () => {
  const analyzeUsage = () => {
    // 사용 패턴 분석
  };
  
  const suggestUpdates = () => {
    // 업데이트 제안
  };
};
```

### 8. 협업 및 리뷰 시스템
```typescript
interface CollaborationFeatures {
  // 댓글 시스템
  addComment: (annotationId: string, comment: string) => void;
  replyToComment: (commentId: string, reply: string) => void;
  
  // 제안 시스템
  suggestEdit: (annotationId: string, newContent: string) => void;
  approveEdit: (suggestionId: string) => void;
  
  // 토론 기능
  startDiscussion: (topic: string) => void;
  joinDiscussion: (discussionId: string) => void;
}
```

### 9. 자동화 및 AI 기능
```typescript
interface AutomationFeatures {
  // AI 기반 설명 생성
  generateDescription: (element: HTMLElement) => Promise<string>;
  
  // 번역 자동화
  autoTranslate: (text: string, targetLang: string) => Promise<string>;
  
  // 일관성 검사
  checkConsistency: (annotations: AnnotationItem[]) => QualityIssue[];
  
  // 자동 업데이트 감지
  detectUIChanges: () => ChangedElement[];
  suggestAnnotationUpdates: (changes: ChangedElement[]) => AnnotationUpdate[];
}
```

### 10. 통합 및 내보내기 확장
```typescript
interface AdvancedExport {
  // 다양한 형식 지원
  exportToFigma: () => void; // Figma 플러그인 연동
  exportToZeplin: () => void; // Zeplin 연동
  exportToStorybook: () => void; // Storybook 문서 생성
  
  // 개발 도구 연동
  generateJSDoc: () => string; // JSDoc 주석 생성
  generateAPIDoc: () => OpenAPISpec; // API 문서 생성
  generateTestCases: () => TestCase[]; // 테스트 케이스 생성
}
```

## 🎯 MAS9 서비스 특화 구현 가이드

### 단계 1: 서비스 맥락 반영
1. 실제 MAS9 페이지들 (Home, Accounts, Class 등)의 UI 복제
2. 각 페이지별 실제 업무 프로세스 기반 주석 작성
3. 사용자 역할별 (관리자/강사/학생) 다른 관점의 설명 제공

### 단계 2: 협업 도구 연동
1. 기획자/디자이너/개발자 간 주석 공유 시스템
2. 리뷰 및 승인 워크플로우 구축
3. 버전 관리 및 변경 이력 추적

### 단계 3: 품질 관리 시스템
1. 주석 완성도 및 정확도 측정
2. 사용자 피드백 수집 및 반영
3. 지속적 개선 프로세스 구축

### 단계 4: 자동화 및 효율성 개선
1. AI 기반 초안 생성 기능
2. 일관성 검사 및 자동 수정 제안
3. 다국어 번역 자동화

이 설계를 바탕으로 단계적으로 구현하면 직관적이고 사용자 친화적인 화면설계서 주석 시스템을 만들 수 있습니다.