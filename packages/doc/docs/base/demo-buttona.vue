<template>
  <span class="demo-vue-btn">{{ $L['点击按钮'] }}</span>
</template>

<script>
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

<style>
.demo-vue-btn {
  background: green;
  color: #fff;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 16px;
}
</style>
