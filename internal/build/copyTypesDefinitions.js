import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import { copy } from 'fs-extra'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = path.dirname(__filenameNew)

const projRoot = resolve(__dirnameNew, '..', '..')
/** `/dist` */
const buildOutput = resolve(projRoot, 'dist')
const epOutput = resolve(buildOutput, 'cobyte-ui')

export const copyTypesDefinitions = (cb) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  // 将 ./dist/types/packages 的内容复制到 ./dist/cobyte-ui/es 目录下, recursive 为 true 表示递归复制
  copy(src, resolve(epOutput, 'es'), { recursive: true })
  // 将 ./dist/types/packages 的内容复制到 ./dist/cobyte-ui/es 目录下, recursive 为 true 表示递归复制
  copy(src, resolve(epOutput, 'lib'), { recursive: true })
  cb()
}

// copyTypesDefinitions()
