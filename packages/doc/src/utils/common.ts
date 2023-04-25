export const preCls = 'antm-docs'
import { IDocSimulator } from '../../types'

export function scrollToTargetParent(target) {
  const tt = document.getElementById(target)
  const parentTop = tt?.parentNode?.['offsetTop']
  window.scrollTo(0, parentTop ? parentTop - 20 : 0)
}

export function formatPkgName(name) {
  return name.replace(/\@/g, '').replace(/\//g, '-')
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
      : simulator?.url?.development

  let path = currentUrl
  if (simulator.noMate?.urls.includes(currentUrl)) {
    path = simulator.noMate.redirect

    return `${domain}${path}`
  }

  if (simulator.transform) {
    path = simulator.transform(currentUrl)
  }

  console.info(`${domain}${path}`)

  return `${domain}${path}`
}

function sandBox(value) {
  const withStr = `with(obj) { return ${value} }`
  //创建监听对象
  const proxy = new Proxy(Object.create(null), {
    has(target, key) {
      // @ts-ignore
      if (['console', 'Math', 'Date'].includes(key)) {
        return target[key]
      }
      return true
    },
    get(target, key) {
      if (key === Symbol.unscopables) return undefined
      return target[key]
    },
  })
  return new Function('obj', withStr)(proxy) //将监听的对象作为obj参数传入
}

export function JSONparse(target) {
  console.info(target, 'target')
  return JSON.parse(JSON.stringify(target), function (_, val) {
    if (
      /^function\s*\(.*\)\s*{/.test(val) ||
      /^\(.*\)\s*=>/.test(val) ||
      /^.*\s*\(.*\)\s*{/.test(val)
    ) {
      return sandBox(val)
    }
    return val
  })
}

export function normalizeTextCase(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}
