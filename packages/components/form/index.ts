import { withInstall } from '@cobyte-ui/utils'
import FormItem from './src/form-item.vue'

// 通过 withInstall 方法给 FormItem 添加了一个 install 方法
const ElFormItem = withInstall(FormItem)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export default ElFormItem
export * from './src/form-item'
export * from './src/form'
