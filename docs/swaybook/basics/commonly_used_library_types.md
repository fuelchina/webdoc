# 常用库类型

Sway 标准库构成了可移植 Sway 软件的基础，为更广泛的 Sway 生态系统提供了一组最小的共享抽象。它提供了核心类型、对语言原生类型的库定义操作、原生资产管理、区块链上下文操作、访问控制、存储管理以及对其他虚拟机类型的支持等。可参考标准库文档在[此处](https://fuellabs.github.io/sway/master/std/index.html)。

## `Result<T, E>`

<!-- This section should explain what the `Result` type is -->
<!-- result:example:start -->
`Result` 类型用于返回和传播错误。它是一个枚举（`enum`），包含两种变体：`Ok(T)`，表示成功并包含一个值，以及 `Err(E)`，表示错误并包含一个错误值。定义中的 `T` 和 `E` 是类型参数，使 `Result` 可以泛型化，适用于任何类型。

<!-- result:example:end -->

```sway
/// `Result` 这里相当于表示要么成功 (`Ok`) 要么失败 (`Err`)的类型.
pub enum Result<T, E> {
    /// Contains the success value.
    Ok: T,
    /// Contains the error value.
    Err: E,
}

```

<!-- This section should explain when to use the `Result` type -->
<!-- use_result:example:start -->
当预期可能出现错误且错误可恢复时，函数会返回 `Result`。
<!-- use_result:example:end -->

来看接下来的例子:

```sway
script;

enum MyContractError {
    DivisionByZero: (),
}

fn divide(numerator: u64, denominator: u64) -> Result<u64, MyContractError> {
    if (denominator == 0) {
        return Err(MyContractError::DivisionByZero);
    } else {
        Ok(numerator / denominator)
    }
}

fn main() -> Result<u64, str[4]> {
    let result = divide(20, 2);
    match result {
        Ok(value) => Ok(value),
        Err(MyContractError::DivisionByZero) => Err(__to_str_array("Fail")),
    }
}
```

## `Option<T>`

<!-- This section should explain the `Option` type -->
<!-- option:example:start -->
`Option` 类型表示一个可选值：每个 `Option` 要么是 `Some` 并包含一个值，要么是 `None` 并且不包含值。`Option` 类型在 Sway 代码中非常常见，因为它们有多种用途：

- 作为初始值，其中 `None` 可用作初始化器。
- 用于报告简单错误的返回值，错误时返回 `None`。

`Option` 的实现会根据变体进行匹配：如果是 `Some` 它返回内部值，如果是 `None`，则执行[回退](https://github.com/FuelLabs/fuel-specs/blob/master/src/fuel-vm/instruction-set.md#rvrt-revert).。
<!-- option:example:end -->

```sway
/// 一种表示可选值的类型，可以是 `Some(val)` 或 `None`。
pub enum Option<T> {
    /// No value.
    None: (),
    /// Some value of type `T`.
    Some: T,
}

```

<!-- This section should explain when to use the `Option` type -->
<!-- use_option:example:start -->
`Option` 常与模式匹配结合，用于查询值的存在并采取相应行动，让开发者可以选择如何处理 `None` 情况。
<!-- use_option:example:end -->

下面示例展示何时使用 `Option` 类型，以及如何处理除以 0 的无效操作

```sway
script;

fn divide(numerator: u64, denominator: u64) -> Option<u64> {
    if denominator == 0 {
        None
    } else {
        Some(numerator / denominator)
    }
}

fn main() {
    let result = divide(6, 2);
    // 通过模式匹配来检索值
    match result {
        // 除法有效
        Some(x) => std::logging::log(x),
        // 除法无效
        None => std::logging::log("Cannot divide by 0"),
    }
}

```
