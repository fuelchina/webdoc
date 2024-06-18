# 强制部署
建立配置文件选项

# 用法：
forc deploy [选项] [签名密钥]

# 参数：
[< SIGNING_KEY >] 设置用于签名的密钥

# 选项：

`--ast`

打印生成的 Sway AST（抽象语法树）

`--build-profile`[<构建配置文件>]

要使用的构建配置文件的名称。

如果未指定，forc 将使用调试构建配置文件。

`--dca-graph`[< DCA_GRAPH >]

打印计算出的 Sway DCA 图。DCA 图将打印到指定路径。如果指定“”，则图将打印到标准输出

`--dca-graph-url-format`[< DCA_GRAPH_URL_格式>]

指定生成的点文件中使用的 URL 格式。变量 {path}、{line}、{col} 可用于提供的格式。vscode 的一个示例为：“vscode://file/{path}:{line}:{col}”

`--default-salt`

为合约生成默认盐值 (0x00000000000000000000000000000000000000000000000000000000000000000000000000000)。对 CI 很有用，可以创建可重现的部署

`--default-signer`

使用由 fuel-core 预先资助的默认签名者签署交易。适用于针对本地节点进行测试

`--error-on-warnings`

将警告视为错误

`--experimental-new-encoding`

`--finalized-asm`

打印最终确定的 ASM。

这是已分配寄存器并应用优化的 ASM 的状态。

`-g`，`--output-debug`[<调试文件>]

如果设置，则以 JSON 格式输出源文件映射

`--gas-price`[<价格>]

交易的 Gas Price

`-h`，`--help`

打印帮助信息

`--intermediate-asm`

打印生成的 ASM。

这是执行寄存器分配和其他 ASM 优化之前 ASM 的状态。

`--ipfs-node`[< IPFS_节点>]

用于获取 IPFS 源的 IPFS 节点。

可能的值：PUBLIC、LOCAL、<GATEWAY_URL>

`--ir`

打印生成的 Sway IR（中间表示）

`--json-abi`

默认情况下，ABI 的 JSON 格式便于阅读。使用此选项后，JSON 输出将被“最小化”，即所有内容都在一行上，没有空格

`--json-abi-with-callpaths`

输出带有调用路径的 json abi，​​而不是结构和枚举的名称

`--json-storage-slots`

默认情况下，初始存储槽的 JSON 格式便于阅读。使用此选项，JSON 输出将被“最小化”，即所有内容都在一行上，没有空格

--locked

要求 Forc.lock 文件是最新的。如果锁文件丢失，或者需要更新，Forc 将退出并显示错误

`--manual-signing`

手动签署部署交易

`--maturity`[<成熟度>]

区块高度低于该高度时交易无法被纳入

[默认值： 0]

`--metrics-outfile`[<度量值输出文件>]

将编译指标输出到文件中

`--node-url`[<节点 URL >]

我们要向其提交交易的 Fuel 节点的 URL。如果未指定，则检查清单的`network`表格，然后返回到http://127.0.0.1:4000

您也可以使用`--target`或`--testnet`指定 Fuel 节点。

[环境：FUEL_NODE_URL=]

`-o，--output-bin`[< BIN_文件>]

如果设置，则输出表示脚本字节的二进制文件

`--offline`

离线模式，防止 Forc 在管理依赖项时使用网络。这意味着它只会尝试使用之前下载的依赖项

`--output-directory`[<输出目录>]

放置 Sway 编译器输出工件的目录。

默认情况下，这是`<project-root>/out`。

`--override-storage-slots`[< JSON 文件路径>]

覆盖存储槽初始化。

默认情况下，存储槽使用合约中存储块中定义的值进行初始化。您可以通过提供包含覆盖值的 JSON 文件的文件路径来覆盖初始化。

文件格式和键值应该与 `*-storage_slots.json`编译合约输出目录中的编译器生成的文件相匹配。

例子：`forc deploy --override-storage-slots my_override.json`

my_override.json：[{“key”：“<来自 out/debug/storage_slots.json 的键>”，“值”：“000000000000000000000000000000000000000000000000000000000000000000000000000000000001”}]

`-p`，`--path`[<路径>]

项目路径，若未指定，则将使用当前工作目录

`--release`

使用发布构建计划。如果未指定自定义发布计划，则会将其隐式添加到清单文件中。

如果还提供了 --build-profile，forc 将省略此标志并使用提供的 build-profile。

`--reverse-order`

以相反的顺序输出构建错误和警告

`--salt`[<盐>]

可选的 256 位十六进制文字，用于重新部署合约。

对于单个合约，使用`--salt <SALT>`，例如：forc deploy --salt 0x00000000000000000000000000000000000000000000000000000000000000000000000000000000001

对于具有多个合约的工作区，使用`--salt <CONTRACT_NAME>:<SALT>`为每个合约指定一个盐，例如：

forc 部署 --salt contract_a：0x00000000000000000000000000000000000000000000000000000000000000000000000001 --salt contract_b：0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002

`--script-gas-limit`[<脚本_GAS_LIMIT >]

交易的 Gas 限制

`-t`，`--terse`

简洁模式。有限的警告和错误输出

`--target`[<目标>]

使用预设配置部署到特定目标。

您也可以使用`--node-url`或`--testnet`指定 Fuel 节点。

可能的值是：[beta-1, beta-2, beta-3, beta-4, local]

`--testnet`

使用最新测试网的预设配置。

您也可以使用`--node-url`或`--target`指定 Fuel 节点。

`--time-phases`

输出编译过程每个部分所用的时间

`--unsigned`

已弃用，改为`--default-signer`

`-V`，`--version`

打印版本信息

示例：#部署单个合约 forc deploy bc09bfa7a11a04ce42b0a5abf04fd437387ee49bf4561d575177e2946468b408

#从不同路径部署单个合约 forc deploy bc09bfa7a11a04ce42b0a5abf04fd437387ee49bf4561d575177e2946468b408 --path ../tests/

#部署到自定义网络 forc deploy --node-url https://beta-5.fuel.network/graphql

# 例子
您可以使用`forc deploy`，它会触发合约部署交易并将其发送到正在运行的节点。

或者，您可以使用我们的 Rust SDK [fuels-rs](https://github.com/FuelLabs/fuels-rs)以编程方式部署您的 Sway 合约。

您可以在我们的[fuels-rs](https://rust.fuel.network/v0.64.0/) 书中找到一个例子。
 
