import type { InjectionKey, SetupContext } from 'vue'
import type { RuleItem } from 'async-validator'
import type {
  FormEmits,
  FormItemProps,
  FormProps,
} from '@cobyte-ui/components/form'
import type { Arrayable } from '@cobyte-ui/utils'
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type FormValidateCallback = (isValid: boolean) => void

export type FormContext = FormProps & { emit: SetupContext<FormEmits>['emit'] }

export interface FormItemContext extends FormItemProps {
  validate(trigger: string, callback?: FormValidateCallback): Promise<void>
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
