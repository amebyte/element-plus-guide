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
    validator(rule: any, value: string, callback: any, source: any) {
      if (
        Object.prototype.hasOwnProperty.call(source, rule.field) &&
        (value === '' || value === undefined || value === null)
      ) {
        callback('请输入用户名')
      }
    },
  },
  password: [
    {
      validator(rule: any, value: string, callback: any, source: any) {
        if (
          Object.prototype.hasOwnProperty.call(source, rule.field) &&
          (value === '' || value === undefined || value === null)
        ) {
          callback('请输入密码')
        }
      },
    },
    {
      validator(rule: any, value: string, callback: any, source: any) {
        if (
          Object.prototype.hasOwnProperty.call(source, rule.field) &&
          (value.length < 6 || value.length > 18)
        ) {
          callback('密码长度必须大于6位小于18位')
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
  validate(source_: any, callback: any) {
    const source = source_
    const errors = [] as string[]
    // 最终保存验证数据的集合
    const series = {} as any
    const keys = Object.keys(this.rules)
    keys.forEach((z) => {
      // 字段中验证规则数组
      const arr = this.rules[z]
      // 对应的字段值
      const value = source[z]
      arr.forEach((r: any) => {
        const rule = r
        // 在规则中添加对应的字段记录
        rule.field = z
        series[z] = series[z] || []
        // 为每个验证策略配置对应的上下文内容，从而可以获取验证的规则，验证字段的值
        series[z].push({
          rule,
          value,
          source, // 添加需要校验的数据源
        })
      })
    })

    const objArrKeys = Object.keys(series)
    // 遍历执行验证字段策略中的策略
    objArrKeys.forEach((key) => {
      const arr = series[key]
      arr.forEach((a: any) => {
        const rule = a.rule
        function cb(e = []) {
          const errorList = Array.isArray(e) ? e : [e]
          errors.push(...errorList)
        }
        // 执行校验策略函数的时候把对应的规则和需要校验的数据源也传递过去
        rule.validator(rule, a.value, cb, a.source)
      })
    })
    console.log('errors', errors)
    callback(errors)
  }
}
const validator = new Schema(rules)
const handleSubmit = () => {
  validator.validate(
    { username: username.value, password: password.value },
    (errors: any) => {
      if (!errors.length) {
        alert('提交成功')
      } else {
        alert('提交失败')
      }
    }
  )
}

const handleUsernameBlur = () => {
  validator.validate({ username: username.value }, (errors: any) => {
    if (errors.length) {
      alert(errors[0])
    }
  })
}
const handlePasswordBlur = () => {
  validator.validate({ password: password.value }, (errors: any) => {
    if (errors.length) {
      alert(errors[0])
    }
  })
}
</script>
