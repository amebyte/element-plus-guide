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
import { provide, reactive, ref, toRefs } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formItemContextKey } from '@cobyte-ui/tokens/form'
import { formItemProps } from './form-item'
import type { FormItemContext } from '@cobyte-ui/tokens/form'
defineOptions({
  name: 'ElFormItem',
})
const props = defineProps(formItemProps)
const ns = useNamespace('form-item')
const validateMessage = ref('')

const validate: FormItemContext['validate'] = async (trigger) => {
  console.log('trigger', trigger)
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate,
})

provide(formItemContextKey, context)
</script>
