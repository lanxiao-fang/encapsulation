<!--
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-06-16 15:38:12
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-16 16:22:35
-->
<template>
  <div>
    <el-input v-model="form.user" placeholder="请输入用户名"></el-input>
    <el-input v-model="form.pass" placeholder="请输入密码"></el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: 'gating',
        pass: '123456'
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler({ query }) {
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('user/login', this.form)
      this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 50%;
  display: block;
}
</style>
