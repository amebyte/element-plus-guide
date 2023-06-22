<template>
  用户名：<el-input v-model="username" type="text" /> 密码：<el-input
    v-model="password"
    type="password"
  />
  <el-button>提交</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')
</script>
