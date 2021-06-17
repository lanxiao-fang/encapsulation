<template>
  <div class="comForm">
    <el-form
      :label-width="formConfig.labelWidth"
      :inline="formConfig.inline"
      :ref="formConfig.ref"
      :model="form"
    >
      <el-form-item
        :label="item.label"
        v-for="(item, index) in formData"
        :key="index"
        :prop="item.prop"
        :rules="item.rules"
        :style="{ width: item.width }"
      >
        <el-input
          v-if="item.type === 'input'"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
        ></el-input>
        <el-select
          v-if="item.type === 'select'"
          style="width: 100%"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
        >
          <el-option
            :label="opItem.label"
            :value="opItem.value"
            v-for="(opItem, index) in item.options"
            :key="index"
          ></el-option>
        </el-select>
        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          style="width: 100%"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
        ></el-date-picker>
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
        >
          <el-radio
            :label="opItem.label"
            v-for="(opItem, index) in item.options"
            :key="index"
            :rules="item.rules"
          ></el-radio>
        </el-radio-group>
        <el-input
          v-if="item.type === 'textarea'"
          type="textarea"
          v-model="form[item.prop]"
          :placeholder="item.placeholder"
        ></el-input>
        <el-switch v-if="item.type === 'switch'" v-model="form[item.prop]"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formConfig.ref)">立即创建</el-button>
        <el-button @click="resetForm(formConfig.ref)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  props: {
    formData: {
      type: Array,
      required: true,
      default: () => []
    },
    formParams: {
      type: Object,
      required: true,
      default: () => ({})
    },
    formConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {}
    }
  },
  watch: {
    formParams: {
      handler(val) {
        this.form = cloneDeep(val)
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
