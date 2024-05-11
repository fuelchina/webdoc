# 查询余额

## 理解 UTXO 模型

在基于 UTXO（_Unspent Transaction Output_）的系统中，每枚代币都是独一无二的，就像实物货币中的不同面额纸币一样。

一个 UTXO 代表具有特定金额的代币，类似于拥有一张 10 美元或 5 美元的钞票。理解 UTXO 的这一独特特性至关重要，因为它与以太坊的账户系统有显著差异。

在以太坊中，余额是以累计总额的形式跟踪的，类似于银行账户，而不是作为独立的“币”或“钞票”。

## UTXO 为何重要

每个 UTXO 对应于一枚独特的代币并带有关联的金额。这种模型使得加密货币交易更加透明和可控。理解 UTXO 是有效管理和追踪数字资产的关键。

## 获取钱包的余额

要查看特定资产的余额，可以使用 [`getBalance`](../../api/Account/Account.html#getbalance) 方法。这个函数会汇总你钱包中给定资产的所有未花费代币的金额。

<<< ../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-1{ts:line-numbers}

为了获取钱包中所有资产的余额，可以使用 [`getBalances`](../../api/Account/Account.html#getbalances) 方法，它返回一个 [`CoinQuantity`](../../api/Account/#coinquantity) 类型的数组。这对于全面了解你的持仓非常有用。

<<< ../../docs-snippets/src/guide/wallets/checking-balances.test.ts#checking-balances-2{ts:line-numbers}
