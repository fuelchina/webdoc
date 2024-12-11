# [核心库](https://docs.fuel.network/docs/sway/introduction/core_library/#core-library)

Sway核心库，正如其名，包含了Sway编程语言原始类型的核心操作符和逻辑。这些特性和方法是[原始类型](https://docs.fuel.network/docs/sway/basics/built_in_types/#primitive-types) `u8`, `u64`, `u256`, `str[]`, `str`, `bool` 和 `b256` 的扩展，并可以在适当的地方使用。

最新的核心库文档可以在这里找到[这里](https://fuellabs.github.io/sway/master/core/)。如果最新版本与您的项目不兼容，请参阅相应的版本标签。

## [使用核心库](https://docs.fuel.network/docs/sway/introduction/core_library/#using-the-core-library)

核心库的功能无需显式导入，在使用[`forc new`](https://docs.fuel.network/docs/forc/commands/forc_new/)创建新Sway项目后即可立即使用。`use`关键字不是必须的。

请看下面的例子，它展示了如何对两个相同类型的值使用模运算函数：

```
let val_1 = 10;
let val_2 = 2;
let result = val_1 % val_2;
```

## [核心库前言](https://docs.fuel.network/docs/sway/introduction/core_library/#core-library-prelude)

前言部分包含了所有Sway程序中必需的操作。最新版本的前言可以在[这里](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/prelude.sw)找到。

- [`core::primitives::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/primitives.sw)
- [`core::primitive_conversions::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/primitive_conversions.sw)
- [`core::raw_ptr::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/raw_ptr.sw)
- [`core::raw_slice::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/raw_slice.sw)
- [`core::ops::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/ops.sw)
- [`core::storage::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/storage.sw)
- [`core::str::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/str.sw)
- [`core::codec::*`](https://github.com/FuelLabs/sway/blob/v0.66.4/sway-lib-core/src/codec.sw)

