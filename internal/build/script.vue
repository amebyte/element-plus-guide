<template>
  <div>{{ name }}</div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CompilerSfcTest',
  setup() {
    const name = ref('如何编译 .vue 文件')
    return {
      name,
    }
  },
})
</script>
<style>
div {
  color: red;
}
</style>
