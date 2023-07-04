<template>
  <div :class="formItemClasses">form-item</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
defineOptions({
  name: 'ElFormItem',
})
const ns = useNamespace('form-item')
const formItemClasses = computed(() => [ns.b()])
</script>
