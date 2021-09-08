<template>
  <div>
    <h3>读取解析excel文件</h3>
    <input
      ref="excel-upload-input"
      class="file-template"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange($event)"
    />
    <p>读取到的内容：{{ tableDataCopy }}</p>
    <p>长度： {{ tableDataCopy.length }}</p>
  </div>
</template>

<script>
import { analyzeExcel } from './fn.js'
export default {
  data() {
    return {
      tableDataCopy: []
    }
  },
  methods: {
    async handleChange(e) {
      const that = this
      const labelList = [
        {
          babel: '监测对象',
          value: 'objectName',
          isRequired: true
        },
        {
          babel: '关键词',
          value: 'keyWords'
        },
        {
          babel: '过滤词',
          value: 'filterWords'
        }
      ]
      e.stopPropagation()
      e.preventDefault()
      // 读取时异步，为了保证拿到数据开启async/await
      const data = await analyzeExcel(e, that, labelList)
      data.forEach(item => {
        if (!item.objectName || !item.objectName.trim()) {
          this.$message({
            message: '监测对象不能为空，请检查文件内容！',
            type: 'error'
          })
        }
      })
      this.tableDataCopy = data
    }
  }
}
</script>
