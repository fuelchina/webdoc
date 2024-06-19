# 定义错误处理

**enum**（通常称为枚举）是一种可以表示几种可能变体之一的类型。在我们的合约中，我们可以使用枚举来制作自定义错误消息，从而促进函数中更精确的错误处理。

将自定义错误块复制到您的main.sw文件：

```sway
enum InvalidError {
    IncorrectAssetId: AssetId,
    NotEnoughTokens: u64,
    OnlyOwner: Identity,
}
```

在我们的合约中，我们可以预测各种情况，在这些情况下，我们想要抛出错误并停止交易：

  1. 有人可能会尝试使用不正确的货币支付商品。
  2. 个人可以在没有足够硬币的情况下尝试购买物品。
  3. 所有者以外的其他人可能会尝试从合同中提取资金。


对于每种情况，我们可以为错误定义特定的返回类型：

  对于 IncorrectAssetId 错误，我们可以返回提交的资产 ID，其类型为 AssetId. <br>
  在 NotEnoughTokenserror ，我们可以将返回类型定义为 u64 以表示涉及的硬币数量。<br>
  对于 OnlyOwner 错误，我们可以利用 Identity 作为返回值的消息发送者。

