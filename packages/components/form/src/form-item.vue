<template>
  <div :class="formItemClasses">
    <label :class="ns.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="ns.e('content')">
      <slot />
      <div :class="ns.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject, provide, reactive, ref, toRefs } from 'vue'
import AsyncValidator from 'async-validator'
import { useNamespace } from '@cobyte-ui/hooks'
import { formContextKey, formItemContextKey } from '@cobyte-ui/tokens/form'
import { formItemProps } from './form-item'
import type { FormItemContext, FormItemRule } from '@cobyte-ui/tokens/form'
import type { FormItemValidateState } from './form-item'
import type { Arrayable } from '@cobyte-ui/utils'
defineOptions({
  name: 'ElFormItem',
})
const props = defineProps(formItemProps)
const formContext = inject(formContextKey, undefined)
const ns = useNamespace('form-item')
const validateState = ref<FormItemValidateState>('')
const formItemClasses = computed(() => [
  ns.b(),
  ns.is('error', validateState.value === 'error'),
  ns.is('success', validateState.value === 'success'),
])
const validateMessage = ref('')

const ensureArray = (rules: Arrayable<FormItemRule> | undefined) => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}

const _rules = computed(() => {
  const rules: FormItemRule[] = ensureArray(props.rules)
  const formRules = formContext?.rules
  if (formRules && props.prop) {
    const _rules = formRules[props.prop]
    if (_rules) {
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

const validate: FormItemContext['validate'] = async (
  trigger,
  _callback
): Promise<true> => {
  const rules = getFilteredRule(trigger)
  console.log('trigger', trigger, rules, formContext?.model, formContext?.rules)
  // rules 是触发的规则，trigger 是触发的方式
  // 需要找到对应的数据源，也就是对应的 prop
  // 触发事件，找到对应的规则和数据源去校验对应的属性值
  const modelName = props.prop!
  const model = formContext?.model!
  // 声明校验实例对象
  const validator = new AsyncValidator({
    [modelName]: rules,
  })
  return validator
    .validate({ [modelName]: model[modelName] }, { firstFields: true })
    .then(() => {
      console.log('校验成功')
      return true as const
    })
    .catch((err: any) => {
      console.log('校验失败')
      return Promise.reject(err)
    })
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate,
})

provide(formItemContextKey, context)
</script>
