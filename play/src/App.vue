<template>
  <div style="padding-top: 100px">
    <!-- <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <br /> -->
    <!-- <el-button-group type="success" size="large">
      <el-button>按钮1</el-button>
      <el-button>按钮2</el-button>
    </el-button-group> -->
    <input ref="input" :value="delautValue" name="username" />
    <el-button type="primary" @click="onSubmit">提交</el-button>
    {{ delautValue }}
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Edit } from '@element-plus/icons-vue'
const input = ref()
const delautValue = ref('稀土掘金')
watch(delautValue, (newVal, oldVal) => {
  console.log('newVal', newVal)
})
const onSubmit = () => {
  console.log(input.value.value, delautValue.value)
}
</script>
<style>
@font-face {
  font-family: 'iconfont';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAPIAAsAAAAACDAAAAN8AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqDKIJ8ATYCJAMUCwwABCAFhGcHXRszB8ieGjszMAURLRpbqK1NZLgai+Bpjd+83b37rkkUPJlGTXgTT1Q8iYdGtZBInqmizTP5JueqHACqHCL0ukm3u5zmUBE5JMlCIiqkp/Fvf/7/Tv0JTozFtidAC2TM7gl21TvSDl1Am7qfB7DYYs8/WVNbJGPOvRCigKCAWDUvXH2FqqsDgBEpuczPzki9YezKi3iOQLvV4mnu8nJLgemFOlUAR9qMziDOjQt9jgH63KDU5IZWoW67sYhHKtLtdMFD//vjn7WhT1JlxjH7T6WJwO4vsajNnU0n+Su3Q4CTEypkLF+ZKS7WOy7QCsPLaWkvG65tG6BdqySN2i+2qPxZahpiyd5U7eY/PEKSFaJmZHeCbShS+GlrIwQ/YxESPysRMj9rRW+nvALtsOg1wHOsmRzzL5IQXV0r2kzGaq3jaLnF+/VicyC71TjxsrzcdtZ20pCJG88Y4c4TKNefsuzjtxfkuCfx/iB25DlF3RiftC3VEO8xZFM2A0dvvO7J4xbdb/Dzbn5g56Vx48CdycHBDQeFt09l735ICJWYiystE0rLmTzH+aew04a1cR72nVcdHZHCyh8UhZbPmZ99R0vcYoHNW8yxRb45HFSQVL7tbneSLJMwwGzJPEoPP7L7Kzr+FhzVSmlQNP3r8HLHTW1uTh22uJ5mODzg2H9/M2RxRIVPtldGhle2zxbiIm7ETaq3xGEVEWLX0etr2H3G1qBe/aFD8yrrADTzzQyQLtFTkKU/+jve5Sz732AW+1+/o4AfK/GoX9YoMv6IUmvB/1Mea4laVB5SlrJm2yaoRvsTXom/1PDDPP3exlENtM4mtBqIIWkxAVmrKWwhLkGlw1qotdoM7ZZJ295hgIqWKG2Y0wMg9FqFpNsLyHqdYAvxHirDfkOt1z9odyBMDuswF6xNEEORCDa1Q55VKrClpn6vxYhrljGkKFCOiMBDHwzyD8zGMpACkSGWCC1cMKUYYqKUw3R6HZLJlFBFlBLEUn8xparogABc9iX+rFIOUhAIg0JEoCbtIB5LSQG76DT984ohnGYyDNISWx4mBDzsHQriL7AFNkOhaNVyJccIWnCCURQGYQRE5aB0bkNkSlgJUpWPk0BYlD9xj6BKtAATDbdV+M+vkj/gLmhnHFFFihwlqqh1XZhyvHAdKYIfyxCDO8jzo0ighmFbELUHAwA=')
    format('woff2');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconlogistics-car:before {
  content: '\e616';
}

.el-button + .el-button {
  margin-left: 12px;
}
</style>
