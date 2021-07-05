/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-06-16 15:38:12
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-30 11:06:46
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('@/views/home/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录页' },
    component: () => import('@/views/login/index')
  },
  {
    path: '/table',
    name: 'table',
    meta: { title: '登录页' },
    component: () => import('@/views/table/index')
  },
  {
    path: '/transform',
    name: 'transform',
    meta: { title: '缩小悬浮' },
    component: () => import('@/views/transform/index')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
