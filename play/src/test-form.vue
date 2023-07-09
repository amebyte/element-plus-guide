<template>
  <el-form
    ref="formRef"
    :model="data"
    :rules="{
      username: {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    }"
  >
    <el-form-item
      label="用户名称"
      prop="username"
      :rules="[
        {
          min: 3,
          max: 5,
          message: '用户名必须要大于3位小于5位',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <template #label>用户名</template>
      <el-input v-model="data.username" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      :rules="[
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 18,
          message: '用户名必须要大于6位小于18位',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="data.password" />
    </el-form-item>
    <el-button @click="handleSubmit">提交</el-button>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, shallowRef } from 'vue'
import type { FormInstance } from '@cobyte-ui/components/form'

const formRef = shallowRef<FormInstance>()
const data = reactive({ username: '', password: '' })
const handleSubmit = () => {
  formRef.value.validate((valid: any) => {
    console.log('valid', valid)
  })
}
</script>
