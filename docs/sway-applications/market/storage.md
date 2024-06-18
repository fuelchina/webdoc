# 定义商品结构

接下来，我们将介绍存储块。这是合约中存储所有持久变量的位置。

在函数中声明但未保存在存储块中的变量将在函数完成执行后被丢弃。将下面的存储块添加到您的main.sw文件：

```sway
storage {
    // counter for total items listed
    item_counter: u64 = 0,
 
    // map of item IDs to Items
    item_map: StorageMap<u64, Item> = StorageMap {},
 
    // owner of the contract
    owner: Option<Identity> = Option::None,
}
```

我们存储的第一个变量是item_counter，初始化为 0 的数字。此计数器可用于跟踪列出的项的总数。

## 存储映射

一个StorageMap是一种唯一类型，允许在存储块中保存键值对。

若要定义存储映射，需要同时指定键和值的类型。例如，在下面的示例中，键类型为u64，值类型为Item结构。

```sway
// map of item IDs to Items
item_map: StorageMap<u64, Item> = StorageMap {},
```

在这里，我们将创建一个从项目的 ID 到Item结构。使用它，我们可以使用其 ID 检索有关项目的信息。

## 选项

在这里，我们定义了owner变量可以是None或持有Identity.

``` sway
// owner of the contract
owner: Option<Identity> = Option::None,
```

如果希望某个值在特定条件下可能为 null 或未定义，则可以使用Option类型。这是一个可以承担任何的枚举Some(value)或None.关键字None表示缺少值，而Some表示存储值的存在。


