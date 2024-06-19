# 插件

插件可用于扩展 `forc` 上一章中提到的原生命令以外的新命令。虽然 Fuel 生态系统提供了一些常用的插件 (`forc-fmt`, `forc-client`, `forc-lsp`, `forc-explore`), 但任何人都可以编写自己的插件！

让我们安装一个插件, `forc-explore`并看看插件下面有什么：

```sh
cargo install forc-explore
```

检查我们是否已安装 `forc-explore`:

```console
$ forc plugins
Installed Plugins:
forc-explore
```

`forc-explore` 运行 Fuel Network Explorer，您可以自行运行并检查：

```console
$ forc explore
Fuel Network Explorer 0.1.1
Running server on http://127.0.0.1:3030
Server::run{addr=127.0.0.1:3030}: listening on http://127.0.0.1:3030
```

您可以访问 <http://127.0.0.1:3030> 来查看网络浏览器！

请注意，某些插件包还可以提供多个命令。例如，安装插件 `forc-client` 会提供 `forc deploy` 和 `forc run` 命令。这是通过 `[[bin]]` 在清单中指定多个目标来实现的 `forc-client` 。

## 编写自己的插件

我们鼓励任何人编写和发布自己的`forc`插件以增强他们的开发体验。

您的插件必须按照格式命名 `forc-<MY_PLUGIN>`，您可以使用上述模板作为起点。您可以使用 [clap](https://docs.rs/clap/latest/clap/) 并添加更多子命令、选项和配置以满足您的插件需求。
