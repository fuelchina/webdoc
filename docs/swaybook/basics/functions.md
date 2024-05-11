# 函数

在 Sway 中，函数通过 `fn` 关键字声明。让我们看一个例子：

```sway
fn equals(first_param: u64, second_param: u64) -> bool {
    first_param == second_param
}
```

这里我们声明了一个名为 `equals` 的函数，它接受两个参数：`first_param` 和 `second_param`。这两个参数都必须是 64 位无符号整数。

这个函数还会返回一个 `bool` 类型的值，即 `true` 或 `false`。如果给定的两个参数相等，函数返回 `true`，否则返回 `false`。我们可以像下面这样使用这个函数：

```sway
fn main() {
    equals(5, 5); // evaluates to `true`
    equals(5, 6); // evaluates to `false`
}
```

## 可变参数

<!-- This section should explain how/when to use `ref mut` -->
<!-- ref_mut:example:start -->
我们可以通过在参数名称前添加 `ref mut` 来使函数参数变得可变。这允许在调用函数时修改传入的参数。
<!-- ref_mut:example:end -->

例如:

```sway
fn increment(ref mut num: u32) {
    let prev = num;
    num = prev + 1u32;
}
```

由于使用了 `mut` 关键字，这个函数被允许修改其参数 `num`。此外，`ref` 关键字指示函数在调用时修改传递给它的参数，而不是修改一个局部副本。

```sway
let mut num: u32 = 0;
increment(num);
assert(num == 1u32); // The function `increment()` modifies `num`

```

请注意，变量 `num` 本身必须被声明为可变的，以便上述代码能够编译。

> **注意**
> 目前不允许仅使用 mut 而不使用 ref 或反之亦然来声明函数参数。

同样，`ref mut` 可以与更复杂的数据类型一起使用，例如：

```sway
fn swap_tuple(ref mut pair: (u64, u64)) {
    let temp = pair.0;
    pair.0 = pair.1;
    pair.1 = temp;
}

fn update_color(ref mut color: Color, new_color: Color) {
    color = new_color;
}

```

然后，我们可以像下面这样调用这些函数：

```sway
let mut tuple = (42, 24);
swap_tuple(tuple);
assert(tuple.0 == 24); // The function `swap_tuple()` modifies `tuple.0`
assert(tuple.1 == 42); // The function `swap_tuple()` modifies `tuple.1`
let mut color = Color::Red;
update_color(color, Color::Blue);
assert(match color {
    Color::Blue => true,
    _ => false,
}); // The function `update_color()` modifies the color to Blue
```

> **注意**
> 在 Sway 程序中，`ref` 关键字只在可变函数参数前有效。
