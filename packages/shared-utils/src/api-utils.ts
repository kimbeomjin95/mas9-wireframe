import type { ApiError, ClaudeApiRequest, ClaudeApiResponse } from '@mas9/shared-types';
import { ERROR_MESSAGES, API_ENDPOINTS } from './constants';

export class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL: string, headers: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...headers,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || this.getErrorMessage(response.status));
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 401:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case 403:
        return ERROR_MESSAGES.FORBIDDEN;
      case 404:
        return ERROR_MESSAGES.NOT_FOUND;
      case 500:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return ERROR_MESSAGES.NETWORK_ERROR;
    }
  }

  public get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      headers,
    });
  }

  public post<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  public put<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  public delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers,
    });
  }
}

export class ClaudeApiClient extends ApiClient {
  private isDemoMode: boolean;

  constructor(apiKey: string, isDemoMode: boolean = false) {
    super(API_ENDPOINTS.CLAUDE, {
      'anthropic-version': '2023-06-01',
      'x-api-key': apiKey,
    });
    this.isDemoMode = isDemoMode;
  }

  public async generateWireframe(
    description: string, 
    componentType: string = 'page',
    options: {
      includeStyles?: boolean;
      includeInteractions?: boolean;
      uiLibrary?: 'mui' | 'antd' | 'chakra';
    } = {}
  ): Promise<ClaudeApiResponse> {
    const {
      includeStyles = true,
      includeInteractions = true,
      uiLibrary = 'mui'
    } = options;

    if (this.isDemoMode) {
      return this.generateDemoResponse(description, componentType, options);
    }

    const prompt = this.buildWireframePrompt(description, componentType, {
      includeStyles,
      includeInteractions,
      uiLibrary
    });

    const request: ClaudeApiRequest = {
      model: 'claude-3-haiku-20240307',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      system: 'You are an expert React developer specializing in Material-UI components and modern frontend development patterns.'
    };

    try {
      return await this.post<ClaudeApiResponse>('', request);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.CLAUDE_API_ERROR);
    }
  }

  private buildWireframePrompt(
    description: string,
    componentType: string,
    options: {
      includeStyles: boolean;
      includeInteractions: boolean;
      uiLibrary: string;
    }
  ): string {
    const basePrompt = `
Create a React TypeScript component for the following ${componentType}:

**Description:** ${description}

**Requirements:**
- Use Material-UI (MUI) components
- Follow TypeScript best practices
- Use modern React patterns (hooks, functional components)
- Include proper type definitions
- Make it responsive using MUI's Grid and breakpoint system
- Follow Korean UI/UX conventions where applicable
`;

    let additionalRequirements = '';
    
    if (options.includeStyles) {
      additionalRequirements += `
- Include comprehensive styling using MUI's sx prop or styled components
- Use consistent color palette and typography
- Ensure proper spacing and layout
`;
    }

    if (options.includeInteractions) {
      additionalRequirements += `
- Include necessary event handlers and state management
- Add form validation where applicable
- Implement loading states and error handling
`;
    }

    const structureGuidelines = `
**Code Structure:**
1. Import statements (React, MUI components, types)
2. Type definitions (interfaces/types)
3. Component implementation
4. Export statement

**Output Format:**
Please provide ONLY the React component code without markdown formatting or explanations.
The code should be ready to use in a TypeScript React application.
`;

    return basePrompt + additionalRequirements + structureGuidelines;
  }

  private async generateDemoResponse(
    description: string,
    componentType: string,
    options: any
  ): Promise<ClaudeApiResponse> {
    // 데모 모드에서 시뮬레이션된 응답 생성
    await new Promise(resolve => setTimeout(resolve, 1500)); // API 호출 시뮬레이션

    const demoCode = this.generateDemoCode(description, componentType);

    return {
      id: `demo-${Date.now()}`,
      type: 'message',
      role: 'assistant',
      content: [
        {
          type: 'text',
          text: demoCode
        }
      ],
      model: 'claude-3-haiku-20240307',
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: {
        input_tokens: 200,
        output_tokens: 800
      }
    };
  }

  private generateDemoCode(description: string, componentType: string): string {
    const componentName = this.generateComponentName(description);
    
    return `import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface ${componentName}Props {
  title?: string;
  onAction?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const ${componentName}: React.FC<${componentName}Props> = ({ 
  title = "${description}", 
  onAction 
}) => {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onAction?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                데모 콘텐츠
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                이것은 "${description}"에 대한 데모 컴포넌트입니다.
                실제 프로젝트에서는 Claude API를 통해 더 정확한 컴포넌트가 생성됩니다.
              </Typography>
              <Button
                variant="contained"
                onClick={handleAction}
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? '처리 중...' : '액션 실행'}
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box 
            sx={{ 
              minHeight: 200,
              bgcolor: 'grey.100',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3
            }}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center">
              추가 콘텐츠 영역
              <br />
              실제 구현에서는 요구사항에 맞는 UI가 생성됩니다.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};`;
  }

  private generateComponentName(description: string): string {
    return description
      .replace(/[^a-zA-Z0-9가-힣\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[가-힣]/g, '') // 한글 제거
      .concat('Component');
  }

  public async generateCode(request: ClaudeApiRequest): Promise<ClaudeApiResponse> {
    try {
      return await this.post<ClaudeApiResponse>('', request);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.CLAUDE_API_ERROR);
    }
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'API_ERROR',
    };
  }
  
  return {
    message: ERROR_MESSAGES.SERVER_ERROR,
    code: 'UNKNOWN_ERROR',
  };
};