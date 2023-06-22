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
const handleSubmit = () => {
  if (username.value === '') {
    alert('请输入用户名')
    return false
  } else if (password.value === '') {
    alert('请输入密码')
    return false
  } else if (password.value.length < 6 || password.value.length > 18) {
    alert('密码长度必须大于6位小于18位')
    return false
  }
}
const handleUsernameBlur = () => {
  if (username.value === '') {
    alert('请输入用户名')
  }
}
const handlePasswordBlur = () => {
  if (password.value === '') {
    alert('请输入密码')
  } else if (password.value.length < 6 || password.value.length > 18) {
    alert('密码长度必须大于6位小于18位')
  }
}
</script>
