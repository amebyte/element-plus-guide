import type { Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin
export function withInstall<T>(comp: T) {
  ;(comp as SFCWithInstall<T>).install = function (app) {
    const { name } = comp as unknown as { name: string }
    // 将组件注册成为全局的组件
    app.component(name, comp)
  }
  return comp as SFCWithInstall<T>
}
