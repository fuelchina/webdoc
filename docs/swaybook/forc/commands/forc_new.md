# forc new
在以下位置创建新的 Forc 项目`<path>`

# 用法：
forc new [选项]

# 参数：
<路径>

将创建项目目录的路径

# 选项：
`--contract`

默认程序类型。排除所有标志或添加此标志可创建一个基本合约程序

`-h`，`--help`

打印帮助信息

`-L`，`--log-level`<日志级别>

设置日志级别

`--library`

添加此标志将创建一个空的库程序

`--name<名称>`

设置包名称。默认为目录名称

`--predicate`

添加此标志将创建一个空的谓词程序

`-s`，`--silent`

使所有输出静音

`--script`

添加此标志将创建一个空的脚本程序

`-v`，`--verbose`

使用详细输出

`--workspace`

添加此标志将创建一个空的工作区

# 例子
```sway
$ forc new my-fuel-project
$ cd my-fuel-project
$ tree
.
├── Forc.toml
└── src
    └── main.sw

```
`Forc.toml`是 Forc 清单文件，包含有关项目和依赖项的信息。

`src/`创建一个目录，`main.sw`其中包含一个 Sway 文件。

