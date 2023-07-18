import { definePropType } from '@cobyte-ui/utils'
import type { FormRules } from '@cobyte-ui/tokens'

export const formProps = {
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object),
  },
} as const
