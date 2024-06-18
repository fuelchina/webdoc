# 强制构建

编译当前或目标项目。

产生的输出将取决于项目的程序类型。

- `script`，`predicate`项目`contract`将以二进制格式生成其字节码 `<project-name>.bin`。
- `script`项目还将生成一个包含字节码二进制哈希值的文件 `<project-name>-bin-hash`（使用`fuel_cypto::Hasher`）。
- `predicate`项目还将生成一个包含字节码二进制的 根`<project-name>-bin-root`哈希的文件（使用`fuel_tx::Contract::root_from_code`）。
- `contract`并且`library`项目也会生成 JSON 格式的公共 ABI `<project-name>-abi.json`。

# 用法
forc build [选项]

# 选项
`--ast`

打印生成的 Sway AST（抽象语法树）

`--build-profile`<构建配置文件>

要使用的构建配置文件的名称。

如果未指定，forc 将使用调试构建配置文件。

`--build-target`<构建目标>

构建用于代码生成的目标

[默认值：fuel] [可能的值：fuel、evm、midenvm]

`--dca-graph`< DCA_GRAPH >

打印计算出的 Sway DCA 图。DCA 图将打印到指定路径。如果指定“”，则图将打印到标准输出

`--dca-graph-url-format`< DCA_GRAPH_URL_格式>

指定生成的点文件中使用的 URL 格式。变量 {path}、{line}、{col} 可用于提供的格式。vscode 的一个示例为：“vscode://file/{path}:{line}:{col}”

`--error-on-warnings`

将警告视为错误

`--experimental-new-encoding`

“新编码”功能的实验性标志

`--finalized-asm`

打印最终确定的 ASM。

这是已分配寄存器并应用优化的 ASM 的状态。

`-g`，`--output-debug`<调试文件>

如果设置，则以 JSON 格式输出源文件映射

`-h`，`--help`

打印帮助信息

`--intermediate-asm`

打印生成的 ASM。

这是执行寄存器分配和其他 ASM 优化之前 ASM 的状态。

`--ipfs-node`< IPFS_节点>

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

`-L`，`--log-level`<日志级别>

设置日志级别

`--locked`

要求 Forc.lock 文件是最新的。如果锁文件丢失，或者需要更新，Forc 将退出并显示错误

`--metrics-outfile`<度量值输出文件>

将编译指标输出到文件中

`-o`，`--output-bin`< BIN_文件>

如果设置，则输出表示脚本字节的二进制文件

`--offline`

离线模式，防止 Forc 在管理依赖项时使用网络。这意味着它只会尝试使用之前下载的依赖项

`--output-directory`<输出目录>

放置 Sway 编译器输出工件的目录。

默认情况下，这是`<project-root>/out`。

`-p`，`--path`<路径>

项目路径，若未指定，则将使用当前工作目录

`--release`

使用发布构建计划。如果未指定自定义发布计划，则会将其隐式添加到清单文件中。

如果还提供了 --build-profile，forc 将省略此标志并使用提供的 build-profile。

`--reverse-order`

以相反的顺序输出构建错误和警告

`-s`，`--silent`

使所有输出静音

`-t`，`--terse`

简洁模式。有限的警告和错误输出

`--tests`

还构建项目内的所有测试

`--time-phases`

输出编译过程每个部分所用的时间

`-v`，`--verbose`

使用详细输出

`-V`，`--version`

打印版本信息

示例：#使用 c build 编译当前项目

#使用不同的路径编译当前项目 forc build --path ../tests/

#编译当前项目，不更新依赖项 forc build --locked

# 例子

编译当前项目的sway文件。

```sway
$ forc build
Compiled script "my-fuel-project".
Bytecode size is 28 bytes.

```
生成的输出将取决于项目的程序类型。构建脚本、谓词和合约项目将生成二进制格式的字节码`<project-name>.bin`。构建合约和库还将生成 JSON 格式的公共 ABI `<project-name>-abi.json`。

默认情况下，这些工件被放置在`out/`目录中。

如果`Forc.lock`文件尚不存在，则会创建该文件以便将列出的每个依赖项固定`Forc.toml`到特定的提交或版本。

