<template>
  用户名：<el-input v-model="username" type="text" @blur="handleUsernameBlur" />
  密码：<el-input
    v-model="password"
    type="password"
    @blur="handlePasswordBlur"
  />
  <el-button @click="handleSubmit">提交</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const usernameValidator = () => {
  if (username.value === '') {
    alert('请输入用户名')
    return false
  }
  return true
}
const passwordValidator = () => {
  if (password.value === '') {
    alert('请输入密码')
    return false
  } else if (password.value.length < 6 || password.value.length > 18) {
    alert('密码长度必须大于6位小于18位')
    return false
  }
  return true
}
const handleSubmit = () => {
  if (usernameValidator() && passwordValidator()) {
    alert('提交成功')
  } else {
    alert('提交失败')
  }
}
const handleUsernameBlur = () => {
  return passwordValidator()
}
const handlePasswordBlur = () => {
  return passwordValidator()
}
</script>
