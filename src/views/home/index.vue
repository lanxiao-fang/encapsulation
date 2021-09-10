<template>
  <div class="home-page-wrapper" :style="wrapperStyle">
    <h3>HOME</h3>
    <div class="circle"></div>
    <button @click="changeBgColor('pink')">点击更改背景为粉色</button>
    <button @click="changeBgColor('blue')">点击更改背景为粉色</button>
    <button @click="changeFontColor">点击更换文字颜色，模拟一键换肤</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这里可以动态获取到css变量，比如全局换肤后，在页面获取到换肤后的数据，绑定，然后在style就可以用到对应的css变量
      wrapperStyle: {}
    }
  },
  methods: {
    changeBgColor(value) {
      // 读取到root里面的变量，root是在html上的，所以document.documentElement
      document.documentElement.style.setProperty('--main-background-color', value)
    },

    // 模拟一键换肤，页面获取到换肤后的数据
    changeFontColor() {
      this.wrapperStyle = {
        '--self-font-color': '#000'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home-page-wrapper {
  // 页面单独的作用域
  --home-font-zise: 30px;
  width: 50vw;
  height: 50vh;
  font-size: var(--home-font-zise);
  color: var(--self-font-color, red);
  background-color: var(--main-background-color);
  .circle {
    // 伪类下的作用域
    --bg: #8acccf;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    background: #a4bded;
    &:hover {
      background: var(--bg);
    }
  }
}
</style>
