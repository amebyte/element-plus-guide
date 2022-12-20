import { withInstall, withNoopInstall } from '@cobyte-ui/utils'
import Button from './src/button.vue'
import ButtonGroup from './src/button-group.vue'

// 通过 withInstall 方法给 Button 添加了一个 install 方法
const ElButton = withInstall(Button, { ButtonGroup })

// 导出 ButtonGroup 组件
export const ElButtonGroup = withNoopInstall(ButtonGroup)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export default ElButton
export * from './src/button'
