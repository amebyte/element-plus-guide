<template>
  <el-form-item
    label="用户名称"
    prop="username"
    :rules="[
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 5',
        trigger: ['blur', 'change'],
      },
    ]"
  >
    <template #label>用户名</template>
    <el-input v-model="data.username" />
  </el-form-item>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({ username: '' })
</script>
