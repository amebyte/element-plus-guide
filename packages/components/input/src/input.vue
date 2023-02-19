<template>
  <div :class="nsInput.b()">
    <input :type="type" />
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@cobyte-ui/hooks'
import { inputEmits, inputProps } from './input'
defineOptions({
  name: 'ElInput',
})
defineProps(inputProps)
defineEmits(inputEmits)

const nsInput = useNamespace('input')
</script>
