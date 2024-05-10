# 命令

`fuels` CLI 包含几个命令。

## `fuels init`

```console-vue
npx fuels@{{fuels}} help init
```

```console
选项:
  -w, --workspace <路径>          Forc 工作空间的相对目录路径
  -c, --contracts <路径|全局>     合约的相对路径/全局路径
  -s, --scripts <路径|全局>       脚本的相对路径/全局路径
  -p, --predicates <路径|全局>    谓词的相对路径/全局路径
  -o, --output <路径>             生成 TypeScript 的相对目录路径
```

创建一个示例 `fuel.config.ts` 文件：

```console-vue
npx fuels@{{fuels}} init --contracts ./my-contracts/* --output ./src/sway-contracts-api
```

使用[Forc 工作空间](https://docs.fuel.network/docs/forc/workspaces/)？尝试这个：

```console-vue
npx fuels@{{fuels}} init --workspace ./sway-programs --output ./src/sway-programs-api
```

这将为您提供一个最小配置：

<<< ../../demo-fuels/fuels.config.ts#config{ts:line-numbers}

简而言之：

```sh
.
├── sway-programs # <— forc 工作空间
├── src
│   └── sway-programs-api # <— 输出
├── fuels.config.ts
└── package.json
```

### 查看更多

- [Forc 工作空间](https://docs.fuel.network/docs/forc/workspaces/)

## `fuels build`

```console-vue
npx fuels@{{fuels}} help build
```

```console
选项:
  -p, --path <路径>  项目根目录路径 (默认: "/Users/anderson/Code/fuel/fuels-ts/apps/docs")
  -d, --deploy       构建后部署合约 (如有需要自动启动 `fuel-core` 节点)
  -h, --help         显示帮助信息
```

示例：

```console-vue
npx fuels@{{fuels}} build
```

1. 使用 `forc` 构建您的 `workspace` 下的所有 Sway 程序 <sup>[1](#commands-for-wrapped-utiltities)</sup>
1. 使用 `fuels-typegen` 为其生成类型 <sup>[2](#typegen)</sup>

```console-vue
npx fuels@{{fuels}} build --deploy
```

使用 `--deploy` 标志还会额外执行以下操作：

1. 如 _需要_ ，自动启动短暂的 `fuel-core` 节点 ([文档](./config-file.md#autostartfuelcore))
1. 在该节点上运行 `deploy`

> _在与合约一起工作时这很有用，因为合约的 ID 仅在部署时生成。_

## `fuels deploy`

```console-vue
npx fuels@{{fuels}} deploy
```

> [!NOTE] 注意
> 我们建议仅在将合约部署到本地节点时使用 `fuels deploy` 命令。
> 如果您要将合约部署到像测试网这样的实时网络，我们建议使用 [`forc deploy`](https://docs.fuel.network/docs/intro/quickstart-contract/#deploy-to-testnet) 命令。

`fuels deploy` 命令执行两项操作：

1. 部署 `workspace` 下的所有 Sway 合约。
1. 将它们的部署 ID 保存到：
   - _`./src/sway-programs-api/contract-ids.json`_

```json
{
  "myContract1": "0x..",
  "myContract2": "0x.."
}
```

在实例化合约时使用它：

```ts
import { SampleAbi__factory } from './sway-programs-api';
import contractsIds from './sway-programs-api/contract-ids.json';

/**
 * Get IDs using:
 *   contractsIds.<my-contract-name>
 */

const wallet = new Wallet.fromPrivateKey(process.env.PRIVATE_KEY);
const contract = SampleAbi__factory.connect(contractsIds.sample, wallet);

const { value } = await contract.functions.return_input(1337).dryRun();

expect(value.toHex()).toEqual(toHex(1337));

```

完整示例，请参阅：

- [使用生成的类型](./using-generated-types.md)

## `fuels dev`

```console-vue
npx fuels@{{fuels}} dev
```

`fuels dev` 命令执行三项操作：

1. 自动启动短暂的 `fuel-core` 节点 ([文档](./config-file.md#autostartfuelcore))
1. 在启动时运行 `build` 和 `deploy`
1. 监视您的 Forc 工作空间，并在每次更改时重复上一步

> _在 `dev` 模式下，每当您在 Forc `workspace` 上更新合约时，我们都会重新生成类型定义和工厂类，并根据您预先配置的 [`output`](./config-file.md#output) 目录进行操作。如果它是另一个以开发模式运行的构建系统的一部分（即 `next dev`），则可以期望重新构建/自动重新加载。_

## `fuels typegen`

从 ABI JSON 文件手动生成类型定义和工厂类。

```console-vue
npx fuels@{{fuels}} help typegen
```

```console
选项:
  -i, --inputs <路径|glob...>  ABI JSON 文件的输入路径/全局路径
  -o, --output <目录>           生成文件的目录路径
  -c, --contract               为合约生成类型 [默认]
  -s, --script                 为脚本生成类型
  -p, --predicate              为谓词生成类型
  -S, --silent                 省略输出消息
```

更多信息，请查看：

- [从 ABI 生成类型](./generating-types.md)

## `fuels versions`

检查您的 [Fuel 工具链](#the-fuel-toolchain) 组件版本之间的不兼容性，将其与您拥有的 Typescript SDK 版本支持的版本进行匹配。

```console-vue
npx fuels@{{fuels}} versions
```

```
您拥有所有正确的版本！ ⚡
┌───────────┬───────────┬─────────────────┐
│           │ 支持的    │ 您的 / 系统     │
├───────────┼───────────┼─────────────────

┤
│ Forc      │ 0.30.0    │ 0.30.0          │
├───────────┼───────────┼─────────────────┤
│ Fuel-Core │ 0.14.0    │ 0.14.0          │
└───────────┴───────────┴─────────────────┘
```

## `fuels forc`

`forc` 二进制文件的简单[包装器](./binaries.md)。

也请查看：

- [内置二进制文件](./binaries.md)
- [`forc` 文档](https://docs.fuel.network/docs/forc/commands/)

## `fuels core`

`fuel-core` 二进制文件的简单[包装器](./binaries.md)。

也请查看：

- [内置二进制文件](./binaries.md)
- [`fuel-core` 文档](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)