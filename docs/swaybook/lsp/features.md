# 特征

## 代码操作

_来源:_ [code_actions](https://github.com/FuelLabs/sway/tree/master/sway-lsp/src/capabilities/code_actions)

快速生成函数、结构和 ABI 的样板代码和代码注释。

## 达成

_来源:_ [completion.rs](https://github.com/FuelLabs/sway/blob/master/sway-lsp/src/capabilities/completion.rs)

建议代码遵循函数和变量的部分书写语句。

## 诊断

_来源:_ [diagnostic.rs](https://github.com/FuelLabs/sway/blob/master/sway-lsp/src/capabilities/diagnostic.rs)

以内联方式显示编译器警告和错误。

## 语法高亮

_Source:_ [highlight.rs](https://github.com/FuelLabs/sway/blob/master/sway-lsp/src/capabilities/highlight.rs)

根据类型和上下文突出显示代码。

## 徘徊

_来源:_ [hover](https://github.com/FuelLabs/sway/tree/master/sway-lsp/src/capabilities/hover)

当鼠标悬停在函数和变量上时，提供文档、编译器诊断和参考链接。

## 镶嵌提示

_来源:_ [inlay_hints.rs](https://github.com/FuelLabs/sway/blob/master/sway-lsp/src/capabilities/inlay_hints.rs)

在变量名称旁边显示变量的隐含类型。可在“设置”中配置。

## 改名

_来源:_ [rename.rs](https://github.com/FuelLabs/sway/blob/master/sway-lsp/src/capabilities/rename.rs)

在工作区的任何位置重命名符号。

## Run

_来源:_ [runnable.rs](https://github.com/FuelLabs/sway/blob/master/sway-lsp/src/capabilities/runnable.rs)

在可运行的函数或测试上方显示一个按钮
