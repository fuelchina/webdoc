# 合约交互

合约交互的方式有4种: `get`, `dryRun`, `simulate`, `call`.

## `get`

`get` 方法应该用于从区块链读取数据而不使用资源。它可以与无资金钱包一起使用，甚至根本没有钱包。

<!-- <<< ../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-1{ts:line-numbers} -->

## `dryRun`

`dryRun` 方法应该用于试运行合约调用。它不消耗资源，可以在没有资金的钱包中使用，甚至在没有钱包的情况下也可以使用。

<!-- <<< ../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-2{ts:line-numbers} -->

## `simulate`

`simulate` 方法应用于试运行合约调用，确保所使用的钱包有足够的资金来支付交易费用，而不会消耗任何资源。

需要一个有资金的钱包：

<!-- <<< ../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-3{ts:line-numbers} -->

## `call`

`call` 方法应该用来向节点提交真实的合约调用交易。

会消耗真实的资源，合约函数执行的任何操作都会在区块链上进行处理。

<!-- <<< ../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#interacting-with-contracts-4{ts:line-numbers} -->

## `isReadOnly` (utility)

如果你想知道一个函数是否是只读，你可以使用该 `isReadOnly` 方法:

<!-- <<< ../../docs-snippets/src/guide/contracts/is-function-readonly.test.ts#is-function-readonly-1{ts:line-numbers} -->

如果该函数是只读，您可以使用该 `get` 方法检索链上数据而无需花费 gas。

如果该函数不是只读，您将必须使用 `call` 方法在链上提交交易，这会产生 gas 费用。
