import React, { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Chip,
  Alert,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  Copy,
  Download,
  Play,
  Code,
  Eye,
  FileText,
  Check,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';

interface CodeDisplayProps {
  code: string;
  componentName?: string;
  description?: string;
  language?: string;
  tokensUsed?: {
    input: number;
    output: number;
  };
  validationResult?: {
    isValid: boolean;
    errors: string[];
  };
  onPreview?: () => void;
  onSave?: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`code-tabpanel-${index}`}
    aria-labelledby={`code-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

export const CodeDisplay: React.FC<CodeDisplayProps> = ({
  code,
  componentName = 'GeneratedComponent',
  description,
  language = 'typescript',
  tokensUsed,
  validationResult,
  onPreview,
  onSave,
}) => {
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${componentName}.tsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatCode = (rawCode: string): string => {
    // 간단한 코드 포맷팅 (들여쓰기 정리)
    const lines = rawCode.split('\n');
    let indentLevel = 0;
    
    return lines.map(line => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('}') && !trimmedLine.includes('{')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      const formattedLine = '  '.repeat(indentLevel) + trimmedLine;
      
      if (trimmedLine.includes('{') && !trimmedLine.includes('}')) {
        indentLevel++;
      }
      
      return formattedLine;
    }).join('\n');
  };

  const getCodeStats = () => {
    const lines = code.split('\n').length;
    const characters = code.length;
    const words = code.split(/\s+/).length;
    
    return { lines, characters, words };
  };

  const stats = getCodeStats();

  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code size={24} />
              <Typography variant="h6">생성된 코드</Typography>
              {validationResult && (
                <Chip
                  size="small"
                  label={validationResult.isValid ? '유효함' : '검토 필요'}
                  color={validationResult.isValid ? 'success' : 'warning'}
                  icon={validationResult.isValid ? <Check size={16} /> : <AlertTriangle size={16} />}
                />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={copiedToClipboard ? '복사됨!' : '클립보드에 복사'}>
                <IconButton onClick={handleCopyToClipboard} size="small">
                  {copiedToClipboard ? <Check size={18} /> : <Copy size={18} />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="파일로 다운로드">
                <IconButton onClick={handleDownload} size="small">
                  <Download size={18} />
                </IconButton>
              </Tooltip>
              
              {onPreview && (
                <Tooltip title="미리보기">
                  <IconButton onClick={onPreview} size="small">
                    <Eye size={18} />
                  </IconButton>
                </Tooltip>
              )}
              
              {onSave && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={onSave}
                  startIcon={<FileText size={16} />}
                >
                  저장
                </Button>
              )}
            </Box>
          </Box>
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {componentName}.tsx
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {stats.lines}줄 • {stats.characters}자
            </Typography>
            {tokensUsed && (
              <Typography variant="caption" color="text.secondary">
                토큰: {tokensUsed.input + tokensUsed.output}개 사용
              </Typography>
            )}
          </Box>
        }
      />
      
      <CardContent sx={{ p: 0 }}>
        {/* 탭 헤더 */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ px: 2 }}
          >
            <Tab label="코드" icon={<Code size={16} />} iconPosition="start" />
            <Tab label="정보" icon={<FileText size={16} />} iconPosition="start" />
            {validationResult && !validationResult.isValid && (
              <Tab label="검증 결과" icon={<AlertTriangle size={16} />} iconPosition="start" />
            )}
          </Tabs>
        </Box>

        {/* 코드 탭 */}
        <TabPanel value={activeTab} index={0}>
          <Box sx={{ position: 'relative' }}>
            <Box
              component="pre"
              ref={codeRef}
              sx={{
                m: 0,
                p: 3,
                bgcolor: '#1e1e1e',
                color: '#d4d4d4',
                fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                overflow: 'auto',
                maxHeight: 600,
                '& .keyword': { color: '#569cd6' },
                '& .string': { color: '#ce9178' },
                '& .comment': { color: '#6a9955', fontStyle: 'italic' },
              }}
            >
              <code>{formatCode(code)}</code>
            </Box>
            
            {/* 복사 성공 알림 */}
            {copiedToClipboard && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'success.main',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.875rem',
                }}
              >
                <Check size={16} />
                클립보드에 복사됨
              </Box>
            )}
          </Box>
        </TabPanel>

        {/* 정보 탭 */}
        <TabPanel value={activeTab} index={1}>
          <Box sx={{ p: 3 }}>
            {description && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>설명</Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Box>
            )}
            
            <Typography variant="h6" gutterBottom>코드 통계</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">줄 수</Typography>
                <Typography variant="h6">{stats.lines}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">문자 수</Typography>
                <Typography variant="h6">{stats.characters.toLocaleString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">단어 수</Typography>
                <Typography variant="h6">{stats.words.toLocaleString()}</Typography>
              </Box>
              {tokensUsed && (
                <Box>
                  <Typography variant="body2" color="text.secondary">사용 토큰</Typography>
                  <Typography variant="h6">{(tokensUsed.input + tokensUsed.output).toLocaleString()}</Typography>
                </Box>
              )}
            </Box>

            {tokensUsed && (
              <Box>
                <Typography variant="h6" gutterBottom>토큰 사용량</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Chip label={`입력: ${tokensUsed.input}`} variant="outlined" size="small" />
                  <Chip label={`출력: ${tokensUsed.output}`} variant="outlined" size="small" />
                </Box>
              </Box>
            )}
          </Box>
        </TabPanel>

        {/* 검증 결과 탭 */}
        {validationResult && !validationResult.isValid && (
          <TabPanel value={activeTab} index={2}>
            <Box sx={{ p: 3 }}>
              <Alert severity="warning" sx={{ mb: 2 }}>
                생성된 코드에서 몇 가지 개선사항이 발견되었습니다.
              </Alert>
              
              <Typography variant="h6" gutterBottom>검증 결과</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {validationResult.errors.map((error, index) => (
                  <Alert key={index} severity="info" variant="outlined">
                    {error}
                  </Alert>
                ))}
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  위 항목들은 권장사항이며, 코드는 여전히 사용 가능합니다.
                  필요에 따라 수동으로 수정하실 수 있습니다.
                </Typography>
              </Box>
            </Box>
          </TabPanel>
        )}
      </CardContent>
    </Card>
  );
};