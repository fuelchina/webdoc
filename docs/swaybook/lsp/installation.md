# 安装

Sway 语言服务器包含在 [`forc-lsp`](../forc/plugins/forc_lsp) 二进制文件中, 作为 [Fuel 工具链](../introduction/fuel_toolchain).的一部分进行安装。安装后，它可以与各种 IDE 一起使用。必须安装它才能使任何 IDE 插件正常工作。

> **注意**: 无需手动运行 `forc-lsp` (插件会自动启动它), 但是 `forc` 和 `forc-lsp` 必须在您的 `$PATH`中. 要检查 `forc` 是否在您的 `$PATH`中, 将`forc --help` 在终端中输入.

## VS 代码

这是目前支持最好的编辑器。

您可以从[市场](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin)安装最新版本的插件。

请注意，我们仅支持最新版本的 VS Code

## vim / neovim

按照 [sway.vim](https://github.com/FuelLabs/sway.vim)的文档进行安装。

## helix

[安装 helix](https://docs.helix-editor.com/install.html) 后 Sway LSP 即可开箱即用。

使用 [tree-sitter-sway](https://github.com/FuelLabs/tree-sitter-sway)将摇摆支撑内置到螺旋中。

## Emacs

即将推出！欢迎随意 [贡献](https://github.com/FuelLabs/sway/issues/3527)。
