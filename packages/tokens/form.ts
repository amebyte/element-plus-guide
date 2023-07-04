import type { RuleItem } from 'async-validator'
import type { Arrayable } from '@cobyte-ui/utils'
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
