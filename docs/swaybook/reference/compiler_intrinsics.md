# 编译器内部函数

Sway 编译器支持一系列内部函数，这些函数可执行各种低级操作，有助于构建库。编译器内部函数很少使用，但比asm块更受欢迎，因为它们经过类型检查，总体上更安全。以下是所有可用编译器内部函数的列表：
___

```sway
__size_of_val<T>(val: T) -> u64
```

**描述:** 返回类型 `T` 的大小(以字节为单位)。

**限制:** 无。

___

```sway
__size_of<T>() -> u64
```

**描述:** 返回类型 `T` 的大小(以字节为单位)。

**限制:** 无。

___

```sway
__size_of_str_array<T>() -> u64
```

**描述:** 返回类型 `T` 的大小(以字节为单位)。 这个固有值不同于“字符串数组”情况下的 `__size_of` ，后者返回字符串的实际长度(以字节为单位)，而不会将字节大小填充到下一个单词对齐。当`T` 不是字符串时，返回 `0` 。

**限制:** 无。

___

```sway
__assert_is_str_array<T>()
```

**描述:** `T` 如果类型不是“字符串数组”，则会引发编译错误。

**限制:** 无。

___

```sway
__to_str_array(s: str) -> str[N]
```

**描述:** 在编译时将“字符串切片”转换为“字符串数组”。参数“s”必须是字符串文字。

**限制:** 无。

___

```sway
__is_reference_type<T>() -> bool
```

**描述:** 如果 `T` 是一个引用类型，则返回`true`，否则返回 `false` 。

**限制:** 无。

___

```sway
__is_str_array<T>() -> bool
```

**描述:** 如果 `T` 是一个引用类型，则返回`true`，否则返回 `false` 。

**限制:** 无。

___

```sway
__eq<T>(lhs: T, rhs: T) -> bool
```

**描述:** 返回 `lhs` 和 `rhs` '是否相等。

**限制:** `T` 是 `bool`, `u8`, `u16`, `u32`, `u64`, `u256`, `b256` 或  `raw_ptr`.

___

```sway
__gt<T>(lhs: T, rhs: T) -> bool
```

**描述:** 返回 `lhs` 和 `rhs` '是否相等。

**限制:** `T` 是 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`。
___

```sway
__lt<T>(lhs: T, rhs: T) -> bool
```

**描述:** Returns whether `lhs` is less than `rhs`.

**限制:** `T` 是 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`。
___

```sway
__gtf<T>(index: u64, tx_field_id: u64) -> T
```

**描述:** 如果适用，返回索引为`index`的事务字段ID为 `tx_field_id` 。 这是一个包装围绕FuelVM的 [`gtf` 指令](https://fuellabs.github.io/fuel-specs/master/vm/instruction_set#gtf-get-transaction-fields)。 结果字段被强制转换为 `T`。

**限制:** 无。

___

```sway
__addr_of<T>(val: T) -> raw_ptr
```

**描述:**  `val` 返回内存中存储的地址。

**限制:** `T` 是一种引用类型。

___

```sway
__state_load_word(key: b256) -> u64
```

**描述:** 从键存储中读取并返回一个单词 `key`.

**限制:** 无。

___

```sway
__state_load_quad(key: b256, ptr: raw_ptr, slots: u64) -> bool
```

**描述:** Reads `slots` number of slots (`b256` each) from storage starting at key `key` and stores them in memory starting at address `ptr`. Returns a Boolean describing whether all the storage slots were previously set.

**限制:** 无。

___

```sway
__state_store_word(key: b256, val: u64) -> bool
```

**描述:** Stores a single word `val` into storage at key `key`. Returns a Boolean describing whether the store slot was previously set.

**限制:** 无。

___

```sway
__state_store_quad(key: b256, ptr: raw_ptr, slots: u64) -> bool
```

**描述:** `slots`将从内存中的地址开始的槽数  (每个`b256`) 存储`ptr`到从键开始的存储中`key`。 返回一个布尔值，描述第一个存储槽之前是否已设置。

**限制:** 无。

___

```sway
__log<T>(val: T)
```

**描述:** 记录值 `val`。

**限制:** 无。

___

```sway
__add<T>(lhs: T, rhs: T) -> T
```

**描述:** `lhs` 将和相加 `rhs` 并返回结果。

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`.

___

```sway
__sub<T>(lhs: T, rhs: T) -> T
```

**描述:** 用 `rhs` 减去 `lhs`。

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`.

___

```sway
__mul<T>(lhs: T, rhs: T) -> T
```

**描述:** 用 `lhs` 乘以 `rhs`。

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`.

___

```sway
__div<T>(lhs: T, rhs: T) -> T
```

**描述:** 用 `lhs` 除以 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`.

___

```sway
__and<T>(lhs: T, rhs: T) -> T
```

**描述:** 按位与 `lhs` 和 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

___

```sway
__or<T>(lhs: T, rhs: T) -> T
```

**描述:** 按位或 `lhs` 与 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.

___

```sway
__xor<T>(lhs: T, rhs: T) -> T
```

**描述:** 按位异或 `lhs` 和 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.
___

```sway
__mod<T>(lhs: T, rhs: T) -> T
```

**描述:**  `lhs` 对进行模数运算 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`.
___

```sway
__rsh<T>(lhs: T, rhs: u64) -> T
```

**描述:**  `lhs` 将逻辑右移 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.
___

```sway
__lsh<T>(lhs: T, rhs: u64) -> T
```

**描述:** `lhs` 将逻辑左移 `rhs`.

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.
___

```sway
__revert(code: u64)
```

**描述:** 恢复错误代码 `code`.

**限制:** 无。

___

```sway
__ptr_add(ptr: raw_ptr, offset: u64)
```

**描述:** 添加 `offset` 到指针的原始值 `ptr`.

**限制:** 无。

___

```sway
__ptr_sub(ptr: raw_ptr, offset: u64)
```

**描述:** 减去 `offset` 指针的原始值 `ptr`.

**限制:** 无。

___

```sway
__smo<T>(recipient: b256, data: T, coins: u64)
```

**描述:** `data` 向地址发送任意类型`T` 和 `coins` 数量的基础资产消息 `recipient`。

**限制:** 无。

___

```sway
__not(op: T) -> T
```

**描述:** 按位非 `op`

**限制:** `T` 是整数类型，即 `u8`, `u16`, `u32`, `u64`, `u256`, `b256`.
___
