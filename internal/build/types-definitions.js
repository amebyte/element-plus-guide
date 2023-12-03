import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { Project } from 'ts-morph'

const __filenameNew = fileURLToPath(import.meta.url)
const __dirnameNew = dirname(__filenameNew)

const projRoot = resolve(__dirnameNew, '..', '..')
// dist 目录地址
const buildOutput = resolve(projRoot, 'dist')
// `tsconfig.json` 文件绝对路径
const TSCONFIG_PATH = resolve(projRoot, 'tsconfig.web.json')
// 声明文件输出目录
const outDir = resolve(buildOutput, 'types')

const project = new Project({
  compilerOptions: {
    emitDeclarationOnly: true, // 是否只输出类型文件 .d.ts
    outDir, // 输出目录
    baseUrl: projRoot, // 用于解析非相对模块名称的目录
    preserveSymlinks: true, // 它对应了 Node.js 中 --preserve-symlinks 选项的行为，Node.js 有这样一个选项：–preserve-symlinks，可以设置成按照软链所在的位置查找依赖
    skipLibCheck: true, // 跳过.d.ts类型声明文件的类型检查。这样可以加快编译速度
    noImplicitAny: false, // 是否允许隐式声明 any 类型了
  },
  tsConfigFilePath: TSCONFIG_PATH, // 手动指定 tsconfig.json 文件作为 ts-morph 项目的 TypeScript 配置
})

project.emit()
