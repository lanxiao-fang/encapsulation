/*
 * @Description: file content
 * @Author: xiaofang lan
 * @Date: 2021-06-16 16:31:22
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-17 14:57:11
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
    sortable: true
  },
  {
    label: '性别',
    prop: 'gender',
    align: 'center',
    sortable: true
  },
  {
    label: '公司名称',
    prop: 'title',
    align: 'center'
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
    align: 'center'
  },
  {
    label: '审核状态',
    prop: 'status',
    align: 'center',
    render: row => {
      if (row.status === '1') {
        return '已发布'
      } else if (row.status === '2') {
        return '发布中'
      } else if (row.status === '3') {
        return '未发布'
      }
    }
  }
]

// 列表操作事件
const tableHandle = {
  label: '操作',
  width: '200',
  options: [
    {
      label: '编辑',
      code: 'cccc',
      method: (index, row) => {
        _this.handleEdit(index, row)
      }
    },
    {
      label: '删除',
      code: 'gggg',
      method: (index, row) => {
        _this.handleDel(index, row)
      }
    },
    {
      label: '禁用',
      code: 'jjjj',
      method: (index, row) => {
        _this.handleDel(index, row)
      }
    }
  ]
}

export { tableHeader, tableHandle, sendThis }
