import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { Component } from 'react'
import { View } from '@tarojs/components'
import { CheckboxProps } from '../../../types/checkbox'
import Icon from '../icon'

export default class Checkbox extends Component<CheckboxProps<any>> {
  public static defaultProps: CheckboxProps<any>
  public static propTypes: PropTypes.InferProps<CheckboxProps<any>>

  private handleClick(idx: number): void {
    const { selectedList, options } = this.props
    const option = options[idx]
    const { disabled, value } = option || {}
    if (disabled) return

    const selectedSet = new Set(selectedList)
    if (!selectedSet.has(value)) {
      selectedSet.add(value)
    } else {
      selectedSet.delete(value)
    }
    this.props.onChange([...selectedSet])
  }

  public render(): JSX.Element {
    const { style, className, options, selectedList } = this.props

    const rootCls = classNames('antmui-checkbox', className)

    return (
      <View className={rootCls} style={style || ''}>
        {options.map((option, idx) => {
          const { value, disabled, label, desc } = option
          const optionCls = classNames('antmui-checkbox__option', {
            'antmui-checkbox__option--disabled': disabled,
            'antmui-checkbox__option--selected': selectedList.includes(value),
          })

          return (
            <View
              className={optionCls}
              key={value}
              onClick={this.handleClick.bind(this, idx)}
            >
              <View className="antmui-checkbox__option-wrap">
                <View className="antmui-checkbox__option-cnt">
                  <View className="antmui-checkbox__icon-cnt">
                    <Icon
                      name="antmui-check"
                      className="antmui-icon antmui-icon-check"
                    ></Icon>
                  </View>
                  <View className="antmui-checkbox__title">{label}</View>
                </View>
                {desc && <View className="antmui-checkbox__desc">{desc}</View>}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

Checkbox.defaultProps = {
  className: '',
  options: [],
  selectedList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
}

Checkbox.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  options: PropTypes.array,
  selectedList: PropTypes.array,
  onChange: PropTypes.func,
}
