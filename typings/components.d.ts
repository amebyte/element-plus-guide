import type Icon from '@cobyte-ui/components/icon'
import type Button from '@cobyte-ui/components/button'
import type ElFormItem from '@cobyte-ui/components/form'
// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ElIcon: typeof Icon
    ElButton: typeof Button
    ElFormItem: typeof ElFormItem
  }
}

export {}
