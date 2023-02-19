import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@cobyte-ui/constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type Input from './input.vue'

// 定义 props
export const inputProps = {
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
} as const

// Props 类型
export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export type InputEmits = typeof inputEmits

export type InputInstance = InstanceType<typeof Input>
