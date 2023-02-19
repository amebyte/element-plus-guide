import { isString } from '@vue/shared'
import { UPDATE_MODEL_EVENT } from '@cobyte-ui/constants'
import type { ExtractPropTypes, PropType } from 'vue'
import type Input from './input.vue'

// 定义 props
export const inputProps = {
  modelValue: {
    type: [String, Number, Object] as PropType<string | number | object>,
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
}

export type InputEmits = typeof inputEmits

export type InputInstance = InstanceType<typeof Input>
