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
        setTimeout(() => {
          callback('请输入用户名')
        }, 3000)
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

/**
 * 并行校验规则
 * @param arr 字段策略数组
 * @param callback 计算字段验证进度函数回调
 */
function asyncParallelArray(arr: any, callback: any) {
  // 每个字段需要验证的策略总数
  let tatal = 0
  const results = [] as any
  // 计算字段策略的验证进度
  const count = (error: any) => {
    results.push(...(error || []))
    tatal++
    // 等待每个字段策略中策略全部验证完毕再计算下一个字段的验证
    if (tatal === arr.length) {
      callback(results)
    }
  }
  // 遍历字段策略中的策略
  arr.forEach((a: any) => {
    const rule = a.rule
    function cb(e = []) {
      const errorList = Array.isArray(e) ? e : [e]
      count(errorList)
    }
    // 执行校验策略函数的时候把对应的规则和需要校验的数据源也传递过去
    rule.validator(rule, a.value, cb, a.source)
  })
}

/**
 * 异步验证函数
 * @param objArr series
 * @param callback 回调函数
 */
function asyncMap(objArr: any, callback: any) {
  const errors = [] as string[]
  const objArrKeys = Object.keys(objArr)
  const objArrLength = objArrKeys.length
  // 需要验证的字段总数
  let total = 0
  return new Promise<void>((resolve, reject) => {
    // 计算字的验证进度，同时如果字段验证完毕则把相关结果返回
    const next = (error: any) => {
      errors.push(...error)
      // 等待每个字段策略中策略全部验证完毕再计算下一个字段的验证
      total++
      // 当 total === objArrLength 的时候就是字段策略循环验证完毕的时候
      if (total === objArrLength) {
        // 同时执行回调函数，兼容不同的写法需求
        callback && callback(errors)
        // 如果存在错误则 reject 错误信息，否则就 resolve 表示成功
        errors.length ? reject(errors) : resolve()
      }
    }
    // 遍历执行验证每一个字段策略
    objArrKeys.forEach((key) => {
      const arr = objArr[key]
      asyncParallelArray(arr, next)
    })
  })
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
  validate(source_: any, callback?: any) {
    const source = source_
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
    return asyncMap(series, callback)
  }
}
const validator = new Schema(rules)
const handleSubmit = () => {
  validator
    .validate({ username: username.value, password: password.value })
    .then(() => {
      alert('提交成功')
    })
    .catch((errors) => {
      console.error(errors)
      alert('提交失败')
    })
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
