<template>
  <el-form>
    <el-form-item
      label="用户名："
      :rules="[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 10,
          message: '用户名长度最少6位且不能超过10位',
          trigger: 'change',
        },
      ]"
    >
      <el-input v-model="data.username" />
    </el-form-item>
    <el-button @click="handleSubmit">提交</el-button>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const data = reactive({ username: '' })
const handleSubmit = () => {
  console.log('handleSubmit')
}
</script>
