<!--
 * @Description: table组件
 * @Author: xiaofang lan
 * @Date: 2021-06-16 16:27:55
 * @LastEditors: xiaofang lan
 * @LastEditTime: 2021-06-17 17:43:55
-->
<template>
  <div class="table-template">
    <el-table
      id="table"
      ref="table"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
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
          <span v-if="item.render">
            {{ item.render(scope.row) }}
          </span>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="tableHandle.label"
        :width="tableHandle.width"
        :label="tableHandle.label"
        align="center"
        class-name="small-padding fixed-width"
      >
        <!-- button 事件-->
        <template slot-scope="scope">
          <template v-for="(item, index) in tableHandle.options">
            <el-tooltip
              class="item btn-xs"
              placement="top"
              effect="dark"
              :key="index"
              :content="item.label"
            >
              <el-button
                type="text"
                size="mini"
                :icon="item.icon"
                :disabled="item.disabled"
                @click.native.prevent="item.method(index, scope.row)"
              >
                {{ item.label }}
              </el-button>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件-->
    <el-pagination
      class="table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current || 1"
      :page-sizes="[10, 20, 30, 50, 100]"
      :page-size="pagination.size || 10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total || 0"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableLabel: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => ({
        current: 1,
        size: 10,
        total: 0
      })
    },
    tableHandle: {
      type: Object,
      default: () => ({})
    },
    tableOption: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        stripe: false, // 是否为斑马纹 table
        highlightCurrentRow: false, // 是否要高亮当前行
        border: false
      }
    } // table 表格的控制参数
  },
  components: {},
  methods: {
    // 多行选中
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', val)
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSizeChange', Number(val))
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', Number(val))
    },
    sortChange(column) {
      // column.order = "ascending" 升序
      // column.order = "descending" 降序
      this.$emit('sortChange', column)
    }
  }
}
</script>

<style lang="scss">
.table-template {
  .el-table {
    color: #333333;
    .el-table__header-wrapper {
      .has-gutter {
        color: #333333 !important;
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
