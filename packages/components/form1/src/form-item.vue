<template>
  <div :class="ns.b()">
    <label :class="ns.e('label')">
      {{ label }}
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div :class="ns.e('error')">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  computed,
  inject,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
} from 'vue'
import AsyncValidator from 'async-validator'
import { useNamespace } from '@cobyte-ui/hooks'
import { formContextKey, formItemContextKey } from '@cobyte-ui/tokens/form'
import { formItemProps } from './form-item'
import type { FormItemContext, FormItemRule } from '@cobyte-ui/tokens/form'
import type { Arrayable } from '@cobyte-ui/utils'
defineOptions({
  name: 'ElFormItem',
})
const props = defineProps(formItemProps)
const formContext = inject(formContextKey, undefined)
const ns = useNamespace('form-item')
const validateMessage = ref('')

// 把校验规则统一处理成数组
const ensureArray = (rules: Arrayable<FormItemRule> | undefined) => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}

const _rules = computed(() => {
  const rules: FormItemRule[] = ensureArray(props.rules)
  const formRules = formContext?.rules
  // 当 Form 组件的 rules 存在并且 Form-item 的 prop 属性也需要存在，才进行规则合并
  if (formRules && props.prop) {
    const _rules = formRules[props.prop]
    if (_rules) {
      // 在合并前同样通过 ensureArray 函数统一处理成数组
      rules.push(...ensureArray(_rules))
    }
  }
  return rules
})

const getFilteredRule = (trigger: string) => {
  const rules = _rules.value
  return rules.filter((rule) => {
    // 这种情况全部校验
    if (!rule.trigger || !trigger) return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger)
    } else {
      return rule.trigger === trigger
    }
  })
}

// 校验失败的处理
const onValidationFailed = (error: any) => {
  const { errors } = error
  validateMessage.value = errors
    ? errors?.[0]?.message ?? `${props.prop} is required`
    : ''
}
// 校验成功的处理
const onValidationSucceeded = () => {
  validateMessage.value = ''
}

const validate: FormItemContext['validate'] = async (trigger) => {
  const rules = getFilteredRule(trigger)
  // 获取 Form-item 的 prop 属性
  const modelName = props.prop!
  // 获取 Form 组件的 model 的数据源
  const model = formContext?.model!
  console.log('formContext', formContext, modelName, model, model[modelName])
  // 声明校验实例对象
  const validator = new AsyncValidator({
    [modelName]: rules,
  })
  return validator
    .validate({ [modelName]: model[modelName] }, { firstFields: true })
    .then(() => {
      onValidationSucceeded()
    })
    .catch((err: any) => {
      onValidationFailed(err)
      return Promise.reject(err)
    })
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate,
})

provide(formItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
  }
})
</script>
