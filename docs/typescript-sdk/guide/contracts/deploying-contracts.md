 <script setup>
  import { data } from '../../versions.data'
  const { forc } = data
  const indexUrl = `https://docs.fuel.network/docs/sway/introduction/`
  const jsonAbiUrl = `https://docs.fuel.network/docs/sway/introduction/sway_quickstart/`
</script>

# 部署合约

本指南将引导您使用 SDK 部署合约，包括加载合约工件、初始化合约工厂以及部署合约。

## 1. 获取合约神器

在 Sway 中编写合约并使用 `forc build` (<a :href="indexUrl" target="_blank" rel="noreferrer">阅读更多</a> 有关如何使用 Sway 的信息)进行编译后，您将获得两个重要的工件：编译后的二进制文件和 JSON ABI 文件。这些文件是使用 SDK 部署合约所必需的。

## 2. 设置 SDK 环境

在部署合约之前，通过导入所需的 SDK 组件并初始化钱包和提供商来设置必要的环境。
<!-- <<< ../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-1{ts:line-numbers} -->

## 3.  加载合约工件

将从 Sway 源生成的合约字节码和 JSON ABI 加载到 SDK 中。
<!-- <<< ../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-2{ts:line-numbers} -->

## 4. 部署合约

初始化一个 [`ContractFactory`](../../api/Contract/ContractFactory) ，包含字节码、ABI和钱包。部署契约并使用它的方法。

<!-- <<< ../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-3{ts:line-numbers} -->

## 5. 执行合约调用

现在合约已部署，您可以与其进行交互。在以下步骤中，您将了解如何执行合约调用。
<!-- <<< ../../docs-snippets/src/guide/contracts/deploying-contracts.test.ts#contract-setup-4{ts:line-numbers} -->

要更全面地了解 TypeScript 支持的 Fuel 用法，请了解如何 [从ABI生成类型](../fuels-cli/generating-types)
