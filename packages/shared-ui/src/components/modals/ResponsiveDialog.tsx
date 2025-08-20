import { useView } from '../../providers/ViewProvider'
import React from 'react'
import { BottomSheet } from './BottomSheet'
import CustomDialog from './CustomDialog'

export interface ResponsiveDialogProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  // BottomSheet 전용 props
  defaultSnap?: number
  snapPoints?: number[]
  autoHeight?: boolean
  isFullScreen?: boolean
  // CustomDialog 전용 props 및 기타 props들을 받을 수 있도록
  [key: string]: any
}

export const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  open,
  onClose,
  title,
  children,
  defaultSnap,
  snapPoints,
  isFullScreen = false,
  ...otherProps
}) => {
  const { IS_MOBILE } = useView()

  if (IS_MOBILE) {
    if (isFullScreen) {
      return (
        <CustomDialog
          title={title}
          open={open}
          onClose={onClose}
          fullScreen={isFullScreen}
          {...otherProps}
        >
          {children}
        </CustomDialog>
      )
    }

    return (
      <BottomSheet
        open={open}
        onClose={onClose}
        title={title || ''}
        defaultSnap={defaultSnap}
        skipInitialTransition={false}
        {...otherProps}
      >
        {children}
      </BottomSheet>
    )
  }

  return (
    <CustomDialog 
      title={title} 
      open={open} 
      onClose={onClose} 
      fullScreen={isFullScreen}
      {...otherProps}
    >
      {children}
    </CustomDialog>
  )
}