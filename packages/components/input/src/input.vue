<template>
  <div :class="nsInput.b()">
    <input ref="input" :type="type" @input="handleInput" />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, shallowRef } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { UPDATE_MODEL_EVENT } from '@cobyte-ui/constants'
import { inputEmits, inputProps } from './input'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
  name: 'ElInput',
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const nsInput = useNamespace('input')

const input = shallowRef<HTMLInputElement>()
const _ref = computed(() => input.value)
const nativeInputValue = computed(() =>
  !props.modelValue ? '' : String(props.modelValue)
)

const setNativeInputValue = () => {
  const input = _ref.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

const handleInput = async (event: Event) => {
  const { value } = event.target as TargetElement
  emit(UPDATE_MODEL_EVENT, value)
  await nextTick()
  setNativeInputValue()
}

onMounted(() => {
  setNativeInputValue()
})
</script>
