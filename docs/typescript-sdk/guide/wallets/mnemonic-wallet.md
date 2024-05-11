# 从助记词创建钱包

助记词一组加密生成的单词序列，用于生成私钥。例如：`"oblige salon price punch saddle immune slogan rare snap desert retire surprise"` 会生成地址 `0xdf9d0e6c6c5f5da6e82e5e1a77974af6642bdb450a10c43f0c6910a212600185`。

除此之外，我们还支持 [Hierarchical Deterministic Wallets](https://www.ledger.com/academy/crypto/what-are-hierarchical-deterministic-hd-wallets) 和 [derivation paths](https://learnmeabitcoin.com/technical/derivation-paths)。你可能对字符串 `"m/44'/60'/0'/0/0"` 有所了解；这是一个派生路径。简单来说，它是一种从单个根钱包派生出许多钱包的方式。

SDK 提供了两种从助记词实例化钱包的方法：一种接受派生路径，另一种使用默认派生路径，以防你不想或不需要配置该路径。

以下是使用助记词和派生路径创建钱包的示例：

```ts
const walletManager = new WalletManager();
const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
 
await walletManager.unlock(password);
 
// Add a vault of type mnemonic
await walletManager.addVault(config);
```
