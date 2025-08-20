import {
  ModalsDispatchContext,
  ModalsStateContext,
} from '../../contexts/ModalsProvider'
import { Suspense, useContext } from 'react'

export const Modals = () => {
  const openedModals = useContext(ModalsStateContext)
  const { close } = useContext(ModalsDispatchContext)

  return openedModals.map((modal: any, index) => {
    const { Component, props } = modal

    const {
      handleSubmit = () => {},
      handleConfirm = () => {},
      onClose,
      ...restProps
    } = props

    //모달 닫기
    const handleModalClose = () => close(Component)

    //모달 확인/닫기
    const handleModalConfirm = async (isConfirm: boolean) => {
      await onClose(isConfirm)
      close(Component)
    }

    // 모달 확인 콜백
    const handleConfirmCallback = async (value: any) => {
      await onClose(value)
      close(Component)
    }

    return (
      <Suspense fallback={null} key={index}>
        <Component
          key={index}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          onConfirmCallback={handleConfirmCallback}
          {...restProps}
        />
      </Suspense>
    )
  })
}

// 공통 모달 라우트 상수들
export const COMMON_MODAL_ROUTES = {
  // 기본 다이얼로그
  COMMON_DIALOG: 'COMMON_DIALOG',
  CONFIRM_DIALOG: 'CONFIRM_DIALOG',
  
  // 컨텐츠 뷰어
  CONTENT_VIEW: 'CONTENT_VIEW',
  IMAGE_VIEW: 'IMAGE_VIEW',
  
  // 공통 폼
  SEARCH_ADDRESS: 'SEARCH_ADDRESS',
  
  // 문서 관련
  PRIVATE_POLICY_DOC: '/private-policy-doc',
  SERVICE_TERM_DOC: '/service-term-doc',
  TEXT_MESSAGE_POLICY_DOC: 'TEXT_MESSAGE_POLICY_DOC',
  USER_SERVICE_TERM_DOC: '/user-service-term-doc',
}

// 모달 컴포넌트 레지스트리 - 각 앱에서 동적으로 등록
export const COMMON_MODALS: Record<string, any> = {
  // 기본적으로 빈 상태, 런타임에 각 앱에서 등록
}