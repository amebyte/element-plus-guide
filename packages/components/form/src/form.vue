<template>
  <form :class="formClasses"><slot /></form>
</template>
<script lang="ts" setup>
import { computed, provide, reactive, toRefs } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formContextKey } from '@cobyte-ui/tokens'
import { formEmits, formProps } from './form'
import type { FormContext, FormItemContext } from '@cobyte-ui/tokens'

defineOptions({
  name: 'ElForm',
})
const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const fields: FormItemContext[] = []
const ns = useNamespace('form')
const formClasses = computed(() => {
  return [ns.b()]
})
// 在父级中调用所有的后代组件的校验
const validate = async (callback?: any) => {
  let validationErrors: any = {}
  for (const field of fields) {
    try {
      await field.validate('')
    } catch (errors: any) {
      validationErrors = {
        ...errors.fields,
        ...(fields as any),
      }
    }
  }

  if (Object.keys(validationErrors).length === 0) return callback?.(true)
  callback?.(false, validationErrors)
}

const addField: FormContext['addField'] = (context) => {
  fields.push(context)
}

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    emit,
    addField,
  })
)

defineExpose({
  validate,
})
</script>
