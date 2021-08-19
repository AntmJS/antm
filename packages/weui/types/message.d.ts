import { ComponentClass } from 'react'
import WEUI from './normal'

export interface IMessageRef {
  show: (str: string) => void
  hide: () => void
}

export interface MessageProps extends WEUI.IBaseComponent {
  cref: React.MutableRefObject<IMessageRef | undefined>
}

declare const Message: ComponentClass<MessageProps>

export { Message }
