<template>
  <form :class="ns.b()"><slot /></form>
</template>
<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formContextKey } from '@cobyte-ui/tokens'
import { formProps } from './form'
defineOptions({
  name: 'ElForm',
})
const props = defineProps(formProps)
const ns = useNamespace('form')

provide(
  formContextKey,
  reactive({
    ...toRefs(props),
  })
)
</script>
