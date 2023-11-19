import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { rollup } from 'rollup'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import glob from 'fast-glob'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)

const projRoot = resolve(__dirnameNew, '..', '..')
const pkgRoot = resolve(projRoot, 'packages')

/** `/dist` */
const buildOutput = resolve(projRoot, 'dist')
/** `/dist/cobyte-ui` */
const epOutput = resolve(buildOutput, 'cobyte-ui')

const excludeFiles = (files) => {
  const excludes = ['node_modules']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}

// 模块化打包任务函数
const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,ts,vue}', {
      cwd: pkgRoot,
      absolute: true, // 返回绝对路径
      onlyFiles: true, // 只返回文件的路径
    })
  )
  const bundle = await rollup({
    input, // 配置入口文件
    plugins: [
      // 配置插件
      VueMacros({
        plugins: {
          vue: vue(),
        },
      }),
      nodeResolve({
        extensions: ['.ts'],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
        preventAssignment: true, // 这个选项用于防止在字符串后面紧跟一个等号时进行替换。可以用于避免错误的赋值操作
      }),
      esbuild(),
    ],
    // 排除不进行打包的 npm 包，例如 Vue，以便减少包的体积
    external: ['vue'],
  })
  // 配置输出文件格式
  bundle.write({
    format: 'esm', // 配置输出格式
    dir: resolve(epOutput, 'es'), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk
  })
  bundle.write({
    format: 'cjs', // 配置输出格式
    dir: resolve(epOutput, 'lib'), // 配置输出目录
    preserveModules: true, // 该选项将使用原始模块名作为文件名，为所有模块创建单独的 chunk
  })
}
buildModules()
