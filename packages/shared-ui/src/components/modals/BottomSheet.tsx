import 'react-spring-bottom-sheet/dist/style.css';

import { IconButton, Stack, Typography, Box } from '@mui/material';

import { BottomSheet as BottomSheetComponent } from 'react-spring-bottom-sheet';
import { X as CloseIcon } from 'lucide-react';
import { isSomeTruthy } from '../../utils/validation.util';
import { Loading } from '../elements/Loading';
import { ReactNode } from 'react';

export interface IBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  scrollLocking?: boolean;
  isClose?: boolean;
  defaultSnap?: number;
  isLoading?: boolean[] | undefined;
  actions?: ReactNode;
  zIndex?: number | null;
  skipInitialTransition?: boolean;
}

export const BottomSheet = ({
  open,
  onClose,
  children,
  title,
  scrollLocking = false,
  isClose = true,
  defaultSnap = 1,
  isLoading,
  actions,
  zIndex = null,
  skipInitialTransition = true,
}: IBottomSheetProps) => {
  return (
    <BottomSheetComponent
      initialFocusRef={false}
      open={open}
      onDismiss={isClose ? onClose : undefined}
      className={'auto-height-sheet'}
      style={{
        ...(zIndex && { zIndex }),
        // App에서 바텀시트 렌더링 컨텍스트가 다르므로 앱 환경에서만 z-index 옵션 추가
        ...((window as any).ReactNativeWebView && {
          zIndex: 1299,
        }),
        ...(!(window as any).ReactNativeWebView && {
          zIndex: 1100 + 1,
        }),
        position: 'relative',
        // zIndex: 1299,
      }}
      defaultSnap={defaultSnap}
      snapPoints={({ maxHeight }) => [maxHeight * defaultSnap]}
      header={
        <Stack direction={'row'} alignItems={'center'} paddingY={'24px'}>
          <Typography
            sx={{ flex: 1, textAlign: 'center' }}
            fontSize={'18px'}
            fontWeight={'600'}
          >
            {title}
          </Typography>
          {isClose && (
            <IconButton
              sx={{ position: 'absolute', right: '16px' }}
              onClick={onClose}
            >
              <CloseIcon size={20} />
            </IconButton>
          )}
        </Stack>
      }
      skipInitialTransition={skipInitialTransition}
      scrollLocking={scrollLocking}
    >
      {!isLoading || (Array.isArray(isLoading) && !isLoading.length)
        ? null
        : isSomeTruthy(isLoading) && <Loading isLoading />}

      <Box
        sx={{
          flex: 1,
          ...(actions && { paddingBottom: 0 }),
        }}
      >
        {children}
      </Box>

      {actions && (
        <Box
          sx={{
            padding: '16px',
            borderTop: '1px solid #E0E0E0',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {actions}
        </Box>
      )}
    </BottomSheetComponent>
  );
};
