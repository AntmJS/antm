// @ts-ignore
import React, { useEffect, useState } from 'react'
import cookiejs from 'cookiejs'
import { IAdvertisement } from '../../../types'
import { preCls } from '../../utils/common'
import './index.less'

interface Iprops {
  advertisement?: IAdvertisement
}

const day = 24 * 60 * 60 * 1000
const timeByTermType = {
  day: day,
  week: day * 7,
  month: day * 30,
}

function Advertisement(props: Iprops): JSX.Element {
  const { advertisement } = props
  const [show, setShow] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const pre_show_time = cookiejs.get('pre_advertisement_show_time') || 0
    const time = Date.now()
    const pre = !isNaN(Number(pre_show_time)) ? Number(pre_show_time) : 0
    if (advertisement) {
      if (!pre) {
        setShow(true)
        cookiejs.set('pre_advertisement_show_time', `${time}`)
      } else {
        if (
          pre &&
          time - pre > timeByTermType[advertisement.termType || 'week']
        ) {
          setShow(true)
          cookiejs.set('pre_advertisement_show_time', `${time}`)
        } else if (
          time - pre >
          timeByTermType[advertisement.termType || 'week']
        ) {
          cookiejs.set('pre_advertisement_show_time', `0`)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${preCls}-advertisement-wrapper`}>
      {advertisement && (
        <div
          className={`ad-box 
          ${show === false ? 'ad-box-hidden' : ''}
          ${show === undefined ? 'ad-box-none' : ''}
          ${show ? 'ad-box-show' : ''}
          `}
        >
          <div className="ad-title">
            <span>{show && advertisement.title}</span>
            {!show ? (
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                width="18"
                height="18"
                onClick={() => setShow(true)}
              >
                <path
                  d="M768 170.666667H256c-46.933333 0-85.333333 38.4-85.333333 85.333333v512c0 46.933333 38.4 85.333333 85.333333 85.333333h512c46.933333 0 85.333333-38.4 85.333333-85.333333V256c0-46.933333-38.4-85.333333-85.333333-85.333333zM256 768V256h512v512H256z"
                  fill="#BBC3C9"
                ></path>
              </svg>
            ) : (
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                width="18"
                height="18"
                onClick={() => setShow(false)}
              >
                <path
                  d="M887.44 583.9H136.56c-39.71 0-71.9-32.19-71.9-71.9s32.19-71.9 71.9-71.9h750.87c39.71 0 71.9 32.19 71.9 71.9s-32.19 71.9-71.89 71.9z"
                  fill="#BBC3C9"
                ></path>
              </svg>
            )}
          </div>
          {advertisement.img && show && (
            <div className="ad-img-box">
              <img
                className="ad-img"
                src={advertisement.img}
                style={advertisement.imgStyle}
              ></img>
            </div>
          )}
          {show && <div className="ad-content">{advertisement.content}</div>}
        </div>
      )}
    </div>
  )
}

export default Advertisement
