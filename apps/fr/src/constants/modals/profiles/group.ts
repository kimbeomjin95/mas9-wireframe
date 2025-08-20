// 🎯 Profiles > Group 서브메뉴 모달 상수
export const PROFILE_GROUP_MODALS = {
  // 향후 추가될 모달들 (예시)
  // GROUP_CREATE: () => import('@/components/modals/profiles/group/GroupCreateModal'),
  // GROUP_EDIT: () => import('@/components/modals/profiles/group/GroupEditModal'),
  // GROUP_DELETE_CONFIRM: () => import('@/components/modals/profiles/group/GroupDeleteModal'),
  // GROUP_MEMBER_ASSIGN: () => import('@/components/modals/profiles/group/GroupMemberAssignModal'),
  // GROUP_BULK_DELETE: () => import('@/components/modals/profiles/group/GroupBulkDeleteModal'),
} as const;

// 타입 추출
export type ProfileGroupModalKey = keyof typeof PROFILE_GROUP_MODALS;