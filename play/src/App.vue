<template>
  <el-input />
  <br />
  <br />
  <br />
  <input :value="state" name="username" @change="onChange" />
  <br />
  <br />
  <el-button type="primary" @click="onSubmit">提交</el-button>
  <br />
  <br />
  state 值：{{ state }}
</template>
<script setup>
import { ref } from 'vue'
// 编辑时的默认值
const state = ref('稀土掘金')
const onChange = (e) => {
  state.value = e.target.value
}
// 提交方法
const onSubmit = () => {
  console.log('提交的数据：')
  console.log('state值', state.value)
}
</script>
