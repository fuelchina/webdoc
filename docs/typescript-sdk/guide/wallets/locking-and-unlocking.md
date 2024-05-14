# 锁定和解锁

我们可以对 [`Wallet`](../../api/Account/Wallet.md) 实例执行的操作类型取决于我们是否可以访问钱包的私钥。

为了区分已知私钥的[`Wallet`](../../api/Account/Wallet.md) 实例和未知私钥的实例，我们分别使用[`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 和[`WalletLocked`](../../api/Account/WalletLocked.md)类型。

## 钱包状态

[`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 表示一个钱包，其私钥是已知的并且存储在内存中。必须使用[`WalletUnlocked`](../../api/Account/WalletUnlocked.md)类型的钱包才能执行涉及[签名消息或交易](./signing.md)的操作。

[`WalletLocked`](../../api/Account/WalletLocked.md) 类型表示私钥未知或未存储在内存中的钱包。相反，[`WalletLocked`](../../api/Account/WalletLocked.md) 只知道它的公共地址。 [`WalletLocked`](../../api/Account/WalletLocked.md)无法用于签名交易，但仍然可以执行一系列有用的操作，如列出交易、资产、查询余额等。

请注意，[`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 类型实现了[`WalletLocked`](../../api/Account/WalletLocked.md)类型上的大多数方法。换句话说，[`WalletUnlocked`](../../api/Account/WalletUnlocked.md)可以视为[`WalletLocked`](../../api/Account/WalletLocked.md)的薄包装器，通过其私钥提供更大的访问权限。

## 基本示例

<<< ../../docs-snippets/src/guide/wallets/access.test.ts#wallets{ts:line-numbers}

## 可选的 Provider

在构建 `Wallet` 时，你可以选择不传递provider参数：

<<< ../../docs-snippets/src/guide/wallets/access.test.ts#wallet-optional-provider{ts:line-numbers}

## 转换状态

[`WalletLocked`](../../api/Account/WalletLocked.md) 实例可以通过提供私钥来解锁：

<<< ../../docs-snippets/src/guide/wallets/access.test.ts#wallet-locked-to-unlocked{ts:line-numbers}

[`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 实例可以使用`lock`方法锁定：

<<< ../../docs-snippets/src/guide/wallets/access.test.ts#wallet-unlocked-to-locked{ts:line-numbers}

大多数创建或生成新钱包的 Wallet 构造函数都位于[`WalletUnlocked`](../../api/Account/WalletUnlocked.md)类型上。在处理完新的私钥后，考虑使用`lock`方法锁定钱包，以减少私钥在内存中存储的时间和范围。

## 设计指南

当设计接受钱包作为输入的API时，我们需要仔细考虑所需的访问级别。API开发者应尽量减少使用[`WalletUnlocked`](../../api/Account/WalletUnlocked.md)，以确保私钥在内存中存储的时间尽可能短，从而减少下游库和应用程序的安全风险区域。