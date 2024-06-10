# 变量输出

Sway 包含将资产转移到钱包和合约的强大功能。

在 Sway 项目中使用这些传输函数时，请务必注意每次调用都需要交易 [输出](https://specs.fuel.network/master/tx-format/output.html) 中的一个[输出变量](https://specs.fuel.network/master/tx-format/output.html#outputvariable)

例如，如果合约函数调用 Sway 传输函数 3 次，则它将需要交易输出列表中存在 3 个输出变量。
## 示例：需要的 Sway 函数 `Output Variable`

<!-- <<< ../../docs-snippets/test/fixtures/forc-projects/token/src/main.sw#variable-outputs-1{ts:line-numbers} -->

## 在合约调用中添加变量输出

当您的合约调用其中任何函数时，或者它调用的函数导致另一个合约调用这些函数时，您需要添加适当数量的输出变量。

可以按照以下示例所示进行操作：

<!-- <<< ../../docs-snippets/src/guide/contracts/variable-outputs.test.ts#variable-outputs-2{ts:line-numbers} -->

在 TypeScript SDK 中，输出变量会自动添加到交易的输出列表中。

此过程采用强力策略，执行连续试运行，直到没有返回错误。此方法确定处理交易所需的输出变量数量。

然而，这会显著延迟交易处理。因此，**强烈建议**在提交交易之前手动添加正确数量的输出变量。
