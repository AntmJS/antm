export function handleShowCode(e, btn) {
  e.stopPropagation()
  const codeWrapperId = btn.parentNode.id
  const codeBox = document.querySelector(`#${codeWrapperId} .code-box`)
  if (codeBox) {
    const curHeight = getComputedStyle(codeBox).height
    codeBox['style'].height = curHeight === '0px' ? 'auto' : '0px'

    const btnStyle = getComputedStyle(btn)
    const transform =
      btnStyle.getPropertyValue('-webkit-transform') ||
      btnStyle.getPropertyValue('-moz-transform') ||
      btnStyle.getPropertyValue('-o-transform') ||
      btnStyle.getPropertyValue('transform')

    btn['style'].transform = transform === 'none' ? 'rotateX(180deg)' : 'none'
  }
}
