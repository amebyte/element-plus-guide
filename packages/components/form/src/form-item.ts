import { definePropType } from '@cobyte-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '@cobyte-ui/utils'
import type formItem from './form-item.vue'
import type { FormItemRule } from '@cobyte-ui/tokens'

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const
export type FormItemValidateState = typeof formItemValidateStates[number]
export type FormItemProp = Arrayable<string>
export const formItemProps = {
  label: String,
  prop: String,
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
} as const
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type FormItemInstance = InstanceType<typeof formItem>
