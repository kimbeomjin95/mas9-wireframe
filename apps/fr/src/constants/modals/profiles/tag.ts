// 🎯 Profiles > Tag 서브메뉴 모달 상수
export const PROFILE_TAG_MODALS = {
  // 향후 추가될 모달들 (예시)
  // TAG_CREATE: () => import('@/components/modals/profiles/tag/TagCreateModal'),
  // TAG_EDIT: () => import('@/components/modals/profiles/tag/TagEditModal'),
  // TAG_DELETE_CONFIRM: () => import('@/components/modals/profiles/tag/TagDeleteModal'),
  // TAG_BULK_ASSIGN: () => import('@/components/modals/profiles/tag/TagBulkAssignModal'),
  // TAG_BULK_REMOVE: () => import('@/components/modals/profiles/tag/TagBulkRemoveModal'),
  // TAG_COLOR_PICKER: () => import('@/components/modals/profiles/tag/TagColorPickerModal'),
} as const;

// 타입 추출
export type ProfileTagModalKey = keyof typeof PROFILE_TAG_MODALS;