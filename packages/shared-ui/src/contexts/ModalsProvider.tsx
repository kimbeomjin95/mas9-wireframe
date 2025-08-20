import { Modals } from '../components/modals'
import {
  ReactNode,
  ReactElement,
  useMemo,
  useState,
  createContext,
  useCallback,
} from 'react'

type ModalProps = {
  Component: ReactElement
  props: any
}

// 기본값에 대한 타입 정의
type ModalsDispatchContextType = {
  open: (Component: ReactElement, props: any) => void
  close: (Component: ReactElement) => void
  closeAllModals: () => void
}

const ModalsStateContext = createContext<ModalProps[]>([])
const ModalsDispatchContext = createContext<ModalsDispatchContextType>({
  open: () => {},
  close: () => {},
  closeAllModals: () => {},
})

const ModalsProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<ModalProps[]>([])
  const open = useCallback((Component: ReactElement, props: any) => {
    setOpenedModals((modals) => [...modals, { Component, props }])
  }, [])

  const close = useCallback((Component: ReactElement) => {
    setOpenedModals((modals) =>
      modals.filter((modal) => modal.Component !== Component),
    )
  }, [])

  const closeAllModals = useCallback(() => {
    setOpenedModals([])
  }, [])

  const dispatch = useMemo(
    () => ({ open, close, closeAllModals }),
    [open, close, closeAllModals],
  )

  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>
        {children}
        <Modals />
      </ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  )
}

export { ModalsProvider, ModalsStateContext, ModalsDispatchContext }