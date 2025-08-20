export const ROUTER = {
  // 메인
  HOME: '/home',
  
  // 회원 관리
  FR_PROFILES: '/accounts/profiles',
  FR_GROUPS: '/accounts/groups',
  FR_TAG_SETTING: '/accounts/tags',
  
  // 멤버십
  MEMBERSHIP_MANAGEMENT: '/memberships/management',
  
  // 클래스
  CLASS: '/class/management',
  ATTENDANCE_HISTORY: '/class/attendance-history',
  BULK_ACTION: '/class/bulk-actions',
  ATTENDANCE_SELF_REGISTER: '/class/self-check-in',
  
  // 커뮤니케이션
  MESSAGING: '/communications/messaging',
  ANNOUNCEMENTS: '/communications/announcements',
  CONVERSATIONS: '/communications/conversations',
  
  // 이벤트
  EVENT: '/events/management',
  TESTING_LIST: '/events/testings',
  
  // 학습센터
  LEARN: '/learning-centers/centers',
  HOMEWORK: '/learning-centers/homeworks',
  
  // 마케팅 툴
  FORM: '/marketing-tools/forms',
  MARKETING_AUTOMATION: '/marketing-tools/automations',
  
  // 이스토어
  ECOMMERCE_ORDER: '/estore/orders',
  PRODUCTS: '/estore/products',
  
  // 결제
  PAYMENT_ERROR: '/payments/transaction-errors',
  TRANSACTIONS: '/payments/transactions',
  INVOICE: '/payments/invoices',
  AUTOPAY_HISTORY: '/payments/autopays',
  
  // 스테프
  STAFF_MEMBERS: '/staff/members',
  CLOCKINOUT: '/staff/clock-in-out',
  STAFF_MANAGEMENT_LOG: '/staff/log-history',
  
  // 리포트
  REPORTS_INSIGHTS: '/reports/insights',
  REPORTS_REPORTS: '/reports/reports',
  
  // 설정
  SCHOOL_SETUP: '/settings/school-setup',
  SETTINGS_PAYMENTS: '/settings/payments',
  COMMUNICATION: '/settings/communication',
  SYSTEM_SECURITY: '/settings/system-security',
  SUB_BILLING: '/settings/subscription-billing',
  
  // 디자인 시스템
  DESIGN_SYSTEM_TOAST: '/design-system/toast',
  DESIGN_SYSTEM_MODAL: '/design-system/modal',
  DESIGN_SYSTEM_BUTTON: '/design-system/button',
  DESIGN_SYSTEM_FORM: '/design-system/form',
} as const;