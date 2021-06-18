/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-06-16 16:31:22
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-18 15:12:07
 */

let _this = null
//  this 指向问题。
const sendThis = e => {
  _this = e
}

// 列表header
const tableHeader = [
  {
    label: '用户名',
    prop: 'content',
    align: 'center',
    sortable: true,
    width: 200
  },
  {
    label: '性别',
    prop: 'gender',
    align: 'center',
    sortable: true,
    width: 100
  },
  {
    label: '公司名称',
    prop: 'title',
    align: 'center',
    width: 300
  },
  {
    label: '办公邮箱',
    prop: 'email',
    align: 'center',
    width: '200'
  },
  {
    label: '注册时间',
    prop: 'displayTime',
    align: 'center',
    width: '200'
  },
  {
    type: 'slot',
    label: '审核状态',
    prop: 'status',
    align: 'center',
    width: '150'
  },
  // 这是直接使用插槽，最好使用这种，可以去设置样式或者图片
  {
    type: 'slot',
    label: '操作',
    prop: 'operating',
    align: 'center'
  }
]
export { tableHeader, sendThis }
