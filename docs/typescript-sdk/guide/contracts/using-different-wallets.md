# 使用不同的钱包或提供商进行调用

本指南演示了如何通过在实例化时传递[`Account`](../../api/Account/Account.md) 或 [`Provider`](../../api/Account/Provider.md) 来使用不同的钱包和提供商进行合约调用。

## 更换钱包

要更改与合约实例关联的钱包，请将新钱包分配给实例的 `account` 属性。这允许您以简洁的方式使用不同的钱包进行合约调用：

<!-- <<< ../../docs-snippets/src/guide/contracts/calls-with-different-wallets.test.ts#calls-with-different-wallets-1{ts:line-numbers} -->

## 更换提供商

类似地，您可以通过修改其提供程序属性来将自定义提供程序分配给合约实例。这使您可以使用您选择的提供程序包装器：
<!-- TODO: Replace with a proper snippet. We lost this snippet because this test had to be removed/changed -->

```ts
const newProvider = await Provider.create(NEW_URL);
deployedContract.provider = newProvider;
```

> **注意:** 将不同的钱包连接到现有合约实例时，用于部署合约的提供商优先于新设置的提供商。如果您有两个钱包连接到不同的提供商（每个钱包都与不同的 fuel-core 实例通信），则分配给部署钱包的提供商将用于合约调用。此行为仅在存在多个提供商（即 fuel-core 实例）时才相关，否则可以忽略。
