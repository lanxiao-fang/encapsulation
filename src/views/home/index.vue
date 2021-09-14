<template>
  <div class="home-page-wrapper" :style="wrapperStyle">
    <h3>HOME</h3>
    <div class="circle"></div>
    <button @click="changeBgColor('pink')">点击更改背景为粉色</button>
    <button @click="changeBgColor('blue')">点击更改背景为粉色</button>
    <button @click="changeFontColor">点击更换文字颜色，模拟一键换肤</button>
    <h2>级联选择器动态</h2>
    <el-cascader
      ref="cascader"
      :props="props"
      :options="options"
      @change="handleChange"
      collapse-tags
      filterable
    ></el-cascader>
  </div>
</template>

<script>
import { get } from '@/utils/request'
export default {
  data() {
    let that = this
    return {
      // 这里可以动态获取到css变量，比如全局换肤后，在页面获取到换肤后的数据，绑定，然后在style就可以用到对应的css变量
      wrapperStyle: {},
      options: [
        {
          value: '',
          label: ''
        }
      ],
      props: {
        value: 'name',
        label: 'name',
        lazy: false,
        checkStrictly: false,
        multiple: true,
        lazyLoad(node, resolve) {
          if (node && node.data && node.data.value) {
            // 前三级不请求，初始化请求即可拿到3级数据
            if (node.level === 3) {
              console.log('请求第四级', node)
              that.getChildList(node, resolve)
            } else {
              resolve()
            }
          }
        }
      }
    }
  },
  mounted() {
    // 先获取第一层
    this.getFirstList()
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
    },

    // 获取第一层
    getFirstList() {
      get('/v2/bnr/activity/listBgcSetting').then(res => {
        console.log('res', res)
        // this.options = res
        const list = []
        res.forEach(item => {
          console.log(item)
          let obj = {}
          obj.value = item.id
          obj.label = item.categoryName
          obj.children = []
          if (item.brandList.length) {
            item.brandList.forEach(brandItem => {
              let brandObj = {}
              brandObj.value = brandItem.id
              brandObj.label = brandItem.brandName
              brandObj.children = []
              obj.children.push(brandObj)
              if (brandItem.siteNameList.length) {
                brandItem.siteNameList.forEach(siteNameItem => {
                  // console.log(siteNameItem)
                  let siteNameObj = {}
                  siteNameObj.value = siteNameItem
                  siteNameObj.label = siteNameItem
                  brandObj.children.push(siteNameObj)
                })
              }
            })
          }
          return list.push(obj)
        })
        console.log('op---', list)
        this.options = [
          {
            name: '彩妆',
            children: [
              {
                name: 'LanCom',
                children: [
                  {
                    name: '微信',
                    children: [
                      {
                        id: 4,
                        name: '账号4'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'YSL',
                children: [
                  {
                    children: [
                      {
                        id: 0,
                        name: '账号0'
                      }
                    ],
                    name: '微博'
                  },
                  {
                    name: '微信',
                    children: [
                      {
                        id: 5,
                        name: '账号5'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: '香水',
            children: [
              {
                name: 'LanCom',
                children: [
                  {
                    children: [
                      {
                        id: 1,
                        name: '账号1'
                      },
                      {
                        id: 2,
                        name: '账号2'
                      }
                    ],
                    name: '微信'
                  }
                ]
              },
              {
                name: 'YSL',
                children: [
                  {
                    children: [
                      {
                        id: 3,
                        name: '账号3'
                      }
                    ],
                    name: '微博'
                  }
                ]
              }
            ]
          }
        ]
      })
    },
    // 获取下一层级数据
    getChildList(data, resolve) {
      get('/v2/bnr/activity/listBgcAccount').then(res => {
        let list = []
        res.forEach(item => {
          let obj = {}
          obj.value = item.accountId
          obj.label = item.accountName
          obj.children = null
          list.push(obj)
        })
        resolve(list)
        console.log('获取下一层级数据', data, res)
      })
    },

    // 选择器变动
    handleChange() {
      let nodesObj = this.$refs.cascader.getCheckedNodes()
      console.log('nodesObj', nodesObj)
    }
  }
}
</script>
<style lang="scss" scoped>
.home-page-wrapper {
  // 页面单独的作用域
  --home-font-zise: 30px;
  width: 100vw;
  height: 100vh;
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
