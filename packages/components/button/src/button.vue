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
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <el-icon v-else :class="ns.is('loading')">
        <component :is="loadingIcon" />
      </el-icon>
    </template>
    <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon>
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
const emit = defineEmits(buttonEmits)
// classname 的 BEM 命名
const ns = useNamespace('button')
// 按钮 html 元素
const _ref = ref<HTMLButtonElement>()
// 点击事件函数
const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}

// 组件暴露自己的属性以及方法，去供外部使用
defineExpose({
  ref: _ref,
})
</script>
