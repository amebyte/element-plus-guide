<template>
  <el-form-item prop="username">
    <el-input v-model="data.username" />
  </el-form-item>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'

const data = reactive({ username: '' })
</script>
