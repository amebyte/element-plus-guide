import { definePropType } from '@cobyte-ui/utils'
import type { Arrayable } from '@cobyte-ui/utils'
import type { FormItemRule } from '@cobyte-ui/tokens'

export const formItemProps = {
  label: String,
  prop: String,
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array]),
  },
} as const
