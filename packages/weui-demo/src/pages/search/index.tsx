import { useCallback, useRef, useState } from 'react'

export default function Index() {
  const [focus, setFocus] = useState(false)
  const [isShowResult, setIsShowResult] = useState(false)
  const [isShowLabel, setIsShowLabel] = useState(true)
  const inputRef = useRef<HTMLInputElement>()

  const hideSearchResult = useCallback(() => {
    setIsShowResult(false)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [])

  const cancelSearch = useCallback(() => {
    hideSearchResult()
    setFocus(false)
    setIsShowLabel(true)
  }, [hideSearchResult])

  const handleLabelClick = function () {
    setFocus(true)
    inputRef.current?.focus()
  }

  const handleBlur = function () {
    if (!inputRef.current?.value.length) {
      cancelSearch()
    }
  }

  const handleInput = function () {
    if (inputRef.current?.value.length) {
      setIsShowResult(true)
    } else {
      setIsShowResult(false)
    }
  }

  const onClear = function () {
    hideSearchResult()
    inputRef.current?.focus()
  }

  const onCancel = function () {
    cancelSearch()
    inputRef.current?.blur()
  }

  return (
    <body>
      <div className="page button js_show">
        <div className="page__hd">
          <h1 className="page__title">SearchBar</h1>
          <p className="page__desc">搜索栏</p>
        </div>
        <div className="page__bd">
          <div
            className={`weui-search-bar ${
              focus ? 'weui-search-bar_focusing' : ''
            }`}
            id="searchBar"
          >
            <form className="weui-search-bar__form">
              <div className="weui-search-bar__box">
                <i className="weui-icon-search"></i>
                <input
                  type="search"
                  className="weui-search-bar__input"
                  id="searchInput"
                  placeholder="搜索"
                  required
                  ref={
                    inputRef as React.LegacyRef<HTMLInputElement> | undefined
                  }
                  onBlur={handleBlur}
                  onInput={handleInput}
                />
                <a
                  href="javascript:"
                  className="weui-icon-clear"
                  id="searchClear"
                  onClick={onClear}
                ></a>
              </div>
              {isShowLabel && (
                <label
                  className="weui-search-bar__label"
                  id="searchText"
                  onClick={handleLabelClick}
                >
                  <i className="weui-icon-search"></i>
                  <span>搜索</span>
                </label>
              )}
            </form>
            <a
              href="javascript:"
              className="weui-search-bar__cancel-btn"
              id="searchCancel"
              onClick={onCancel}
            >
              取消
            </a>
          </div>
          {isShowResult && (
            <div className="weui-cells searchbar-result" id="searchResult">
              <div className="weui-cell weui-cell_active weui-cell_access">
                <div className="weui-cell__bd weui-cell_primary">
                  <p>实时搜索文本</p>
                </div>
              </div>
              <div className="weui-cell weui-cell_active weui-cell_access">
                <div className="weui-cell__bd weui-cell_primary">
                  <p>实时搜索文本</p>
                </div>
              </div>
              <div className="weui-cell weui-cell_active weui-cell_access">
                <div className="weui-cell__bd weui-cell_primary">
                  <p>实时搜索文本</p>
                </div>
              </div>
              <div className="weui-cell weui-cell_active weui-cell_access">
                <div className="weui-cell__bd weui-cell_primary">
                  <p>实时搜索文本</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </body>
  )
}
