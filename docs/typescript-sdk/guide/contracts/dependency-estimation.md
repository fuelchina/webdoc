# 交易依赖性评估

[之前](./variable-outputs.md), 我们提到，合约调用可能需要您手动指定外部合约或变量输出。

但是，当您调用合约函数或尝试发送交易时，SDK 始终会自动估计这些依赖关系并仔细检查一切是否正常。

SDK 使用 `estimateTxDependencies` 辅助函数来设置在估算过程中发现的任何缺失的依赖项。这需要在后台模拟交易几次。

<!-- <<< ../../../packages/account/src/providers/provider.ts#Provider-sendTransaction{ts:line-numbers} -->

虽然依赖 SDK 的自动估算是一种不错的默认行为，但我们建议手动指定依赖项（如果提前知道它们），以避免估算过程对性能造成影响。
