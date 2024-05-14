# 加密和解密

JSON 钱包是一种安全存储钱包的标准方式。它们遵循特定的架构，并使用密码进行加密。这使得更容易管理和安全地在磁盘上存储多个钱包。本指南将带你了解如何使用 TypeScript SDK 对 JSON 钱包进行加密和解密。


## 加密钱包

我们将从 [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 实例调用 `encrypt`，它将以密码作为参数。接受一个密码作为参数对私钥进行加密，并返回 JSON 密钥库钱包。然后你可以安全地存储此 JSON 钱包


以下是如何完成此操作的示例：

<<< ../../docs-snippets/src/guide/wallets/encrypting-and-decrypting-json-wallets.test.ts#encrypting-and-decrypting-json-wallets-1{ts:line-numbers}

请注意，`encrypt` 必须在一个 [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 实例内调用。这个实例只能通过将私钥或助记词传递给锁定钱包来获得。


## 解密钱包

要解密 JSON 钱包并检索您的私钥，你可以在 [Wallet](../../api/Account/Wallet.md) 实例上调用 `fromEncryptedJson`。它接受加密的 JSON 钱包和密码作为参数，并返回解密的钱包。


以下是示例：

<<< ../../docs-snippets/src/guide/wallets/encrypting-and-decrypting-json-wallets.test.ts#encrypting-and-decrypting-json-wallets-2{ts:line-numbers}

在这个例子中，`decryptedWallet` 是一个 [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) 类的实例，现在可供使用。

## 重要事项

请确保安全地存储你的加密 JSON 钱包和密码。如果丢失了它们，将无法恢复你的钱包。出于安全考虑，避免与任何人共享你的私钥、加密的 JSON 钱包或密码。
