import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Stack,
  MenuItem
} from '@mui/material';
import { Label, CustomTextField, CustomSelect, DesignSystemButton, useView } from '@mas9/shared-ui';
import { ResponsiveContainer, ResponsiveSection } from '../../components/layout/ResponsiveContainer';

const FormPage: React.FC = () => {
  const { IS_MOBILE } = useView();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    category: '',
  });

  const handleChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    alert('폼이 제출되었습니다!');
  };

  return (
    <ResponsiveContainer>
      <ResponsiveSection>
        <Typography 
          variant={IS_MOBILE ? "h5" : "h4"} 
          component="h1" 
          gutterBottom 
          color="primary.main"
        >
          Design System - Forms
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ mb: 3, color: 'text.secondary', fontSize: IS_MOBILE ? '0.875rem' : '1rem' }}
        >
          공통 Form 컴포넌트들의 사용 예시입니다.
        </Typography>
      </ResponsiveSection>

      {/* Label Component Demo */}
      <ResponsiveSection>
        <Paper sx={{ p: IS_MOBILE ? 2 : 3, mb: IS_MOBILE ? 2 : 4 }}>
          <Typography variant={IS_MOBILE ? "subtitle1" : "h6"} gutterBottom>
            Label Component
          </Typography>
          <Grid container spacing={IS_MOBILE ? 2 : 3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={IS_MOBILE ? 1.5 : 2}>
                <Label label="기본 라벨" />
                <Label label="필수 라벨" required />
                <Label label="커스텀 스타일" fontWeight="bold" sx={{ color: 'primary.main' }} />
                <Label label="Subtitle2 변형" variant="subtitle2" />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="pre"
                sx={{
                  backgroundColor: 'grey.100',
                  p: IS_MOBILE ? 1.5 : 2,
                  borderRadius: 1,
                  fontSize: IS_MOBILE ? '0.65rem' : '0.75rem',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap'
                }}
              >
{`<Label label="기본 라벨" />
<Label label="필수 라벨" required />
<Label label="커스텀 스타일" 
       fontWeight="bold" 
       sx={{ color: 'primary.main' }} />
<Label label="Subtitle2 변형" 
       variant="subtitle2" />`}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </ResponsiveSection>

      {/* CustomTextField Component Demo */}
      <ResponsiveSection>
        <Paper sx={{ p: IS_MOBILE ? 2 : 3, mb: IS_MOBILE ? 2 : 4 }}>
          <Typography variant={IS_MOBILE ? "subtitle1" : "h6"} gutterBottom>
            CustomTextField Component
          </Typography>
          <Grid container spacing={IS_MOBILE ? 2 : 3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={IS_MOBILE ? 2 : 3}>
                <Box>
                  <Label label="기본 텍스트 필드" />
                  <CustomTextField
                    fullWidth
                    placeholder="텍스트를 입력하세요"
                  />
                </Box>
                
                <Box>
                  <Label label="에러 상태" required />
                  <CustomTextField
                    fullWidth
                    error
                    helperText="필수 입력 항목입니다"
                    placeholder="에러 상태 예시"
                  />
                </Box>
                
                <Box>
                  <Label label="비활성화 상태" />
                  <CustomTextField
                    fullWidth
                    disabled
                    value="비활성화된 텍스트"
                  />
                </Box>

                <Box>
                  <Label label="멀티라인 텍스트" />
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={IS_MOBILE ? 3 : 4}
                    placeholder="여러 줄 텍스트를 입력하세요"
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="pre"
                sx={{
                  backgroundColor: 'grey.100',
                  p: IS_MOBILE ? 1.5 : 2,
                  borderRadius: 1,
                  fontSize: IS_MOBILE ? '0.65rem' : '0.75rem',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap'
                }}
              >
{`<CustomTextField
  fullWidth
  placeholder="텍스트를 입력하세요"
/>

<CustomTextField
  fullWidth
  error
  helperText="필수 입력 항목입니다"
  placeholder="에러 상태 예시"
/>

<CustomTextField
  fullWidth
  disabled
  value="비활성화된 텍스트"
/>

<CustomTextField
  fullWidth
  multiline
  rows={4}
  placeholder="여러 줄 텍스트를 입력하세요"
/>`}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </ResponsiveSection>

      {/* Complete Form Example */}
      <ResponsiveSection>
        <Paper sx={{ p: IS_MOBILE ? 2 : 3 }}>
          <Typography variant={IS_MOBILE ? "subtitle1" : "h6"} gutterBottom>
            완전한 폼 예시
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={IS_MOBILE ? 2 : 3}>
              <Grid item xs={12} md={6}>
                <Label label="이름" required />
                <CustomTextField
                  fullWidth
                  value={formData.name}
                  onChange={handleChange('name')}
                  placeholder="이름을 입력하세요"
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Label label="이메일" required />
                <CustomTextField
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  placeholder="이메일을 입력하세요"
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Label label="전화번호" />
                <CustomTextField
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  placeholder="전화번호를 입력하세요"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Label label="카테고리" />
                <CustomSelect
                  value={formData.category}
                  onChange={handleChange('category')}
                  displayEmpty
                  formControlProps={{ fullWidth: true }}
                >
                  <MenuItem value="">선택하세요</MenuItem>
                  <MenuItem value="inquiry">문의</MenuItem>
                  <MenuItem value="support">지원</MenuItem>
                  <MenuItem value="feedback">피드백</MenuItem>
                </CustomSelect>
              </Grid>
              
              <Grid item xs={12}>
                <Label label="메시지" />
                <CustomTextField
                  fullWidth
                  multiline
                  rows={IS_MOBILE ? 3 : 4}
                  value={formData.message}
                  onChange={handleChange('message')}
                  placeholder="메시지를 입력하세요"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Stack 
                  direction={IS_MOBILE ? "column" : "row"} 
                  spacing={2} 
                  sx={{ mt: 2 }}
                >
                  <DesignSystemButton
                    type="submit"
                    color="primary"
                    size="medium"
                    sx={{ minWidth: IS_MOBILE ? '100%' : 120 }}
                  >
                    제출하기
                  </DesignSystemButton>
                  <DesignSystemButton
                    type="button"
                    color="secondary"
                    size="medium"
                    sx={{ minWidth: IS_MOBILE ? '100%' : 120 }}
                    onClick={() => setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      message: '',
                      category: '',
                    })}
                  >
                    초기화
                  </DesignSystemButton>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </ResponsiveSection>
    </ResponsiveContainer>
  );
};

export default FormPage;