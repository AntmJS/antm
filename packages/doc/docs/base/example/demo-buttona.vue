<template>
  <span class="antm-demo-btn">{{ $L['点击按钮'] }}</span>
</template>

<script>
import './demo.less'

export default {
  data() {
    return {
      $L: {},
    }
  },
  mounted() {
    setTimeout(() => {
      this.$L = window['$L']
    }, 300)
  },
}
</script>
