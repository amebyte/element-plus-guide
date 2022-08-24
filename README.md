# 从 Vue3 源码入门理解 pnpm 的 monorepo 到以 pnpm 构建 monorepo 环境搭建组件库工程化实战

什么是 Monorepo ?
Monorepo 其实不是一个新的概念，在软件工程领域，它已经有着十多年的历史了。概念上很好理解，就是把多个项目放在一个仓库里面，相对立的是传统的 MultiRepo 模式，即每个项目对应一个单独的仓库来分散管理。

vue3 组件库 monorepo 环境搭建


使用 monorepo 环境的好处就是可以在一个项目中管理多个仓库，可以达到仓库之间的资源共享。比如我们在新建组件的时候，可能有组件的文档，包括组件的测试，那他们，可能都是一个个的仓库，那这样的话，我们可以在一个项目下，管理这些仓库，可以达到仓库之间的一个资源共享，那包括，我们还可以，在一个仓库下，管理所有的这个仓库进行发布和部署。那当然了，我们每一个组件，其实也是可以单独发布和部署的，所以这里，我们会采用这种 monorepo 的方式，来搭建我们的组件库。
我们这里，采用这个 pnpm 来进行这个 monorepo 的一个环境搭建，那 pnpm 的它的特点，主要它的好处就是速度快，还有，就是我们的磁盘利用率高，而且，使用这个 pnpm 来搭建我们的这个 monorepo 环境，是非常的容易的，我们可以快速的去搭建出这样一个 monorepo 环境。


首先要进行全局安装 pnpm
```
npm install pnpm -g
```

然后在项目下使用 pnpm init 进行 package.json 的初始化。这跟 npm init 是一样的。
```
pnpm init
```
然后把 package.json 中的 name 属性删掉，并且添加一个 `"private": true` 属性，因为它是不需要发布的。


配置 pnpm 的 monorepo 环境

```
pnpm-workspace.yaml
```
可以在 pnpm-workspace.yaml 配置文件中指定这个仓库中有多少个包

```
packages:
  - play # 存放组件测试的代码
  - docs # 存放组件文档
  - packages/* # packages 目录下都是包
```


```
pnpm install @cobyte/components -w

pnpm install @cobyte/theme-chalk -w

pnpm install @cobyte/utils -w
```

接下来安装一些我们所需的依赖。

```
pnpm install vue typescript @types/node -D -w
```
因为 `vue` 、 `typescript` 和 `@types/node`  只是开发环境需要的，所以安装的时候需要添加一个 `-D` 参数表示安装到开发环境，`-w` 表示安装到共公模块的 packages.json 中，也就是根目录下的 packages.json。

TypeScript 初始化配置文件
因为我们使用了 TypeScript，这样我们想要去校验我们的代码，让我们代码有提示，并且可以按照一些规则来解析我们的语法，给我们更友好的提示，我们就需要去初始化一下这个 TypeScript 配置命令。
又因为我们安装了 typescript，所以在 `node_modules` 目录下 `bin` 目录里面就会存在一个 tsc 的命令，这个命令，就可以帮我们进行初始化，我们可以使用 `npm tsc --init` 来初始化，也可以使用 `pnpm tsc --init` 那么执行这个命令，它就会去 `node_modules` 目录下 `bin` 目录找这个 tsc 命令进行执行。

```
pnpm tsc --init
```


```
pnpm create vite play --template vue-ts
```

通过 JavaScript 实现 BEM 规范


```
pnpm install unplugin-vue-define-options -D -w
```

### 幽灵依赖详解

shamefully-hoist = true 幽灵依赖
“幽灵依赖” 指的是 项目中使用了一些没有被定义在其 package.json 文件中 的包。