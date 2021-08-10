import { useCallback, useState } from 'react'

export default function Index() {
  const [active, setActive] = useState(0)
  const [list] = useState(['选项一', '选项二', '选项三'])

  const handleClick = useCallback((idx) => setActive(idx), [])

  return (
    <body>
      <div className="page navbar js_show">
        <div className="page__bd" style={{ height: '100%' }}>
          <div className="weui-tab">
            <div className="weui-navbar">
              {list.map((item, index) => (
                <div
                  className={`weui-navbar__item ${
                    index === active ? 'weui-bar__item_on' : ''
                  }`}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="weui-tab__panel"></div>
          </div>
        </div>
      </div>
    </body>
  )
}
