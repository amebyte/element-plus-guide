# pnpm-monorepo-ui

什么是 Monorepo?
Monorepo 其实不是一个新的概念，在软件工程领域，它已经有着十多年的历史了。概念上很好理解，就是把多个项目放在一个仓库里面，相对立的是传统的 MultiRepo 模式，即每个项目对应一个单独的仓库来分散管理。

vue3 组件库 monorepo 环境搭建

使用 monorepo 环境的好处就是可以在一个项目中管理多个仓库，可以达到仓库之间的资源共享。比如我们在新建组件的时候，可能有组件的文档，包括组件的测试，那他们，可能都是一个个的仓库，那这样的话，我们可以在一个项目下，管理这些仓库，可以达到仓库之间的一个资源共享，那包括，我们还可以，在一个仓库下，管理所有的这个仓库进行发布和部署。那当然了，我们每一个组件，其实也是可以单独发布和部署的，所以这里，我们会采用这种module的方式，来搭建我们的组件库。

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
“幽灵依赖” 指的是 项目中使用了一些 没有被定义在其 package.json 文件中 的包。

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


```
pnpm create vite play --template vue-ts
```

通过 JavaScript 实现 BEM 规范


```
pnpm install unplugin-vue-define-options -D -w
```