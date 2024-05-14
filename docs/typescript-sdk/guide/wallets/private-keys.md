# 从私钥创建钱包

可以通过向`Wallet.generate`提供参数来创建一个带有随机生成私钥的新钱包。

<<< ../../docs-snippets/src/guide/wallets/access.test.ts#wallets{ts:line-numbers}

或者，你可以从私钥创建一个钱包：

<<< ../../docs-snippets/src/guide/wallets/private-keys.test.ts#wallet-from-private-key{ts:line-numbers}

你可以使用`Signer`包获取私钥的地址：

<<< ../../docs-snippets/src/guide/wallets/private-keys.test.ts#signer-address{ts:line-numbers}
