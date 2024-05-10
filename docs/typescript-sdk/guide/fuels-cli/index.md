# Fuels 脚手架

快速构建全栈 Fuel dApps 的最佳路径。

- [`fuels init`](./commands.md#fuels-init) — 创建一个新的 `fuels.config.ts` 文件
- [`fuels build`](./commands.md#fuels-build) — 构建 `forc` 工作空间并为所有内容生成 TypeScript 类型
- [`fuels deploy`](./commands.md#fuels-deploy) — 部署工作空间合约并将它们的 ID 保存到 JSON 文件中
- [`fuels dev`](./commands.md#fuels-dev) — 在本地启动 Fuel Core _node_ 并在每次文件更改时执行 `build` + `deploy`

## 入门指南

假设您有以下文件结构：

```sh
my-fuel-dapp # NextJS app 或类似的应用
├── sway-programs # Forc 工作空间
│   ├── src
│   ├── ...
│   └── Forc.toml
├── public
│   └── ...
├── src
│   ├── app
│   ├── ...
├   └── sway-programs-api # 类型安全的生成 API
└── package.json
```

## 安装

将其添加到您的 `my-fuel-dapp` 项目中：

::: code-group

```console-vue [npm]
npm install fuels@{{fuels}} --save
```

```console-vue [pnpm]
pnpm add fuels@{{fuels}}
```

:::

## 双重检查

```console-vue
npx fuels@{{fuels}} -v
```

## 下一步

使用 [`pnpm fuels init`](./commands#init) 来创建一个 [`fuel.config.ts`](./config-file) 文件。