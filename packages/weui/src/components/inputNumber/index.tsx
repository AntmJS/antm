import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { Component } from 'react'
import { Input, View, CommonEventFunction } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import { InputProps } from '@tarojs/components/types/Input'
import { InputNumberProps, InputError } from '../../../types/inputNumber'
import { pxTransform } from '../../utils'
import Icon from '../icon'

// TODO: Check all types

// 实现两数相加并保留小数点后最短尾数
function addNum(num1: number, num2: number): number {
  let sq1: number, sq2: number
  try {
    sq1 = num1.toString().split('.')[1]?.length ?? 0
  } catch (e) {
    sq1 = 0
  }
  try {
    sq2 = num2.toString().split('.')[1]?.length ?? 0
  } catch (e) {
    sq2 = 0
  }
  const m = Math.pow(10, Math.max(sq1, sq2))
  return (Math.round(num1 * m) + Math.round(num2 * m)) / m
}

// 格式化数字，处理01变成1,并且不处理1. 这种情况
function parseValue(num: string): string {
  if (num === '') return '0'

  const numStr = num.toString()
  if (numStr.indexOf('0') === 0 && numStr.indexOf('.') === -1) {
    // 处理01变成1,并且不处理1.
    return parseFloat(num).toString()
  }
  return num.toString()
}

export default class InputNumber extends Component<InputNumberProps> {
  public static defaultProps: InputNumberProps
  public static propTypes: PropTypes.InferProps<InputNumberProps>

  private handleClick(clickType: 'minus' | 'plus', e: CommonEvent): void {
    const { disabled, value, min = 0, max = 100, step = 1 } = this.props
    const lowThanMin = clickType === 'minus' && value <= min
    const overThanMax = clickType === 'plus' && value >= max
    if (lowThanMin || overThanMax || disabled) {
      const deltaValue = clickType === 'minus' ? -step : step
      const errorValue = addNum(Number(value), deltaValue)
      if (disabled) {
        this.handleError({
          type: 'DISABLED',
          errorValue,
        })
      } else {
        this.handleError({
          type: lowThanMin ? 'LOW' : 'OVER',
          errorValue,
        })
      }
      return
    }
    const deltaValue = clickType === 'minus' ? -step : step
    let newValue = addNum(Number(value), deltaValue)
    newValue = Number(this.handleValue(newValue))
    this.props.onChange(newValue, e)
  }

  private handleValue = (value: string | number): string => {
    const { max = 100, min = 0 } = this.props
    let resultValue = value === '' ? min : value
    // 此处不能使用 Math.max，会是字符串变数字，并丢失 .
    if (resultValue > max) {
      resultValue = max
      this.handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }
    if (resultValue < min) {
      resultValue = min
      this.handleError({
        type: 'LOW',
        errorValue: resultValue,
      })
    }
    if (resultValue && !Number(resultValue)) {
      resultValue = parseFloat(String(resultValue)) || min

      this.handleError({
        type: 'OVER',
        errorValue: resultValue,
      })
    }

    resultValue = parseValue(String(resultValue))
    return resultValue
  }

  private handleInput: CommonEventFunction<InputProps.inputEventDetail> = (
    e,
  ) => {
    const { value } = e.detail
    const { disabled } = this.props
    if (disabled) return ''

    const newValue = this.handleValue(value)
    this.props.onChange(Number(newValue), e)
    return newValue
  }

  private handleBlur: CommonEventFunction<InputProps.inputValueEventDetail> = (
    event,
  ) => this.props.onBlur && this.props.onBlur(event)

  private handleError = (errorValue: InputError): void => {
    if (!this.props.onErrorInput) {
      return
    }
    this.props.onErrorInput(errorValue)
  }

  public render(): JSX.Element {
    const {
      style,
      className,
      width,
      disabled,
      value,
      type,
      min = 0,
      max = 100,
      size,
      disabledInput,
    } = this.props

    const inputStyle = {
      width: width ? `${pxTransform(width)}` : '',
    }
    const inputValue = Number(this.handleValue(value))
    const rootCls = classNames(
      'antmui-input-number',
      {
        'antmui-input-number--lg': size === 'large',
      },
      className,
    )
    const minusBtnCls = classNames('antmui-input-number__btn', {
      'antmui-input-number--disabled': inputValue <= min || disabled,
    })
    const plusBtnCls = classNames('antmui-input-number__btn', {
      'antmui-input-number--disabled': inputValue >= max || disabled,
    })

    return (
      <View className={rootCls} style={style || ''}>
        <View
          className={minusBtnCls}
          onClick={this.handleClick.bind(this, 'minus')}
        >
          <Icon
            name="antmui-move"
            className="antmui-icon antmui-icon-subtract antmui-input-number__btn-subtract"
          />
        </View>
        <Input
          className="antmui-input-number__input"
          style={inputStyle}
          type={type}
          value={String(inputValue)}
          disabled={disabledInput || disabled}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
        />
        <View
          className={plusBtnCls}
          onClick={this.handleClick.bind(this, 'plus')}
        >
          <Icon
            name="antmui-add"
            className="antmui-icon antmui-icon-add antmui-input-number__btn-add"
          />
        </View>
      </View>
    )
  }
}

InputNumber.defaultProps = {
  className: '',
  disabled: false,
  disabledInput: false,
  value: 1,
  type: 'number',
  width: 0,
  min: 0,
  max: 100,
  step: 1,
  size: 'normal',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {},
}

InputNumber.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(['number', 'digit']),
  disabled: PropTypes.bool,
  width: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  size: PropTypes.oneOf(['normal', 'large']),
  disabledInput: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onErrorInput: PropTypes.func,
}
