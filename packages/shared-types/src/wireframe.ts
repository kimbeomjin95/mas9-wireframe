export type MenuType = 
  | 'dashboard'
  | 'users'
  | 'products'
  | 'orders'
  | 'analytics'
  | 'settings';

export interface MenuItem {
  id: MenuType;
  label: string;
  icon: string;
  path: string;
  description?: string;
}

export interface GeneratedCode {
  jsx: string;
  typescript?: string;
  css?: string;
  dependencies: string[];
}

export interface FeatureDescription {
  title: string;
  elements: {
    id: number;
    name: string;
    description: string;
    component: string;
  }[];
}

export interface WireframeState {
  selectedMenu: MenuType | null;
  generatedCode: GeneratedCode | null;
  description: FeatureDescription | null;
  isLoading: boolean;
  error: string | null;
}

export interface PromptTemplate {
  menuType: MenuType;
  systemPrompt: string;
  userPrompt: string;
  examples?: string[];
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: '대시보드', icon: 'BarChart3', path: '/dashboard' },
  { id: 'users', label: '사용자관리', icon: 'Users', path: '/users' },
  { id: 'products', label: '상품관리', icon: 'Package', path: '/products' },
  { id: 'orders', label: '주문관리', icon: 'ShoppingCart', path: '/orders' },
  { id: 'analytics', label: '통계', icon: 'BarChart3', path: '/analytics' },
  { id: 'settings', label: '설정', icon: 'Settings', path: '/settings' },
] as const;