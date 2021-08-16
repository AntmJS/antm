import dayjs from 'dayjs'
import { ComponentClass } from 'react'
import { BaseEventOrig } from '@tarojs/components/types/common'

// #region Calendar
declare namespace Calendar {
  export type DateArg = string | number | Date

  export type classNameType =
    | string
    | Array<string>
    | { [key: string]: boolean }

  export interface Mark {
    value: DateArg
  }

  export interface ValidDate {
    value: DateArg
  }

  export interface Item {
    value: string

    _value: dayjs.Dayjs

    text: number

    type: number

    marks: Array<Mark>

    isActive?: boolean

    isToday?: boolean

    isBeforeMin?: boolean

    isAfterMax?: boolean

    isDisabled?: boolean

    isSelected?: boolean

    isSelectedHead?: boolean

    isSelectedTail?: boolean
  }

  export interface GroupOptions {
    validDates: Array<ValidDate>

    marks: Array<Mark>

    format: string

    selectedDates: Array<SelectedDate>

    minDate?: DateArg

    maxDate?: DateArg
  }

  export type List<T> = Array<T>

  export type ListInfo<T> = {
    value: number

    list: List<T>
  }

  export interface SelectedDate {
    end?: Calendar.DateArg

    start: Calendar.DateArg
  }
}

// #endregion

// #region Calendar
export interface CalendarPropsBase {
  format?: string

  validDates?: Array<Calendar.ValidDate>

  minDate?: Calendar.DateArg

  maxDate?: Calendar.DateArg

  isSwiper?: boolean

  marks?: Array<Calendar.Mark>

  monthFormat?: string

  hideArrow?: boolean

  isVertical?: boolean

  className?: Calendar.classNameType

  onClickPreMonth?: () => void

  onClickNextMonth?: () => void

  onSelectDate?: (item: { value: Calendar.SelectedDate }) => void

  onDayClick?: (item: { value: string }) => void

  onDayLongClick?: (item: { value: string }) => void

  onMonthChange?: (value: string) => void
}

export interface CalendarSingleSelectedProps extends CalendarPropsBase {
  isMultiSelect?: false

  currentDate?: Calendar.DateArg
}

export interface CalendarMutilSelectedProps extends CalendarPropsBase {
  isMultiSelect?: true

  currentDate?: Calendar.SelectedDate
}

export type CalendarProps =
  | CalendarSingleSelectedProps
  | CalendarMutilSelectedProps

export interface CalendarDefaultProps {
  format: string

  isSwiper: boolean

  validDates: Array<Calendar.ValidDate>

  marks: Array<Calendar.Mark>

  currentDate: Calendar.DateArg | Calendar.SelectedDate

  monthFormat: string

  hideArrow: boolean

  isVertical: boolean

  isMultiSelect: boolean

  selectedDates: Array<Calendar.SelectedDate>
}

export interface CalendarState {
  generateDate: number

  selectedDate: Calendar.SelectedDate
}

export type CalendarPropsWithDefaults = CalendarProps & CalendarDefaultProps
// #endregion

// #region CalendarController
export interface CalendarControllerProps {
  generateDate: Calendar.DateArg

  minDate?: Calendar.DateArg

  maxDate?: Calendar.DateArg

  hideArrow: boolean

  monthFormat: string

  onPreMonth: () => void

  onNextMonth: () => void

  onSelectDate: (e: BaseEventOrig) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CalendarControllerState {}
// #endregion

// #region CalendarBody
export type CalendarBodyListGroup = Array<Calendar.ListInfo<Calendar.Item>>

export interface CalendarBodyProps {
  format: string

  validDates: Array<Calendar.ValidDate>

  marks: Array<Calendar.Mark>

  isSwiper: boolean

  minDate?: Calendar.DateArg

  maxDate?: Calendar.DateArg

  isVertical: boolean

  generateDate: number

  selectedDate: Calendar.SelectedDate

  selectedDates: Array<Calendar.SelectedDate> | []

  onDayClick: (item: Calendar.Item) => void

  onSwipeMonth: (vectorCount: number) => void

  onLongClick: (item: Calendar.Item) => void
}

export interface CalendarBodyState {
  isAnimate: boolean

  offsetSize: number

  listGroup: CalendarBodyListGroup
}
// #endregion

declare const Calendar: ComponentClass<CalendarProps, Readonly<CalendarState>>

export { Calendar }
