<template>
  <el-input v-model="state" />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const state = ref('')
watch(
  () => state.value,
  (newVal) => {
    console.log(newVal)
  }
)
</script>
