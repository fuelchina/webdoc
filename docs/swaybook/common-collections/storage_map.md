# 存储映射

另一个重要的公共集合是存储图。

<!-- This section should explain storage maps in Sway -->
<!-- storage_map:example:start -->
标准库中的类型 `StorageMap<K, V>`”使用哈希函数存储类型为 `K` 的键到类型为 `V` 的值的映射，该函数决定如何将这些键和值放入 _存储槽_中。这类似于 [Rust的`HashMap<K, V>`](https://doc.rust-lang.org/std/collections/struct.HashMap.html) 但有一些区别。

当您不想使用索引（如使用向量）而是使用任意类型的键来查找数据时，存储映射非常有用。例如，在构建基于账本的子货币智能合约时，您可以在存储映射中跟踪每个钱包的余额，其中每个键都是钱包的，`Address`值是每个钱包的余额。给定一个`Address`，您可以检索其余额。
与 类似`StorageVec<T>`, `StorageMap<K, V>` 只能在合约中使用，因为只有合约才被允许访问持久存储。

`StorageMap<T>` 包含在 [标准库前奏](../introduction/standard_library.md#standard-library-prelude) 中，这意味着无需手动导入它。
<!-- storage_map:example:end -->

## 创建新的空存储映射

要创建一个新的空存储映射，我们必须在一个`storage`块中声明该映射，如下所示：
```sway
    map: StorageMap<Address, u64> = StorageMap::<Address, u64> {},
```

<!-- This section should explain how to implement storage maps in Sway -->
<!-- use_storage_maps:example:start -->
就像任何其他存储变量一样，声明时需要两个东西`StorageMap`：类型注释和初始化器。初始化器只是一个空类型的结构体，`StorageMap`因为`StorageMap<K, V>`它本身就是一个空结构体！所有有趣的东西都`StorageMap<K, V>`在其方法中实现。

存储映射，就像 `Vec<T>` 和 `StorageVec<T>`, 一样，是使用泛型实现的，这意味着标准库提供的 `StorageMap<K, V>` 类型可以将任何类型 `K` 的键映射到任何类型 `V`的值。在上面的例子中，我们告诉Sway编译器`map`中的 `StorageMap<K, V>`  将把 `Address`类型的键映射到 `u64`类型的值。
<!-- use_storage_maps:example:end -->

## 更新存储映射

<!-- This section should explain how to update storage maps in Sway -->
<!-- update_storage_maps:example:start -->
要将键值对插入存储映射，我们可以使用此`insert`方法。
<!-- update_storage_maps:example:end -->

例如:
```sway
    #[storage(write)]
    fn insert_into_storage_map() {
        let addr1 = Address::from(0x0101010101010101010101010101010101010101010101010101010101010101);
        let addr2 = Address::from(0x0202020202020202020202020202020202020202020202020202020202020202);

        storage.map.insert(addr1, 42);
        storage.map.insert(addr2, 77);
    }
```

这里要注意两个细节。首先，为了使用 `insert`, 我们需要先使用关键字访问存储映射 `storage` 。其次，由于 `insert` 需要 _写入_ 存储，因此  `#[storage(write)]` 需要在调用 的 ABI 函数上进行注释 `insert`。

> **注意**
> 对于合同中定义的任何尝试插入到映射中的私有函数，也需要存储注释。

<!-- markdownlint-disable-line MD028 -->
> **注意**
>  `mut` 声明时 无需添加关键字`StorageMap<K, V>`。所有存储变量默认都是可变的。

## 访问存储映射中的值

<!-- This section should explain how to access storage map values in Sway -->
<!-- access_storage_maps:example:start -->
`key`我们可以通过将其提供给方法从存储图中获取一个值`get`。
<!-- access_storage_maps:example:end -->

例如：


```sway
    #[storage(read, write)]
    fn get_from_storage_map() {
        let addr1 = Address::from(0x0101010101010101010101010101010101010101010101010101010101010101);
        let addr2 = Address::from(0x0202020202020202020202020202020202020202020202020202020202020202);

        storage.map.insert(addr1, 42);
        storage.map.insert(addr2, 77);

        let value1 = storage.map.get(addr1).try_read().unwrap_or(0);
    }
```

这里， `value1` w将具有与第一个地址相关联的值，结果将是 `42`。 `get` '方法返回一个 `Option<V>`; 如果那个键在存储映射中没有值， `get`将返回 `None`。这个程序通过调用 `unwrap_or`来处理`Option` ，如果 `map`没有键的条目，则将`value1`设置为零。

## 具有多个键的映射

可以使用元组作为键来实现具有多个键的映射。例如：
```sway
    map_two_keys: StorageMap<(b256, bool), b256> = StorageMap::<(b256, bool), b256> {},
```

## 嵌套存储映射

可以按如下方式嵌套存储映射：
```sway
    nested_map: StorageMap<u64, StorageMap<u64, u64>> = StorageMap::<u64, StorageMap<u64, u64>> {},
```

然后可以按如下方式访问嵌套映射：
```sway
    #[storage(read, write)]
    fn access_nested_map() {
        storage.nested_map.get(0).insert(1, 42);
        storage.nested_map.get(2).insert(3, 24);

        assert(storage.nested_map.get(0).get(1).read() == 42);
        assert(storage.nested_map.get(0).get(0).try_read().is_none()); // Nothing inserted here
        assert(storage.nested_map.get(2).get(3).read() == 24);
        assert(storage.nested_map.get(2).get(2).try_read().is_none()); // Nothing inserted here
    }
```
