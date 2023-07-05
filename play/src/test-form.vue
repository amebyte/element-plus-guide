<template>
  <el-form-item label="用户名称" prop="username">
    <template #label>用户名</template>
    <el-input v-model="data.username" />
  </el-form-item>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({ username: '' })
</script>
