// 🎯 Profiles > Notification 서브메뉴 모달 상수 (기존 profile.ts에서 분리)
export const PROFILE_NOTIFICATION_MODALS = {
  // 실제 존재하는 모달
  PROFILE_NOTIFICATION_SETTINGS: () => import('@/components/modals/profile/NotificationSettingsModal'),
  
  // 향후 추가될 모달들 (예시)
  // NOTIFICATION_TEMPLATE_EDIT: () => import('@/components/modals/profiles/notification/NotificationTemplateModal'),
  // NOTIFICATION_HISTORY: () => import('@/components/modals/profiles/notification/NotificationHistoryModal'),
} as const;

// 타입 추출
export type ProfileNotificationModalKey = keyof typeof PROFILE_NOTIFICATION_MODALS;