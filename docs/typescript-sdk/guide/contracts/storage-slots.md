# 存储槽

在部署合约时，您可以指定想要使用的自定义存储槽。
<!-- <<< ../../../packages/fuel-gauge/src/storage-test-contract.test.ts#contract-deployment-storage-slots{ts:line-numbers} -->

## 使用 JavaScript

在上面的例子中，我们直接从 Sway 编译器生成的 JSON 文件中导入了存储槽。

除了从文件导入之外，您还可以直接在代码中指定自定义存储槽：

<!-- <<< ../../../packages/fuel-gauge/src/storage-test-contract.test.ts#contract-deployment-storage-slots-inline{ts:line-numbers} -->

## 自动加载存储槽

使用 [Typegen](../fuels-cli/generating-types) 自动生成的代码 [load](../fuels-cli/using-generated-types.md#autoloading-of-storage-slots) 为您提供存储槽。
