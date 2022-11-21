import type Icon from '@cobyte-ui/components/icon'
// For this project development
import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    ElIcon: typeof Icon
  }
}

export {}
