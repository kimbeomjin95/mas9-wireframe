import { useContext, useCallback } from 'react'
import { COMMON_MODALS, COMMON_MODAL_ROUTES } from '../components/Modals'
import { ModalsDispatchContext } from '../contexts/ModalsProvider'

function useModals() {
  const { open } = useContext(ModalsDispatchContext)

  const openModal = useCallback(
    (modalComponent: any, modalProps: any) => {
      return new Promise((resolve) => {
        const onClose = (isConfirm: any) => {
          resolve(isConfirm)
        }
        open(modalComponent, { ...modalProps, onClose })
      })
    },
    [open],
  )

  return {
    COMMON_MODAL_ROUTES,
    COMMON_MODALS,
    openModal,
  }
}

export { useModals }