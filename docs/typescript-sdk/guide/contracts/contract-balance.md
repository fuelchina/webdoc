# 合约余额

在处理合同时，在支付昂贵的操作费用时，了解资产的可用合同余额是至关重要的。本指南将解释[Contract](../../api/Program/Contract.md)类中的`getBalance`方法，它允许您检查合约的可用余额。

## 方法`getBalance` 

此类[`Contract`](../../api/Program/Contract.md) 包含一个名为的方法 `getBalance` 用于检索合约中特定资产的可用余额。 此方法对于确定将资产发送到合约并执行合约调用后的剩余余额特别有用。

<!-- <<< ../../../packages/program/src/contract.ts#contract-balance-1{ts:line-numbers} -->

## 查看合同余额

考虑一个将指定数量的给定资产转移到某个地址的简单合约：

<!-- <<< ../../docs-snippets/test/fixtures/forc-projects/transfer-to-address/src/main.sw#contract-balance-2{rust:line-numbers} -->

`transfer` 函数有三个参数

1. `amount_to_transfer`: 正在转账的金额。

2. `asset`: 部署合约Token的地址。

3. `recipient`: 接收者钱包的地址。

`transfer` 函数调用内置的 Sway 函数 `transfer_to_address`,其功能正如其名称所示。

让我们执行这个合约，并使用该 `getBalance`方法来验证合约还剩下需要花费的资产金额。

<!-- <<< ../../docs-snippets/src/guide/contracts/contract-balance.test.ts#contract-balance-3{ts:line-numbers} -->

在这个例子中，我们首先转发一个大于转账所需金额的资产金额，然后执行合约调用。

最后，我们用该`getBalance` 方法确认合约余额恰好是总转发金额减去已转账金额。

值得注意的是，无论资产被发送的频率或在昂贵的操作上花费的频率，此方法都会返回可用的合同总余额。
