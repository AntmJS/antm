import { ButtonProps, CommonEventFunction } from '@tarojs/components'
import type { MiniPhoneButtonProps } from '../../../types/button.d'
import Button from './index'

export default function Index(props: MiniPhoneButtonProps): JSX.Element {
  const { onGetPhone, onFail, children, ...others } = props

  const getPhone: CommonEventFunction<ButtonProps.onGetPhoneNumberEventDetail> =
    function (e) {
      if (e.detail) {
        onGetPhone(e.detail)
      } else {
        onFail(e)
      }
    }

  return (
    <Button {...others} openType="getPhoneNumber" onGetPhoneNumber={getPhone}>
      {children}
    </Button>
  )
}
