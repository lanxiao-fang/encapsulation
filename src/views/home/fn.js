import XLSX from 'xlsx'

// labelList为后端字段与表头中文字段相对应的数组
// 如果找不到对应的中文名，那么英文字段将会是undefined
const analyzeExcel = (e, that, labelList) => {
  new Promise(resolve => {
    // let fileName = '' // 文件名
    const files = e.target.files
    if (files.length <= 0) {
      return false
    } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
      that.$message({
        message: '文件格式不正确，请选择xls或者xlsx格式',
        type: 'warning'
      })
      return false
    }
    // 更新获取文件名
    // fileName = files[0].name

    const fileReader = new FileReader()
    fileReader.onload = ev => {
      try {
        const data = ev.target.result
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        const wsname = workbook.SheetNames // SheetNames是数组，是含有多少个表，有时取第一张表
        let excel = []
        // 这里会涉及表格遍历并找到对应的英文字段，因此一个文件里的所有表格都应该是同一个类型的（即表头一样），不能混合否则找不到对应字段
        wsname.forEach(item => {
          excel = [...XLSX.utils.sheet_to_json(workbook.Sheets[item]), ...excel]
        })
        const excelsData = []
        // 匹配英文字段
        excel.forEach(item => {
          const obj = {}
          labelList.forEach(name => {
            obj[name.value] = item[name.babel]
          })
          excelsData.push(obj)
        })
        resolve(excelsData)
      } catch (e) {
        return false
      }
    }
    fileReader.readAsBinaryString(files[0])
  })
}

export { analyzeExcel }
