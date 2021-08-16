import classnames from 'classnames'
import dayjs, { Dayjs } from 'dayjs'
import { Component } from 'react'
import { View } from '@tarojs/components'
import { BaseEventOrig } from '@tarojs/components/types/common'
import {
  CalendarDefaultProps,
  CalendarProps,
  CalendarPropsWithDefaults,
  CalendarState,
  Calendar as TypeCalendar,
} from '../../../types/calendar'
import CalendarBody from './body/index'
import CalendarController from './controller/index'

const defaultProps: CalendarDefaultProps = {
  validDates: [],
  marks: [],
  isSwiper: true,
  hideArrow: false,
  isVertical: false,
  selectedDates: [],
  isMultiSelect: false,
  format: 'YYYY-MM-DD',
  currentDate: Date.now(),
  monthFormat: 'YYYY年MM月',
}

export default class Calendar extends Component<
  CalendarProps,
  Readonly<CalendarState>
> {
  static defaultProps: CalendarDefaultProps = defaultProps

  public constructor(props: CalendarProps) {
    super(props)

    const { currentDate, isMultiSelect } = props as CalendarPropsWithDefaults

    this.state = this.getInitializeState(currentDate, isMultiSelect)
  }

  public UNSAFE_componentWillReceiveProps(nextProps: CalendarProps): void {
    const { currentDate, isMultiSelect } = nextProps
    if (!currentDate || currentDate === this.props.currentDate) return

    if (isMultiSelect && this.props.isMultiSelect) {
      const { start, end } = currentDate as TypeCalendar.SelectedDate
      const { start: preStart, end: preEnd } = this.props
        .currentDate as TypeCalendar.SelectedDate

      if (start === preStart && preEnd === end) {
        return
      }
    }

    const stateValue: CalendarState = this.getInitializeState(
      currentDate,
      isMultiSelect,
    )

    this.setState(stateValue)
  }

  private getSingleSelectdState = (value: Dayjs): Partial<CalendarState> => {
    const { generateDate } = this.state

    const stateValue: Partial<CalendarState> = {
      selectedDate: this.getSelectedDate(value.valueOf()),
    }

    const dayjsGenerateDate: Dayjs = value.startOf('month')
    const generateDateValue: number = dayjsGenerateDate.valueOf()

    if (generateDateValue !== generateDate) {
      this.triggerChangeDate(dayjsGenerateDate)
      stateValue.generateDate = generateDateValue
    }

    return stateValue
  }

  private getMultiSelectedState = (
    value: Dayjs,
  ): Pick<CalendarState, 'selectedDate'> => {
    const { selectedDate } = this.state
    const { end, start } = selectedDate

    const valueUnix: number = value.valueOf()
    const state: Pick<CalendarState, 'selectedDate'> = {
      selectedDate,
    }

    if (end) {
      state.selectedDate = this.getSelectedDate(valueUnix, 0)
    } else {
      state.selectedDate.end = Math.max(valueUnix, +start)
      state.selectedDate.start = Math.min(valueUnix, +start)
    }

    return state
  }

  private getSelectedDate = (
    start: number,
    end?: number,
  ): TypeCalendar.SelectedDate => {
    const stateValue: TypeCalendar.SelectedDate = {
      start,
      end: start,
    }

    if (typeof end !== 'undefined') {
      stateValue.end = end
    }

    return stateValue
  }

  private getInitializeState(
    currentDate: TypeCalendar.DateArg | TypeCalendar.SelectedDate,
    isMultiSelect?: boolean,
  ): CalendarState {
    let end: number
    let start: number
    let generateDateValue: number

    if (!currentDate) {
      const dayjsStart = dayjs()
      start = dayjsStart.startOf('day').valueOf()
      generateDateValue = dayjsStart.startOf('month').valueOf()
      return {
        generateDate: generateDateValue,
        selectedDate: {
          start: '',
        },
      }
    }

    if (isMultiSelect) {
      const { start: cStart, end: cEnd } =
        currentDate as TypeCalendar.SelectedDate

      const dayjsStart = dayjs(cStart)

      start = dayjsStart.startOf('day').valueOf()
      generateDateValue = dayjsStart.startOf('month').valueOf()

      end = cEnd ? dayjs(cEnd).startOf('day').valueOf() : start
    } else {
      const dayjsStart = dayjs(currentDate as TypeCalendar.DateArg)

      start = dayjsStart.startOf('day').valueOf()
      generateDateValue = dayjsStart.startOf('month').valueOf()

      end = start
    }

    return {
      generateDate: generateDateValue,
      selectedDate: this.getSelectedDate(start, end),
    }
  }

  private triggerChangeDate = (value: Dayjs): void => {
    const { format } = this.props

    if (typeof this.props.onMonthChange !== 'function') return

    this.props.onMonthChange(value.format(format))
  }

  private setMonth = (vectorCount: number): void => {
    const { format } = this.props
    const { generateDate } = this.state

    const _generateDate: Dayjs = dayjs(generateDate).add(vectorCount, 'month')
    this.setState({
      generateDate: _generateDate.valueOf(),
    })

    if (vectorCount && typeof this.props.onMonthChange === 'function') {
      this.props.onMonthChange(_generateDate.format(format))
    }
  }

  private handleClickPreMonth = (isMinMonth?: boolean): void => {
    if (isMinMonth === true) {
      return
    }

    this.setMonth(-1)

    if (typeof this.props.onClickPreMonth === 'function') {
      this.props.onClickPreMonth()
    }
  }

  private handleClickNextMonth = (isMaxMonth?: boolean): void => {
    if (isMaxMonth === true) {
      return
    }

    this.setMonth(1)

    if (typeof this.props.onClickNextMonth === 'function') {
      this.props.onClickNextMonth()
    }
  }

  // picker 选择时间改变时触发
  private handleSelectDate = (e: BaseEventOrig<{ value: string }>): void => {
    const { value } = e.detail

    const _generateDate: Dayjs = dayjs(value)
    const _generateDateValue: number = _generateDate.valueOf()

    if (this.state.generateDate === _generateDateValue) return

    this.triggerChangeDate(_generateDate)
    this.setState({
      generateDate: _generateDateValue,
    })
  }

  private handleDayClick = (item: TypeCalendar.Item): void => {
    const { isMultiSelect } = this.props
    const { isDisabled, value } = item

    if (isDisabled) return

    const dayjsDate: Dayjs = dayjs(value)

    let stateValue: Partial<CalendarState> = {}

    if (isMultiSelect) {
      stateValue = this.getMultiSelectedState(dayjsDate)
    } else {
      stateValue = this.getSingleSelectdState(dayjsDate)
    }

    this.setState(stateValue as CalendarState, () => {
      this.handleSelectedDate()
    })

    if (typeof this.props.onDayClick === 'function') {
      this.props.onDayClick({ value: item.value })
    }
  }

  private handleSelectedDate = (): void => {
    const selectDate = this.state.selectedDate
    if (typeof this.props.onSelectDate === 'function') {
      const info: TypeCalendar.SelectedDate = {
        start: dayjs(selectDate.start).format(this.props.format),
      }

      if (selectDate.end) {
        info.end = dayjs(selectDate.end).format(this.props.format)
      }

      this.props.onSelectDate({
        value: info,
      })
    }
  }

  private handleDayLongClick = (item: TypeCalendar.Item): void => {
    if (typeof this.props.onDayLongClick === 'function') {
      this.props.onDayLongClick({ value: item.value })
    }
  }

  public render(): JSX.Element {
    const { generateDate, selectedDate } = this.state
    const {
      validDates,
      marks,
      format,
      minDate,
      maxDate,
      isSwiper,
      className,
      hideArrow,
      isVertical,
      monthFormat,
      selectedDates,
    } = this.props as CalendarPropsWithDefaults

    return (
      <View className={classnames('antmui-calendar', className)}>
        <CalendarController
          minDate={minDate}
          maxDate={maxDate}
          hideArrow={hideArrow}
          monthFormat={monthFormat}
          generateDate={generateDate}
          onPreMonth={this.handleClickPreMonth}
          onNextMonth={this.handleClickNextMonth}
          onSelectDate={this.handleSelectDate}
        />
        <CalendarBody
          validDates={validDates}
          marks={marks}
          format={format}
          minDate={minDate}
          maxDate={maxDate}
          isSwiper={isSwiper}
          isVertical={isVertical}
          selectedDate={selectedDate}
          selectedDates={selectedDates}
          generateDate={generateDate}
          onDayClick={this.handleDayClick}
          onSwipeMonth={this.setMonth}
          onLongClick={this.handleDayLongClick}
        />
      </View>
    )
  }
}
