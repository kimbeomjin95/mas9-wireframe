import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Alert,
  Fab,
  Slide,
} from '@mui/material';
import { Plus, ArrowUp } from 'lucide-react';
import { WireframeRequestForm } from '../components/wireframe/WireframeRequestForm';
import { CodeDisplay } from '../components/wireframe/CodeDisplay';
import { wireframeService } from '../services/wireframe';

interface WireframeRequestData {
  description: string;
  componentType: 'page' | 'component' | 'form' | 'dashboard' | 'modal';
  includeStyles: boolean;
  includeInteractions: boolean;
  uiLibrary: 'mui' | 'antd' | 'chakra';
}

interface GeneratedResult {
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

export const WireframePage: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<GeneratedResult | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGenerateWireframe = async (formData: WireframeRequestData) => {
    setIsGenerating(true);
    setError(null);
    setGeneratedResult(null);

    try {
      const result = await wireframeService.generateWireframe({
        description: formData.description,
        componentType: formData.componentType,
        includeStyles: formData.includeStyles,
        includeInteractions: formData.includeInteractions,
        uiLibrary: formData.uiLibrary,
      });

      setGeneratedResult(result);
      
      // 이력에 저장
      wireframeService.saveToHistory(result);

      // 결과가 생성되면 스크롤 다운
      setTimeout(() => {
        const codeSection = document.getElementById('generated-code-section');
        if (codeSection) {
          codeSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '화면 생성 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Wireframe generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearError = () => {
    setError(null);
  };

  const handleSaveResult = () => {
    if (generatedResult) {
      // 이미 이력에 저장되어 있으므로 사용자에게 저장 완료 알림
      alert('결과가 이력에 저장되었습니다!');
    }
  };

  const handlePreviewResult = () => {
    if (generatedResult) {
      // 새 탭에서 코드 미리보기 (간단한 구현)
      const previewWindow = window.open('', '_blank');
      if (previewWindow) {
        previewWindow.document.write(`
          <html>
            <head>
              <title>Generated Component Preview</title>
              <style>
                body { 
                  font-family: 'Roboto', sans-serif; 
                  margin: 20px;
                  background-color: #f5f5f5;
                }
                pre {
                  background: #1e1e1e;
                  color: #d4d4d4;
                  padding: 20px;
                  border-radius: 8px;
                  overflow: auto;
                  font-family: 'Fira Code', monospace;
                  font-size: 14px;
                  line-height: 1.5;
                }
                .header {
                  background: white;
                  padding: 20px;
                  border-radius: 8px;
                  margin-bottom: 20px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Generated Component: ${generatedResult.description}</h1>
                <p><strong>Type:</strong> ${generatedResult.componentType}</p>
                <p><strong>Generated:</strong> ${new Date(generatedResult.timestamp).toLocaleString('ko-KR')}</p>
                <p><strong>Tokens Used:</strong> ${generatedResult.tokensUsed.input + generatedResult.tokensUsed.output}</p>
              </div>
              <pre><code>${generatedResult.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </body>
          </html>
        `);
        previewWindow.document.close();
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getValidationResult = () => {
    if (!generatedResult) return undefined;
    
    return wireframeService.validateGeneratedCode(generatedResult.code);
  };

  const getComponentName = () => {
    if (!generatedResult) return 'GeneratedComponent';
    
    return generatedResult.description
      .replace(/[^a-zA-Z0-9가-힣\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[가-힣]/g, '') // 한글 제거
      .concat('Component') || 'GeneratedComponent';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        {/* 페이지 헤더 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            AI 화면설계 생성
          </Typography>
          <Typography variant="body1" color="text.secondary">
            원하는 화면이나 컴포넌트를 설명하면 AI가 Material-UI 기반의 React 컴포넌트를 생성합니다.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 왼쪽: 요청 폼 */}
          <Grid item xs={12} lg={6}>
            <WireframeRequestForm
              onSubmit={handleGenerateWireframe}
              isLoading={isGenerating}
              error={error}
              onClearError={handleClearError}
            />
          </Grid>

          {/* 오른쪽: 생성 결과 */}
          <Grid item xs={12} lg={6}>
            {isGenerating && (
              <Alert 
                severity="info" 
                sx={{ 
                  mb: 2,
                  '& .MuiAlert-message': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      border: 2,
                      borderColor: 'info.main',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}
                  />
                  AI가 화면을 생성하고 있습니다...
                </Box>
              </Alert>
            )}

            {generatedResult && (
              <Box id="generated-code-section">
                <CodeDisplay
                  code={generatedResult.code}
                  componentName={getComponentName()}
                  description={generatedResult.description}
                  tokensUsed={generatedResult.tokensUsed}
                  validationResult={getValidationResult()}
                  onPreview={handlePreviewResult}
                  onSave={handleSaveResult}
                />
              </Box>
            )}

            {!generatedResult && !isGenerating && (
              <Box
                sx={{
                  minHeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 2,
                  borderColor: 'divider',
                  borderStyle: 'dashed',
                  borderRadius: 2,
                  color: 'text.secondary',
                }}
              >
                <Box textAlign="center">
                  <Plus size={48} style={{ opacity: 0.5 }} />
                  <Typography variant="h6" sx={{ mt: 2, opacity: 0.7 }}>
                    생성된 코드가 여기에 표시됩니다
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.5 }}>
                    좌측 폼을 작성하고 "화면 생성하기" 버튼을 클릭하세요
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* 도움말 섹션 */}
        {!generatedResult && (
          <Box sx={{ mt: 6 }}>
            <Alert severity="info">
              <Typography variant="subtitle2" gutterBottom>
                💡 효과적인 화면 생성을 위한 팁
              </Typography>
              <Typography variant="body2" component="div">
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li><strong>구체적인 설명:</strong> "로그인 폼"보다는 "이메일과 비밀번호 입력이 있는 로그인 폼, 로그인 버튼과 회원가입 링크 포함"</li>
                  <li><strong>UI 요소 명시:</strong> 필요한 버튼, 입력 필드, 카드, 테이블 등을 구체적으로 언급</li>
                  <li><strong>레이아웃 구조:</strong> "2열 그리드", "카드 형태", "사이드바 포함" 등 레이아웃 정보 포함</li>
                  <li><strong>기능 요구사항:</strong> "검색 기능", "필터링", "정렬" 등 인터랙션 요구사항 명시</li>
                </ul>
              </Typography>
            </Alert>
          </Box>
        )}

        {/* 맨 위로 스크롤 버튼 */}
        <Slide direction="up" in={showScrollTop} mountOnEnter unmountOnExit>
          <Fab
            size="small"
            color="primary"
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <ArrowUp size={20} />
          </Fab>
        </Slide>
    </Box>
  );
};