# [never类型](https://docs.fuel.network/docs/sway/advanced/never_type/#never-type)

Never类型 `!` 表示永远不会解析为任何值的计算。

## [附加信息](https://docs.fuel.network/docs/sway/advanced/never_type/#additional-information)

`break`, `continue` 和 `return` 表达式的类型也是 `!`。例如，我们可以这样写：

```
let x: ! = {
    return 123
};
```

虽然这里的 `let` 语句看似无意义，但它有助于理解 `!` 的概念。因为 `return` 返回整个函数，所以 `x` 永远不会被赋值，因此它可以被赋予永不类型 `!`。我们还可以用 `revert()` 或无限循环的 `loop` 替换 `return 123`，这段代码依然有效。

更现实地使用 `Never` 类型的例子如下：

```
let num: u32 = match get_a_number() {
    Some(num) => num,
    None => break,
};
```

两个匹配分支都必须产生 `u32` 类型的值，但是由于 `break` 根本不会产生任何值，我们知道它永远不会产生一个不是 `u32` 类型的值。这展示了 `!` 类型的另一特性——`!` 类型的表达式可以强制转换为任何其他类型。

需要注意的是，`!` 类型可以强制转换为任何其他类型，另一个例子是：

```
let x: u32 = {
    return 123
};
```

无论 `x` 的类型是什么，`Never` 类型的返回块总是能够强制转换为 `x` 的类型。

## [例子](https://docs.fuel.network/docs/sway/advanced/never_type/#examples)

```
fn foo() {
    let num: u64 = match Option::None::<u64> {
        Some(num) => num,
        None => return,
    };
}
```