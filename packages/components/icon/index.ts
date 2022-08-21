// 用来整合组件的，最终实现导出组件
import { Plugin } from 'vue'
import _Icon from './src/icon.vue'
export * from './src/icon'

export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(comp: T) {
    (comp as SFCWithInstall<T>).install = function(app) {
        const { name } = comp as unknown as {name: string}
        // 将组件注册成为全局的组件
        app.component(name, comp)
    }
    return comp as SFCWithInstall<T>
}

const Icon = withInstall(_Icon)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export default Icon
