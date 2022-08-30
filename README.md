# Element Plus 组件库核心技术揭秘：组件库工程化实战

### 从 Vue3 源码入门理解 pnpm 的 monorepo





### 以 pnpm 构建 monorepo 环境搭建组件库工程化实战



什么是 Monorepo ?
Monorepo 其实不是一个新的概念，在软件工程领域，它已经有着十多年的历史了。概念上很好理解，就是把多个项目放在一个仓库里面，相对立的是传统的 MultiRepo 模式，即每个项目对应一个单独的仓库来分散管理。

vue3 组件库 monorepo 环境搭建


使用 monorepo 环境的好处就是可以在一个项目中管理多个仓库，可以达到仓库之间的资源共享。比如我们在新建组件的时候，可能有组件的文档，包括组件的测试，那他们可能都是一个个的仓库，那这样的话，我们可以在一个项目下，管理这些仓库，可以达到仓库之间的一个资源共享，那包括我们还可以，在一个仓库下，管理所有的这个仓库进行发布和部署。那当然了，我们每一个组件，其实也是可以单独发布和部署的，所以这里，我们会采用这种 monorepo 的方式，来搭建我们的组件库。
我们这里，采用这个 pnpm 来进行这个 monorepo 的一个环境搭建，那 pnpm 的它的特点，主要它的好处就是速度快，还有就是我们的磁盘利用率高，而且使用这个 pnpm 来搭建我们的这个 monorepo 环境，是非常的容易的，我们可以快速的去搭建出这样一个 monorepo 环境。


首先要进行全局安装 pnpm
```
npm install pnpm -g
```

然后在项目下使用 pnpm init 进行 package.json 的初始化。这跟 npm init 是一样的。
```
pnpm init
```
得到 package.json 初始内容，然后把 package.json 中的 name 属性删掉，并且添加一个 `"private": true` 属性，因为它是不需要发布的。

```javascript
{
  "private": true,
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

配置 pnpm 的 monorepo 环境

在我们这个仓库下，我们需要管理多个项目，就可以采用 pnpm 的 monorepo。我们在仓库的根目录下创建一个 pnpm-workspace.yaml 文件，可以在 pnpm-workspace.yaml 配置文件中指定这个仓库中有多少个包。

```
packages:
  - play # 存放组件测试的代码
  - docs # 存放组件文档
  - packages/* # packages 目录下都是包
```
可以在 play 目录中运行我们写好的组件，相当于一个测试环境，在开发的时候可以知道效果是否达到预期；还需要一个组件说明文档的项目目录：docs; packages 目录则是所有组件的项目目录了，在 packages 目录中又可以放很多包的项目目录，比如，组件包目录：components、主题包目录：theme-chalk、工具包目录：utils等。然后每一个包目录里面也需要一个 package.json 文件进行声明这是一个 Node 包目录。所以我们需要进入每个包目录进行初始一个 package.json 文件。

以 components 包为例，我们进入到 components 目录底下初始化一个 package.json 文件，更改包名：`@cobyte/components`。文件内容如下：

```javascript
{
  "name": "@cobyte/components",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

其他两个的包名则分别为：`@cobyte/theme-chalk` 和 `@cobyte/utils`，创建过程同上。

至此我们一个初步搭建的项目目录结构如下：

```
├── README.md
├── package.json
├── packages
│   ├── components
│   │   └── package.json
│   ├── theme-chalk
│   │   └── package.json
│   └── utils
│       └── package.json
├── play
└── pnpm-workspace.yaml
```

仓库项目内的包相互调用

`@cobyte/components` 、`@cobyte/theme-chalk` 、`@cobyte/utils` 这几个包要互相进行调用呢，就需要把它们安装到仓库根目录下的 `node_modules` 目录中。

然后我们在根目录下进行安装操作。

```
pnpm install @cobyte/components -w
pnpm install @cobyte/theme-chalk -w
pnpm install @cobyte/utils -w
```

`-w` 表示安装到共公模块的 packages.json 中，也就是根目录下的 packages.json。

安装后根目录下的 package.json 的内容为：

```javascript
{
  "dependencies": {
    "@cobyte/components": "workspace:*",
    "@cobyte/theme-chalk": "workspace:*",
    "@cobyte/utils": "workspace:*"
  },
}
```

workspace:* 后面的 * 表示任意版本。

接下来安装一些我们开发时所需要的依赖。

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

### TypeScript项目引用(project references)



至此一个 pnpm 的 monorepo 环境就搭建好了。

```
pnpm create vite play --template vue-ts
```

通过 JavaScript 实现 BEM 规范


```
pnpm install unplugin-vue-define-options -D -w
```


