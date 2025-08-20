import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Switch, 
  FormControlLabel,
  Divider,
  Stack
} from '@mui/material';
import { DesignSystemButton, DesignSystemButtonColor, DesignSystemButtonSize, useView } from '@mas9/shared-ui';
import { ResponsiveContainer, ResponsiveSection } from '../../components/layout/ResponsiveContainer';

const ButtonPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { IS_MOBILE } = useView();
  
  const colors: DesignSystemButtonColor[] = ['primary', 'secondary', 'tertiary', 'quaternary', 'text', 'textAccent'];
  const sizes: DesignSystemButtonSize[] = ['small', 'medium', 'large'];

  const colorDescriptions = {
    primary: '메인 액션 버튼',
    secondary: '보조 액션 버튼', 
    tertiary: '덜 중요한 액션 버튼',
    quaternary: 'Tertiary 액션의 보조 액션 버튼',
    text: '텍스트만 있는 버튼',
    textAccent: '강조된 텍스트 버튼'
  };

  const sizeDescriptions = {
    small: '36px | Radius: 5 | padding: 24, 8',
    medium: '40px | Radius: 5 | padding: 32, 8', 
    large: '50px | Radius: 10 | padding: 40, 16'
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
          Design System - Buttons
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ mb: 3, color: 'text.secondary', fontSize: IS_MOBILE ? '0.875rem' : '1rem' }}
        >
          피그마 디자인 시스템을 기반으로 제작된 공통 버튼 컴포넌트입니다.
        </Typography>
      </ResponsiveSection>

      <ResponsiveSection>
        <Paper sx={{ p: IS_MOBILE ? 2 : 3, mb: IS_MOBILE ? 2 : 4 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
              />
            }
            label="Disabled 상태 테스트"
            sx={{ mb: 2 }}
          />
        </Paper>
      </ResponsiveSection>

      {sizes.map((size) => (
        <ResponsiveSection key={size}>
          <Paper sx={{ p: IS_MOBILE ? 2 : 3, mb: IS_MOBILE ? 2 : 4 }}>
            <Typography 
              variant={IS_MOBILE ? "h6" : "h5"} 
              gutterBottom 
              sx={{ textTransform: 'capitalize' }}
            >
              {size.toUpperCase()} ({sizeDescriptions[size]})
            </Typography>
            
            <Grid container spacing={IS_MOBILE ? 2 : 3}>
              {colors.map((color) => (
                <Grid 
                  item 
                  xs={6} 
                  sm={6} 
                  md={4} 
                  lg={2} 
                  key={color}
                >
                  <Stack spacing={IS_MOBILE ? 1 : 2} alignItems="center">
                    <Typography 
                      variant={IS_MOBILE ? "caption" : "subtitle2"}
                      align="center"
                      sx={{ 
                        textTransform: 'capitalize', 
                        minHeight: IS_MOBILE ? 30 : 40,
                        fontSize: IS_MOBILE ? '0.75rem' : undefined
                      }}
                    >
                      {color.replace(/([A-Z])/g, ' $1').trim()}
                      <br />
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ fontSize: IS_MOBILE ? '0.65rem' : '0.75rem' }}
                      >
                        {colorDescriptions[color]}
                      </Typography>
                    </Typography>
                    
                    <DesignSystemButton
                      color={color}
                      size={size}
                      disabled={isDisabled}
                      sx={{ 
                        minWidth: IS_MOBILE ? 80 : 120,
                        fontSize: IS_MOBILE && size === 'large' ? '0.875rem' : undefined
                      }}
                    >
                      Button
                    </DesignSystemButton>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            
            {size !== 'small' && <Divider sx={{ mt: 3 }} />}
          </Paper>
        </ResponsiveSection>
      ))}

      <ResponsiveSection>
        <Paper sx={{ p: IS_MOBILE ? 2 : 3, mt: IS_MOBILE ? 2 : 4 }}>
          <Typography variant={IS_MOBILE ? "subtitle1" : "h6"} gutterBottom>
            Usage Example
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: 'grey.100',
              p: IS_MOBILE ? 1.5 : 2,
              borderRadius: 1,
              fontSize: IS_MOBILE ? '0.75rem' : '0.875rem',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all'
            }}
          >
{`import { DesignSystemButton } from '@mas9/shared-ui';

// 기본 사용법
<DesignSystemButton color="primary" size="medium">
  Primary Button
</DesignSystemButton>

// 다양한 색상과 사이즈
<DesignSystemButton color="secondary" size="large">
  Secondary Button  
</DesignSystemButton>

<DesignSystemButton color="tertiary" size="small">
  Tertiary Button
</DesignSystemButton>

// Disabled 상태
<DesignSystemButton color="primary" disabled>
  Disabled Button
</DesignSystemButton>`}
          </Box>
        </Paper>
      </ResponsiveSection>
    </ResponsiveContainer>
  );
};

export default ButtonPage;