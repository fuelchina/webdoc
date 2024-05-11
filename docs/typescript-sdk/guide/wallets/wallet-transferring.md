# 钱包转账

本指南展示了如何在账户和合约之间转移资产，以及如何在转账前验证你的余额。

## 钱包之间的转账

在 SDK 中，钱包之间的资产转移非常简单。

<<< ../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-1{ts:line-numbers}

等待交易处理完成后，资产将成功转移到接收者的钱包。

也可以直接用字符串指定接收者的地址：

<<< ../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-2{ts:line-numbers}

如果转账的是基础链币（如 ETH），可以省略 `assetId`：

<<< ../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-3{ts:line-numbers}

## 转账到合约

从你的钱包向已部署的合约转账同样简便，只需要合约的地址。

你可以使用合约的 `id` 来向已部署的合约实例转账：

<<< ../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-4{ts:line-numbers}

或者，你可以直接使用合约的字符串地址，采用 [Bech32](../types/bech32) 格式：

<<< ../../docs-snippets/src/guide/wallets/wallet-transferring.test.ts#wallet-transferring-5{ts:line-numbers}

# 余额

在转移资产之前，请确保你的钱包有足够的资金。在没有足够资金的情况下进行转账将导致错误：`not enough coins to fit the target`。

关于如何查询余额，你可以参考检[`查询余额`](./checking-balances)页面的内容。