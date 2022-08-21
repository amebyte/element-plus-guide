<script setup lang="ts">
import { reactive, mounted, getCurrentInstance } from 'vue'
import Icon from '@cobyte/components/icon/src/icon.vue'
console.log('Icon', Icon)

const arr = reactive([1,2,3])
window.arr = arr
window.instance = getCurrentInstance()
</script>

<template>
    <div id="content">
        <div v-for="v in arr" :key="v" >{{v}}</div>
    </div>
</template>

<style scoped>

</style>
