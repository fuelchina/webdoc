# 与 Rust的区别

Sway 与 Rust 有很多相似之处，尤其是语法。由于它们非常相似，当它们有差异时，您可能会感到惊讶或措手不及。本页面从高层次概述了您可能遇到的一些语法问题。

## 枚举变量语法

在 Rust 中，枚举通常采用以下三种形式之一：单元变体（没有内部数据）、结构变体（包含命名字段）和元组变体（其中包含一个数据元组）。如果你不熟悉这些术语，它们看起来是这样的：

```rust,ignore
// note to those skimming the docs: this is Rust syntax! Not Sway! Don't copy/paste this into a Sway program.

enum Foo {
    UnitVariant,
    TupleVariant(u32, u64, bool),
    StructVariant {
        field_one: bool,
        field_two: bool
    }
}
```

在 Sway 中，枚举被简化了。枚举变体必须全部指定一种类型。此类型表示其内部数据。这实际上与 Rust 提供的功能同构，但语法不同。您可以在下面看到上面的枚举，但使用 Sway 语法：
```sway
// This is equivalent Sway syntax for the above Rust enum.
enum Foo {
    UnitVariant: (),
    TupleVariant: (u32, u64, bool),
    StructVariant: MyStruct,
}

struct MyStruct {
    field_one: bool,
    field_two: bool,
}
```
