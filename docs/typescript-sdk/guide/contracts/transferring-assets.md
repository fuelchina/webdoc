# 转移资产

设想这样一个场景：您正在与智能合约交互，需要将资产转移到接收者的钱包。这 `addTransfer` 使您可以将这些操作无缝地组合成一笔交易。

 `addTransfer` 方法允许你将资产转移附加到合约调用交易中。你可以按照以下示例使用它：

<!-- <<< ../../docs-snippets/src/guide/contracts/add-transfer.test.ts#add-transfer-1{ts:line-numbers} -->

在前面的例子中，我们首先使用契约调用 `echo_u64` 函数。在这之后,`addTransfer` 添加到链调用中，以在事务中包含 `BaseAssetId` 的`100`个单位的转移。

## 多次转帐

您可以串联多个 `addTransfer` 调用，以在单个交易中包含各种转账。以下是串联这些调用的方法：

<!-- <<< ../../docs-snippets/src/guide/contracts/add-transfer.test.ts#add-transfer-2{ts:line-numbers} -->
