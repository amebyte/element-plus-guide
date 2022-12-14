import type { ExtractPropTypes, PropType } from 'vue'
import type Button from './button.vue'

// size 组件大小

// type 颜色展现类型

// round 是否为圆角

// loading 是否按钮正在加载

// disabled 是否禁用按钮

// native-type 原始类型

// 插槽

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonEmits = typeof buttonEmits

export type ButtonType =
  | ''
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'text'

export type ButtonNativeType = 'button' | 'submit' | 'reset'
export type ButtonSize = '' | 'default' | 'small' | 'large'

export const buttonProps = {
  size: String as PropType<ButtonSize>,
  type: {
    type: String as PropType<ButtonType>,
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  disabled: Boolean,
  loading: Boolean,
  autofocus: Boolean,
  round: Boolean,
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonInstance = InstanceType<typeof Button>
