import type { ExtractPropTypes, PropType } from 'vue'
import type Icon from './icon.vue'
export const iconProps = {
  color: String,
  size: [Number, String] as PropType<number | string>,
} as const

export type Props = ExtractPropTypes<typeof iconProps>
export type IconInstance = InstanceType<typeof Icon>
