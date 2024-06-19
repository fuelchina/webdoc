# 强制测试
运行当前项目的 Sway 单元测试。

注意：以前，此命令用于支持 Rust 集成测试，但提供的行为与`cargo test`直接运行相比没有任何好处。更改行为以支持单元测试的提议可在以下链接中找到：https://github.com/FuelLabs/sway/issues/1833

Sway 单元测试是用该`#[test]`属性修饰的函数。每个测试都被编译为单个程序的唯一入口点，并可以访问声明它的模块的命名空间。

`#[test(script)]`在项目内声明的使用属性修饰的单元测试`contract` 也可以直接调用其关联合约的 ABI。

成功编译后，测试脚本将执行至完成。如果`rvrt`在执行过程中遇到 revert ( ) 指令，则测试被视为失败。否则，则视为成功。

# 用法：
forc 测试 [选项] [过滤器]

# 参数：
 [< FILTER >] 指定后，仅执行包含给定字符串的测试
 
# 选项：
`--ast`

打印生成的 Sway AST（抽象语法树）

`--build-profile`[<构建配置文件>]

要使用的构建配置文件的名称。

如果未指定，forc 将使用调试构建配置文件。

`--build-target` [<构建目标>]

构建用于代码生成的目标

[默认值：fuel] [可能的值：fuel、evm、midenvm]

`--dca-graph` [< DCA_GRAPH >]

打印计算出的 Sway DCA 图。DCA 图将打印到指定路径。如果指定“”，则图将打印到标准输出

`--dca-graph-url-format` [< DCA_GRAPH_URL_格式>]

指定生成的点文件中使用的 URL 格式。变量 {path}、{line}、{col} 可用于提供的格式。vscode 的一个示例为：“vscode://file/{path}:{line}:{col}”

`--error-on-warnings`

将警告视为错误

`--experimental-new-encoding`

“新编码”功能的实验性标志

`--filter-exact`

指定后，仅执行与给定字符串完全匹配的测试

`--finalized-asm`

打印最终确定的 ASM。

这是已分配寄存器并应用优化的 ASM 的状态。

`-g`，`--output-debug` [<调试文件>]

如果设置，则以 JSON 格式输出源文件映射

`-h`，`--help`

打印帮助信息

`--intermediate-asm`

打印生成的 ASM。

这是执行寄存器分配和其他 ASM 优化之前 ASM 的状态。

`--ipfs-node` [< IPFS_节点>]

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

`-l`，`--logs`

打印Log并LogData获取测试收据

`-L`，`--log-level` [<日志级别>]

设置日志级别

`--locked`

要求 Forc.lock 文件是最新的。如果锁文件丢失，或者需要更新，Forc 将退出并显示错误

`--metrics-outfile`[<度量值输出文件>]

将编译指标输出到文件中

`-o`，`--output-bin` [< BIN_文件>]

如果设置，则输出表示脚本字节的二进制文件

`--offline`

离线模式，防止 Forc 在管理依赖项时使用网络。这意味着它只会尝试使用之前下载的依赖项

`--output-directory`[<输出目录>]

放置 Sway 编译器输出工件的目录。

默认情况下，这是`<project-root>/out`。

`-p`，`--path`[<路径>]

项目路径，若未指定，则将使用当前工作目录

`-r`，`--pretty-print`

漂亮地打印测试发出的日志

`--release`

使用发布构建计划。如果未指定自定义发布计划，则会将其隐式添加到清单文件中。

如果还提供了 --build-profile，forc 将省略此标志并使用提供的 build-profile。

`--reverse-order`

以相反的顺序输出构建错误和警告

`-s`，`--silent`

使所有输出静音

`-t`，`--terse`

简洁模式。有限的警告和错误输出

`--test-threads`[<测试线程>]

运行测试时要使用的线程数。默认情况下，这是系统中可用的线程数

`--time-phases`

输出编译过程每个部分所用的时间

`-v`，`--verbose`

使用详细输出

示例：#运行测试 forc test

#使用过滤器运行测试 forc test $filter

#运行测试但不输出任何结果 c test --silent

#运行测试但不创建或更新锁文件 forc test --locked
