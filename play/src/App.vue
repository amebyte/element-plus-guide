<template>
  <el-form
    ref="formRef"
    :model="data"
    :rules="{
      username: {
        min: 6,
        max: 10,
        message: '用户名长度最少6位且不能超过10位',
        trigger: 'change',
      },
    }"
  >
    <el-form-item
      label="用户名："
      prop="username"
      :rules="[
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ]"
    >
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
          message: '密码名必须要大于6位小于18位',
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
import { computed, reactive, ref, shallowRef } from 'vue'
import type { FormInstance } from '@cobyte-ui/components/form'

const formRef = shallowRef<FormInstance>()
const data = reactive({ username: '', password: '' })
const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('验证成功')
    } else {
      console.log('验证失败')
    }
  })
}

const d1 = ref({
  a: {
    b: {
      c: 2,
    },
  },
})
const d2 = ref({
  aa: computed(() => {
    console.log('计算')
    return d1.value.a.b.c
  }),
})
console.log('d2', d2.value.aa)
d1.value.a.b.c = 333
console.log('重新计算', d2.value.aa)
</script>
