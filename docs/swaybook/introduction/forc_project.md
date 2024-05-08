```markdown
# Forc 项目

要使用 Forc 初始化一个新项目，请使用 `forc new` 命令：

```sh
forc new my-fuel-project
```

以下是 Forc 初始化的项目：

<!-- This section should show the tree for a new forc project -->
<!-- tree:example:start -->
```console
$ cd my-fuel-project
$ tree .
├── Forc.toml
└── src
    └── main.sw
```
<!-- tree:example:end -->

<!-- This section should explain the `Forc.toml` file -->
<!-- forc_toml:example:start -->
`Forc.toml` 是 _清单文件_（类似于 Cargo 的 `Cargo.toml` 或 Node 的 `package.json`），定义了项目的元数据，如项目名称和依赖关系。
<!-- forc_toml:example:end -->

有关依赖关系管理的附加信息，请参阅：[这里](../forc/dependencies.md)。

```toml
[project]
authors = ["User"]
entry = "main.sw"
license = "Apache-2.0"
name = "my-fuel-project"

[dependencies]
```

以下是项目中唯一的 Sway 文件和主入口点 `src/main.sw` 的内容：

```sway
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

该项目是一个 _合约_，是四种不同项目类型之一。有关不同项目类型的附加信息，请参阅[这里](../sway-program-types/index.md)。

我们现在使用 `forc build` 编译项目，并传递 `--finalized-asm` 标志以查看生成的汇编代码：

```console
$ forc build --finalized-asm
...
.program:
ji   i4
noop
DATA_SECTION_OFFSET[0..32]
DATA_SECTION_OFFSET[32..64]
lw   $ds $is 1
add  $$ds $$ds $is
lw   $r0 $fp i73              ; 加载输入函数选择器
lw   $r1 data_0               ; 加载fn选择器进行比较
eq   $r2 $r0 $r1              ; 函数选择器比较
jnzi $r2 i12                  ; 跳转到所选函数
movi $$tmp i123               ; 不匹配选择器的特殊代码
rvrt $$tmp                    ; 如果没有匹配的选择器，则恢复
ret  $one
.data:
data_0 .word 559005003

  编译合约 "my-fuel-project"。
  字节码大小为 60 字节。
```