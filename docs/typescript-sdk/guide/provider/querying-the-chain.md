# 查询链

一旦您设置了供应商，就可以准备与 Fuel 区块链进行交互了。

我们可以连接到一个 _*本地*_ 或者一个 _*外部*_ 节点：

> 1. _运行一个[本地节点](../../get-start/getting-started.md#connecting-to-a-local-node)_
> 1. _连接到一个[外部节点](../../get-start/getting-started.md#connecting-to-the-testnet)_

让我们看一下下面的一些示例。

## 获取基础资产 ID

基础资产是在链上执行任何交易所使用的基础资产。应该从供应商获取，然后在交易中使用。

<<< ../../docs-snippets/src/guide/provider/provider.test.ts#provider-getBaseAssetId{ts:line-numbers}

## 获取地址中的所有币

此方法返回来自钱包的所有币（可选给定资产 ID），包括已花费的币。

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#wallet-query{ts:line-numbers}

## 获取地址中可花费的资源

最后一个参数表示您想要花费多少。此方法仅返回可花费的，即未花费的币（具有给定资产 ID）。如果您请求的可花费金额超过您拥有的未花费币的数量，则会返回错误。

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#wallet-get-spendable-resources{ts:line-numbers}

## 获取地址的余额

获取地址的所有可花费资产的余额。这与获取币不同，因为我们只返回数字（每个资产 ID 的 UTXO 币金额之和），而不是 UTXO 币本身。

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#wallet-get-balances{ts:line-numbers}

## 获取区块

此方法返回与给定查询匹配的区块链中的所有区块。下面的代码片段显示如何获取最后的 10 个区块。

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#Provider-get-blocks{ts:line-numbers}

## 通过其 nonce 获取消息

您可以使用 `getMessageByNonce` 方法按其 nonce 检索消息。

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#getMessageByNonce{ts:line-numbers}

<!-- TODO: fix these examples to not reference hardcoded values after #1356 which introduces message generation tools
### Get messages

You can use the `getMessages` method to retrieve a list of messages from the blockchain.

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#Message-getMessages{ts:line-numbers}

## Get resources

You can use the `getResourcesToSpend` method to retrieve a list of all the resources (coins + assets) that can be spent by a given address.

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#Message-getResourcesToSpend{ts:line-numbers}

## Get message proof

A message proof is a cryptographic proof that a message was included in a block. You can use the `getMessageProof` method to retrieve a message proof for a given transaction ID and message ID.

<<< ../../docs-snippets/src/guide/provider/querying-the-chain.test.ts#Message-getMessageProof{ts:line-numbers}

--->

<!-- TODO: Add docs for the two new parameters `commitBlockId` and `commitBlockHeight` -->
