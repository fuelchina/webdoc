# 存储

开发[智能合约](../sway-program-types/smart_contracts)时,你通常需要某种持久存储。在这种情况下,持久存储（在本文中通常简称为存储）是您可以存储在合约本身内部持久保存的值的地方。这与内存中的常规值形成对比,后者在合约退出后消失。

用传统的编程术语来说,合约存储就像将数据保存到硬盘上。即使保存数据的程序退出后,该数据也会被保存。该数据是持久的。使用内存就像在程序中声明一个变量：它在程序运行期间存在并且是非持久性的。

存储的一些基本用例包括声明合约的所有者地址以及在钱包中保存余额。

## 通过 `storage` 关键字进行存储访问

在存储中声明变量需要一个 `storage` 声明,其中包含所有变量、它们的类型和它们的初始值的列表,如下所示:

```sway
struct Type1 {
    x: u64,
    y: u64,
}

struct Type2 {
    w: b256,
    z: bool,
}

storage {
    var1: Type1 = Type1 { x: 0, y: 0 },
    var2: Type2 = Type2 {
        w: 0x0000000000000000000000000000000000000000000000000000000000000000,
        z: false,
    },
}


```

要写入存储变量,需要使用关键字, `storage` 如下所示:

```sway
    #[storage(write)]
    fn store_something() {
        storage.var1.x.write(42);
        storage.var1.y.write(77);
        storage
            .var2
            .w
            .write(0x1111111111111111111111111111111111111111111111111111111111111111);
        storage.var2.z.write(true);
    }

```

要读取存储变量，还需要使用关键字， `storage` 如下所示：


```sway
    #[storage(read)]
    fn get_something() -> (u64, u64, b256, bool) {
        (
            storage.var1.x.try_read().unwrap_or(0),
            storage.var1.y.try_read().unwrap_or(0),
            storage.var2.w.try_read().unwrap_or(0x0000000000000000000000000000000000000000000000000000000000000000),
            storage.var2.z.try_read().unwrap_or(false),
        )
    }

```

## 存储映射

标准库中提供了通用存储映射， `StorageMap<K, V>` 它们必须在storage块内定义，并允许您在特定键处调用 `insert()` 和 `get()` 插入值并分别获取这些值。有关 的更多信息，请参阅[存储映射](../common-collections/storage_map) `StorageMap<K, V>`。

## 手动存储管理

可以使用标准库中提供的 `std::storage::storage_api::write` 和函数直接利用 FuelVM 存储操作。 `std::storage::storage_api::read` 使用这种方法，您将必须手动分配用于存储的内部密钥。示例如下：

```sway
contract;

use std::storage::storage_api::{read, write};

abi StorageExample {
    #[storage(write)]
    fn store_something(amount: u64);

    #[storage(read)]
    fn get_something() -> u64;
}

const STORAGE_KEY: b256 = 0x0000000000000000000000000000000000000000000000000000000000000000;

impl StorageExample for Contract {
    #[storage(write)]
    fn store_something(amount: u64) {
        write(STORAGE_KEY, 0, amount);
    }

    #[storage(read)]
    fn get_something() -> u64 {
        let value: Option<u64> = read::<u64>(STORAGE_KEY, 0);
        value.unwrap_or(0)
    }
}

```

> **注意**: 虽然这些函数可以用于任何数据类型，但它们应该主要用于数组，因为在 `storage` 块中还不支持数组。但是请注意，所有数据类型可以用作 `StorageMap<K, V>` 中的键和/或值的类型，没有任何限制。
