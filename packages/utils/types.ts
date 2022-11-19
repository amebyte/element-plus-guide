export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol,
} from '@vue/shared'
export { isBoolean, isNumber } from '@vueuse/core'

export const isUndefined = (val: any): val is undefined =>
  typeof val === 'undefined'
