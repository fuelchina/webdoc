# 使用合同日志

当您在合约方法中记录值时，它会生成一个日志条目，该条目会添加到日志收据中，变量类型会记录在合约的 ABI 中。SDK 可让您将这些值解析为 TypeScript 类型。

考虑以下示例合同：

<!-- <<< ../../docs-snippets/test/fixtures/forc-projects/log-values/src/main.sw#log-1{rust:line-numbers} -->

要访问 TypeScript 中的记录值，请使用合约调用结果 `logs` 中的属性 `FunctionInvocationResult` 。日志数据将存储在 `Array<any>`:

<!-- <<< ../../docs-snippets/src/guide/contracts/logs.test.ts#log-2{ts:line-numbers} -->

这种方法允许您无缝地处理合同中的记录值，从而更容易理解和调试合同的行为。
