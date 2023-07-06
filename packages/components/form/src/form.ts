import { definePropType, isArray, isBoolean, isString } from '@cobyte-ui/utils'
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
}
export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
}
export type FormEmits = typeof formEmits
