import { inject } from 'vue'
import { formItemContextKey } from '@cobyte-ui/tokens'
export const useFormItem = () => {
  const formItem = inject(formItemContextKey, undefined)
  return {
    formItem,
  }
}
