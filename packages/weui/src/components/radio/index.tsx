import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { Component } from 'react'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { RadioProps, RadioOption } from '../../../types/radio'
import Icon from '../icon'

export default class Radio extends Component<RadioProps<any>> {
  public static defaultProps: RadioProps<any>
  public static propTypes: PropTypes.InferProps<RadioProps<any>>

  private handleClick(option: RadioOption<any>, event: CommonEvent): void {
    if (option.disabled) return
    this.props.onClick(option.value, event)
  }

  public render(): JSX.Element {
    const { style, className, options, value } = this.props

    return (
      <View
        className={classNames('antmui-radio', className)}
        style={style || ''}
      >
        {options.map((option) => (
          <View
            key={option.value}
            onClick={this.handleClick.bind(this, option)}
            className={classNames({
              'antmui-radio__option': true,
              'antmui-radio__option--disabled': option.disabled,
            })}
          >
            <View className="antmui-radio__option-wrap">
              <View className="antmui-radio__option-container">
                <View className="antmui-radio__title">{option.label}</View>
                <View
                  className={classNames({
                    'antmui-radio__icon': true,
                    'antmui-radio__icon--checked': value === option.value,
                  })}
                >
                  <Icon
                    name="antmui-check"
                    className="antmui-icon antmui-icon-check"
                  ></Icon>
                </View>
              </View>
              {option.desc && (
                <View className="antmui-radio__desc">{option.desc}</View>
              )}
            </View>
          </View>
        ))}
      </View>
    )
  }
}

Radio.defaultProps = {
  className: '',
  value: '',
  options: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick: (): void => {},
}

Radio.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
}
