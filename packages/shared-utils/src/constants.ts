export const API_ENDPOINTS = {
  CLAUDE: 'https://api.anthropic.com/v1/messages',
} as const;

export const APP_CONFIG = {
  name: 'MAS9 Wireframe',
  version: '0.0.0',
  description: 'MAS9 Wireframe',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  LAST_GENERATED_CODE: 'last_generated_code',
} as const;

export const SESSION_STORAGE_KEYS = {
  CURRENT_MENU: 'current_menu',
  GENERATED_WIREFRAME: 'generated_wireframe',
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  CLAUDE_API_ERROR: 'AI 서비스 오류가 발생했습니다.',
  CODE_GENERATION_FAILED: '코드 생성에 실패했습니다.',
} as const;
