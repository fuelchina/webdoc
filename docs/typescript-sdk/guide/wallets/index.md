# 钱包

钱包可以用于许多重要的事情，例如：

1. 检查余额；
2. 将代币转账到目标地址或合约；
3. 签名消息和交易；
4. 支付发送交易或部署智能合约时的网络费用。

## 钱包实例

SDK 包含多个与钱包实例相关的类：

- [Wallet](../../api/Account/Wallet): 简单地作为一个包装器，提供了创建和实例化 `WalletUnlocked` 和 `WalletLocked` 实例的方法。

- [WalletLocked](../../api/Account/WalletLocked): 为锁定的钱包提供功能。

- [WalletUnlocked](../../api/Account/WalletUnlocked): 为解锁的钱包提供功能。

- [Account](../../api/Account/Account): 为钱包或账户与网络交互提供基本功能的抽象。需要注意的是，`WalletLocked` 和 `WalletUnlocked` 都继承自 `Account` 类。

让我们在接下来的子章节中探索这些不同的实现方式。

> **注意：** 请记住，千万不要分享你的私钥/秘密密钥。如果钱包是从助记词短语派生的，也不要分享助记词。如果你打算将钱包存储在磁盘上，不要存储明文私钥和明文助记词。相反，在保存到磁盘之前，应先使用 `WalletManager` 加密其内容。