# 强制提交
`forc`用于与 Fuel 节点交互的插件。

# 用法：
强制提交 [选项] <TX_PATH>

# 参数：
< TX_PATH > 要提交给 Fuel 节点的交易的路径。

以 结尾的文件路径`.json`将从 JSON 反序列化。以 结尾的文件路径`.bin`将使用 `fuel_tx::Transaction::try_from_bytes`构造函数从字节反序列化。

# 选项：
`--await`[<等待>]

是否等待交易已提交的确认。

当 时`true`，等待承诺并输出交易状态。当 时`false`，不等待确认，仅输出交易 ID。

[默认值： true]

`-h`，`--help`

打印帮助信息

`--node-url`[<节点 URL >]

我们要向其提交交易的 Fuel 节点的 URL。如果未指定，则检查清单的`network`表格，然后返回到`http://127.0.0.1:4000`

您也可以使用`--target`或`--testnet`指定 Fuel 节点。

[环境：FUEL_NODE_URL=]

`--target`[<目标>]

使用预设配置部署到特定目标。

您也可以使用`--node-url`或`--testnet`指定 Fuel 节点。

可能的值是：[beta-1, beta-2, beta-3, beta-4, local]

`--testnet`

使用最新测试网的预设配置。

您也可以使用`--node-url`或`--target`指定 Fuel 节点。

`--tx-status-json`[< json >]

将结果交易状态输出为 JSON，而不是默认输出

[默认值：false]

`-V`，`--version`

打印版本信息

示例：#从 json 文件提交交易 forc submit ./mint.json

#从 json 文件提交交易并等待确认 forc submit ./mint.json --await true

#从 json 文件提交交易并以 json 格式获取输出 forc submit ./mint.json --tx-status-json true

#从 json 文件向 testnet 提交交易 forc submit ./mint.json --testnet

#从json文件提交交易到本地net forc submit ./mint.json --target local
