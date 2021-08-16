import { useCallback, useState } from 'react'
import {
  Input,
  CommonEventFunction,
  Form,
  View,
  Text,
} from '@tarojs/components'
import type { InputProps } from '@tarojs/components/types/Input'
import type { SearchBarProps } from '../../../types/searchBar.d'
import Icon from '../icon'

export default function Index(props: SearchBarProps) {
  const {
    type,
    className,
    placeholder,
    confirmType,
    onClear,
    onCancel,
    onBlur,
    onInput,
    cref,
    ...others
  } = props
  const [focus, setFocus] = useState(false)
  const [isShowClear, setIsShowClear] = useState(false)
  const [isShowLabel, setIsShowLabel] = useState(true)

  const hideSearchResult = useCallback(() => {
    if (cref.current) {
      cref.current.value = ''
      setIsShowClear(false)
    }
  }, [cref])

  const cancelSearch = useCallback(() => {
    hideSearchResult()
    setFocus(false)
    setIsShowLabel(true)
  }, [hideSearchResult])

  const handleLabelClick = function () {
    setFocus(true)
    cref.current?.focus()
  }

  const handleBlur: CommonEventFunction<InputProps.inputValueEventDetail> =
    function (e) {
      if (!cref.current?.value.length) {
        cancelSearch()
      }
      onBlur?.(e)
    }

  const _onClear = function () {
    hideSearchResult()
    cref.current?.focus()
    onClear?.()
  }

  const _onInput: CommonEventFunction<InputProps.inputEventDetail> = function (
    e,
  ) {
    if (cref.current?.value) {
      setIsShowClear(true)
    } else {
      setIsShowClear(false)
    }
    onInput?.(e)
  }

  const _onCancel = function () {
    cancelSearch()
    cref.current?.blur()
    onCancel?.()
  }

  return (
    <View
      className={`antmui-search-bar ${
        focus ? 'antmui-search-bar_focusing' : ''
      }`}
      id="searchBar"
    >
      <Form className="antmui-search-bar__form">
        <View className="antmui-search-bar__box">
          <Icon name="antmui-search" className="antmui-icon-search"></Icon>
          <Input
            type={type || 'text'}
            confirmType={confirmType || 'search'}
            className={className || 'antmui-search-bar__input'}
            placeholder={placeholder || '搜索'}
            ref={cref as React.LegacyRef<HTMLInputElement> | undefined}
            onBlur={handleBlur}
            onInput={_onInput}
            {...others}
          />
          {isShowClear && (
            <Icon
              name="antmui-round-close-fill"
              className="antmui-icon-clear"
              onClick={_onClear}
            ></Icon>
          )}
        </View>
        {isShowLabel && (
          <View
            className="antmui-search-bar__label"
            id="searchText"
            onClick={handleLabelClick}
          >
            <Icon name="antmui-search" className="antmui-icon-search"></Icon>
            <Text className="span">搜索</Text>
          </View>
        )}
      </Form>
      <View
        className="antmui-search-bar__cancel-btn"
        id="searchCancel"
        onClick={_onCancel}
      >
        取消
      </View>
    </View>
  )
}
