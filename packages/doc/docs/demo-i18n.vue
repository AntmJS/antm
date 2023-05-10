<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  beforeUpdate() {
    const I18nMap = {
      CN: {
        点击Toast: '点击Toast',
        点击按钮: '点击按钮',
        操作成功: '操作成功',
      },
      EN: {
        点击Toast: 'click Toast',
        点击按钮: 'click button',
        操作成功: 'operate success',
      },
    }

    window['$L'] = I18nMap[lang]
  },
}
</script>
