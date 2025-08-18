import { useTheme, useMediaQuery } from '@mui/material';

/**
 * 반응형 뷰포트 정보를 제공하는 훅
 */
export const useView = () => {
  const theme = useTheme();
  
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const isLg = useMediaQuery(theme.breakpoints.only('lg'));
  const isXl = useMediaQuery(theme.breakpoints.only('xl'));
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // xs, sm
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); // md
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // lg, xl
  
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isLgDown = useMediaQuery(theme.breakpoints.down('lg'));
  
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return {
    // 정확한 브레이크포인트
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    
    // 디바이스 카테고리
    IS_MOBILE: isMobile,
    IS_TABLET: isTablet,
    IS_DESKTOP: isDesktop,
    
    // 범위 기반
    isSmDown,
    isMdDown,
    isLgDown,
    isSmUp,
    isMdUp,
    isLgUp,
    
    // 현재 브레이크포인트 이름
    currentBreakpoint: isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : 'xl',
    
    // 유틸리티
    getColumns: (xs: number, sm?: number, md?: number, lg?: number, xl?: number) => ({
      xs,
      sm: sm ?? xs,
      md: md ?? sm ?? xs,
      lg: lg ?? md ?? sm ?? xs,
      xl: xl ?? lg ?? md ?? sm ?? xs,
    }),
  };
};