# 估算合约调用成本

由[Provider](../../api/Account/Provider) 提供的 `getTransactionCost` 函数允许您估算特定合约调用的成本。 返回类型 `TransactionCost`, 是一个包含估算相关信息的对象:

<!-- <<< ../../../packages/account/src/providers/provider.ts#cost-estimation-1{ts:line-numbers} -->

以下示例说明如何获取预计交易成本：

## 1. 单笔合约调用交易:

<!-- <<< ../../docs-snippets/src/guide/contracts/cost-estimation.test.ts#cost-estimation-1{ts:line-numbers} -->

## 2. 多合约调用交易:

<!-- <<< ../../docs-snippets/src/guide/contracts/cost-estimation.test.ts#cost-estimation-2{ts:line-numbers} -->

您可以使用交易成本估算来设置实际调用的 gas 限制或向用户显示估算成本。
