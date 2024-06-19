# 清单参考

 `Forc.toml` (the _清单_ 文件) 是每个包的必备文件，采用 [TOML] 格式编写。 `Forc.toml` 由以下字段组成：

* [`[project]`](#the-project-section) — 定义一个 sway 项目。
  * `name` —  项目的名称。
  * `authors` — 该项目的作者。
  * `organization` — 项目的组织。
  * `license`—  项目许可证。
  * `entry` —  编译器开始解析的入口点。
    * 有关选择大型图书馆入口点的推荐方法，请参阅： [图书馆](./../sway-program-types/libraries)
  * `implicit-std` -  控制是否隐式添加提供的`std` 版本 (带有当前' `forc` 版本) 作为依赖项。 _除非您知道自己在做什么，否则请将其保留为默认值。_
  * `forc-version` - 本项目正常运行所需的最低 forc 版本。


* [`[dependencies]`](#the-dependencies-section) — 定义依赖关系。
* `[network]` — 定义一个与 forc 交互的网络。
  * `url` — 网络的 URL。


* [`[build-profile]`](#the-build-profile-section) - 定义构建配置文件。

* [`[patch]`](#the-patch-section) - 定义补丁。

* [`[contract-dependencies]`](#the-contract-dependencies-section) - 定义合同依赖关系。

## 这 `[project]` 部分

 `Forc.toml` 下面是一个示例。 `[project]` 以下字段是可选的：

* `authors`
* `organization`

此外，对于以下字段，提供了默认值，因此允许省略它们：
* `entry` - (默认 : `main.sw` )
* `implicit-std` - (默认 : `true` )

```toml
[project]
authors = ["user"]
entry = "main.sw"
organization = "Fuel_Labs"
license = "Apache-2.0"
name = "wallet_contract"
```

## 这 `[dependencies]` 部分

可以为以下字段提供依赖关系：


* `version` - 所需的依赖版本
* `path` - 依赖项的路径（如果是本地的）
* `git` - 托管依赖项的 git repo 的 URL
* `branch` - 需要从 git repo 中获取的分支
* `tag` - 需要从 git repo 中获取的标签
* `rev` - 所需的修订版本（即提交哈希）参考

请参阅 [依赖项](./dependencies) 了解详细信息

## 这`[network]` 部分

对于以下字段，提供了默认值，因此允许省略它们：
* `URL` - (默认值: _<http://127.0.0.1:4000>_)

## 这 `[build-profile.*]` 部分

这些 `[build-profile]` 表提供了一种自定义编译器设置（例如调试选项）的方法。

可以为构建配置文件提供以下字段：
* `print-ast` -  是否打印出生成的 AST，默认为 false。
* `print-dca-graph` - 是否打印出计算出的死代码分析（DCA）图（GraphViz DOT 格式），默认为 false。
* `print-dca-graph-url-format` -  生成的 DOT 文件中使用的 URL 格式，VS Code 的一个示例为： `vscode://file/{path}:{line}:{col}`.
* `print-ir` - 是否编译为字节码（false）或打印出生成的 IR（true），默认为 false。
* `print-finalized-asm` - 是否编译为字节码（false）或打印出生成的 ASM（true），默认为 false。
* `print-intermediate-asm` - 是否编译为字节码（false）或打印出生成的 ASM（true），默认为 false。
* `terse` -  简洁模式。有限的警告和错误输出，默认为 false。
* `time_phases` - 是否输出编译过程各部分所用的时间，默认为false。
* `include_tests` -  是否在解析、类型检查和代码生成中包含测试函数。通过调用 `forc test`将其设置为true，但默认为false。
* `json_abi_with_callpaths` -  是否生成 JSON ABI 而 `callpaths` 不是结构和枚举的名称，默认为 false。此选项可以通过使用完整路径而不是名称来帮助防止结构或枚举定义发生冲突。
* `error_on_warnings` - 是否将错误视为警告，默认为 false。

 `[build-profile]` 每个清单文件都有两个默认可用配置文件。它们是 `debug` 和 `release` 配置文件。如果您想要覆盖这些配置文件，您可以在清单文件中明确提供它们，如以下示例所示：

```toml
[project]
authors = ["user"]
entry = "main.sw"
organization = "Fuel_Labs"
license = "Apache-2.0"
name = "wallet_contract"

[build-profile.debug]
print-finalized-asm = false
print-intermediate-asm = false
print-ir = false
terse = false

[build-profile.release]
print-finalized-asm = false 
print-intermediate-asm = false
print-ir = false
terse = true
```

由于 `release` 和 `debug` 隐式包含在每个清单文件中，因此您可以通过传递 `--release` 或不传递任何内容来使用它们（默认为调试）。对于使用用户定义的构建配置文件， `--build-profile <profile name>` 相关命令有可用的选项。 (有关示例，请参阅 [forc-build](../forc/commands/forc_build))

请注意，提供相应的 CLI 选项 (如 `--finalized-asm`) 将覆盖所选的构建配置文件。例如，如果您同时传递 `--release` 和 `--finalized-asm`, 则将省略发布构建配置文件，并且生成的构建配置文件将具有如下结构：

```toml
print-ast = false
print-ir = false
print-finalized-asm = false
print-intermediate-asm = false
terse = false
time-phases = false
include-tests = false
json-abi-with-callpaths = false
error-on-warnings = false
experimental-private-modules = false
```

## 这 `[patch]` 部分

 [patch] 部分 `Forc.toml` 可用于使用其他副本覆盖依赖项。下面提供的示例 `https://github.com/fuellabs/sway` 使用 `test` 同一 repo 的分支进行修补。

```toml
[project]
authors = ["user"]
entry = "main.sw"
organization = "Fuel_Labs"
license = "Apache-2.0"
name = "wallet_contract"

[dependencies]

[patch.'https://github.com/fuellabs/sway']
std = { git = "https://github.com/fuellabs/sway", branch = "test" }
```

在上面的例子中, `std` 使用 `test` 来自 `std` repo的分支进行修补。您还可以使用路径定义的依赖项来修补 git 依赖项。

```toml
[patch.'https://github.com/fuellabs/sway']
std = { path = "/path/to/local_std_version" }
```

就像 `std` 或 `core` 一样，你也可以用git repo来修补你声明的依赖项。

```toml
[project]
authors = ["user"]
entry = "main.sw"
organization = "Fuel_Labs"
license = "Apache-2.0"
name = "wallet_contract"

[dependencies]
foo = { git = "https://github.com/foo/foo", branch = "master" }

[patch.'https://github.com/foo']
foo = { git = "https://github.com/foo/foo", branch = "test" }
```

请注意，后面的每个键 `[patch]` 都是正在修补的源的 URL。

## 这 `[contract-dependencies]` 部分

该 `[contract-dependencies]` 表可用于声明 Sway 合约或脚本的合约依赖关系。合约依赖关系是我们的合约或脚本可能与之交互的合约集。声明后，您 `[contract-dependencies]`可以更轻松地在 Sway 源代码中引用合约，而无需在每次部署新版本时手动更新 ID。相反，我们可以使用 forc 来固定和更新合约依赖关系，就像我们对常规库依赖关系所做的那样。

在 下声明的合约的 `[contract-dependencies]` 构建和固定与常规合约一样 `[dependencies]` ，但是我们不是导入每个合约依赖项的整个公共命名空间，而是将其各自的合约 ID 作为 `CONTRACT_ID`常量导入，这些常量可通过每个合约依赖项的命名空间根获得。这意味着您可以使用合约依赖项的 ID，就像在合约依赖项 `pub const` 包的根目录中声明为 一样，如下例所示。

下的条目 `[contract-dependencies]` 可以像 `[dependencies]` 声明一样声明。 也就是说，它们可以引用另一个合约的 `path` 或 `git` 源。请注意，`[contract-dependencies]` 下的条目必须指向合同，否则会产生错误。

例子 `Forc.toml`:

```toml
[project]
authors = ["user"]
entry = "main.sw"
organization = "Fuel_Labs"
license = "Apache-2.0"
name = "wallet_contract"

[contract-dependencies]
foo = { path = "../foo" }
```

使用示例:

```sway
script;

fn main() {
  let foo_id = foo::CONTRACT_ID;
}
```

由于合约的 ID 是确定性计算的，因此重建相同的合约将始终产生相同的合约 ID。由于两个具有相同合约 ID 的合约无法部署在区块链上，因此需要一个“盐”因子来修改合约 ID。对于 下声明的每个合约依赖项 `[contract-dependencies]`, `salt` 都可以指定。下面显示了一个示例：

```toml
[contract-dependencies]
foo = { path = "../foo", salt = "0x1000000000000000000000000000000000000000000000000000000000000000" }
```

对于没有为 `salt`指定任何值的合约依赖， `salt` 默认为全零。
