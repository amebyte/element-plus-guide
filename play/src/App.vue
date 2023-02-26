<template>
  <div style="padding-top: 50px">
    <el-input v-model="state" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const state = ref('')
watch(
  () => state.value,
  (newVal) => {
    console.log('state值：', newVal)
  }
)
</script>
