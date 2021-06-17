<!--
 * @Description: file conten李四
 * @Author: xiaofang lan
 * @Date: 2021-06-16 16:32:15
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-17 17:58:46
-->
<template>
  <div>
    <myTable
      :table-option="tableOption"
      :table-data="tableData"
      :table-label="tableHeader"
      :table-handle="tableHandle"
      :pagination="pagination"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></myTable>

    <myForm :formData="formData" :formParams="formParams" :formConfig="formConfig"></myForm>
  </div>
</template>

<script>
import myTable from '@/components/my-table.vue'
import myForm from '@/components/my-form.vue'
import { tableHeader, tableHandle, sendThis } from './table'

export default {
  name: 'ArticleList',
  components: {
    myTable,
    myForm
  },
  data() {
    return {
      tableHeader,
      tableHandle,
      tableData: [],
      tableOption: {
        mutiSelect: false
      },
      pagination: {
        current: 1,
        size: 10,
        total: 0
      },

      // form
      statusOptions: [
        {
          label: '未发布',
          value: 1
        },
        {
          label: '发布中',
          value: 2
        },
        {
          label: '已发布',
          value: 3
        }
      ],
      formData: [
        {
          type: 'input',
          label: '用户名',
          prop: 'content',
          placeholder: '请输入用户名',
          rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
        },
        {
          type: 'input',
          label: '公司名称',
          prop: 'title',
          placeholder: '请输入公司名称'
        },
        {
          type: 'input',
          label: '邮箱',
          prop: 'email',
          options: [],
          placeholder: '请输入正确的邮箱地址'
        },
        {
          type: 'date',
          label: '注册时间',
          prop: 'displayTime',
          placeholder: '请选择注册时间'
        },
        {
          type: 'radio',
          label: '性别',
          prop: 'gender',
          options: [
            {
              label: '男'
            },
            {
              label: '女'
            }
          ],
          placeholder: '请选择性别'
        },
        {
          type: 'select',
          label: '状态',
          prop: 'status',
          options: [],
          placeholder: '请选择状态'
        }
      ],
      formParams: {
        content: '',
        gender: '',
        title: '',
        email: '',
        displayTime: '',
        status: ''
      },
      formConfig: {
        labelWidth: '100px',
        inline: false,
        ref: 'formRef'
      }
    }
  },

  mounted() {
    sendThis(this) // 设置this指向
    this.getQuery()
  },
  watch: {
    areaOptions: {
      handler() {
        this.formData[5].options = this.statusOptions
      },
      immediate: true
    }
  },
  methods: {
    async getQuery() {
      this.tableData = [
        {
          content: '张三',
          gender: '男',
          title: '张三公司',
          email: '403505039@qq.com',
          displayTime: '2021-06-15',
          status: 2
        },
        {
          content: '李四',
          gender: '女',
          title: '李四公司',
          email: '403505038@qq.com',
          displayTime: '2021-06-20',
          status: 3
        }
      ]
      this.pagination.total = 198
    },
    handleEdit(index, row) {
      console.log(row, '1')
      this.formParams = row
    },
    handleDel(index, row) {
      console.log(row, '2')
    },
    handleSizeChange(val) {
      this.pagination.size = val
      this.getQuery()
    },
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getQuery()
    }
  }
}
</script>
