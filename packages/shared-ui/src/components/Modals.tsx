import {
  ModalsDispatchContext,
  ModalsStateContext,
} from '../contexts/ModalsProvider'
import { Suspense, lazy, useContext } from 'react'

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

// 실제 모달 컴포넌트들 - 필요에 따라 추가
export const COMMON_MODALS = {
  // 기본적인 확인 다이얼로그만 포함
  // 실제 프로젝트에서는 필요한 모달들을 여기에 추가
}