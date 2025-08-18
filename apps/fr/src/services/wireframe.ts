import { ClaudeApiClient } from '@mas9/shared-utils';
import type { ClaudeApiResponse } from '@mas9/shared-types';

interface WireframeGenerationRequest {
  description: string;
  componentType: 'page' | 'component' | 'form' | 'dashboard' | 'modal';
  includeStyles: boolean;
  includeInteractions: boolean;
  uiLibrary: 'mui' | 'antd' | 'chakra';
}

interface WireframeGenerationResult {
  id: string;
  code: string;
  description: string;
  componentType: string;
  timestamp: string;
  tokensUsed: {
    input: number;
    output: number;
  };
}

export class WireframeService {
  private claudeClient: ClaudeApiClient;
  private isDemoMode: boolean;

  constructor() {
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY || '';
    this.isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
    this.claudeClient = new ClaudeApiClient(apiKey, this.isDemoMode);
  }

  /**
   * AI를 사용하여 화면설계 코드 생성
   */
  async generateWireframe(request: WireframeGenerationRequest): Promise<WireframeGenerationResult> {
    try {
      const response = await this.claudeClient.generateWireframe(
        request.description,
        request.componentType,
        {
          includeStyles: request.includeStyles,
          includeInteractions: request.includeInteractions,
          uiLibrary: request.uiLibrary,
        }
      );

      return this.parseWireframeResponse(response, request);
    } catch (error) {
      console.error('Wireframe generation error:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : '화면 생성 중 오류가 발생했습니다.'
      );
    }
  }

  /**
   * Claude API 응답을 파싱하여 결과 객체 생성
   */
  private parseWireframeResponse(
    response: ClaudeApiResponse, 
    request: WireframeGenerationRequest
  ): WireframeGenerationResult {
    const content = response.content?.[0];
    
    if (!content || content.type !== 'text') {
      throw new Error('예상되지 않은 응답 형식입니다.');
    }

    const code = this.cleanGeneratedCode(content.text);

    return {
      id: response.id,
      code,
      description: request.description,
      componentType: request.componentType,
      timestamp: new Date().toISOString(),
      tokensUsed: {
        input: response.usage.input_tokens,
        output: response.usage.output_tokens,
      },
    };
  }

  /**
   * 생성된 코드를 정리하고 포맷팅
   */
  private cleanGeneratedCode(code: string): string {
    // 마크다운 코드 블록 제거
    let cleanCode = code.replace(/```[\w]*\n/g, '').replace(/```/g, '');
    
    // 불필요한 설명 텍스트 제거 (간단한 패턴 매칭)
    const codeStartPattern = /import\s+React/;
    const match = cleanCode.match(codeStartPattern);
    
    if (match) {
      const startIndex = cleanCode.indexOf(match[0]);
      cleanCode = cleanCode.substring(startIndex);
    }

    // 공백과 개행 정리
    cleanCode = cleanCode.trim();
    
    return cleanCode;
  }

  /**
   * 생성된 코드의 구문 검사 (기본적인 검증)
   */
  validateGeneratedCode(code: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // 기본적인 React 컴포넌트 구조 검사
    if (!code.includes('import React')) {
      errors.push('React import 구문이 누락되었습니다.');
    }

    if (!code.includes('export')) {
      errors.push('컴포넌트 export 구문이 누락되었습니다.');
    }

    // TypeScript 인터페이스/타입 검사
    if (!code.includes('interface') && !code.includes('type')) {
      errors.push('TypeScript 타입 정의가 권장됩니다.');
    }

    // MUI 컴포넌트 import 검사
    if (!code.includes('@mui/material')) {
      errors.push('Material-UI 컴포넌트 import가 누락되었습니다.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * 생성 이력 저장 (로컬 스토리지 사용)
   */
  saveToHistory(result: WireframeGenerationResult): void {
    try {
      const history = this.getHistory();
      const updatedHistory = [result, ...history].slice(0, 50); // 최대 50개 보관
      
      localStorage.setItem('wireframe_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.warn('이력 저장에 실패했습니다:', error);
    }
  }

  /**
   * 생성 이력 조회
   */
  getHistory(): WireframeGenerationResult[] {
    try {
      const historyJson = localStorage.getItem('wireframe_history');
      return historyJson ? JSON.parse(historyJson) : [];
    } catch (error) {
      console.warn('이력 조회에 실패했습니다:', error);
      return [];
    }
  }

  /**
   * 특정 이력 항목 삭제
   */
  removeFromHistory(id: string): void {
    try {
      const history = this.getHistory();
      const updatedHistory = history.filter(item => item.id !== id);
      
      localStorage.setItem('wireframe_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.warn('이력 삭제에 실패했습니다:', error);
    }
  }

  /**
   * 전체 이력 삭제
   */
  clearHistory(): void {
    try {
      localStorage.removeItem('wireframe_history');
    } catch (error) {
      console.warn('이력 삭제에 실패했습니다:', error);
    }
  }

  /**
   * API 키 유효성 확인
   */
  async validateApiKey(): Promise<boolean> {
    if (this.isDemoMode) {
      return true;
    }

    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
    
    if (!apiKey || apiKey.trim() === '') {
      return false;
    }

    // 간단한 API 호출로 키 유효성 검사
    try {
      await this.claudeClient.generateWireframe(
        'test', 
        'component', 
        { includeStyles: false, includeInteractions: false }
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}

// 싱글톤 인스턴스
export const wireframeService = new WireframeService();