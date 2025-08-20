// 🎯 Profiles > Member 서브메뉴 모달 상수
export const PROFILE_MEMBER_MODALS = {
  // 향후 추가될 모달들 (예시)
  // MEMBER_CREATE: () => import('@/components/modals/profiles/member/MemberCreateModal'),
  // MEMBER_EDIT: () => import('@/components/modals/profiles/member/MemberEditModal'),
  // MEMBER_DELETE_CONFIRM: () => import('@/components/modals/profiles/member/MemberDeleteModal'),
  // MEMBER_BULK_IMPORT: () => import('@/components/modals/profiles/member/MemberBulkImportModal'),
  // MEMBER_BULK_DELETE: () => import('@/components/modals/profiles/member/MemberBulkDeleteModal'),
  // MEMBER_EXPORT: () => import('@/components/modals/profiles/member/MemberExportModal'),
  // MEMBER_ROLE_CHANGE: () => import('@/components/modals/profiles/member/MemberRoleChangeModal'),
  // MEMBER_STATUS_CHANGE: () => import('@/components/modals/profiles/member/MemberStatusChangeModal'),
} as const;

// 타입 추출
export type ProfileMemberModalKey = keyof typeof PROFILE_MEMBER_MODALS;