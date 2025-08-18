import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
  Box,
  Typography,
  Chip,
  Alert,
  Collapse,
  Grid,
} from '@mui/material';
import {
  Wand2,
  Settings,
  Code,
  Palette,
  MousePointer,
  FileText,
  Layout,
  Monitor,
  Smartphone,
  AlertCircle,
} from 'lucide-react';
import { LoadingSpinner } from '@mas9/shared-ui';

interface WireframeRequestFormData {
  description: string;
  componentType: 'page' | 'component' | 'form' | 'dashboard' | 'modal';
  includeStyles: boolean;
  includeInteractions: boolean;
  uiLibrary: 'mui' | 'antd' | 'chakra';
}

interface WireframeRequestFormProps {
  onSubmit: (data: WireframeRequestFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onClearError?: () => void;
}

const COMPONENT_TYPES = [
  {
    value: 'page',
    label: '전체 페이지',
    description: '완전한 페이지 레이아웃',
    icon: <Monitor size={20} />,
  },
  {
    value: 'component',
    label: '재사용 컴포넌트',
    description: '독립적인 UI 컴포넌트',
    icon: <Layout size={20} />,
  },
  {
    value: 'form',
    label: '폼 컴포넌트',
    description: '입력 폼 및 유효성 검사',
    icon: <FileText size={20} />,
  },
  {
    value: 'dashboard',
    label: '대시보드',
    description: '데이터 시각화 대시보드',
    icon: <Smartphone size={20} />,
  },
  {
    value: 'modal',
    label: '모달/다이얼로그',
    description: '팝업 및 오버레이',
    icon: <AlertCircle size={20} />,
  },
] as const;

const UI_LIBRARIES = [
  { value: 'mui', label: 'Material-UI', description: '구글 머티리얼 디자인' },
  { value: 'antd', label: 'Ant Design', description: '앤트 디자인 시스템' },
  { value: 'chakra', label: 'Chakra UI', description: '간단하고 모듈러한 UI' },
] as const;

export const WireframeRequestForm: React.FC<WireframeRequestFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  onClearError,
}) => {
  const [formData, setFormData] = useState<WireframeRequestFormData>({
    description: '',
    componentType: 'page',
    includeStyles: true,
    includeInteractions: true,
    uiLibrary: 'mui',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [validation, setValidation] = useState<{ description?: string }>({});

  const handleInputChange = (field: keyof WireframeRequestFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.type === 'checkbox' 
      ? (event.target as HTMLInputElement).checked
      : event.target.value;

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // 실시간 유효성 검사
    if (field === 'description') {
      validateDescription(value as string);
    }

    // 에러 클리어
    if (error && onClearError) {
      onClearError();
    }
  };

  const validateDescription = (value: string) => {
    if (!value.trim()) {
      setValidation({ description: '화면 설명을 입력해주세요.' });
      return false;
    }
    
    if (value.trim().length < 10) {
      setValidation({ description: '더 구체적인 설명을 입력해주세요. (최소 10자)' });
      return false;
    }

    setValidation({});
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateDescription(formData.description)) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      // 에러는 부모 컴포넌트에서 처리
    }
  };

  const getSelectedComponentType = () => {
    return COMPONENT_TYPES.find(type => type.value === formData.componentType);
  };

  const isFormValid = formData.description.trim().length >= 10 && !validation.description;

  return (
    <Card elevation={2}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Wand2 size={24} />
            <Typography variant="h6">AI 화면설계 생성</Typography>
          </Box>
        }
        subheader="원하는 화면의 설명을 입력하면 AI가 React 컴포넌트를 생성합니다"
      />
      
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 에러 표시 */}
          {error && (
            <Alert 
              severity="error" 
              onClose={onClearError}
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}

          {/* 화면 설명 입력 */}
          <TextField
            label="화면 설명"
            placeholder="예: 사용자 프로필 편집 페이지, 상품 목록 카드 컴포넌트, 로그인 폼 등..."
            value={formData.description}
            onChange={handleInputChange('description')}
            error={!!validation.description}
            helperText={validation.description || '생성하고 싶은 화면이나 컴포넌트를 구체적으로 설명해주세요'}
            disabled={isLoading}
            multiline
            rows={3}
            fullWidth
            required
          />

          {/* 컴포넌트 타입 선택 */}
          <FormControl component="fieldset" disabled={isLoading}>
            <FormLabel component="legend">컴포넌트 타입</FormLabel>
            <RadioGroup
              value={formData.componentType}
              onChange={handleInputChange('componentType')}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={1}>
                {COMPONENT_TYPES.map((type) => (
                  <Grid item xs={12} sm={6} key={type.value}>
                    <FormControlLabel
                      value={type.value}
                      control={<Radio />}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {type.icon}
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {type.label}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {type.description}
                            </Typography>
                          </Box>
                        </Box>
                      }
                      sx={{
                        m: 0,
                        p: 1,
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'action.hover' },
                        ...(formData.componentType === type.value && {
                          bgcolor: 'primary.50',
                          borderColor: 'primary.main',
                        }),
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </FormControl>

          {/* 고급 옵션 토글 */}
          <Box>
            <Button
              variant="text"
              startIcon={<Settings size={18} />}
              onClick={() => setShowAdvanced(!showAdvanced)}
              sx={{ mb: 1 }}
            >
              고급 옵션 {showAdvanced ? '숨기기' : '보기'}
            </Button>

            <Collapse in={showAdvanced}>
              <Box sx={{ pl: 2, borderLeft: 2, borderColor: 'divider' }}>
                {/* 생성 옵션 */}
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend">생성 옵션</FormLabel>
                  <FormGroup sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.includeStyles}
                          onChange={handleInputChange('includeStyles')}
                          disabled={isLoading}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Palette size={16} />
                          <Typography variant="body2">상세한 스타일링 포함</Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.includeInteractions}
                          onChange={handleInputChange('includeInteractions')}
                          disabled={isLoading}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MousePointer size={16} />
                          <Typography variant="body2">인터랙션 및 이벤트 핸들러</Typography>
                        </Box>
                      }
                    />
                  </FormGroup>
                </FormControl>

                {/* UI 라이브러리 선택 */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">UI 라이브러리</FormLabel>
                  <RadioGroup
                    value={formData.uiLibrary}
                    onChange={handleInputChange('uiLibrary')}
                    sx={{ mt: 1 }}
                  >
                    {UI_LIBRARIES.map((lib) => (
                      <FormControlLabel
                        key={lib.value}
                        value={lib.value}
                        control={<Radio size="small" />}
                        label={
                          <Box>
                            <Typography variant="body2">{lib.label}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {lib.description}
                            </Typography>
                          </Box>
                        }
                        disabled={isLoading}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Collapse>
          </Box>

          {/* 선택된 설정 요약 */}
          <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              생성 설정 요약
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip 
                size="small" 
                label={getSelectedComponentType()?.label || ''}
                color="primary"
                variant="outlined"
              />
              <Chip 
                size="small" 
                label={UI_LIBRARIES.find(lib => lib.value === formData.uiLibrary)?.label}
                variant="outlined"
              />
              {formData.includeStyles && (
                <Chip size="small" label="스타일링" color="secondary" variant="outlined" />
              )}
              {formData.includeInteractions && (
                <Chip size="small" label="인터랙션" color="secondary" variant="outlined" />
              )}
            </Box>
          </Box>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading || !isFormValid}
            startIcon={isLoading ? <LoadingSpinner size={20} /> : <Code size={20} />}
            sx={{ py: 1.5 }}
          >
            {isLoading ? 'AI가 화면을 생성하고 있습니다...' : '화면 생성하기'}
          </Button>

          {/* 도움말 */}
          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="body2">
              <strong>💡 팁:</strong> 더 구체적인 설명일수록 원하는 결과를 얻을 수 있습니다. 
              색상, 레이아웃, 기능 등을 자세히 기술해보세요.
            </Typography>
          </Alert>
        </Box>
      </CardContent>
    </Card>
  );
};