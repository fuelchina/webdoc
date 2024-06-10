# 使用 SDK 进行合约间调用

本指南介绍如何使用 SDK 执行合约调用，即一个合约与另一个合约交互。我们将使用一个涉及 `SimpleToken` 合约与 `TokenDepositor` 合约的简单场景。

## `SimpleToken` 和 `TokenDepositor` 合同

在这个例子中，我们有一个 `SimpleToken` 代表基本代币合约的合约，该合约能够为不同的地址持有余额。 我们还有一个 `TokenDepositor` 将代币存入 `SimpleToken` 合约的合约。

### 合同: `SimpleToken`

这是一个允许持有余额的简单代币合约：

<!-- <<< ../../docs-snippets/test/fixtures/forc-projects/simple-token/src/main.sw#inter-contract-calls-1{ts:line-numbers} -->

### 合同: `TokenDepositor`

合同`TokenDepositor` 导入 `SimpleToken` 合约并调用其 `deposit` 函数存入代币：

<!-- <<< ../../docs-snippets/test/fixtures/forc-projects/token-depositor/src/main.sw#inter-contract-calls-2{ts:line-numbers} -->

## 使用 SDK 进行合约间调用

一旦两个合约都部署完毕，我们就可以使用SDK来制作 `TokenDepositor` 合约并调用 `SimpleToken` 合约。

<!-- <<< ../../docs-snippets/src/guide/contracts/inter-contract-calls.test.ts#inter-contract-calls-3{ts:line-numbers} -->

注意合约`addContracts` 调用的方法 `TokenDepositor` ，该方法接受一个已部署合约的实例数组，不调用该方法则合约间调用无法进行。
