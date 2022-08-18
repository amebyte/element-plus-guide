# pnpm-monorepo-ui


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