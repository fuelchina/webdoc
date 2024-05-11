# 创建钱包

钱包可以在SDK中以多种方式创建。

## 生成新钱包

要生成一个新的、未锁定的钱包，可以使用[`generate`](../../api/Account/Wallet.html#generate)方法。此方法创建一个新实例的`WalletUnlocked`，可以直接使用。

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-1{ts:line-numbers}

## 创建未锁定钱包

创建现有的[`WalletUnlocked`](../../api/Account/WalletUnlocked)实例非常简单，可以通过以下几种方式：

从私钥创建：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-2{ts:line-numbers}

从助记词创建：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-3{ts:line-numbers}

从种子创建：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-4{ts:line-numbers}

从Hierarchical Deterministic (HD)派生密钥创建：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-5{ts:line-numbers}

从JSON钱包创建：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-6{ts:line-numbers}

可以从 `WalletLocked` 实例化一个 `WalletUnlocked`创建：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-7{ts:line-numbers}

## 创建锁定钱包

您还可以仅使用钱包地址创建[`WalletLocked`](../../api/Account/WalletLocked)实例：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-8{ts:line-numbers}

## 连接到 Provider

虽然钱包可以独立于[`Provider`](../../api/Account/Provider)使用，但需要与区块链交互的操作将需要一个`Provider`。

连接现有钱包到Provider：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-9{ts:line-numbers}

带Provider的实例化钱包：

<<< ../../docs-snippets/src/guide/wallets/instantiating-wallets.test.ts#instantiating-wallets-10{ts:line-numbers}
