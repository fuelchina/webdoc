<script setup>
  import { data } from '../versions.data'
  const { forc, fuels, fuelCore } = data
  const url = `https://docs.fuel.network/docs/forc/`
  const logoSrc = './fuel-logo.png'
</script>

## 版本

本文档使用 Fuels `v{{fuels}}`，Fuel Core `v{{fuelCore}}`，Sway `v{{forc}}` 和 Forc `v{{forc}}` 生成。

## 安装指南

请访问 Fuel 的 [安装指南](https://docs.fuel.network/guides/installation) 来安装 Fuel 工具链二进制文件和先决条件。

## 开发者快速入门指南

我们建议从 [开发者快速入门指南](https://docs.fuel.network/docs/intro/quickstart-contract/) 开始，了解如何构建您的第一个 DApp on Fuel。

## Fuel 生态系统

了解更多关于 Fuel 生态系统的信息。

- [🌴 Sway](https://docs.fuel.network/docs/sway/) 新语言。让每个人都能构建可靠且高效的智能合约。
- <a :href="url" target="_blank" rel="noreferrer">🧰 Forc</a> Fuel 工具箱。构建、部署和管理您的 sway 项目。
- [⚙️ Fuel Core](https://github.com/FuelLabs/fuel-core) 新的 FuelVM，一个速度极快的区块链虚拟机。
- [🔗 Fuel Specs](https://github.com/FuelLabs/fuel-specs) Fuel 协议规范。
- [🦀 RUST SDK](https://github.com/FuelLabs/fuels-rs) 一个强大的 rust SDK。
- [⚡ Fuel Network](https://fuel.network/) 项目。

## 安装

::: code-group

```sh-vue [pnpm]
pnpm add fuels@{{fuels}}
```

```sh-vue [npm]
npm install fuels@{{fuels}} --save
```

:::

> 如果您是 Windows 用户，则需要运行 Windows Subsystem for Linux (WSL) 来安装和使用 Fuel 工具链，包括 TypeScript SDK。我们目前不支持原生的 Windows。

## 导入

<!-- TODO: stop using hard-coded snippets -->

```ts:line-numbers
import { Wallet } from "fuels";

// 随机钱包
console.log(Wallet.generate());

// 使用私钥钱包
console.log(Wallet.fromPrivateKey(PRIVATE_KEY));
```

## 调用合约

<!-- TODO: stop using hard-coded snippets -->

```ts:line-numbers
import { Provider, Wallet, Contract, BigNumberish, BN } from "fuels";
import abi from "./abi.json";

const provider = await Provider.create('https://beta-5.fuel.network/graphql');
const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider); // 拥有硬币的私钥
const contractId = "0x...";
const contract = new Contract(contractId, abi, wallet);

// 所有合约方法都在 functions 下可用
const { transactionId, value } = await contract.functions
  .foo<[BigNumberish], BN>("bar")
  .call();

console.log(transactionId, value);
```

[了解更多](./guide/contracts/)

## 部署合约

<!-- TODO: stop using hard-coded snippets -->

```ts:line-numbers
import { Provider, ContractFactory } from "fuels";
// 使用 forc build 生成的字节码
import bytecode from "./bytecode.bin";

const factory = new ContractFactory(bytecode, [], wallet);
const contract = await factory.deployContract();

console.log(contract.id);
```

## 许可证

该存储库的主要许可证是 `Apache 2.0`，请参阅 [`LICENSE`](https://github.com/FuelLabs/fuels-ts/blob/master/LICENSE)。
