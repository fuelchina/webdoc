
# Fuel 工具链

Fuel 工具链由几个组件组成。

## Forc (`forc`)

"Fuel Orchestrator" [Forc](https://github.com/FuelLabs/sway/tree/master/forc) 是我们相当于 Rust 的 [Cargo](https://doc.rust-lang.org/cargo/) 的工具。它是创建、构建、测试和部署 Sway 项目的主要入口点。

## Sway 语言服务器 (`forc-lsp`)

Sway 语言服务器 `forc-lsp` 用于向 IDE 暴露功能。[安装说明](../lsp/installation)。

## Sway 格式化器 (`forc-fmt`)

提供了一个官方的格式化器 `forc-fmt`。[安装说明](./getting_started)。你可以使用以下命令手动运行：

```sh
forc fmt
```

[Visual Studio Code 插件](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin) 将在保存时自动使用 `forc-fmt` 格式化 Sway 文件，但你可能需要明确将 Sway 插件设置为默认格式化器，如下所示：

```json
"[sway]": {
  "editor.defaultFormatter": "FuelLabs.sway-vscode-plugin"
}
```

## Fuel Core (`fuel-core`)

提供了一个 Fuel 协议的实现，[Fuel Core](https://github.com/FuelLabs/fuel-core)，它与 _Sway 工具链_ 一起构成 _Fuel 工具链_。[Rust SDK](https://github.com/FuelLabs/fuels-rs) 在测试期间会自动启动和停止一个节点实例，因此除非直接使用 Forc 而不使用 SDK，否则无需手动运行节点。
