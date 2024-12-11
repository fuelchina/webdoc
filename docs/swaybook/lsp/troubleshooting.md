# [故障排除](https://docs.fuel.network/docs/sway/lsp/troubleshooting/#troubleshooting)

请确认您已安装并运行最新版本：

```
fuelup toolchain install latest
fuelup update
forc-lsp --version
```

确认您的 `$PATH` 环境变量包含了位于 `$HOME/.fuelup/bin` 目录下的 `forc-lsp` 可执行文件路径。

```
which forc-lsp
```

## [性能缓慢](https://docs.fuel.network/docs/sway/lsp/troubleshooting/#slow-performance)

如果您遇到了性能缓慢的问题，可以尝试以下方法：

按照[上述步骤](https://docs.fuel.network/docs/sway/lsp/troubleshooting/#troubleshooting)确保您正在运行最新版本。

接着，确保仅有一个最新版本的 LSP 服务器在运行。

```
pkill forc-lsp
```

## [大型项目](https://docs.fuel.network/docs/sway/lsp/troubleshooting/#large-projects)

包含十个或更多 Sway 文件的 Sway 项目可能会有较慢的 LSP 性能。我们正在努力改善对大型项目的支持。

在此期间，如果速度太慢，您可以在设置中使用 `sway-lsp.diagnostic.disableLsp` 选项来完全禁用 LSP 服务器。扩展程序仍然会提供基本的语法高亮、命令面板以及 Sway 调试器，但所有其他语言特性将被禁用。

## [服务器日志](https://docs.fuel.network/docs/sway/lsp/troubleshooting/#server-logs)

您可以启用 LSP 服务器的详细日志记录。

在 VSCode 中，这可以在设置中找到：

```
"sway-lsp.trace.server": "verbose"
```

启用后，您可以在输出窗口中的 Sway Language Server 部分找到这些日志。

对于其他编辑器，请参阅[安装文档](https://docs.fuel.network/docs/sway/lsp/installation/)以获取相关链接。