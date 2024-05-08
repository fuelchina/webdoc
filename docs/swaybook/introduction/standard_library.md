
# 标准库

与 Rust 类似，Sway 自带其自己的标准库。

Sway 标准库是可移植的 Sway 软件的基础，是广泛的 Sway 生态系统的一组最小共享抽象。它提供了核心类型，如 `Result<T, E>` 和 `Option<T>`，以及对语言原语的库定义操作、本地资产管理、区块链上下文操作、访问控制、存储管理以及对其他 VM 类型的支持等功能。

整个 Sway 标准库是一个名为 `std` 的 Forc 项目，可以直接在 [此处](https://github.com/FuelLabs/sway/tree/master/sway-lib-std) 获取。如果最新的 `master` 版本不兼容，请导航至相应的标记版本。您可以在 [此处](https://fuellabs.github.io/sway/master/std/) 找到最新的 `std` 文档。

## 使用标准库

标准库对于使用 [`forc new`](../forc/commands/forc_new.md) 创建的所有 Forc 项目都是隐式可用的。换句话说，不需要手动指定 `std` 作为显式依赖项。Forc 将自动使用与其版本匹配的 `std` 版本。

可以使用 `use` 关键字从标准库中导入项目，就像从任何 Sway 项目中导入项目一样。例如：

```rust
use std::storage::storage_vec::*;
```

这将 `StorageVec` 类型导入到当前命名空间中。

## 标准库预导入

Sway 标准库包含各种内容。但是，如果您必须手动导入您使用的每个东西，那会非常冗长。但是，导入程序从未使用过的许多东西也不是好的做法。需要找到一个平衡。

预导入是 Sway 自动导入到每个 Sway 程序中的内容列表。它尽可能保持小巧，并专注于几乎每个 Sway 程序都使用的内容。

当前版本的预导入位于 [`std::prelude`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/prelude.sw)，并重新导出以下内容：

- [`std::address::Address`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/address.sw)：围绕 `b256` 类型表示钱包地址的包装器。
- [`std::contract_id::ContractId`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/contract_id.sw)：围绕 `b256` 类型表示合同 ID 的包装器。
- [`std::identity::Identity`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/identity.sw)：具有两个可能变体的枚举类型：`Address: Address` 和 `ContractId: ContractId`。
- [`std::vec::Vec`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/vec.sw)：可增长、堆分配的向量。
- [`std::storage::storage_key::*`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/storage/storage_key.sw)：包含访问描述存储中位置的 `core::storage::StorageKey` 的 API。
- [`std::storage::storage_map::*`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/storage/storage_map.sw)：合同存储中的键值映射。
- [`std::option::Option`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/option.sw)：表示值的存在或不存在的枚举类型。
- [`std::result::Result`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/result.sw)：可能成功或失败的函数的枚举类型。
- [`std::assert::assert`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/assert.sw)：如果向其提供的条件为 `false`，则使 VM 回滚的函数。
- [`std::assert::assert_eq`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/assert.sw)：如果条件 `v1 == v2` 为 `false`，则使 VM 回滚并记录其两个输入 `v1` 和 `v2` 的函数。
- [`std::assert::assert_ne`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/assert.sw)：如果条件 `v1 != v2` 为 `false`，则使 VM 回滚并记录其两个输入 `v1` 和 `v2

` 的函数。
- [`std::revert::require`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/revert.sw)：如果向其提供的条件为 `false`，则使 VM 回滚并记录给定值的函数。
- [`std::revert::revert`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/revert.sw)：使 VM 回滚的函数。
- [`std::logging::log`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/logging.sw)：记录任意堆栈类型的函数。
- [`std::auth::msg_sender`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/auth.sw)：获取调用者 `Identity` 的函数。

