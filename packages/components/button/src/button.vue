<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('disabled', disabled),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle),
    ]"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { buttonEmits, buttonProps } from './button'
// 定义组件名称
defineOptions({
  name: 'ElButton',
})
// 定义 Props
defineProps(buttonProps)
// 定义 emit
defineEmits(buttonEmits)
// classname 的 BEM 命名
const ns = useNamespace('button')
// button ref
const _ref = ref<HTMLButtonElement>()
// 组件暴露自己的属性以及方法，去供外部使用
defineExpose({
  ref: _ref,
})
</script>
