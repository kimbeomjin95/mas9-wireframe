// 🎯 Profiles 도메인 - 서브메뉴별 모달 통합 관리

// 각 서브메뉴별 모달 re-export
export { PROFILE_GROUP_MODALS, type ProfileGroupModalKey } from './group';
export { PROFILE_TAG_MODALS, type ProfileTagModalKey } from './tag';
export { PROFILE_MEMBER_MODALS, type ProfileMemberModalKey } from './member';
export { PROFILE_NOTIFICATION_MODALS, type ProfileNotificationModalKey } from './notification';

// 필요시 통합 사용을 위한 전체 profiles 모달 (선택적)
import { PROFILE_GROUP_MODALS } from './group';
import { PROFILE_TAG_MODALS } from './tag';
import { PROFILE_MEMBER_MODALS } from './member';
import { PROFILE_NOTIFICATION_MODALS } from './notification';

export const ALL_PROFILE_MODALS = {
  ...PROFILE_GROUP_MODALS,
  ...PROFILE_TAG_MODALS,
  ...PROFILE_MEMBER_MODALS,
  ...PROFILE_NOTIFICATION_MODALS,
} as const;

// 전체 profiles 모달 키 타입
export type AllProfileModalKey = keyof typeof ALL_PROFILE_MODALS;