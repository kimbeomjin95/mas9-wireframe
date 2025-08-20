// 🎯 Test 도메인 모달 키 상수 - 단순하게 컴포넌트만 참조
export const TEST_MODALS = {
  TEST_SAMPLE_MODAL: () => import('@/components/modals/test/SampleModal'),
  TEST_RESPONSIVE_MODAL: () => import('@/components/modals/test/ResponsiveModal'),
} as const;

// 타입 추출
export type TestModalKey = keyof typeof TEST_MODALS;