<!--
 * @Description: 视频缩小悬浮至右下角
 * @Author: xiaofang lan
 * @Date: 2021-06-30 11:05:58
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-30 11:33:45
-->
<template>
  <div class="transform-wrapper">
    <div :class="[tansform ? 'mini' : '', 'normal']">
      <div class="content">会议界面</div>
      <el-button type="primary" @click="handleTansform">{{ tansform ? '放大' : '缩小' }}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tansform: false
    }
  },
  methods: {
    handleTansform() {
      console.log('缩放')
      this.tansform = !this.tansform
    }
  }
}
</script>

<style lang="scss" scoped>
.transform-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: gray;
  .normal {
    position: absolute;
    width: 500px;
    height: 400px;
    left: 200px;
    top: 100px;
    background: pink;
    transition: all 0.2s ease-out;
  }

  .mini {
    transform: scale(0.5);
    left: 700px;
    top: 550px;
    transition: all 0.2s ease-out;
  }
}
</style>
