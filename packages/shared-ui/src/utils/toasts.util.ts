import { Bounce, toast, ToastOptions } from 'react-toastify'
import { merge } from 'lodash'

export type ShowToastOptions = ToastOptions
export const showToast = (text: string, options?: ShowToastOptions) =>
  toast(
    text,
    merge(
      {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      } as ShowToastOptions,
      options,
    ),
  )