import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Typography,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import { LoadingSpinner } from '@mas9/shared-ui';
import { useAuth } from '../../hooks/useAuth';
import type { LoginCredentials } from '@mas9/shared-types';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { handleLogin, isLoading, error, clearError } = useAuth();
  const theme = useTheme();
  
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: 'mas9test@gmail.com',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState<{
    email?: string;
    password?: string;
  }>({});

  /**
   * 입력값 변경 핸들러
   */
  const handleInputChange = (field: keyof LoginCredentials) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    
    setCredentials(prev => ({
      ...prev,
      [field]: value,
    }));

    // 에러 클리어
    if (error) {
      clearError();
    }

    // 실시간 유효성 검사
    setValidation(prev => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  /**
   * 필드별 유효성 검사
   */
  const validateField = (field: keyof LoginCredentials, value: string): string | undefined => {
    switch (field) {
      case 'email':
        if (!value) return '이메일을 입력해주세요.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return '올바른 이메일 형식을 입력해주세요.';
        }
        return undefined;
      
      case 'password':
        if (!value) return '패스워드를 입력해주세요.';
        // 패스워드 길이 제한 해제
        return undefined;
      
      default:
        return undefined;
    }
  };

  /**
   * 폼 유효성 검사
   */
  const validateForm = (): boolean => {
    const emailError = validateField('email', credentials.email);
    const passwordError = validateField('password', credentials.password);

    setValidation({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  /**
   * 로그인 제출 핸들러
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      console.log('❌ 폼 유효성 검사 실패');
      return;
    }

    console.log('📝 로그인 폼 제출:', credentials.email);
    const result = await handleLogin(credentials);
    console.log('📋 로그인 결과:', result);
    
    if (result.success) {
      console.log('✅ 로그인 성공 - onSuccess 콜백 호출');
      onSuccess?.();
    } else {
      console.log('❌ 로그인 실패:', result.error);
    }
  };

  /**
   * 패스워드 표시/숨김 토글
   */
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  /**
   * Enter 키 처리
   */
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event as any);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* 헤더 섹션 */}
      <Box
        sx={{ 
          textAlign: 'center', 
          pb: 2, 
          pt: 4, 
          px: 4,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
            mb: 3,
            border: `1px solid ${theme.palette.primary.main}20`,
          }}
        >
          <Sparkles size={28} color={theme.palette.primary.main} />
        </Box>
        <Typography 
          variant="h4" 
          component="h1" 
          fontWeight="700"
          sx={{ 
            mb: 1,
            color: theme.palette.text.primary,
          }}
        >
          관리자 로그인
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          AI Wireframe Generator에 로그인하세요
        </Typography>

        {/* 데모 모드 배지 */}
        {import.meta.env.VITE_DEMO_MODE === 'true' && (
          <Chip
            label="데모 모드"
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontSize: '0.75rem',
              backgroundColor: `${theme.palette.primary.main}08`,
              borderColor: `${theme.palette.primary.main}30`,
            }}
          />
        )}
      </Box>
      
      {/* 폼 섹션 */}
      <Box sx={{ px: 4, pb: 4 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {/* 에러 표시 */}
          {error && (
            <Alert 
              severity="error" 
              onClose={clearError}
              sx={{
                borderRadius: 2,
                backgroundColor: `${theme.palette.error.main}08`,
                border: `1px solid ${theme.palette.error.main}30`,
                '& .MuiAlert-message': {
                  fontSize: '0.875rem',
                },
              }}
            >
              {error.message}
            </Alert>
          )}

          {/* 이메일 입력 */}
          <TextField
            label="이메일"
            type="email"
            value={credentials.email}
            onChange={handleInputChange('email')}
            onKeyPress={handleKeyPress}
            error={!!validation.email}
            helperText={validation.email}
            disabled={isLoading}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.02)' 
                  : 'rgba(255,255,255,0.8)',
                '&:hover fieldset': {
                  borderColor: `${theme.palette.primary.main}60`,
                },
                '&.Mui-focused fieldset': {
                  borderWidth: '2px',
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail size={20} color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
            }}
          />

          {/* 패스워드 입력 */}
          <TextField
            label="패스워드"
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={handleInputChange('password')}
            onKeyPress={handleKeyPress}
            error={!!validation.password}
            helperText={validation.password}
            disabled={isLoading}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255,255,255,0.02)' 
                  : 'rgba(255,255,255,0.8)',
                '&:hover fieldset': {
                  borderColor: `${theme.palette.primary.main}60`,
                },
                '&.Mui-focused fieldset': {
                  borderWidth: '2px',
                  borderColor: theme.palette.primary.main,
                },
              },
              '& .MuiInputLabel-root': {
                fontWeight: 500,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock size={20} color={theme.palette.text.secondary} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                    edge="end"
                    sx={{
                      color: theme.palette.text.secondary,
                      '&:hover': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                      },
                    }}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isLoading || !!validation.email || !!validation.password}
            fullWidth
            startIcon={!isLoading ? <LogIn size={20} /> : null}
            sx={{ 
              mt: 2, 
              py: 1.8,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: '1rem',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 4px 20px ${theme.palette.primary.main}40`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                boxShadow: `0 6px 25px ${theme.palette.primary.main}50`,
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: theme.palette.action.disabledBackground,
                color: theme.palette.action.disabled,
              },
              transition: 'all 0.2s ease',
            }}
          >
            {isLoading ? (
              <>
                <LoadingSpinner size={20} message="" />
                <Typography component="span" sx={{ ml: 1 }}>
                  로그인 중...
                </Typography>
              </>
            ) : (
              '로그인'
            )}
          </Button>

          {/* 구분선 */}
          <Divider sx={{ my: 2 }}>
            <Typography variant="caption" color="text.secondary">
              계정 정보
            </Typography>
          </Divider>

          {/* 도움말 텍스트 */}
          <Box 
            sx={{ 
              textAlign: 'center',
              p: 3,
              borderRadius: 2,
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255,255,255,0.02)' 
                : `${theme.palette.primary.main}05`,
              border: `1px solid ${theme.palette.primary.main}15`,
            }}
          >
            {import.meta.env.VITE_DEMO_MODE === 'true' ? (
              <>
                <Typography 
                  variant="body2" 
                  fontWeight="600" 
                  color="primary" 
                  sx={{ mb: 2 }}
                >
                  🎭 데모 계정
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>이메일:</strong> admin@demo.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>패스워드:</strong> 123456
                </Typography>
              </>
            ) : (
              <>
                <Typography 
                  variant="body2" 
                  color="text.primary" 
                  fontWeight="500"
                  sx={{ mb: 1 }}
                >
                  🔐 관리자 전용
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  관리자 계정이 필요합니다.
                  <br />
                  계정 생성은 시스템 관리자에게 문의하세요.
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};