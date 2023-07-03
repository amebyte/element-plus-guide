import { definePropType } from '@cobyte-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '@cobyte-ui/utils'
import type formItem from './form-item.vue'

export type FormItemProp = Arrayable<string>
export const formItemProps = {
  label: String,
  prop: {
    type: definePropType<FormItemProp>([String, Array]),
  },
} as const
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export type FormItemInstance = InstanceType<typeof formItem>
