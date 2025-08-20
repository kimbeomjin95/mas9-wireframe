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
import { DesignSystemButton, DesignSystemButtonColor, DesignSystemButtonSize } from '@mas9/shared-ui';

const ButtonPage: React.FC = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  
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
    <Box sx={{ p: 3, maxWidth: 1200 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary.main">
        Design System - Buttons
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        피그마 디자인 시스템을 기반으로 제작된 공통 버튼 컴포넌트입니다.
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
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

      {sizes.map((size) => (
        <Paper key={size} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ textTransform: 'capitalize' }}>
            {size.toUpperCase()} ({sizeDescriptions[size]})
          </Typography>
          
          <Grid container spacing={3}>
            {colors.map((color) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={color}>
                <Stack spacing={2} alignItems="center">
                  <Typography 
                    variant="subtitle2" 
                    align="center"
                    sx={{ textTransform: 'capitalize', minHeight: 40 }}
                  >
                    {color.replace(/([A-Z])/g, ' $1').trim()}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {colorDescriptions[color]}
                    </Typography>
                  </Typography>
                  
                  <DesignSystemButton
                    color={color}
                    size={size}
                    disabled={isDisabled}
                    sx={{ minWidth: 120 }}
                  >
                    Button
                  </DesignSystemButton>
                </Stack>
              </Grid>
            ))}
          </Grid>
          
          {size !== 'small' && <Divider sx={{ mt: 3 }} />}
        </Paper>
      ))}

      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Usage Example
        </Typography>
        <Box
          component="pre"
          sx={{
            backgroundColor: 'grey.100',
            p: 2,
            borderRadius: 1,
            fontSize: '0.875rem',
            overflow: 'auto'
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
    </Box>
  );
};

export default ButtonPage;