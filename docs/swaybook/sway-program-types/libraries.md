# 库

<!-- This section should explain what a library is -->
<!-- library:example:start -->
在Sway中，库是用于定义新的常见行为的文件。
<!-- library:example:end -->

最突出的例子是[Sway 标准库](../introduction/standard_library.md) 它对于使用 `forc new` 创建的所有 Forc 项目都是隐式可用的。

## 编写库

<!-- This section should explain how libraries are defined -->
<!-- def_lib:example:start -->
在文件的开头使用 `library` 关键字来定义库, 后跟一个名称，以便它们可以被导入。
<!-- def_lib:example:end -->

```sway
library;

// library code
```

学习库设计时可参考的一个不错的库是 [Sway 标准库](../introduction/standard_library.md)。 例如, 标准库提供了一个`enum Option<T>`的[实现](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/option.sw)  这是一种通用类型，使用变体`Some(..)`表示值的存在或使用变体`None`表示值的不存在。 [实现`Option<T>`的Sway文件](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/option.sw) 具有以下结构：

- `library` 关键字:

```sway
library;
```

- 一个从标准库内部的另一个库导入 `revert` 的 `use` 语句:

```sway
use ::revert::revert;
```

- `enum` 定义, 以关键字 `pub` 开头，表明 `Option<T>` 在 `option` 库外是公开可用的:

```sway
pub enum Option<T> {
    // variants
}
```

- 一个为`Option<T>`实现了一些方法的 `impl` 块:

```sway
impl<T> Option<T> {

    fn is_some(self) -> bool {
        // is_some 主体
    }

    // 其他方法
}
```

现在`option`已经编写好了, 并且由于`Option<T>` 是使用 `pub` 关键字定义的,因此我们现在能从任何Sway项目中导入`Option<T>` 使用 `use std::option::Option;` 从任何 Sway 项目中导入，并可以访问其所有变体和方法。也就是说， `Option`在[标准库](../introduction/standard_library.md#standard-library-prelude)中自动可用，所以你实际上不必手动引入它.

库仅由一个 `Forc.toml` 文件 和一个`src`目录组成, 与合约不同，合约通常还包含一个`tests` 目录和一个 `Cargo.toml`文件。 库的`Forc.toml`示例如下:

```toml
[project]
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "lib.sw"
license = "Apache-2.0"
name = "my_library"

[dependencies]
```

这表示作者、一个入口文件、它可以被导入的名称以及任何依赖项。

对于大型库，建议有一个`lib.sw`入口点来重新导出所有其他的子库。

<!-- This section should explain the `mod` keyword -->
<!-- mod:example:start -->
`mod` 关键字注册子模块，使其项目（如functions和structs）可从父级库访问。
如果在顶层使用，将引用到 src 文件夹中的文件，在其他情况下，则是引用以库命名的文件夹下的文件
<!-- mod:example:end -->

例如，标准库的 lib.sw 看起来像这样：

```sway
library;

mod block;
mod storage;
mod constants;
mod vm;
// .. 其他依赖
```

其他库包含在 src 文件夹中，如 vm 库（在 src/vm.sw 中）：

```sway
library;

mod evm;
// ...
```

及其自己的子库 evm 位于 src/vm/evm.sw 中：

```sway
library;

// ...
```

## 使用库

有两种基于其位置和如何导入的 Sway 库类型。

### 内部库

内部库位于项目的 `src` 目录中与 `main.sw` 一起或在适当的文件夹中，如下所示：

```bash
$ tree
.
├── Cargo.toml
├── Forc.toml
└── src
    ├── internal_lib.sw
    ├── main.sw
    └── internal_lib
        └── nested_lib.sw
```

由于 `internal_lib` 是一个内部库，它可以像以下方式导入到 `main.sw` 中：

- 使用 `mod` 关键字后跟库的名称，使内部库成为依赖项。
- 使用带有 `::` 分隔库名和导入项的 `use` 关键字

```sway
mod internal_lib; // 假设 `internal_lib.sw` 中的库名是 `internal_lib`

use internal_lib::mint;

// `internal_library` 中的 `mint` 现在在这个文件中可用

```


### 外部库

外部库位于主 src 目录之外，如下所示：

```bash
$ tree
.
├── my_project
│   ├── Cargo.toml
│   ├── Forc.toml
│   └─── src
│       └── main.sw
│
└── external_lib
    ├── Cargo.toml
    ├── Forc.toml
    └─── src
        └── lib.sw
```

由于 `external_lib` 位于 `my_project` 的 `src` 目录之外，在导入之前，需要将库路径添加到 `my_project` 的 `Forc.toml` 文件的 `dependencies` 部分中作为依赖项：

```toml
[dependencies]
external_library = { path = "../external_library" }
```

一旦将库依赖项添加到 `toml` 文件中，就可以像以下这样从其中导入项目：

- 确保要导入的项目使用 `pub` 关键字声明（如果适用，例如：`pub fn mint() {}`）。
- 使用 `use` 关键字有选择地从库中导入项目。

```sway
use external_library::mint;

// `external_library` 中的 `mint` 现在在这个文件中可用
```

使用 * 的通配符导入是可行的，但通常建议尽可能使用明确的导入。

> **注意**: 标准库对于所有 `Forc` 项目是隐式可用的，也就是说，你不需要在 `Forc.toml` 中手动将 `std` 指定为显式的依赖项。

## 参考 Sway 库

这个仓库 [`sway-libs`](https://github.com/FuelLabs/sway-libs/) 是一些外部库的集合，你可以在你的 Fuel 应用中导入并使用。 这些库旨在实现对 dapp 开发有价值的常见用例。

一些值得尝试的 Sway 库：

- [Binary Merkle Proof](https://github.com/FuelLabs/sway-libs/tree/master/libs/src/merkle)
- [Signed Integers](https://github.com/FuelLabs/sway-libs/tree/master/libs/src/signed_integers)
- [Unsigned Fixed Point Number](https://github.com/FuelLabs/sway-libs/tree/master/libs/src/fixed_point)
- [Ownership](https://github.com/FuelLabs/sway-libs/tree/master/libs/src/ownership)

### 示例

你可以像导入和使用其他任何外部库一样，导入并使用一个`Sway`库，比如[Ownership](https://github.com/FuelLabs/sway-libs/tree/master/libs/src/ownership)库

```sway
use ownership::Ownership;
```

导入后，你可以在智能合约中使用该库的以下基本功能：

- 声明所有者
- 更改所有权
- 放弃所有权
- 确保只有所有者才能调用某个函数