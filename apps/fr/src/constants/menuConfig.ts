import {
  LayoutDashboard,
  Users,
  // CreditCard,
  // BookOpen,
  // MessageSquare,
  Calendar,
  // GraduationCap,
  // Megaphone,
  // ShoppingCart,
  // DollarSign,
  // UserCheck,
  // BarChart3,
  // Settings,
  Tags,
  Users2,
  FileText,
  Award,
  Zap,
  Package,
  AlertTriangle,
  Receipt,
  RefreshCw,
  Clock,
  FileBarChart,
  TrendingUp,
  Building,
  MessageCircle,
  Shield,
  Mail,
  TestTube,
} from 'lucide-react';
import { MENU_KEYS } from './menuKeys';
import { ROUTER } from './routes';

export interface MenuItem {
  menuId: string;
  menuKey?: string;
  isDevelopment?: boolean;
  menuNm: string;
  menuNmEn: string;
  menuUrl: string;
  orderNo: number;
  upperMenuId: string;
  ico?: React.ComponentType<any>;
  role?: string;
  subMenu: SubMenuItem[];
}

export interface SubMenuItem {
  menuId: string;
  menuKey?: string;
  menuNm: string;
  menuNmEn: string;
  menuUrl: string;
  orderNo: number;
  upperMenuId: string;
  role?: string;
  isDevelopment?: boolean;
}

export const menuList: MenuItem[] = [
  {
    menuId: 'M0000060',
    menuNm: 'Design System',
    menuNmEn: 'Design System',
    menuUrl: '-',
    orderNo: -1,
    upperMenuId: 'TOP',
    ico: TestTube,
    isDevelopment: true,
    subMenu: [
      {
        menuId: 'M0000061',
        menuNm: 'Toast',
        menuNmEn: 'Toast',
        menuUrl: ROUTER.DESIGN_SYSTEM_TOAST,
        orderNo: 0,
        upperMenuId: 'M0000060',
        isDevelopment: true,
      },
      {
        menuId: 'M0000062',
        menuNm: 'Modal',
        menuNmEn: 'Modal',
        menuUrl: ROUTER.DESIGN_SYSTEM_MODAL,
        orderNo: 1,
        upperMenuId: 'M0000060',
        isDevelopment: true,
      },
      {
        menuId: 'M0000063',
        menuNm: 'Button',
        menuNmEn: 'Button',
        menuUrl: ROUTER.DESIGN_SYSTEM_BUTTON,
        orderNo: 2,
        upperMenuId: 'M0000060',
        isDevelopment: true,
      },
      {
        menuId: 'M0000064',
        menuNm: 'Form',
        menuNmEn: 'Form',
        menuUrl: ROUTER.DESIGN_SYSTEM_FORM,
        orderNo: 3,
        upperMenuId: 'M0000060',
        isDevelopment: true,
      },
    ],
  },
  {
    menuId: 'M0000000',
    menuKey: MENU_KEYS.HOME,
    isDevelopment: true,
    menuNm: 'Home',
    menuNmEn: 'Home',
    menuUrl: ROUTER.HOME,
    orderNo: 0,
    upperMenuId: 'TOP',
    ico: LayoutDashboard,
    subMenu: [],
  },
  {
    menuId: 'M0000001',
    menuKey: 'ACCOUNTS_PROFILES',
    menuNm: 'Accounts',
    menuNmEn: 'Accounts',
    menuUrl: '-',
    orderNo: 0,
    upperMenuId: 'TOP',
    ico: Users,
    subMenu: [
      {
        menuId: 'M0000044',
        menuKey: MENU_KEYS.ACCOUNTS.PROFILES,
        menuNm: 'Profiles',
        menuNmEn: 'Profiles',
        menuUrl: ROUTER.FR_PROFILES,
        orderNo: 0,
        upperMenuId: 'M0000001',
        role: 'memberYn',
      },
      // {
      //   menuId: 'M0000003',
      //   menuKey: MENU_KEYS.ACCOUNTS.GROUPS,
      //   menuNm: 'Groups',
      //   menuNmEn: 'Groups',
      //   menuUrl: ROUTER.FR_GROUPS,
      //   orderNo: 0,
      //   upperMenuId: 'M0000001',
      //   role: 'groupYn',
      // },
      // {
      //   menuId: 'M0000043',
      //   menuKey: MENU_KEYS.ACCOUNTS.TAGS,
      //   menuNm: 'Tags',
      //   menuNmEn: 'Tags',
      //   menuUrl: ROUTER.FR_TAG_SETTING,
      //   orderNo: 0,
      //   upperMenuId: 'M0000001',
      //   role: 'tagYn',
      // },
    ],
  },
  // {
  //   menuId: 'M0000005',
  //   menuKey: MENU_KEYS.MEMBERSHIPS,
  //   menuNm: 'Memberships',
  //   menuNmEn: 'Memberships',
  //   menuUrl: ROUTER.MEMBERSHIP_MANAGEMENT,
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: CreditCard,
  //   role: 'planYn',
  //   subMenu: [],
  // },
  // {
  //   menuId: 'M0000008',
  //   menuNm: 'Class',
  //   menuNmEn: 'Class',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: BookOpen,
  //   subMenu: [
  //     {
  //       menuId: 'M0000009',
  //       menuKey: MENU_KEYS.CLASS.CLASS_MANAGEMENT,
  //       menuNm: 'Class Management',
  //       menuNmEn: 'Class Management',
  //       menuUrl: ROUTER.CLASS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000008',
  //       role: 'classYn',
  //     },
  //     {
  //       menuId: 'M0000013',
  //       menuKey: MENU_KEYS.CLASS.ATTENDANCE_HISTORY,
  //       menuNm: 'Attendance History',
  //       menuNmEn: 'Attendance History',
  //       menuUrl: ROUTER.ATTENDANCE_HISTORY,
  //       orderNo: 0,
  //       upperMenuId: 'M0000008',
  //       role: 'attendanceHistoryYn',
  //     },
  //     {
  //       menuId: 'M0000014',
  //       menuKey: MENU_KEYS.CLASS.BULK_ACTIONS,
  //       menuNm: 'Bulk Actions',
  //       menuNmEn: 'Bulk Actions',
  //       menuUrl: ROUTER.BULK_ACTION,
  //       orderNo: 0,
  //       upperMenuId: 'M0000008',
  //       role: 'attendanceHistoryYn',
  //     },
  //     {
  //       menuId: 'M0000045',
  //       menuKey: MENU_KEYS.CLASS.SELF_CHECK_IN,
  //       menuNm: 'Self Check-in',
  //       menuNmEn: 'Self Check-in',
  //       menuUrl: ROUTER.ATTENDANCE_SELF_REGISTER,
  //       orderNo: 0,
  //       upperMenuId: 'M0000008',
  //       role: 'attendanceHistoryYn',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'M0000014',
  //   menuNm: 'Communications',
  //   menuNmEn: 'Communications',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: MessageSquare,
  //   subMenu: [
  //     {
  //       menuId: 'M0000020',
  //       menuKey: MENU_KEYS.COMMUNICATIONS.MESSAGING,
  //       menuNm: 'Messages',
  //       menuNmEn: 'Messages',
  //       menuUrl: ROUTER.MESSAGING,
  //       orderNo: 0,
  //       upperMenuId: 'M0000014',
  //       role: 'mailSendYn',
  //     },
  //     {
  //       menuId: 'M0000021',
  //       menuKey: MENU_KEYS.COMMUNICATIONS.ANNOUNCEMENTS,
  //       menuNm: 'Announcements',
  //       menuNmEn: 'Announcements',
  //       menuUrl: ROUTER.ANNOUNCEMENTS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000014',
  //       role: 'noticeYn',
  //     },
  //     {
  //       menuId: 'M0000023',
  //       menuKey: MENU_KEYS.COMMUNICATIONS.COMMUNICATIONS_CONVERSATIONS,
  //       menuNm: 'Conversations',
  //       menuNmEn: 'Conversations',
  //       menuUrl: ROUTER.CONVERSATIONS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000014',
  //       role: 'chatYn',
  //     },
  //   ],
  // },
  {
    menuId: 'M0000024',
    menuNm: 'Events',
    menuNmEn: 'Events',
    menuUrl: '-',
    orderNo: 0,
    upperMenuId: 'TOP',
    subMenu: [
      // {
      //   menuId: 'M0000040',
      //   menuKey: MENU_KEYS.EVENTS.EVENT_MANAGEMENT,
      //   menuNm: 'Event Management',
      //   menuNmEn: 'Event Management',
      //   menuUrl: ROUTER.EVENT,
      //   orderNo: 0,
      //   upperMenuId: 'M0000024',
      //   role: 'eventYn',
      // },
      {
        menuId: 'M0000012',
        menuKey: 'EVENTS_TESTING',
        menuNm: 'Testing',
        menuNmEn: 'Testing',
        menuUrl: ROUTER.TESTING_LIST,
        orderNo: 0,
        upperMenuId: 'M0000024',
        role: 'upgradeYn',
      },
    ],
    ico: Calendar,
    role: 'eventYn',
  },
  // {
  //   menuId: 'M0000025',
  //   menuNm: 'Learning Centers',
  //   menuNmEn: 'Learning Centers',
  //   menuUrl: ROUTER.LEARN,
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   subMenu: [
  //     {
  //       menuId: 'M0000039',
  //       menuKey: MENU_KEYS.LEARNING_CENTERS.LEARNING_CENTERS,
  //       menuNm: 'Learning Centers',
  //       menuNmEn: 'Learning Centers',
  //       menuUrl: ROUTER.LEARN,
  //       orderNo: 0,
  //       upperMenuId: 'M0000025',
  //       role: 'studyCenterYn',
  //     },
  //     {
  //       menuId: 'M0000010',
  //       menuKey: MENU_KEYS.LEARNING_CENTERS.HOMEWORKS,
  //       menuNm: 'Homeworks',
  //       menuNmEn: 'Homeworks',
  //       menuUrl: ROUTER.HOMEWORK,
  //       orderNo: 0,
  //       upperMenuId: 'M0000025',
  //       role: 'homeworkYn',
  //     },
  //   ],
  //   ico: GraduationCap,
  //   role: 'studyCenterYn',
  // },
  // {
  //   menuId: 'M0000042',
  //   menuNm: 'Marketing Tools',
  //   menuNmEn: 'Marketing Tools',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: Megaphone,
  //   subMenu: [
  //     {
  //       menuId: 'M0000041',
  //       menuKey: MENU_KEYS.MARKETING_TOOLS.FORMS,
  //       menuNm: 'Forms',
  //       menuNmEn: 'Forms',
  //       menuUrl: ROUTER.FORM,
  //       orderNo: 0,
  //       upperMenuId: 'M0000042',
  //       role: 'formYn',
  //     },
  //     {
  //       menuId: 'M0000046',
  //       menuKey: MENU_KEYS.MARKETING_TOOLS.AUTOMATIONS,
  //       menuNm: 'Automations',
  //       menuNmEn: 'Automations',
  //       menuUrl: ROUTER.MARKETING_AUTOMATION,
  //       orderNo: 0,
  //       upperMenuId: 'M0000042',
  //       role: 'automationYn',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'M0000026',
  //   menuNm: 'eStore',
  //   menuNmEn: 'eStore',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: ShoppingCart,
  //   subMenu: [
  //     {
  //       menuId: 'M0000027',
  //       menuKey: MENU_KEYS.ESTORE.ORDERS,
  //       menuNm: 'Orders',
  //       menuNmEn: 'Orders',
  //       menuUrl: ROUTER.ECOMMERCE_ORDER,
  //       orderNo: 0,
  //       upperMenuId: 'M0000026',
  //       role: 'orderYn',
  //     },
  //     {
  //       menuId: 'M0000028',
  //       menuKey: MENU_KEYS.ESTORE.PRODUCTS,
  //       menuNm: 'Products',
  //       menuNmEn: 'Products',
  //       menuUrl: ROUTER.PRODUCTS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000026',
  //       role: 'productYn',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'M0000029',
  //   menuNm: 'Payments',
  //   menuNmEn: 'Payments',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: DollarSign,
  //   subMenu: [
  //     {
  //       menuId: 'M0000030',
  //       menuKey: MENU_KEYS.PAYMENTS.TRANSACTION_ERRORS,
  //       menuNm: 'Transaction Errors',
  //       menuNmEn: 'Transaction Errors',
  //       menuUrl: ROUTER.PAYMENT_ERROR,
  //       orderNo: 0,
  //       upperMenuId: 'M0000029',
  //       role: 'paymentErrorYn',
  //     },
  //     {
  //       menuId: 'M0000031',
  //       menuKey: MENU_KEYS.PAYMENTS.TRANSACTIONS,
  //       menuNm: 'Transactions',
  //       menuNmEn: 'Transactions',
  //       menuUrl: ROUTER.TRANSACTIONS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000029',
  //       role: 'paymentHistoryYn',
  //     },
  //     {
  //       menuId: 'M0000032',
  //       menuKey: MENU_KEYS.PAYMENTS.INVOICES,
  //       menuNm: 'Invoices',
  //       menuNmEn: 'Invoices',
  //       menuUrl: ROUTER.INVOICE,
  //       orderNo: 0,
  //       upperMenuId: 'M0000029',
  //       role: 'invoiceYn',
  //     },
  //     {
  //       menuId: 'M0000033',
  //       menuKey: MENU_KEYS.PAYMENTS.AUTOPAYS,
  //       menuNm: 'Autopays',
  //       menuNmEn: 'Autopays',
  //       menuUrl: ROUTER.AUTOPAY_HISTORY,
  //       orderNo: 0,
  //       upperMenuId: 'M0000029',
  //       role: 'autoPayYn',
  //     },
  //   ],
  // },
  // {
  //   menuId: 'M0000051',
  //   menuNm: 'Staff',
  //   menuNmEn: 'Staff',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: UserCheck,
  //   subMenu: [
  //     {
  //       menuId: 'M0000052',
  //       menuKey: MENU_KEYS.STAFF.STAFF_MEMBERS,
  //       menuNm: 'Staff Members',
  //       menuNmEn: 'Staff Members',
  //       menuUrl: ROUTER.STAFF_MEMBERS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000051',
  //       role: 'frYn',
  //     },
  //     {
  //       menuId: 'M0000053',
  //       menuKey: MENU_KEYS.STAFF.CLOCK_IN_AND_OUT,
  //       menuNm: 'Clock-In / Out',
  //       menuNmEn: 'Clock-In / Out',
  //       menuUrl: ROUTER.CLOCKINOUT,
  //       orderNo: 0,
  //       upperMenuId: 'M0000051',
  //       role: 'staffYn',
  //     },
  //     {
  //       menuId: 'M0000038',
  //       menuKey: MENU_KEYS.SETTINGS.STAFF_MANAGEMENT,
  //       menuNm: 'Log & History',
  //       menuNmEn: 'Log & History',
  //       menuUrl: ROUTER.STAFF_MANAGEMENT_LOG,
  //       orderNo: 0,
  //       upperMenuId: 'M0000051',
  //       role: 'staffYn',
  //     },
  //   ],
  // },
  // ...(import.meta.env.VITE_ENV_FILE === 'production'
  //   ? []
  //   : [
  //       {
  //         menuId: 'M0000054',
  //         menuNm: 'Reports',
  //         menuNmEn: 'Reports',
  //         menuUrl: '-',
  //         orderNo: 0,
  //         upperMenuId: 'TOP',
  //         ico: BarChart3,
  //         isDevelopment: true,
  //         subMenu: [
  //           {
  //             menuId: 'M0000055',
  //             menuKey: MENU_KEYS.REPORTS.INSIGHTS,
  //             menuNm: 'Insights',
  //             menuNmEn: 'Insights',
  //             menuUrl: ROUTER.REPORTS_INSIGHTS,
  //             orderNo: 0,
  //             upperMenuId: 'M0000054',
  //             role: 'frYn',
  //             isDevelopment: true,
  //           },
  //           {
  //             menuId: 'M0000056',
  //             menuKey: MENU_KEYS.REPORTS.REPORTS,
  //             menuNm: 'Reports',
  //             menuNmEn: 'Reports',
  //             menuUrl: ROUTER.REPORTS_REPORTS,
  //             orderNo: 0,
  //             upperMenuId: 'M0000054',
  //             role: 'frYn',
  //             isDevelopment: true,
  //           },
  //         ],
  //       },
  //     ]),
  // {
  //   menuId: 'M0000034',
  //   menuNm: 'Settings',
  //   menuNmEn: 'Settings',
  //   menuUrl: '-',
  //   orderNo: 0,
  //   upperMenuId: 'TOP',
  //   ico: Settings,
  //   subMenu: [
  //     {
  //       menuId: 'M0000049',
  //       menuKey: MENU_KEYS.SETTINGS.SCHOOL_SETUP,
  //       menuNm: 'School Setup',
  //       menuNmEn: 'School Setup',
  //       menuUrl: ROUTER.SCHOOL_SETUP,
  //       orderNo: 0,
  //       upperMenuId: 'M0000034',
  //       role: 'frYn',
  //     },
  //     {
  //       menuId: 'M0000046',
  //       menuKey: MENU_KEYS.SETTINGS.PAYMENTS,
  //       menuNm: 'Payments',
  //       menuNmEn: 'Payments',
  //       menuUrl: ROUTER.SETTINGS_PAYMENTS,
  //       orderNo: 0,
  //       upperMenuId: 'M0000034',
  //       role: 'paymentYn',
  //     },
  //     {
  //       menuId: 'M0000048',
  //       menuKey: MENU_KEYS.SETTINGS.COMMUNICATION,
  //       menuNm: 'Communication',
  //       menuNmEn: 'Communication',
  //       menuUrl: ROUTER.COMMUNICATION,
  //       orderNo: 0,
  //       upperMenuId: 'M0000034',
  //       role: 'communicationYn',
  //     },
  //     {
  //       menuId: 'M0000047',
  //       menuKey: MENU_KEYS.SETTINGS.SYSTEM_SECURITY,
  //       menuNm: 'System & Security',
  //       menuNmEn: 'System & Security',
  //       menuUrl: ROUTER.SYSTEM_SECURITY,
  //       orderNo: 0,
  //       upperMenuId: 'M0000034',
  //       role: 'securityYn',
  //     },
  //     {
  //       menuId: 'M0000050',
  //       menuKey: MENU_KEYS.SETTINGS.SUBSCRIPTION_BILLINGS,
  //       menuNm: 'Subscription & Billing',
  //       menuNmEn: 'Subscription & Billing',
  //       menuUrl: ROUTER.SUB_BILLING,
  //       orderNo: 0,
  //       upperMenuId: 'M0000034',
  //       role: 'frYn',
  //     },
  //   ],
  // },
] as MenuItem[];

// URL 경로와 메뉴 ID 간의 매핑
export const routeToMenuMap = {
  // 홈 (Home)
  [ROUTER.HOME]: { gnb: 'M0000000', snb: '' },

  // 회원 (Accounts)
  [ROUTER.FR_PROFILES]: { gnb: 'M0000001', snb: 'M0000044' },
  [ROUTER.FR_GROUPS]: { gnb: 'M0000001', snb: 'M0000003' },
  [ROUTER.FR_TAG_SETTING]: { gnb: 'M0000001', snb: 'M0000043' },

  // 멤버십 (Memberships)
  [ROUTER.MEMBERSHIP_MANAGEMENT]: { gnb: 'M0000005', snb: '' },

  // 클래스 (Class)
  [ROUTER.CLASS]: { gnb: 'M0000008', snb: 'M0000009' },
  [ROUTER.ATTENDANCE_HISTORY]: { gnb: 'M0000008', snb: 'M0000013' },
  [ROUTER.BULK_ACTION]: { gnb: 'M0000008', snb: 'M0000014' },
  [ROUTER.ATTENDANCE_SELF_REGISTER]: { gnb: 'M0000008', snb: 'M0000045' },

  // 커뮤니케이션 (Communications)
  [ROUTER.MESSAGING]: { gnb: 'M0000014', snb: 'M0000020' },
  [ROUTER.ANNOUNCEMENTS]: { gnb: 'M0000014', snb: 'M0000021' },
  [ROUTER.CONVERSATIONS]: { gnb: 'M0000014', snb: 'M0000023' },

  // 이벤트 (Events)
  // [ROUTER.EVENT]: { gnb: 'M0000024', snb: 'M0000040' }, // Event Management 숨김
  [ROUTER.TESTING_LIST]: { gnb: 'M0000024', snb: 'M0000012' }, // Events > Testing

  // 학습센터 (Learning Centers)
  [ROUTER.LEARN]: { gnb: 'M0000025', snb: 'M0000039' },
  [ROUTER.HOMEWORK]: { gnb: 'M0000025', snb: 'M0000010' },

  // 마케팅 툴 (Marketing Tools)
  [ROUTER.FORM]: { gnb: 'M0000042', snb: 'M0000041' },
  [ROUTER.MARKETING_AUTOMATION]: { gnb: 'M0000042', snb: 'M0000046' },

  // 이스토어 (eStore)
  [ROUTER.ECOMMERCE_ORDER]: { gnb: 'M0000026', snb: 'M0000027' },
  [ROUTER.PRODUCTS]: { gnb: 'M0000026', snb: 'M0000028' },

  // 결제 (Payments)
  [ROUTER.PAYMENT_ERROR]: { gnb: 'M0000029', snb: 'M0000030' },
  [ROUTER.TRANSACTIONS]: { gnb: 'M0000029', snb: 'M0000031' },
  [ROUTER.INVOICE]: { gnb: 'M0000029', snb: 'M0000032' },
  [ROUTER.AUTOPAY_HISTORY]: { gnb: 'M0000029', snb: 'M0000033' },

  // 스테프 (Staff)
  [ROUTER.STAFF_MEMBERS]: { gnb: 'M0000051', snb: 'M0000052' },
  [ROUTER.CLOCKINOUT]: { gnb: 'M0000051', snb: 'M0000053' },
  [ROUTER.STAFF_MANAGEMENT_LOG]: { gnb: 'M0000051', snb: 'M0000038' },

  // Reports
  [ROUTER.REPORTS_INSIGHTS]: { gnb: 'M0000054', snb: 'M0000055' },
  [ROUTER.REPORTS_REPORTS]: { gnb: 'M0000054', snb: 'M0000056' },

  // 디자인 시스템 (Design System)
  [ROUTER.DESIGN_SYSTEM_TOAST]: { gnb: 'M0000060', snb: 'M0000061' },
  [ROUTER.DESIGN_SYSTEM_MODAL]: { gnb: 'M0000060', snb: 'M0000062' },
  [ROUTER.DESIGN_SYSTEM_BUTTON]: { gnb: 'M0000060', snb: 'M0000063' },
  [ROUTER.DESIGN_SYSTEM_FORM]: { gnb: 'M0000060', snb: 'M0000064' },

  // 설정 (Settings)
  [ROUTER.SCHOOL_SETUP]: { gnb: 'M0000034', snb: 'M0000049' },
  [ROUTER.SETTINGS_PAYMENTS]: { gnb: 'M0000034', snb: 'M0000046' },
  [ROUTER.COMMUNICATION]: { gnb: 'M0000034', snb: 'M0000048' },
  [ROUTER.SYSTEM_SECURITY]: { gnb: 'M0000034', snb: 'M0000047' },
  [ROUTER.SUB_BILLING]: { gnb: 'M0000034', snb: 'M0000050' },
};