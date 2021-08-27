<!--
 * @Description: table组件
 * @Author: xiaofang lan
 * @Date: 2021-06-16 16:27:55
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-18 15:44:09
-->
<template>
  <div class="table-template">
    <el-table
      id="table"
      ref="table"
      :data="tableData"
      :highlight-current-row="tableOption.highlightCurrentRow"
      :stripe="tableOption.stripe"
      tooltip-effect="dark"
      element-loading-text="拼命加载中"
      border
      size="medium"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      <el-table-column
        v-if="tableOption.mutiSelect"
        type="selection"
        style="width: 40px"
        align="center"
      ></el-table-column>
      <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
      <el-table-column
        v-for="(item, index) in tableLabel"
        :width="item.width ? item.width : ''"
        :key="index"
        :align="item.align"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable ? 'custom' : false"
      >
        <template slot-scope="scope">
          <!-- 暴露具名插槽 -->
          <slot :name="item.prop" :scope="scope.row" v-if="item.type === 'slot'"></slot>
          <!-- 普通 -->
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件-->
    <el-pagination
      v-if="showPagination"
      class="table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current || 1"
      :page-sizes="pageSizeArray"
      :page-size="pagination.size || 10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total || 0"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    // 表格数据请求路径
    url: {
      type: String,
      default: ''
    },
    // 表头
    tableLabel: {
      type: Array,
      default: () => []
    },
    // 是否显示分页
    showPagination: {
      type: Boolean,
      default: true
    },
    // 分页条数
    pageSizeArray: {
      type: Array,
      default: () => [10, 20, 30, 50, 100]
    },
    // 分页
    pagination: {
      type: Object,
      default: () => ({
        current: 1,
        size: 10,
        total: 0
      })
    },
    // 表格配置
    tableOption: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        stripe: false, // 是否为斑马纹 table
        highlightCurrentRow: false, // 点击是否要高亮当前行
        border: false
      }
    } // table 表格的控制参数
  },
  data() {
    return {
      tableData: [] // 表格数据
    }
  },
  components: {},
  watch: {
    // 监听传进来的url，变化则重新发起请求
    url: {
      handler() {
        this.handleInitTable()
      }
    },
    immediate: true
  },
  methods: {
    // 根据传进来的url获取表格数据
    handleInitTable() {
      console.log('根据url获取表格数据', this.url)
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
        },
        {
          content: '李四',
          gender: '女',
          title: '李四公司',
          email: '403505038@qq.com',
          displayTime: '2021-06-20',
          status: 3
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
    },

    // 多行选中
    handleSelectionChange(val) {
      console.log('选中', val)
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 每页显示的条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagination.size = val
      this.handleInitTable()
    },
    // 页码变化触发，发起请求
    handleCurrentChange(val) {
      this.pagination.current = val
      console.log(`当前页: ${this.pagination.current}`)
      this.handleInitTable()
    },
    // 排序
    sortChange(column) {
      // column.order = "ascending" 升序
      // column.order = "descending" 降序
      console.log('排序', column)
      this.$emit('sortChange', column.order)
    }
  }
}
</script>

<style lang="scss">
.table-template {
  .el-table {
    color: #333;
    .el-table__header-wrapper {
      .has-gutter {
        color: #333 !important;
        tr {
          th {
            background: #fffef9;
          }
        }
      }
    }
  }
  .table-pagination {
    background: #fff;
    margin-bottom: 20px;
    padding: 5px;
    text-align: right;
  }
}
</style>
