# 승급 평가 시스템 기능 명세서

## 1. 개요

**프로젝트명**: MAS9 승급 평가 시스템
**버전**: 1.0
**작성일**: 2025-09-23
**목적**: 태권도 도장의 승급 평가를 위한 디지털 시스템

## 2. 평가 방식

### 2.1 평가 진입점 및 방식

#### 2.1.1 평가 진입점

- **Action 버튼을 통한 진입**: 메인 화면의 Action 메뉴에서 "승급 평가" 선택
- **개별 평가만 지원**: 모든 점수 입력이 필수이므로 개별 저장 방식만 가능

#### 2.1.2 평가 프로세스

- **개념**: 한 명씩 순차적으로 평가를 완료하는 방식
- **워크플로우**:
  1. Action → "승급 평가" 클릭 → 평가 모달 열기
  2. 학생 선택 → 모든 점수 입력 → 종합평가 작성 (선택사항)
  3. Save 버튼 클릭 → 이미지 생성 및 S3 업로드 → API 저장
  4. 다음 학생으로 이동하여 반복
- **제약사항**: 모든 점수(10개 항목)가 0보다 큰 값으로 입력되어야 저장 가능
- **장점**: 평가 완료 즉시 결과 확인 가능, 데이터 무결성 보장

## 3. 주요 기능

### 3.1 평가 모달 시스템

#### 2.1.1 학생 선택 및 네비게이션

- **좌측 사이드바**: 평가 대상 학생 목록 표시
- **학생 카드**: 이름, 현재/승급 급수, 평가 상태 표시
- **상태 아이콘**:
  - 🔴 미평가 (pending)
  - 🟡 진행중 (in_progress)
  - 🟢 완료 (saved)

#### 2.1.2 평가 섹션 구성

##### DESLINE HOMEWORK (주황색 #f59e0b)

- **항목**: 가정평가 (종합)
- **설명**: 존중, 집안일, 숙제, 기타를 종합적으로 평가
- **점수 범위**: 0-10점

##### ATTENDANCE (빨간색 #dc2626)

- **항목**: 근면성실
- **실제 출석 정보**: 출석 횟수 표시
- **점수 범위**: 0-10점

##### DESLINE (보라색 #8b5cf6)

- **항목**: 감사노트, 리더십
- **특징**: 점수 바 색상이 보라색으로 표시
- **점수 범위**: 각각 0-10점

##### PHYSICAL TEST (초록색 #10b981)

- **항목**: 스쿼트, 점핑잭
- **점수 범위**: 각각 0-10점

##### REQUIREMENT (파란색 #3b82f6)

- **항목**: 품새, 겨루기, 발차기, 격파
- **점수 범위**: 각각 0-10점

### 2.2 점수 입력 시스템

#### 2.2.1 점수 슬라이더

- **범위**: 0-10점 (1점 단위)
- **시각적 표시**:
  - 점수별 색상 변화 (빨강→주황→노랑→초록)
  - 실시간 점수 표시
  - 그라데이션 진행 바

#### 2.2.2 실시간 업데이트

- 점수 변경 시 즉시 우측 결과 패널 업데이트
- 총점, 등급, 합격/불합격 실시간 계산
- 버튼 활성화 상태 즉시 반영

### 2.3 종합 평가 입력

#### 2.3.1 종합 코멘트

- **위치**: 하단 별도 섹션
- **형식**: 자유 텍스트 (최대 50자)
- **필수 여부**: 선택사항 (옵셔널)
- **플레이스홀더**: "{학생명} 학생에 대한 종합 평가와 향후 개선사항을 작성해주세요..."

#### 2.3.2 글자수 제한

- 실시간 글자수 표시 (현재/50)
- 45자 이상 시 빨간색 경고
- 50자 초과 시 자동 제한

### 2.4 저장 및 출력 기능

#### 2.4.1 유효성 검사

- **조건**: 모든 점수 항목이 0보다 큰 값으로 입력되어야 함
- **총 10개 항목**: 가정평가, 근면성실, 감사노트, 리더십, 스쿼트, 점핑잭, 품새, 겨루기, 발차기, 격파

#### 2.4.2 Save 버튼

- **활성화 조건**: 저장되지 않은 상태에서만 활성화
- **클릭 시 검증**: 모든 점수 입력 여부 확인
- **피드백**: Toast 알림으로 결과 표시
  - 성공: 💾 {학생명}님의 평가가 저장되었습니다.
  - 실패: 🔢 모든 점수를 입력해주세요.

#### 2.4.3 PDF 다운로드 버튼

- **활성화**: 항상 활성화
- **클릭 시 검증**: 모든 점수 입력 여부 확인
- **성공 피드백**: 📄 {학생명}님의 평가표 PDF 다운로드가 완료되었습니다.
- **파일명 형식**: `평가표_{학생명}_{날짜}.pdf`

#### 2.4.4 PDF 미리보기 버튼

- **활성화**: 항상 활성화
- **클릭 시 검증**: 모든 점수 입력 여부 확인
- **동작**: 새 창에서 PDF 미리보기 (Toast 알림 없음)

### 2.5 PDF 출력 형식

#### 2.5.1 헤더

- **제목**: "승급 평가표" (중앙 정렬)
- **로고**: 우측 상단 (도장 로고 또는 기본 플레이스홀더)
- **메타 정보**: 실시일, 이벤트명

#### 2.5.2 학생 정보

- 성명, 나이, 현재/승시 급수, 출석/숙제 횟수

#### 2.5.3 평가 테이블

- **카테고리별 색상 구분**:
  - HOMEWORK 가정평가: 주황색 (#f59e0b)
  - ATTENDANCE 출석: 빨간색 (#ef4444)
  - DESLINE 인성: 보라색 (#8b5cf6)
  - PHYSICAL TEST 체력: 초록색 (#10b981)
  - REQUIREMENT 기술: 파란색 (#3b82f6)

#### 2.5.4 결과 요약

- 총점, 등급, 합격/불합격 상태
- 종합 평가 코멘트 (입력된 경우)

## 3. API 명세 및 데이터 구조

### 3.1 Save 버튼 클릭 시 프로세스

#### 3.1.1 이미지 생성 및 S3 업로드

1. **이미지 생성**: 브라우저에서 Canvas/HTML2Canvas로 이미지 생성
2. **S3 업로드**: 생성된 이미지를 AWS S3에 업로드
3. **경로 생성**: S3 업로드 완료 후 파일 경로 획득
4. **API 호출**: 이미지 경로와 평가 데이터를 함께 API로 전송

#### 3.1.2 API 호출 Sample JSON

##### 평가 저장 API

```json
POST /api/evaluations/save
{
  "userId": "1",
  "upgradeId": "2",
  "filePath": "s3://evaluation-bucket/pdfs/2025/09/23/evaluation_김범진_20250923_143022.pdf",
  "homeworkCombinedScore": 8,
  "attendanceDiligenceScore": 9,
  "characterGratitudeNotesScore": 7,
  "characterLeadershipScore": 8,
  "physicalSquatsScore": 6,
  "physicalJumpingJacksScore": 7,
  "technicalPoomsaeScore": 9,
  "technicalSparringScore": 8,
  "technicalKicksScore": 7,
  "technicalBreakingScore": 8,
  "overallComment": "전반적으로 우수한 실력을 보여주었으며, 체력 부분의 보완이 필요함",
  "totalScore": 77
}
```

**주요 필드 설명:**

- `userId`: 평가를 수행하는 교사/관리자 ID
- `upgradeId`: 승급 평가 이벤트 ID (기존 testingEventId)
- `filePath`: S3에 업로드된 평가표 파일 경로
- **점수 필드들** (모든 값이 0보다 커야 함):
  - `homeworkCombinedScore`: 가정평가 (종합) 점수 (0-10)
  - `attendanceDiligenceScore`: 근면성실 점수 (0-10)
  - `characterGratitudeNotesScore`: 감사노트 점수 (0-10)
  - `characterLeadershipScore`: 리더십 점수 (0-10)
  - `physicalSquatsScore`: 스쿼트 점수 (0-10)
  - `physicalJumpingJacksScore`: 점핑잭 점수 (0-10)
  - `technicalPoomsaeScore`: 품새 점수 (0-10)
  - `technicalSparringScore`: 겨루기 점수 (0-10)
  - `technicalKicksScore`: 발차기 점수 (0-10)
  - `technicalBreakingScore`: 격파 점수 (0-10)
- `overallComment`: 종합 평가 (선택사항, 최대 50자)
- `totalScore`: 계산된 총점

### 3.2 S3 업로드 처리

#### 3.2.1 파일 경로 구조

```
s3://evaluation-bucket/
  └── pdfs/
      └── {year}/
          └── {month}/
              └── {day}/
                  └── evaluation_{학생명}_{timestamp}.pdf
```

#### 3.2.2 업로드 처리

- 프론트엔드에서 이미지 생성 후 백엔드 API로 업로드 요청
- 백엔드에서 S3 업로드 처리 및 경로 반환

### 3.3 API 응답 형식

#### 3.3.1 성공 응답

```json
{
  "success": true,
  "message": "평가가 성공적으로 저장되었습니다.",
  "data": {
    "evaluationId": "eval_12345",
    "participantId": "participant_111",
    "pdfUrl": "https://evaluation-bucket.s3.amazonaws.com/pdfs/2025/09/23/evaluation_김범진_20250923_143022.pdf"
  }
}
```

#### 3.3.2 실패 응답

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "필수 점수가 누락되었습니다.",
    "details": {
      "missingScores": ["technicalPoomsaeScore", "physicalSquatsScore"]
    }
  }
}
```

## 4. 기술 사양

### 4.1 사용 기술

- **Frontend**: React 18 + TypeScript
- **UI Library**: Material-UI v5
- **이미지 생성**: HTML2Canvas 또는 Canvas API
- **상태 관리**: React useState/useCallback
- **Toast 알림**: @mas9/shared-ui showToast

### 3.2 파일 구조

```
src/
├── components/evaluation/
│   ├── EvaluationModal.tsx      # 메인 평가 모달
│   ├── EvaluationForm.tsx       # 평가 입력 폼
│   ├── CategorySection.tsx      # 카테고리별 섹션
│   ├── ScoreSlider.tsx          # 점수 입력 슬라이더
│   ├── EvaluationSummary.tsx    # 결과 요약
│   ├── StudentCard.tsx          # 학생 카드
│   └── StudentSidebar.tsx       # 학생 선택 사이드바
├── services/
│   └── imageService.tsx         # 이미지 생성 서비스
├── utils/
│   └── evaluationHelpers.ts     # 평가 관련 유틸리티
└── types/
    └── evaluation.ts            # 타입 정의
```

### 4.3 주요 함수

#### 4.3.1 유효성 검사 함수

- `areAllScoresEntered()`: 모든 점수 입력 여부 확인
- `hasAnyScoreChanged()`: 점수 변경 여부 확인
- `isEvaluationReadyToSave()`: 저장 가능 상태 확인

#### 4.3.2 계산 및 처리 함수

- `calculateEvaluation()`: 총점, 등급, 합격 여부 계산
- `calculateTotalScore()`: 전체 점수 합산
- `calculateGrade()`: 점수 기반 등급 산출

#### 4.3.3 이미지 및 저장 함수

- `generateEvaluationImage()`: 이미지 생성 및 다운로드/미리보기
- `uploadImageToS3()`: S3에 이미지 파일 업로드
- `saveEvaluationData()`: 평가 데이터 API 저장
- `handleSaveIndividual()`: 개별 평가 저장 처리

#### 4.3.4 프론트엔드 처리 흐름

1. 모든 점수 입력 여부 검증
2. 이미지 생성 (브라우저에서 HTML2Canvas 사용)
3. S3 업로드 (백엔드 API 통해)
4. 평가 데이터 API 저장 (1-depth 구조로)

## 4. 사용자 경험 (UX)

### 4.1 워크플로우

1. 평가 모달 열기
2. 좌측에서 학생 선택
3. 카테고리별 점수 입력 (슬라이더 사용)
4. 종합 평가 작성 (선택사항)
5. Save 버튼으로 저장
6. 이미지 다운로드 또는 미리보기

### 4.2 사용자 피드백

- **실시간 결과**: 우측 패널에서 총점, 등급 즉시 확인
- **Toast 알림**: 성공/오류 메시지를 명확하게 표시
- **시각적 상태**: 학생별 평가 상태를 색상으로 구분
- **직관적 인터페이스**: 슬라이더와 색상으로 점수 입력 간소화

### 4.3 접근성

- 키보드 네비게이션 지원
- 색상 외에도 텍스트로 상태 표시
- 명확한 에러 메시지 제공
- 실시간 피드백으로 사용자 혼란 최소화

## 5. 테스트 시나리오

### 5.1 정상 플로우

1. 모든 점수 입력 → Save/이미지 버튼 정상 동작
2. 일부 점수만 입력 → 경고 Toast 표시
3. 저장 후 → 버튼 상태 변경 및 상태 아이콘 업데이트

### 5.2 예외 처리

1. 점수 미입력 시 버튼 클릭 → 적절한 경고 메시지
2. 이미지 생성 실패 → 오류 Toast 표시
3. 네트워크 오류 → 사용자에게 명확한 피드백

---

**문서 버전**: 1.0
**최종 수정**: 2025-09-23
**작성자**: Claude Code Assistant
