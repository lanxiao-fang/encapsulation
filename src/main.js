/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-06-16 15:38:12
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-17 18:13:59
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'
import '@/styles/global.scss'
import './permission'

Vue.config.productionTip = false
// 开启performance用于性能分析
Vue.config.performance = process.env.NODE_ENV !== 'production'

Vue.use(ElementUI)
Vue.prototype._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
