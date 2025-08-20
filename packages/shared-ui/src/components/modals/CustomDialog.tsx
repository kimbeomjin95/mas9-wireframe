import {
  Box,
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material'
import { merge } from 'lodash'
import { ReactNode, useEffect, forwardRef } from 'react'
import { X as CloseIcon } from 'lucide-react'
import { Loading } from '../elements/Loading'
import { isSomeTruthy } from '../../utils/validation.util'

export interface CustomDialogProps {
  open: boolean
  title?: string
  children?: ReactNode
  sx?: SxProps
  size?: Breakpoint | false
  isBackDrop?: boolean
  isClose?: boolean
  isApp?: boolean
  isLoading?: boolean[] | undefined
  isForceDialog?: boolean
  actions?: ReactNode
  isHeader?: boolean
  isHeaderWhite?: boolean
  onClose(): void
  actionsSx?: SxProps
  fullScreen?: boolean
  zIndex?: number
}

const CustomDialog = forwardRef<HTMLDivElement, CustomDialogProps>(
  (
    {
      open,
      title,
      onClose,
      children,
      sx,
      size = 'md',
      isBackDrop = true,
      isClose = true,
      isApp = false,
      isLoading,
      isForceDialog = false,
      actions,
      isHeader = true,
      isHeaderWhite = false,
      actionsSx,
      fullScreen = false,
      zIndex,
    },
    ref,
  ) => {
    // 뒤로가기 시 모달 닫기 로직
    useEffect(() => {
      const handlePopState = () => {
        if (open && !isForceDialog) {
          onClose()
        }
      }
      window.addEventListener('popstate', handlePopState)
      return () => window.removeEventListener('popstate', handlePopState)
    }, [open, isForceDialog, onClose])

    return (
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth={size}
        scroll="paper"
        open={open}
        disableEscapeKeyDown={!isBackDrop}
        onClose={(_, reason) => {
          if (reason === 'backdropClick' && !isBackDrop) {
            return
          }
          onClose()
        }}
        sx={merge(
          {
            '& .MuiPaper-root': isApp
              ? {
                  borderRadius: '16px',
                  '&.MuiDialog-paper': {
                    width: 'calc(100% - 16px) !important',
                    margin: '16px',
                  },
                }
              : {
                  boxShadow: 'none',
                  borderRadius: '16px',
                },
          },
          fullScreen && {
            zIndex: zIndex,
            '& .MuiPaper-root': {
              borderRadius: '0 !important',
              '& .MuiStack-root': {
                backgroundColor: '#ffffff',
              },
            },
          },
          sx,
        )}
        {...(fullScreen && {
          disableEnforceFocus: true,
        })}
      >
        {!isLoading || (Array.isArray(isLoading) && !isLoading.length) ? null : isSomeTruthy(isLoading) && (
          <Loading isLoading />
        )}
        {isHeader && (
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{
              backgroundColor: isHeaderWhite
                ? '#ffffff'
                : '#f5f5f5',
              ...(isApp && {
                py: 2,
                px: 2,
              }),
              ...(!isApp && {
                pt: '24px',
                pb: '19px',
                px: '30px',
              }),
            }}
          >
            <Box>
              {title && (
                <Typography
                  fontSize={isApp ? 16 : 18}
                  fontWeight="700"
                  color={isHeaderWhite ? '#000' : '#000'}
                  lineHeight={1.6}
                  sx={{
                    ...(fullScreen && {
                      color: '#000',
                      wordBreak: 'break-word',
                      lineHeight: '1.4',
                    }),
                  }}
                >
                  {title}
                </Typography>
              )}
            </Box>
            {isClose && (
              <IconButton size={'small'} onClick={onClose}>
                <CloseIcon
                  size={isApp ? 20 : 24}
                  color={isHeaderWhite ? '#000' : '#666'}
                />
              </IconButton>
            )}
          </Stack>
        )}
        <DialogContent
          dividers={isHeaderWhite ? false : true}
          sx={{
            padding: 0,
          }}
          ref={ref}
        >
          {children}
        </DialogContent>
        {actions && (
          <DialogActions
            disableSpacing={true}
            sx={{
              '&.MuiDialogActions-root': {
                justifyContent: 'center',
              },
              ...actionsSx,
            }}
          >
            {actions}
          </DialogActions>
        )}
      </Dialog>
    )
  },
)

export default CustomDialog