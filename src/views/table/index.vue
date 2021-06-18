<!--
 * @Description: file conten李四
 * @Author: xiaofang lan
 * @Date: 2021-06-16 16:32:15
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-18 15:40:54
-->
<template>
  <div>
    <myTable
      :url="tableUrl"
      :table-option="tableOption"
      :table-label="tableHeader"
      :pagination="pagination"
      @sortChange="sortChange"
    >
      <!-- 具名插槽 -->
      <template v-slot:status="{ scope }">
        {{ scope.status == 1 ? '已发布' : scope.status == 2 ? '发布中' : '未发布' }}
      </template>
      <template v-slot:operating="{ scope }">
        <div class="">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            @click="handleEdit(scope)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="handleDelete(scope)"
          ></el-button>
        </div>
      </template>
    </myTable>

    <myForm :formData="formData" :formParams="formParams" :formConfig="formConfig"></myForm>
  </div>
</template>

<script>
import myTable from '@/components/my-table.vue'
import myForm from '@/components/my-form.vue'
import { tableHeader, sendThis } from './table'

export default {
  name: 'ArticleList',
  components: {
    myTable,
    myForm
  },
  data() {
    return {
      tableHeader,
      tableData: [],
      tableOption: {
        // 选择框
        mutiSelect: true,
        stripe: true,
        highlightCurrentRow: true
      },
      tableUrl: '',
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
      this.tableUrl = '/api/test'
      this.pagination.total = 198
    },
    // 编辑
    handleEdit(row) {
      console.log(row)
      this.formParams = row
    },

    // 删除
    handleDelete(row) {
      console.log('删除', row)
    },

    // 排序
    sortChange(val) {
      console.log(`如何排序：${val}`)
    }
  }
}
</script>
