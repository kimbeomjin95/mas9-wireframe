// 🎯 Profiles 도메인 모달 키 상수
export const PROFILE_MODALS = {
  MEMBER_NOTE_MODAL: () => import('@/components/modals/accounts/MemberNoteModal'),
  NOTES_LIST_MODAL: () => import('@/components/modals/accounts/NotesListModal'),
} as const;

// 타입 추출
export type ProfileModalKey = keyof typeof PROFILE_MODALS;