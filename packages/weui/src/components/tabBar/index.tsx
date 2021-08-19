import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { Component } from 'react'
import { Image, View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { TabBarProps, TabItem } from '../../../types/tabBar'
import { mergeStyle } from '../../utils'
import Badge from '../badge/index'
import Icon from '../icon/index'

export default class TabBar extends Component<TabBarProps> {
  public static defaultProps: TabBarProps
  public static propTypes: PropTypes.InferProps<TabBarProps>

  // constructor () {
  //   super(...arguments)
  //   this.state = {
  //     isIPhoneX: false
  //   }
  // }

  // componentDidMount () {
  //   const curEnv = Taro.getEnv()

  //   if (
  //     curEnv === Taro.ENV_TYPE.WEAPP &&
  //     Taro.getSystemInfoSync().model.indexOf('iPhone X') >= 0
  //   ) {
  //     this.setState({ isIPhoneX: true })
  //   }
  // }

  private handleClick(index: number, event: CommonEvent): void {
    this.props.onClick(index, event)
  }

  public render(): JSX.Element {
    const {
      style,
      className,
      fixed,
      backgroundColor,
      tabList,
      current,
      color,
      iconSize,
      fontSize,
      selectedColor,
      border = true,
    } = this.props
    // const { isIPhoneX } = this.state
    const defaultStyle = {
      color: color || '',
    }
    const selectedStyle = {
      color: selectedColor || '',
    }
    const titleStyle = {
      fontSize: fontSize ? `${fontSize}px` : '',
    }
    const rootStyle = {
      backgroundColor: backgroundColor || '',
    }
    const imgStyle = {
      width: `${iconSize}px`,
      height: `${iconSize}px`,
    }

    return (
      <View
        className={classNames(
          {
            'antmui-tab-bar': true,
            'antmui-tab-bar--fixed': fixed,
            'antmui-tab-bar_border_top': border && fixed,
            'antmui-tab-bar_border_bottom': border && !fixed,
            // 'antmui-tab-bar--ipx': isIPhoneX
          },
          className,
        )}
        style={mergeStyle(rootStyle, style || '')}
      >
        {tabList.map((item: TabItem, i: number) => (
          <View
            className={classNames('antmui-tab-bar__item', {
              'antmui-tab-bar__item--active': current === i,
            })}
            style={current === i ? selectedStyle : defaultStyle}
            key={item.title}
            onClick={this.handleClick.bind(this, i)}
          >
            {item.iconName ? (
              <Badge
                dot={!!item.dot}
                value={item.text}
                maxValue={Number(item.max)}
              >
                <View className="antmui-tab-bar__icon">
                  <Icon
                    name={
                      current === i && item.selectedIconName
                        ? item.selectedIconName
                        : item.iconName
                    }
                    className={item.iconFontFamily}
                    style={{
                      color: current === i ? selectedColor : color,
                      fontSize: iconSize ? `${iconSize}px` : '',
                    }}
                  ></Icon>
                </View>
              </Badge>
            ) : null}

            {item.image ? (
              <Badge
                dot={!!item.dot}
                value={item.text}
                maxValue={Number(item.max)}
              >
                <View className="antmui-tab-bar__icon">
                  <Image
                    className={classNames('antmui-tab-bar__inner-img', {
                      'antmui-tab-bar__inner-img--inactive': current !== i,
                    })}
                    mode="widthFix"
                    src={item.selectedImage || item.image}
                    style={imgStyle}
                  ></Image>
                  <Image
                    className={classNames('antmui-tab-bar__inner-img', {
                      'antmui-tab-bar__inner-img--inactive': current === i,
                    })}
                    mode="widthFix"
                    src={item.image}
                    style={imgStyle}
                  ></Image>
                </View>
              </Badge>
            ) : null}

            <View>
              <Badge
                dot={item.iconName || item.image ? false : !!item.dot}
                value={item.iconName || item.image ? '' : item.text}
                maxValue={item.iconName || item.image ? 0 : Number(item.max)}
              >
                <View className="antmui-tab-bar__title" style={titleStyle}>
                  {item.title}
                </View>
              </Badge>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

TabBar.defaultProps = {
  className: '',
  fixed: false,
  current: 0,
  tabList: [],
  border: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: (): void => {},
}

TabBar.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  fixed: PropTypes.bool,
  border: PropTypes.bool,
  backgroundColor: PropTypes.string,
  current: PropTypes.number,
  iconSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  selectedColor: PropTypes.string,
  tabList: PropTypes.array,
  onClick: PropTypes.func,
}
