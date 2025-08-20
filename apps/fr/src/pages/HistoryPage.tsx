import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Alert,
  Chip,
} from '@mui/material';
import { HistoryPanel } from '../components/wireframe/HistoryPanel';
import { CodeDisplay } from '../components/wireframe/CodeDisplay';
import { wireframeService } from '../services/wireframe';

interface WireframeHistoryItem {
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

export const HistoryPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<WireframeHistoryItem | null>(null);

  const handleSelectItem = (item: WireframeHistoryItem) => {
    setSelectedItem(item);
  };

  const handleReuseItem = (item: WireframeHistoryItem) => {
    // 재사용 시 와이어프레임 페이지로 이동하면서 데이터 전달
    // 현재는 alert으로 대체
    alert(`"${item.description}" 항목을 재사용합니다. AI 화면설계 페이지로 이동해서 해당 설명으로 새로 생성해보세요.`);
  };

  const handleSaveItem = () => {
    if (selectedItem) {
      alert('이미 이력에 저장된 항목입니다!');
    }
  };

  const handlePreviewItem = () => {
    if (selectedItem) {
      const previewWindow = window.open('', '_blank');
      if (previewWindow) {
        previewWindow.document.write(`
          <html>
            <head>
              <title>Generated Component Preview - ${selectedItem.description}</title>
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
                <h1>Generated Component: ${selectedItem.description}</h1>
                <p><strong>Type:</strong> ${selectedItem.componentType}</p>
                <p><strong>Generated:</strong> ${new Date(selectedItem.timestamp).toLocaleString('ko-KR')}</p>
                <p><strong>Tokens Used:</strong> ${selectedItem.tokensUsed.input + selectedItem.tokensUsed.output}</p>
              </div>
              <pre><code>${selectedItem.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </body>
          </html>
        `);
        previewWindow.document.close();
      }
    }
  };

  const getComponentName = (item: WireframeHistoryItem) => {
    return item.description
      .replace(/[^a-zA-Z0-9가-힣\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .replace(/[가-힣]/g, '')
      .concat('Component') || 'GeneratedComponent';
  };

  const getValidationResult = (item: WireframeHistoryItem) => {
    return wireframeService.validateGeneratedCode(item.code);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        {/* 페이지 헤더 */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            생성 이력
          </Typography>
          <Typography variant="body1" color="text.secondary">
            이전에 AI로 생성한 화면설계 코드들을 관리하고 재사용할 수 있습니다.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* 왼쪽: 이력 목록 */}
          <Grid item xs={12} lg={5}>
            <HistoryPanel
              onSelectItem={handleSelectItem}
              onReuseItem={handleReuseItem}
              selectedItemId={selectedItem?.id}
            />
          </Grid>

          {/* 오른쪽: 선택된 코드 표시 */}
          <Grid item xs={12} lg={7}>
            {selectedItem ? (
              <CodeDisplay
                code={selectedItem.code}
                componentName={getComponentName(selectedItem)}
                description={selectedItem.description}
                tokensUsed={selectedItem.tokensUsed}
                validationResult={getValidationResult(selectedItem)}
                onPreview={handlePreviewItem}
                onSave={handleSaveItem}
              />
            ) : (
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
                  <Typography variant="h6" sx={{ mb: 2, opacity: 0.7 }}>
                    이력 항목을 선택하세요
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.5 }}>
                    왼쪽 목록에서 항목을 클릭하면 코드가 표시됩니다
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* 도움말 섹션 */}
        <Box sx={{ mt: 4 }}>
          <Alert severity="info">
            <Typography variant="subtitle2" gutterBottom>
              💡 이력 관리 팁
            </Typography>
            <Typography variant="body2" component="div">
              <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                <li><strong>재사용:</strong> 이전에 생성한 코드를 기반으로 새로운 컴포넌트 생성</li>
                <li><strong>다운로드:</strong> 개별 컴포넌트를 TypeScript 파일로 저장</li>
                <li><strong>미리보기:</strong> 새 탭에서 코드 전체 내용 확인</li>
                <li><strong>자동 저장:</strong> AI로 생성된 모든 코드는 자동으로 이력에 저장됩니다</li>
              </ul>
            </Typography>
          </Alert>
        </Box>
    </Box>
  );
};