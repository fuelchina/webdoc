# 强制检查

检查当前或目标项目及其所有依赖项是否存在错误。

这将从本质上编译包而无需执行代码生成的最后一步，这比运行 forc build 更快。

# 用法
forc check [选项] [BUILD_TARGET]

# 参数

< BUILD_TARGET > 用于代码生成的构建目标

[默认值：fuel] [可能的值：fuel、evm、midenvm]

# 选项
`--disable-tests`

禁用检查单元测试

`-h`，`--help`

打印帮助信息

`--ipfs-node`< IPFS_节点>

用于获取 IPFS 源的 IPFS 节点。

可能的值：PUBLIC、LOCAL、<GATEWAY_URL>

`-L`，`--log-level`<日志级别>

设置日志级别

`--locked`

要求 Forc.lock 文件是最新的。如果锁文件丢失，或者需要更新，Forc 将退出并显示错误

`--offline`

离线模式，防止 Forc 在管理依赖项时使用网络。这意味着它只会尝试使用之前下载的依赖项

`-p`，`--path`<路径>

项目路径，若未指定，则将使用当前工作目录

`-s`，`--silent`

使所有输出静音

`-t`，`--terse`

简洁模式。有限的警告和错误输出

`-v`，`--verbose`

使用详细输出

`-V`，`--version`

打印版本信息

示例：#检查当前项目 forc check

#使用不同的路径检查当前项目 forc check --path ../tests/

#检查当前项目，不更新依赖项 forc check --locked


