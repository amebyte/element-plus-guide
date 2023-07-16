<template>
  <el-form>
    <el-form-item>
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
