import Taro from '@tarojs/taro'
import type { MiniLoginButtonProps } from '../../../types/button.d'
import Button from './index'

export default function Index(props: MiniLoginButtonProps): JSX.Element {
  const { onGetLoginCode, onFail, children, ...others } = props

  const onLogin = function () {
    Taro.login({
      success(res) {
        onGetLoginCode(res)
      },
      fail(e) {
        onFail(e)
      },
    })
  }

  return (
    <Button {...others} onClick={onLogin}>
      {children}
    </Button>
  )
}
