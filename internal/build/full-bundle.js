import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { rollup } from 'rollup'
import vuePlugin from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)
// 确定根目录，目前执行目录是在 ./internal/build，所以需要跳出两层
const projRoot = resolve(__dirnameNew, '..', '..')
// 拼接 ./packages 目录路径
const pkgRoot = resolve(projRoot, 'packages')
// 拼接 ./packages/cobyte-ui 目录路径
const epRoot = resolve(pkgRoot, 'cobyte-ui')

// 拼接打包根目录
const buildOutput = resolve(projRoot, 'dist')
// 拼接包目录
const epOutput = resolve(buildOutput, 'cobyte-ui')

// 全量打包任务函数
const buildFullEntry = async () => {
  const bundle = await rollup({
    input: resolve(epRoot, 'index.ts'), // 配置入口文件
    plugins: [
      // 配置插件
      vuePlugin(),
      nodeResolve({
        extensions: ['.ts'],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
        preventAssignment: true,
      }),
      esbuild(),
    ],
    // 排除不进行打包的 npm 包，例如 Vue，以便减少包的体积
    external: ['vue'],
  })
  // 配置输出文件格式
  bundle.write({
    format: 'umd',
    file: resolve(epOutput, 'dist', 'index.full.js'),
    name: 'CobyteUI',
    globals: {
      vue: 'Vue',
    },
  })
}
buildFullEntry()
