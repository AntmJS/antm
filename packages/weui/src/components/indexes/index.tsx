import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { Component } from 'react'
import { ScrollView, View } from '@tarojs/components'
import { CommonEvent, ITouchEvent } from '@tarojs/components/types/common'
import Taro from '@tarojs/taro'
import { IndexesProps, IndexesState, Item } from '../../../types/indexes'
import { delayQuerySelector, uuid } from '../../utils'
import List from '../list/index'
import ListItem from '../listItem/index'

const ENV = Taro.getEnv()

export default class AtIndexes extends Component<IndexesProps, IndexesState> {
  public static defaultProps: IndexesProps
  public static propTypes: PropTypes.InferProps<IndexesProps>

  private menuHeight: number
  private startTop: number
  private itemHeight: number
  private currentIndex: number
  private listId: string
  private listRef: any

  public constructor(props: IndexesProps) {
    super(props)
    this.state = {
      _scrollIntoView: '',
      _scrollTop: 0,
      isWEB: Taro.getEnv() === Taro.ENV_TYPE.WEB,
    }
    // 右侧导航高度
    this.menuHeight = 0
    // 右侧导航距离顶部高度
    this.startTop = 0
    // 右侧导航元素高度
    this.itemHeight = 0
    // 当前索引
    this.currentIndex = -1
    this.listId = `list-${uuid()}`
  }

  private handleClick = (item: Item): void => {
    this.props.onClick && this.props.onClick(item)
  }

  private handleTouchMove = (event: ITouchEvent): void => {
    event.stopPropagation()
    event.preventDefault()

    const { list } = this.props
    const pageY = event.touches[0]!.pageY
    const index = Math.floor((pageY - this.startTop) / this.itemHeight)

    if (index >= 0 && index <= list.length && this.currentIndex !== index) {
      this.currentIndex = index
      const key = index > 0 ? list[index - 1]!.key : 'top'
      const touchView = `antmui-indexes__list-${key}`
      this.jumpTarget(touchView, index)
    }
  }

  private handleTouchEnd = (): void => {
    this.currentIndex = -1
  }

  private jumpTarget(_scrollIntoView: string, idx: number): void {
    if (ENV === Taro.ENV_TYPE.WEB) {
      delayQuerySelector('.antmui-indexes', 0).then((rect) => {
        const targetOffsetTop = this.listRef.childNodes[idx].offsetTop
        const _scrollTop = targetOffsetTop - rect[0].top
        this.updateState({
          _scrollTop,
          _scrollIntoView,
        })
      })
      return
    }

    this.updateState({
      _scrollIntoView,
    })
  }

  private __jumpTarget(key: string): void {
    const { list } = this.props
    // const index = _findIndex(list, ['key', key])
    const index = list.findIndex((item) => item.key === key)
    const targetView = `antmui-indexes__list-${key}`
    this.jumpTarget(targetView, index + 1)
  }

  private updateState(state: Partial<IndexesState>): void {
    const { isVibrate } = this.props
    const { _scrollIntoView, _scrollTop } = state
    // TODO: Fix dirty hack
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.setState({
      _scrollIntoView: _scrollIntoView!,
      _scrollTop: _scrollTop!,
    })

    if (isVibrate) {
      Taro.vibrateShort()
    }
  }

  private initData(): void {
    delayQuerySelector('.antmui-indexes__menu').then((rect) => {
      const len = this.props.list.length
      this.menuHeight = rect[0].height
      this.startTop = rect[0].top
      this.itemHeight = Math.floor(this.menuHeight / (len + 1))
    })
  }

  private handleScroll(e: CommonEvent): void {
    if (e && e.detail) {
      this.setState({
        _scrollTop: e.detail.scrollTop,
      })
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IndexesProps): void {
    if (nextProps.list.length !== this.props.list.length) {
      this.initData()
    }
  }

  public componentDidMount(): void {
    if (ENV === Taro.ENV_TYPE.WEB) {
      this.listRef = document.getElementById(this.listId)
    }
    this.initData()
  }

  public UNSAFE_componentWillMount(): void {
    this.props.onScrollIntoView &&
      this.props.onScrollIntoView(this.__jumpTarget.bind(this))
  }

  public render(): JSX.Element {
    const { className, style, animation, topKey, list } = this.props
    const { _scrollTop, _scrollIntoView, isWEB } = this.state

    const rootCls = classNames('antmui-indexes', className)

    const menuList = list.map((dataList, i) => {
      const { key } = dataList
      const targetView = `antmui-indexes__list-${key}`
      return (
        <View
          className="antmui-indexes__menu-item"
          key={key}
          onClick={this.jumpTarget.bind(this, targetView, i + 1)}
        >
          {key}
        </View>
      )
    })

    const indexesList = list.map((dataList) => (
      <View
        id={`antmui-indexes__list-${dataList.key}`}
        className="antmui-indexes__list"
        key={dataList.key}
      >
        <View className="antmui-indexes__list-title">{dataList.title}</View>
        <List>
          {dataList.items &&
            dataList.items.map((item) => (
              <ListItem
                key={item.name}
                contentRender={item.name}
                onClick={this.handleClick.bind(this, item)}
              />
            ))}
        </List>
      </View>
    ))

    return (
      <View className={rootCls} style={style || ''}>
        <View
          className="antmui-indexes__menu"
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <View
            className="antmui-indexes__menu-item"
            onClick={this.jumpTarget.bind(this, 'antmui-indexes__top', 0)}
          >
            {topKey}
          </View>
          {menuList}
        </View>
        <ScrollView
          className="antmui-indexes__body"
          id={this.listId}
          scrollY
          scrollWithAnimation={animation}
          // eslint-disable-next-line no-undefined
          scrollTop={isWEB ? _scrollTop : undefined}
          scrollIntoView={!isWEB ? _scrollIntoView : ''}
          onScroll={this.handleScroll.bind(this)}
        >
          <View className="antmui-indexes__content" id="antmui-indexes__top">
            {this.props.children}
          </View>
          {indexesList}
        </ScrollView>
      </View>
    )
  }
}

AtIndexes.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  animation: PropTypes.bool,
  isVibrate: PropTypes.bool,
  topKey: PropTypes.string,
  list: PropTypes.array,
  onClick: PropTypes.func,
  onScrollIntoView: PropTypes.func,
}

AtIndexes.defaultProps = {
  className: '',
  animation: false,
  topKey: 'Top',
  isVibrate: true,
  list: [],
}
