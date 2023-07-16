import { withInstall, withNoopInstall } from '@cobyte-ui/utils'
import Form from './src/form.vue'
import FormItem from './src/form-item.vue'

export const ElForm = withInstall(Form, {
  FormItem,
})
export default ElForm
// 通过 withInstall 方法给 FormItem 添加了一个 install 方法
export const ElFormItem = withNoopInstall(FormItem)

export type FormInstance = InstanceType<typeof Form>
export type FormItemInstance = InstanceType<typeof FormItem>
