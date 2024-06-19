# 工作区

*工作区* 是一个或多个包的集合，即 *工作区成员*，它们一起进行管理。

工作空间的要点是：

* 单个包可用的常用 `forc`命令也可以用于工作区，如 `forc build` 或 `forc deploy`。
* 所有包共享一个 `Forc.lock` 位于工作区根目录中的公共文件。

工作区清单在文件中声明 `Forc.toml` 并支持以下字段：

* [`members`](#the-members-field) - 要包含在工作区中的包。
* [`[patch]`](#the-patch-section) - 定义补丁。

可以使用 `forc new --workspace` 或创建一个空的工作区 `forc init --workspace`。

##  `members` 字段

该 `members` 字段定义哪些包是工作区的成员：

```toml
[workspace]
members = ["member1", "path/to/member2"]
```

此 `members` 字段接受相对于工作区根目录的相对路径条目。位于工作区目录内但 *不包含* 在 `members` 集合中的包将被忽略。

##  `[patch]` 部分

此 `[patch]` 部分可用于覆盖工作区依赖关系图中的任何依赖关系。用法与包级别部分相同 `[patch]` ，详细信息可 [在此处](./manifest_reference.md#the-patch-section)查看。

如果工作区清单文件包含补丁表，则不允许在工作区成员中声明补丁表。

例子:

```toml
[workspace]
members = ["member1", "path/to/member2"]


[patch.'https://github.com/fuellabs/sway']
std = { git = "https://github.com/fuellabs/sway", branch = "test" }
```

在上面的例子中，每次在工作空间中出现 `std` 作为一个依赖项，都会用 `std` 从 sway repo的`test`'分支中更改。

## 一些 `forc` 支持工作空间的命令

* `forc build` - 构建整个工作区。
* `forc deploy` - 按照正确的顺序构建和部署工作区的所有可部署成员（即契约）。
* `forc run` - 构建并运行工作区的所有脚本。
* `forc check` - 检查工作区的所有成员。
* `forc update` - 检查并更新 `Forc.lock` 工作区成员之间共享的工作区级文件。
* `forc clean` - 清理工作区每个成员的所有输出工件。
* `forc fmt` -  格式化工作区的所有成员。
