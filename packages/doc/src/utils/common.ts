export const preCls = 'antm-docs'
import { IDocSimulator } from '../../types'

export function scrollToTargetParent(target) {
  const tt = document.getElementById(target)
  const parentTop = tt?.parentNode?.['offsetTop']
  window.scrollTo(0, parentTop ? parentTop - 20 : 0)
}

export function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)

  const selection = document.getSelection()

  if (!selection) {
    return
  }

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false

  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  if (selected) {
    selection.removeAllRanges()
    selection.addRange(selected)
  }
}

export function getSimulatorUrl(simulator: IDocSimulator, currentUrl: string) {
  const domain =
    process.env['NODE_ENV'] === 'production'
      ? simulator?.url?.production
      : simulator?.url?.development + '/'

  let path = currentUrl
  if (simulator.noMate?.urls.includes(currentUrl)) {
    path = simulator.noMate.redirect
  }

  if (simulator.transform) {
    path = simulator.transform(path)
  }

  return `${domain}${path}`
}
