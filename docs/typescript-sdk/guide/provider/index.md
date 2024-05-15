# Provider

[`Provider`](../../api/Account/Provider.md) 允许您连接到 Fuel 节点（[_*本地*_](../../getting-started.md#connecting-to-a-local-node)或[_*外部*_](../../getting-started.md#connecting-to-the-testnet)）并与其进行交互，封装了 SDK 中的常见客户端操作。这些操作包括查询区块链以获取网络、区块和与交易相关的信息（以及[更多](../../api/Account/Provider.md)），以及向区块链发送[交易](../transactions/index.md)。

所有与区块链交互的高级抽象（例如[`Wallet`](../wallets/index.md)、[`Contract`](../contracts/index.md)等）都通过 `Provider` 进行，因此它用于各种操作，如获取钱包余额、部署合约、查询其状态等。

<<< ../../docs-snippets/src/guide/provider/provider.test.ts#provider-definition{ts:line-numbers}

您可以在[这里](querying-the-chain.md)找到更多关于 `Provider` 使用的示例。