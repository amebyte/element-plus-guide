// 用来整合组件的，最终实现导出组件
import _Icon from './src/icon.vue'
export * from './src/icon'

export function withInstall(comp) {
    comp.install = function(app) {
        const { name } = comp
        // 将组件注册成为全局的组件
        app.component(name, comp)
    }
    return comp
}

const Icon = withInstall(_Icon)
// 可以通过 app.use 来使用，也可以通过 import 方式单独使用
export default Icon
