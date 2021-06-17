/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-06-16 15:38:12
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-17 18:26:23
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  env: {
    development: {
      // 动态加载组件0 0避免项目过大，热更新过慢
      plugins: ['dynamic-import-node']
    },
    production: {
      plugins: [
        // 按需引入lodash
        'lodash',
        // 去掉 console.log
        'transform-remove-console',
        // 按需加载 lodash
        [
          'transform-imports',
          {
            lodash: {
              transform: 'lodash/${member}',
              preventFullImport: true
            }
          }
        ]
      ]
    }
  }
}
