<template>
  <i :class="bem.b()">
    <slot />
  </i>
</template>

<script setup lang="ts">
// import { computed } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
// import { iconProps } from './icon'
defineOptions({
  name: 'c-icon',
})
const bem = useNamespace('icon')
// const props = defineProps(iconProps)

// const style = computed(() => {
//   if (!props.size && !props.color) return {}
//   return {
//     ...(props.size ? { 'font-size': `${props.size}px` } : {}),
//     ...(props.color ? { color: props.color } : {}),
//   }
// })
</script>
