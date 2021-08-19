import { ComponentClass } from 'react'
import { CommonEvent } from '@tarojs/components/types/common'

import WEUI from './normal'

export interface TabItem {
  /**
   * text 可显示的最大数字，超过则显示最大数字加'+'，如'99+'
   */
  max?: number
  /**
   * 是否显示红点，优先级比 text 高
   * @default false
   */
  dot?: boolean
  /**
   * 右上角显示到文本，可以为数字或文字，如果有 dot，优先显示 dot
   */
  text?: string | number
  /**
   * 标题
   */
  title: string

  iconFontFamily?: string

  iconName?: string

  selectedIconName?: string
  /**
   * 未选中时图片 icon 的链接
   */
  image?: string
  /**
   * 选中时图片 icon 的链接
   */
  selectedImage?: string
}

export interface TabBarProps extends Omit<WEUI.IBaseComponent, 'onClick'> {
  /**
   * 是否固定底部
   * @default false
   */
  fixed?: boolean
  /**
   * 背景颜色
   * @default #fff
   */
  backgroundColor?: string
  /**
   * 当前选中的标签索引值，从 0 计数
   * @default 0
   */
  current: number
  /**
   * 图标大小
   * @default 24
   */
  iconSize?: number
  /**
   * 字体大小
   * @default 14
   */
  fontSize?: number
  /**
   * 未选中标签字体与图标颜色
   * @default #333
   */
  color?: string
  /**
   * 选中标签字体与图标颜色
   * @default #6190E8
   */
  selectedColor?: string
  /**
   * tab 列表
   */
  tabList: TabItem[]
  /**
   * 点击触发事件，开发者需要通过 onClick 事件来更新 current 值变化，onClick 函数必填
   */
  onClick: (index: number, event: CommonEvent) => void
  border?: boolean
}

declare const TabBar: ComponentClass<TabBarProps>

export { TabBar }
