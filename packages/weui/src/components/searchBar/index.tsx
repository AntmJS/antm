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
      className={`weui-search-bar ${focus ? 'weui-search-bar_focusing' : ''}`}
      id="searchBar"
    >
      <Form className="weui-search-bar__form">
        <View className="weui-search-bar__box">
          <Text className="weui-icon-search"></Text>
          <Input
            type={type || 'text'}
            confirmType={confirmType || 'search'}
            className={className || 'weui-search-bar__input'}
            placeholder={placeholder || '搜索'}
            ref={cref as React.LegacyRef<HTMLInputElement> | undefined}
            onBlur={handleBlur}
            onInput={_onInput}
            {...others}
          />
          {isShowClear && (
            <View className="weui-icon-clear" onClick={_onClear}></View>
          )}
        </View>
        {isShowLabel && (
          <View
            className="weui-search-bar__label"
            id="searchText"
            onClick={handleLabelClick}
          >
            <Text className="weui-icon-search"></Text>
            <Text className="span">搜索</Text>
          </View>
        )}
      </Form>
      <View
        className="weui-search-bar__cancel-btn"
        id="searchCancel"
        onClick={_onCancel}
      >
        取消
      </View>
    </View>
  )
}
