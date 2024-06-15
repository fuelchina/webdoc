# 调用参数

<!-- This section should explain call params -->
<!-- call_params:example:start -->

在与合约交互时，可以通过该 `callParams` 方法配置合约调用的具体参数，可用的调用参数有：

1. `forward`
2. `gasLimit`
<!-- call_params:example:end -->

> **注意**: 调用合约时也可以设置交易参数。更多信息可参阅 [交易参数](../transactions/transaction-parameters).

## 前向参数

<!-- This section should explain the `forward` param -->
<!-- forward:example:start -->

`forward` 参数允许在调用函数时向合约发送特定数量的代币。当合约函数需要代币来执行时（例如支付费用或转账），这很有用。forward 参数可帮助您控制分配给合约调用的资源，并针对可能代价高昂的操作提供保护。

<!-- forward:example:end -->

<!-- <<< ../../docs-snippets/src/guide/contracts/call-parameters.test.ts#call-params-1{ts:line-numbers} -->

## Gas Limit 参数

<!-- This section should explain the `gasLimit` param -->
<!-- gas_limit:example:start -->

`gasLimit` 指的是合约调用本身可以消耗的最大 gas 量，与交易的其余部分无关。

<!-- gas_limit:example:end -->

<!-- <<< ../../docs-snippets/src/guide/contracts/call-parameters.test.ts#call-params-2{ts:line-numbers} -->

## 调用参数 `gasLimit` 与交易参数 `gasLimit`

回调`gasLimit` 参数设置实际合约调用允许的最大 gas，而交易 `gasLimit` _(see [参见交易参数](../transactions/transaction-parameters))_ 设置整个交易允许的最大 gas，并限制 `gasLimit` 调用。 如果调用 `gasLimit` 设置为大于可用交易 gas 的值, 则将为合约调用执行分配整个可用交易 gas。

如果您没有为回调设置 `gasLimit` ，则交易 `gasLimit` 将被应用。

## 设置两个参数

您可以在同一个合约函数调用中同时设置调用参数和交易参数。

<!-- <<< ../../docs-snippets/src/guide/contracts/call-parameters.test.ts#call-params-3{ts:line-numbers} -->
