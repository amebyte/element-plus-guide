<template>
  <form :class="formClasses"><slot /></form>
</template>
<script lang="ts" setup>
import { computed, provide, reactive, toRefs } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formContextKey } from '@cobyte-ui/tokens'
import { formEmits, formProps } from './form'

defineOptions({
  name: 'ElForm',
})
const props = defineProps(formProps)
const emit = defineEmits(formEmits)
const ns = useNamespace('form')
const formClasses = computed(() => {
  return [ns.b()]
})
console.log('props', props)
provide(
  formContextKey,
  reactive({
    ...toRefs(props),
    emit,
  })
)
</script>
