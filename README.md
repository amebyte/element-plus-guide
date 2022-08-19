# pnpm-monorepo-ui

什么是 Monorepo?
Monorepo 其实不是一个新的概念，在软件工程领域，它已经有着十多年的历史了。概念上很好理解，就是把多个项目放在一个仓库里面，相对立的是传统的 MultiRepo 模式，即每个项目对应一个单独的仓库来分散管理。

使用 monorepo 环境的好处就是可以在一个项目中管理多个仓库，可以达到仓库之间的资源共享。

先使用 pnpm init 进行 package.json 的初始化。
```
pnpm init
```

接下来安装一些我们所需的依赖。

```
pnpm install vue typescript
```
因为 vue 和 typescript 是开发和上线都需要的，所以安装的时候不需要额外添加其他参数。

shamefully-hoist = true 幽灵依赖

TypeScript 初始化配置文件

```
pnpm tsc --init
```

配置 pnpm 的 monorepo 环境


```
pnpm-workspace.yaml
```
可以在 pnpm-workspace.yaml 配置文件中指定这个仓库中有多少个包

```
packages:
  - play # 存放组件测试的代码
  - docs # 存放组件文档
  - "packages/**"
```


```
pnpm install @cobyte/components -w

pnpm install @cobyte/theme-chalk -w

pnpm install @cobyte/utils -w
```
