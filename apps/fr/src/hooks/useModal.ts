import { useCallback } from 'react';
import { useModals } from '@mas9/shared-ui';

/**
 * 간단한 모달 훅 - 컴포넌트 함수를 직접 전달
 */
export function useModal() {
  const { openModal: openModalBase } = useModals();

  /**
   * 모달 컴포넌트 함수를 사용하여 모달을 엽니다
   * @param modalComponentFn - 모달 컴포넌트 import 함수
   * @param props - 모달에 전달할 props
   * @returns Promise<any> - 모달 결과
   */
  const openModal = useCallback(
    async <TResult = any>(
      modalComponentFn: () => Promise<{ default: React.ComponentType<any> }>,
      props?: Record<string, any>
    ): Promise<TResult> => {
      try {
        const { default: ModalComponent } = await modalComponentFn();
        return await openModalBase(ModalComponent, props) as TResult;
      } catch (error) {
        console.error(`Failed to load modal:`, error);
        throw new Error(`Failed to load modal`);
      }
    },
    [openModalBase]
  );

  return {
    openModal,
  };
}