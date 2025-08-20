import React, { createContext, useContext, useMemo } from 'react'

import { isMobile, isTablet } from '../utils/user-agent.util'

const enum ViewType {
  MO = 'mobile',
  PC = 'pc',
  TABLET = 'tablet',
}

// Context 생성
export const ViewContext = createContext<{
  viewType: ViewType
  IS_MOBILE: boolean
  IS_TABLET: boolean
}>({
  viewType: ViewType.PC,
  IS_MOBILE: false,
  IS_TABLET: false,
})

// Provider 구현
export function ViewProvider({ children }: { children: React.ReactNode }) {
  // userAgent를 통한 viewType 판별
  const viewType = useMemo<ViewType>(
    () => (isMobile() ? ViewType.MO : ViewType.PC),
    [],
  )
  const IS_MOBILE = isMobile()
  const IS_TABLET = isTablet()

  return (
    <ViewContext.Provider value={{ viewType, IS_MOBILE, IS_TABLET }}>
      {children}
    </ViewContext.Provider>
  )
}

// viewType을 쉽게 사용할 수 있는 hook
export function useView() {
  return useContext(ViewContext)
}