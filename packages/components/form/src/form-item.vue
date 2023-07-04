<template>
  <div :class="formItemClasses">
    <label :class="ns.b('label')">label</label>
    <div :class="ns.b('content')">
      <slot />
      <div :class="ns.b('error')">{{ validateMessage }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import type { FormItemValidateState } from './form-item'
defineOptions({
  name: 'ElFormItem',
})
const ns = useNamespace('form-item')
const validateState = ref<FormItemValidateState>('')
const formItemClasses = computed(() => [
  ns.b(),
  ns.is('error', validateState.value === 'error'),
  ns.is('success', validateState.value === 'success'),
])
const validateMessage = ref('')
</script>
