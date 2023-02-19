import { withInstall } from '@cobyte-ui/utils'
import Input from './src/input.vue'

// 通过 withInstall 方法给 Input 添加了一个 install 方法
const ElInput = withInstall(Input)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export default ElInput
export * from './src/input'
