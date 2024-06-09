# 多个合约调用

<!-- This section should explain making multiple contract calls -->
<!-- calls:example:start -->

您可以在一次交易中执行多个合约调用，既可以调用同一份合约，也可以调用不同的合约。这可以提高效率并降低总体交易成本。

<!-- calls:example:end -->

## 同一合约多次调用

<!-- This section should explain how make multiple calls with the SDK -->
<!-- multicall:example:start -->

使用该 `multiCall` 方法在单笔交易中调用同一合约上的多个函数：

<!-- multicall:example:end -->

<!-- <<< ../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-1{ts:line-numbers} -->

## 不同合约多次调用

The `multiCall` 方法还允许您在单个交易中对不同的合约执行多个合约调用：

<!-- <<< ../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-2{ts:line-numbers} -->

你也可以为每个合约调用链接支持的合约调用方法，比如 ：`callParams` :
<!-- <<< ../../docs-snippets/src/guide/contracts/multicalls.test.ts#multicall-3{ts:line-numbers} -->

当在 `multiCall`, 中链接合约调用方法时，避免自己执行合约函数，例如：`.call`, `.get`, 和 `.simulate`.

 `multiCall` 方法为所有契约调用创建一个范围 ,它只会在调用 `.call` 的方法。
