<template>
  <input :value="state" type="text" @change="changeHandle" />
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['onUpdate:modelValue'])

const state = ref('')

watch(
  () => props.modelValue,
  (newVal) => {
    state.value = newVal
  },
  { immediate: true }
)

const changeHandle = (e: any) => {
  state.value = e.target.value
  emit('onUpdate:modelValue', state.value)
}
</script>
