<template>
  用户名：<el-input v-model="username" type="text" @blur="handleUsernameBlur" />
  密码：<el-input
    v-model="password"
    type="password"
    @blur="handlePasswordBlur"
  />
  <el-button @click="handleSubmit">提交</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const username = ref('')
const password = ref('')

const rules = {
  username: {
    validator(value: string) {
      if (value === '' || value === undefined || value === null) {
        alert('请输入用户名')
        return false
      }
    },
  },
  password: [
    {
      validator(value: string) {
        if (value === '' || value === undefined || value === null) {
          alert('请输入密码')
          return false
        }
      },
    },
    {
      validator(value: string) {
        if (value.length < 6 || value.length > 18) {
          alert('密码长度必须大于6位小于18位')
          return false
        }
      },
    },
  ],
}
// 调用策略的类
class Schema {
  rules = null as any
  constructor(descriptor: any) {
    this.define(descriptor)
  }
  // 存储策略
  define(rules: any) {
    this.rules = {}

    Object.keys(rules).forEach((name) => {
      const item = rules[name]
      this.rules[name] = Array.isArray(item) ? item : [item]
    })
  }
  // 调用策略
  validate(source_: any) {
    const source = source_
    const errors = [] as boolean[]

    const series = {} as any
    const keys = Object.keys(this.rules)
    keys.forEach((z) => {
      const arr = this.rules[z]
      const value = source[z]
      arr.forEach((r: any) => {
        const rule = r
        series[z] = series[z] || []
        series[z].push({
          rule,
          value,
        })
      })
    })

    const objArrKeys = Object.keys(series)
    objArrKeys.forEach((key) => {
      const arr = series[key]
      arr.forEach((a: any) => {
        const rule = a.rule
        const result = rule.validator(a.value)
        errors.push(result)
      })
    })

    // 如果存在 false 则返回 false
    if (errors.includes(false)) {
      return false
    }
    return true
  }
}
const validator = new Schema(rules)
const handleSubmit = () => {
  if (
    validator.validate({ username: username.value, password: password.value })
  ) {
    alert('提交成功')
  } else {
    alert('提交失败')
  }
}

const handleUsernameBlur = () => {
  validator.validate({ username: username.value })
}
const handlePasswordBlur = () => {
  validator.validate({ password: password.value })
}
</script>
