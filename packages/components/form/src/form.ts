import { definePropType, isArray, isBoolean, isString } from '@cobyte-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type { FormItemProp } from './form-item'
import type { FormRules } from '@cobyte-ui/tokens'

export const formProps = {
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object),
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const
export type FormProps = ExtractPropTypes<typeof formProps>
export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
}
export type FormEmits = typeof formEmits
