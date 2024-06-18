# 依赖项

Forc 有一个依赖管理系统，可以使用 git 和 提取包 `ipfs`。这允许用户构建和共享 Forc 库。

## 添加依赖项

如果您 `Forc.toml` 还没有 `[dependencies]` 表格，请添加一个。下面列出软件包名称及其来源。目前，`forc` 支持 `git`和 `ipfs` 来源`path` 。

如果 `git` 指定了源， `forc` 将在给定的 URL 处获取 git 存储库，然后在 git 存储库内的任何位置搜索 `Forc.toml` 具有给定名称的包。

以下示例添加了一个名为 的库依赖项 `custom_lib`。 对于 git 依赖项，您可以选择指定`branch`, `tag`, 或 `rev` (即提交哈希) 引用。

```toml
[dependencies]
custom_lib = { git = "https://github.com/FuelLabs/custom_lib", branch = "master" }
# custom_lib = { git = "https://github.com/FuelLabs/custom_lib", tag = "v0.0.1" }
# custom_lib = { git = "https://github.com/FuelLabs/custom_lib", rev = "87f80bdf323e2d64e213895d0a639ad468f4deff" }
```

取决于使用本地库 `path`:

```toml
[dependencies]
custom_lib = { path = "../custom_lib" }
```

对于 `ipfs` 源， `forc` 将使用本地 `ipfs`'节点或公共网关获取指定的`cid` 。 `forc` 自动尝试连接到本地 `ipfs` 节点。如果失败，它默认使用 `https://ipfs.io/` 作为网关。

以下示例添加了与`ipfs` 源的依赖关系。

```toml
[dependencies]
custom_lib = { ipfs = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG" }
```

一旦添加了包，运行 `forc build` 就会自动下载添加的依赖项。

## 更新依赖项

要更新 Forc 目录中的依赖项，您可以运行 `forc update`。对于 `path` 和 `ipfs` 依赖项，这不会产生任何效果。对于 `git` 具有引用的依赖项 `branch` ，这将更新项目以使用给定分支的最新提交。
