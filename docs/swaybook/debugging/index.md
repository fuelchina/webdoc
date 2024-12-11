# [调试](https://docs.fuel.network/docs/sway/debugging/#debugging)

Forc 提供了用于调试实时交易和 Sway 单元测试的工具。您既可以通过命令行界面（CLI）也可以通过使用 VSCode 集成开发环境（IDE）来进行调试。

**单元测试** 指的是使用 `#[test]` 标注的语言内测试函数。在 VSCode IDE 内可以进行逐行调试。

**实时交易** 指的是向正在运行的 Fuel 客户端节点发送交易以测试您的 Sway 代码。`forc debug` CLI 支持逐指令调试。

- [使用 CLI 调试](./debugging_with_cli.md)
- [使用 IDE 调试](./debugging_with_ide.md)