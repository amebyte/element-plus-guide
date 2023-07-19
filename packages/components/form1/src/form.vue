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

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    addField,
  })
)
</script>
