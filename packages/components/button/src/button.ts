import { Loading } from '@element-plus/icons-vue'
import type { ExtractPropTypes, PropType } from 'vue'
import type Button from './button.vue'

// 点击事件
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}

export type ButtonEmits = typeof buttonEmits
// 使用 type 来定义按钮的样式
export type ButtonType =
  | ''
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger'
  | 'text'
// type 原始类型
export type ButtonNativeType = 'button' | 'submit' | 'reset'
// size 组件大小
export type ButtonSize = '' | 'default' | 'small' | 'large'
// 定义 props
export const buttonProps = {
  size: String as PropType<ButtonSize>,
  type: {
    type: String as PropType<ButtonType>,
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
  icon: {
    type: [Object, String] as PropType<object | string>,
    default: '',
  },
  loading: Boolean,
  loadingIcon: {
    type: [Object, String] as PropType<object | string>,
    default: () => Loading,
  },
  disabled: Boolean,
  autofocus: Boolean,
  round: Boolean,
  plain: Boolean,
  circle: Boolean,
} as const
// Props 类型
export type ButtonProps = ExtractPropTypes<typeof buttonProps>
// Button 组件实例类型
export type ButtonInstance = InstanceType<typeof Button>
