# 强制初始化
在现有目录中创建一个新的 Forc 项目

# 用法：
forc init [选项]

# 选项：
`--contract`

默认程序类型，排除所有标志或添加此标志将创建一个基本合约程序

`-h`，`--help`

打印帮助信息

`-L`，`--log-level`<日志级别>

设置日志级别

`--library`

创建一个带有库目标的包（src/lib.sw）

`--name<名称>`

设置包名称。默认为目录名称

`--path<路径>`

forc 项目将在其中初始化的目录

`--predicate`

创建一个带有谓词目标的包（src/predicate.rs）

`-s`，`--silent`

使所有输出静音

`--script`

创建一个带有脚本目标的包（src/main.sw）

`-v`，`--verbose`

使用详细输出

`--workspace`

添加此标志将创建一个空的工作区

# 例子
```sway
$ mkdir my-fuel-project
$ cd my-fuel-project
$ forc init
$ tree
.
├── Forc.toml
└── src
    └── main.sw

```
`Forc.toml`是 Forc 清单文件，包含有关项目和依赖项的信息。

`src/`创建一个目录，`main.sw`其中包含一个 Sway 文件。
