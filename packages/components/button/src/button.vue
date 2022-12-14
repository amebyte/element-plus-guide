<template>
  <button
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { useNamespace } from '@cobyte-ui/hooks'
import { buttonEmits, buttonProps } from './button'

defineOptions({
  name: 'ElButton',
})

defineProps(buttonProps)
defineEmits(buttonEmits)
const ns = useNamespace('button')
</script>
