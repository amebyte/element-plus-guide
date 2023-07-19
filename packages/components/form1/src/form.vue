<template>
  <form :class="ns.b()"><slot /></form>
</template>
<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formContextKey } from '@cobyte-ui/tokens'
import { formProps } from './form'
import type { FormContext, FormItemContext } from '@cobyte-ui/tokens'
defineOptions({
  name: 'ElForm',
})
const props = defineProps(formProps)
const fields: FormItemContext[] = []
const ns = useNamespace('form')

const addField: FormContext['addField'] = (context) => {
  fields.push(context)
}

// 在父级中调用所有的后代组件的校验
const validate = async (callback?: any) => {
  let validationErrors: any = {}
  for (const field of fields) {
    try {
      // 触发方式为空则校验所有规则
      await field.validate('')
    } catch (errors: any) {
      validationErrors = {
        ...errors.fields,
        ...(fields as any),
      }
    }
  }
  // 如果错误信息为空则表示验证全部通过
  if (Object.keys(validationErrors).length === 0) return callback?.(true)
  callback?.(false, validationErrors)
}

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    addField,
  })
)
// 对外暴露 validate 方法
defineExpose({
  validate,
})
</script>
