# 存储向量

我们将要研究的第二种集合类型是 `StorageVec<T>`。就像堆上的向量 (即 `Vec<T>`), 一样，存储向量允许您在单个数据结构中存储多个值，其中每个值都分配有一个索引，并且只能存储相同类型的值。但是，与不同的是 `Vec<T>`,的元素 `StorageVec` 存储在 _持久存储_中，并且连续的元素不一定存储在具有连续键的存储槽中。

为了使用 `StorageVec<T>`, 您必须首先导入`StorageVec` 如下内容:

```sway
use std::storage::storage_vec::*;
```

 `Vec<T>` 和之间的另一个主要区别 `StorageVec<T>` 是 `StorageVec<T>` 只能在合同中使用，因为只有合同才被允许访问持久存储。

## 创建新的StorageVec

要创建一个新的空的`StorageVec` ，我们必须在一个 `storage` 块中声明该向量，如下所示：

```sway
    v: StorageVec<u64> = StorageVec {},
```

就像任何其他存储变量一样，声明时需要两个东西 `StorageVec`: 类型注释和初始化器。初始化器只是一个空类型的结构体， `StorageVec` 因为 `StorageVec<T>` 它本身就是一个空结构体！所有有趣的东西都 `StorageVec<T>` 在其方法中实现。

存储向量与 一样 `Vec<T>`, 都是使用泛型实现的，这意味着 `StorageVec<T>` 标准库提供的类型可以容纳任何类型。当我们创建一个`StorageVec` 来容纳特定类型时，我们可以在尖括号内指定类型。在上面的例子中，我们告诉 Sway 编译器， `StorageVec<T>` 将 `v`容纳该 `u64` 类型的元素。

## 更新 Storage Vector

要向 a 添加元素`StorageVec`，我们可以使用 `push` 方法，如下所示：

```sway
    #[storage(read, write)]
    fn push_to_storage_vec() {
        storage.v.push(5);
        storage.v.push(6);
        storage.v.push(7);
        storage.v.push(8);
    }
```

请注意这里的两个细节。首先，为了使用 `push`, 我们需要先使用关键字访问向量 `storage` 其次，由于 `push` 需要访问存储， `storage` 因此需要在调用的 ABI 函数上进行注释 `push`。虽然这里似乎应该 `#[storage(write)]` 足够了，但 `read` 注释也是必需的，因为每次调用都 `push` 需要 _读取_ (然后更新) 的长度，`StorageVec` 而它也存储在持久存储中。

> **注意**
> 对于合同中定义的任何尝试推送到向量的私有函数，也需要存储注释。
<!-- markdownlint-disable-line MD028 -->
> **注意**
> `mut` 声明时 无需添加关键字`StorageVec<T>`。所有存储变量默认都是可变的。

## 读取存储向量的元素

要读取存储在向量中特定索引的值，可以使用 `get` 如下所示的方法：

```sway
    #[storage(read)]
    fn read_from_storage_vec() {
        let third = storage.v.get(2);
        match third {
            Some(third) => log(third.read()),
            None => revert(42),
        }
    }
```

请注意这里的三个细节。首先，我们使用的索引值 `2` 来获取第三个元素，因为向量是按数字索引的，从零开始。其次，我们使用将索引 `get` 作为参数传递的方法来获取第三个元素，这给了我们一个 `Option<T>`。第三，ABI 函数调用 `get` 只需要注释， `#[storage(read)]` 正如人们所料，因为 `get` 不会写入存储。

当 `get` 方法传递一个向量之外的索引时，它会返回 `None` 而不会崩溃。如果在正常情况下偶尔会访问向量范围之外的元素，这尤其有用。然后，您的代码将具有处理 或 `Some(element)` 的逻辑 `None`。例如，索引可以作为契约方法参数。如果传递的参数太大，则该方法 `get` 将返回一个 `None` 值，然后契约方法可能会决定在发生这种情况时恢复或返回一个有意义的错误，告诉用户当前向量中有多少个项目并让他们有另一次机会传递有效值。

## 迭代向量中的值

为了依次访问向量中的每个元素，我们将使用循环 `while` 和 `len` 方法遍历所有有效索引，如下所示：

```sway
    #[storage(read)]
    fn iterate_over_a_storage_vec() {
        let mut i = 0;
        while i < storage.v.len() {
            log(storage.v.get(i).unwrap().read());
            i += 1;
        }
    }
```

同样，这与迭代元素非常相似，`Vec<T>` 我们使用方法 `len` 返回向量的长度。我们还调用方法 `unwrap` 来提取 `Option` 返回的， `get` 然后调用来`read()`实际读取存储的值。我们知道 `unwrap` 不会失败（即不会导致恢复）因为已知 `i` 传递给的每个索引 `get` 都小于向量的长度。

## 使用枚举存储多种类型

存储向量与 一样 `Vec<T>`, 只能存储相同类型的值。与我们在[使用枚举存储多种类型](./vec.md#using-an-enum-to-store-multiple-types) `Vec<T>` 一节中所做的类似，我们可以定义一个枚举，其变体将保存不同的值类型，并且所有枚举变体都将被视为同一类型：枚举的类型。如下所示：

```sway
enum TableCell {
    Int: u64,
    B256: b256,
    Boolean: bool,
}
```

然后我们可以`StorageVec`在一个`storage` 块中声明一个来保存该枚举，因此最终保存不同的类型：

```sway
    row: StorageVec<TableCell> = StorageVec {},
```

我们现在可以将不同的枚举变体推送到`StorageVec`如下位置：
```sway
    #[storage(read, write)]
    fn push_to_multiple_types_storage_vec() {
        storage.row.push(TableCell::Int(3));
        storage
            .row
            .push(TableCell::B256(0x0101010101010101010101010101010101010101010101010101010101010101));
        storage.row.push(TableCell::Boolean(true));
    }
```

现在我们已经讨论了一些最常见的使用存储向量的方法，请务必查看`StorageVec<T>`标准库中定义的所有有用方法的 API 文档。目前，这些方法可以在的[源代码 `StorageVec<T>`](https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/storage.sw)中找到。例如，除了 `push`, 还有一个 `pop` 方法删除并返回最后一个元素，一个`remove`方法删除并返回向量中某个选定索引处的元素，一个 `insert` 方法在向量中某个选定索引处插入一个元素，等等。

## 嵌套存储向量

可以按如下方式嵌套存储向量：
```sway
    nested_vec: StorageVec<StorageVec<u64>> = StorageVec {},

```
然后可以按如下方式访问嵌套向量：
```sway
    #[storage(read, write)]
    fn access_nested_vec() {
        storage.nested_vec.push(StorageVec {});
        storage.nested_vec.push(StorageVec {});

        let mut inner_vec0 = storage.nested_vec.get(0).unwrap();
        let mut inner_vec1 = storage.nested_vec.get(1).unwrap();

        inner_vec0.push(0);
        inner_vec0.push(1);

        inner_vec1.push(2);
        inner_vec1.push(3);
        inner_vec1.push(4);

        assert(inner_vec0.len() == 2);
        assert(inner_vec0.get(0).unwrap().read() == 0);
        assert(inner_vec0.get(1).unwrap().read() == 1);
        assert(inner_vec0.get(2).is_none());

        assert(inner_vec1.len() == 3);
        assert(inner_vec1.get(0).unwrap().read() == 2);
        assert(inner_vec1.get(1).unwrap().read() == 3);
        assert(inner_vec1.get(2).unwrap().read() == 4);
        assert(inner_vec1.get(3).is_none());
    }

```
