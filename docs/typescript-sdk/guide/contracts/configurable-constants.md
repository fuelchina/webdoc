# 可配置常量

Sway 引入了一项强大的功能：可配置常量。创建合同时，您可以定义常量，每个常量都分配有默认值。

在部署合约之前，您可以重新定义这些常量的值，可以是全部，也可以是您需要的任意数量的常量。

此功能为动态合约环境提供了灵活性。它允许高度定制，从而实现更高效、适应性更强的智能合约。

## 定义可配置常量

下面是一个合约示例，其中我们声明了四个可配置常量：
<!-- <<< ../../docs-snippets/test/fixtures/forc-projects/echo-configurables/src/main.sw#configurable-constants-1{rust:line-numbers} -->

在这个合约中，我们有一个`echo_configurables`返回可配置常量的值的函数。

如果每个常量都已分配新值，则该函数将返回更新后的值。否则，该函数将返回默认值。

## 为可配置常量设置新值

在合约部署过程中，你可以为可配置常量定义新值。具体实现如下：
<!-- <<< ../../docs-snippets/src/guide/contracts/configurable-constants.test.ts#configurable-constants-2{ts:line-numbers} -->

您可以为任何这些可配置常量分配新值。

如果您希望为一个常量分配一个新值，您可以执行以下操作：

<!-- <<< ../../docs-snippets/src/guide/contracts/configurable-constants.test.ts#configurable-constants-3{ts:line-numbers} -->

请注意，当为`Struct` 分配新值时，必须定义该 `Struct` 的所有属性。如果不这样做，将导致错误:

<!-- <<< ../../docs-snippets/src/guide/contracts/configurable-constants.test.ts#configurable-constants-4{ts:line-numbers} -->
