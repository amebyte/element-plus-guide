<template>
  <input :value="state" type="text" @change="changeHandle" />
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['change'])

const state = ref('')

watch(
  () => props.value,
  (newVal) => {
    state.value = newVal
  },
  { immediate: true }
)

const changeHandle = (e: any) => {
  state.value = e.target.value
  emit('change', state.value)
}
</script>
