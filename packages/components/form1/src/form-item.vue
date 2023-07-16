<template>
  <div :class="ns.b()">
    <label :class="ns.e('label')">
      {{ label }}
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div :class="ns.e('error')">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formItemProps } from './form-item'
defineOptions({
  name: 'ElFormItem',
})
const props = defineProps(formItemProps)
const ns = useNamespace('form-item')
const validateMessage = ref('')
</script>
