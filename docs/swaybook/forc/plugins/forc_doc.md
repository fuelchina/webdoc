# `forc`文档
用法：forc-doc [选项]

选项：

`--manifest-path`[<清单路径>]

Forc.toml 文件的路径。默认情况下，forc-doc 在当前目录或任何父目录中搜索 Forc.toml 文件

`--document-private-items`

在文档中包含非公开内容

`--open`

构建文档后在浏览器中打开它们

`--offline`

离线模式，防止 Forc 在管理依赖项时使用网络。这意味着它只会尝试使用之前下载的依赖项

`-s`，`--silent`

静默模式。不向命令行输出任何警告或错误

`--locked`

要求 Forc.lock 文件是最新的。如果锁文件丢失，或者需要更新，Forc 将退出并显示错误

`--no-deps`

不要为依赖项构建文档

`--ipfs-node`[< IPFS_节点>]

用于获取 IPFS 源的 IPFS 节点。

可能的值：PUBLIC、LOCAL、<GATEWAY_URL>

`-h`，`--help`

打印帮助（使用‘-h’查看摘要）

`-V`，`--version`

打印版本

示例：# 在当前路径 forc doc 中为项目构建文档

#在当前路径下构建项目文档，并在浏览器中打开 forc doc --open

#为位于另一个路径的项目构建文档 forc doc --manifest-path ../tests_project2

#为当前项目构建文档，导出私有类型 forc doc --document-private-items

#离线构建文档，无需从网络下载任何依赖项 forc doc --offline
