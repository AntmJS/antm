import { useState, useRef } from 'react'
import { SearchBar } from '@antmjs/weui'

export default function Index() {
  const [isShowResult, setIsShowResult] = useState(false)
  const searchRef = useRef<HTMLInputElement>()

  return (
    <body>
      <div className="page button js_show">
        <div className="page__hd">
          <h1 className="page__title">SearchBar</h1>
          <p className="page__desc">搜索栏</p>
        </div>
        <div className="page__bd">
          <SearchBar
            cref={searchRef}
            onInput={() => {
              if (searchRef.current?.value) {
                setIsShowResult(true)
              } else {
                setIsShowResult(false)
              }
              console.log('......', searchRef.current?.value)
            }}
            onCancel={() => {
              setIsShowResult(false)
              console.log(',,,,,', searchRef.current?.value)
            }}
            onClear={() => {
              setIsShowResult(false)
              console.log(',,,,,', searchRef.current?.value)
            }}
          />
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
