<template>
    <i :class="bem.b()" :style="style">
        <slot></slot>
    </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { createNamespace } from '@cobyte/utils/create'
import { iconProps } from './icon'
defineOptions({
    name: 'c-icon'
})
const bem = createNamespace('c-icon')
const props = defineProps(iconProps)

const style = computed(() => {
    if(!props.size && !props.color) return {}
    return {
        ...(props.size ? {'font-size': props.size + 'px'} : {}),
        ...(props.color ? { color: props.color } : {})
    }
})

</script>