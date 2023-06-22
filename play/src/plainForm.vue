<template>
  用户名：<el-input v-model="state" type="text" />
  <el-button>提交</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const state = ref('')
</script>
