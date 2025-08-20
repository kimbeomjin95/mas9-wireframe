/**
 * Box Shadow Constants
 * 일관된 shadow 스타일을 위한 상수 정의
 */

export const SHADOWS = {
  // Mobile Shadow Styles
  MOBILE: {
    LIGHT: '0 1px 3px rgba(0,0,0,0.1)',
    MEDIUM: '0 2px 8px rgba(0,0,0,0.12)',
    STRONG: '0 4px 16px rgba(0,0,0,0.15)',
  },
  
  // PC/Desktop Shadow Styles  
  PC: {
    LIGHT: '0 2px 4px rgba(0,0,0,0.08)',
    MEDIUM: '0 4px 12px rgba(0,0,0,0.1)',
    STRONG: '0 8px 24px rgba(0,0,0,0.12)',
  },
  
  // Hover States
  HOVER: {
    MOBILE: '0 4px 12px rgba(0,0,0,0.18)',
    PC: '0 6px 16px rgba(0,0,0,0.15)',
  },
  
  // Special Cases
  MODAL: '0 8px 32px rgba(0,0,0,0.2)',
  DROPDOWN: '0 4px 16px rgba(0,0,0,0.1)',
  FLOATING: '0 6px 20px rgba(0,0,0,0.08)',
} as const;

// Type definitions for better TypeScript support
export type ShadowLevel = 'LIGHT' | 'MEDIUM' | 'STRONG';
export type ShadowPlatform = 'MOBILE' | 'PC';