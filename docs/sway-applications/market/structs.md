# 定义商品结构

Struct 是 structure 的缩写，是一种类似于 JavaScript 中对象的数据结构。您可以使用 struct 关键字，并在大括号内定义结构体的字段。

我们项目的核心是上架、销售和 获取商品的信息.

让我们定义如下所示的 Item 类型，写入main.sw文件：
 
```sway
struct Item {
    id: u64,
    price: u64,
    owner: Identity,
    metadata: str[20],
    total_bought: u64,
}
```
物品结构将包含 ID、价格、所有者的身份、表示有关物品的链下数据（例如其描述和照片）的 URL 或标识符的字符串，以及用于跟踪总购买次数的“总购买量”计数器。

## 类型
这Itemstruct 使用三种类型：u64, str和Identity.

u64：一个 64 位无符号整数。

在 Sway 中，有四种原生类型的数字：

  1. u8：一个 8 位无符号整数。
  2. u16：一个 16 位无符号整数。
  3. u32：一个 32 位无符号整数。
  4. u64：一个 64 位无符号整数。
  5. u256：一个 256 位无符号整数。

无符号整数表示没有+或-符号，使值始终为正数。u64是 Sway 中用于数字的默认类型。

在 JavaScript 中，有两种类型的整数：number和BigInt.这些类型之间的主要区别在于BigInt可以存储更大的值。同样，Sway 中的每个数值类型都有其可存储的最大值。

String Array：字符串是 Sway 中的内置基元类型。方括号内的数字表示字符串的大小。

Identity：表示用户的Address或ContractId.在 Sway 中，合约和 EOA（外部拥有的账户）是有明显区别的。两者都是类型安全的包装器b256.