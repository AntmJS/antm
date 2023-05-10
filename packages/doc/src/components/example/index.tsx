import React from 'react'
import { IDocSimulator } from '../../../types'
import { preCls, getSimulatorUrl } from '../../utils/common'

import './index.less'

interface ExampleProps {
  simulator: IDocSimulator
  url: string
}

export const Example: React.FC<ExampleProps> = ({ simulator, url }) => {
  if (!simulator) {
    return <></>
  }
  const mobileUrl = getSimulatorUrl(simulator, url)
  return <iframe className={`${preCls}-example`} src={mobileUrl} />
}

export default Example
