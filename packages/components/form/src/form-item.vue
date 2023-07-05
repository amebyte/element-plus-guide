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
import { computed, provide, reactive, ref, toRefs } from 'vue'
import { useNamespace } from '@cobyte-ui/hooks'
import { formItemContextKey } from '@cobyte-ui/tokens/form'
import { formItemProps } from './form-item'
import type { FormItemContext, FormItemRule } from '@cobyte-ui/tokens/form'
import type { FormItemValidateState } from './form-item'
defineOptions({
  name: 'ElFormItem',
})
const props = defineProps(formItemProps)
const ns = useNamespace('form-item')
const validateState = ref<FormItemValidateState>('')
const formItemClasses = computed(() => [
  ns.b(),
  ns.is('error', validateState.value === 'error'),
  ns.is('success', validateState.value === 'success'),
])
const validateMessage = ref('')

const _rules = computed(() => {
  const rules: FormItemRule[] = props.rules
    ? Array.isArray(props.rules)
      ? props.rules
      : [props.rules]
    : []
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

const validate: FormItemContext['validate'] = async (trigger, callback) => {
  const rules = getFilteredRule(trigger)
  console.log('trigger', trigger, rules)
}

const context: FormItemContext = reactive({
  ...toRefs(props),
  validate,
})

provide(formItemContextKey, context)
</script>
