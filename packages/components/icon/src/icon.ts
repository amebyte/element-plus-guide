// 这里准备组件相关的属性 和 ts 的类型

import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>
