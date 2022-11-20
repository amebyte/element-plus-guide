// 用来整合组件的，最终实现导出组件

import { withInstall } from '@cobyte-ui/utils'
import Icon from './src/icon.vue'
// 通过 withInstall 方法给 Icon 添加了一个 install 方法
const ElIcon = withInstall(Icon)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export default ElIcon
export * from './src/icon'

// 这里添加的类型，可以在模板里面被解析
declare module 'vue' {
  export interface GlobalComponents {
    // 我们的接口可以自动合并
    ElIcon: typeof Icon
  }
}
