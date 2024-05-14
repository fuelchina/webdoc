# 签名

## 签名消息

在区块链环境中，使用钱包对消息进行签名是一项基本的安全实践。它验证了所有权并确保了数据的完整性。以下是如何使用 `wallet.signMessage` 方法对消息进行签名：

<<< ../../docs-snippets/src/guide/wallets/signing.test.ts#signing-1{ts:line-numbers}

`wallet.signMessage` 方法在内部使用 SHA-256 算法对消息进行哈希处理，然后对哈希后的消息进行签名，并以十六进制字符串的形式返回签名。。


`hashMessage` 辅助函数为我们提供了原始消息的哈希值。这在确保签名过程中使用的哈希值与恢复地址过程中的哈希值匹配方面至关重要。

`Signer` 类的 `recoverAddress` 方法采用哈希消息和签名来恢复签名者的地址。这证实了签名是由与该地址相关联的私钥的持有者创建的，从而确保了签名消息的真实性和完整性。

## 签名交易

签名交易涉及使用你的钱包对交易 ID(也称之为[交易哈希](https://specs.fuel.network/master/identifiers/transaction-id.html))进行签名，以授权使用你的资源。以下是它的工作原理：

1. `生成签名`: 使用钱包根据交易ID创建签名。

2. `在交易中使用签名`: 将签名放入交易的 `witnesses` 数组中。每个 `Coin` 或 `Message` 输入都应该有一个匹配的 `witnessIndex`。这个索引表示签名在 `witnesses` 数组中的位置。

3. `安全机制`: 交易 ID 源自交易字节（不包括 `witnesses`）。如果交易发生变化，ID 就会改变，使任何先前的签名无效。这确保在签名后无法进行未经授权的更改。

以下代码片段展示了如何签名交易：

<<< ../../docs-snippets/src/guide/wallets/signing.test.ts#signing-2{ts:line-numbers}

与签名消息的示例类似，前面的代码使用了 `Signer.recoverAddress` 从交易 ID 和已签名的数据中获取钱包的地址。

当你使用钱包提交交易 `wallet.sendTransaction()` 时，SDK 已经处理了与签名交易相关的步骤，包括添加签名到 `witnesses` 数组。因此，在大多数情况下，你可以跳过这些手动签名步骤：

<<< ../../docs-snippets/src/guide/wallets/signing.test.ts#signing-3{ts:line-numbers}
