import React, { ComponentClass } from 'react'

import WEUI from './normal'

export interface ListItemProps extends WEUI.IBaseComponent {
  labelRender?: React.ReactNode | string
  contentRender?: React.ReactNode | string
  actionRender?: React.ReactNode | string
  access?: boolean
}

declare const ListItem: ComponentClass<ListItemProps>

export { ListItem }
