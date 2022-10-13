let supportsConstructableEventTarget

try {
  new EventTarget()

  // When transpiled with babel and rollup, the `IS_CODE_TRANSPILED` constant
  // is replaced with the boolean `true`, so this statement will always
  // evaluate to `false`. When not transpiled, it will be true.
  // @ts-ignore
  supportsConstructableEventTarget = typeof IS_CODE_TRANSPILED === 'undefined'
} catch (err) {
  supportsConstructableEventTarget = false
}

export { supportsConstructableEventTarget }
