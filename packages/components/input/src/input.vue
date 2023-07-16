<template>
  <div :class="nsInput.b()">
    <input
      ref="input"
      :type="type"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  inject,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formItemContextKey } from '@cobyte-ui/tokens'
import { UPDATE_MODEL_EVENT } from '@cobyte-ui/constants'
import { inputEmits, inputProps } from './input'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

defineOptions({
  name: 'ElInput',
})
const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const formItem = inject(formItemContextKey, undefined)
const nsInput = useNamespace('input')

const input = shallowRef<HTMLInputElement>()

const isComposing = ref(false)

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
  if (isComposing.value) return
  emit(UPDATE_MODEL_EVENT, value)
  await nextTick()
  setNativeInputValue()
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  formItem?.validate?.('blur')
}

watch(
  () => props.modelValue,
  () => {
    formItem?.validate?.('change')
    setNativeInputValue()
  }
)

onMounted(() => {
  setNativeInputValue()
})

const handleCompositionStart = (event: CompositionEvent) => {
  emit('compositionstart', event)
  isComposing.value = true
}

const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event)
}

const handleCompositionEnd = (event: CompositionEvent) => {
  emit('compositionend', event)
  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
}
</script>
