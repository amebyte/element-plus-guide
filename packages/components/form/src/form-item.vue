<template>
  <div :class="formItemClasses">
    <label :class="ns.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div :class="ns.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formItemProps } from './form-item'
import type { FormItemValidateState } from './form-item'
defineOptions({
  name: 'ElFormItem',
})
defineProps(formItemProps)
const ns = useNamespace('form-item')
const validateState = ref<FormItemValidateState>('')
const formItemClasses = computed(() => [
  ns.b(),
  ns.is('error', validateState.value === 'error'),
  ns.is('success', validateState.value === 'success'),
])
const validateMessage = ref('')
</script>
