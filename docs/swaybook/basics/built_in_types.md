# 内置类型

Sway 中的每个值都具有某种类型。尽管在底层，所有值都只是虚拟机中的一串1和0，但 Sway 需要知道这些1和0实际上代表什么。这是通过_类型_来实现的。
<!-- This section should explain how Sway types are inferred -->
<!-- sway_types:example:start -->
Sway 是一种静态类型语言。在编译时，每个值的类型都必须明确。但这并不意味着你需要为每个类型都显式声明，通常情况下，编译器能够合理地推断出类型。
<!-- sway_types:example:end -->


## 原始类型

<!-- This section should list the primitive types in Sway -->
<!-- prim_types:example:start -->
Sway 有以下原始类型：

1. `u8` (8位无符号整数)
1. `u16` (16位无符号整数)
1. `u32` (32位无符号整数)
1. `u64` (64位无符号整数)
1. `u256` (256位无符号整数)
1. `str[]` (固定长度字符串)
1. `str` (字符串切片)
1. `bool` (布尔值 `true` 或 `false`)
1. `b256` (256位，即32字节的哈希)

Sway中所有的其他类型都是基于这些原始类型构建的，或者是对这些原始类型的引用。你可能会注意到没有有符号整数，这是有意为之。在 Sway 所处的区块链领域，浮点数和负数的用途较小，因此它们的实现留给特定用例的库来处理。
<!-- prim_types:example:end -->

## 数字类型

所有无符号整数类型都属于数字类型。
数字可以用二进制语法、十六进制语法、十进制语法和下划线进行分隔来声明，让我们看看以下有效的数字原始类型：

```sway
0xffffff    // 十六进制
0b10101010  // 二进制
10          // 十进制
100_000     // 下划线分隔的十进制
0x1111_0000 // 下划线分隔的二进制
0xfff_aaa   // 下划线分隔的十六进制
```

<!-- This section should explain the default numeric type in Sway -->
<!-- default_num:example:start -->
默认数字类型是 `u64`。FuelVM 的字长是 64 位，使用较小数值类型节省空间的情况很少见。

如果 64 位或 256 位算术运算导致溢出或下溢，FuelVM 会自动回滚计算。

8/16/32 位算术运算通过使用其 64 位等价物进行模拟，同时插入额外的溢出/下溢检查，这通常会导致更高的 gas 消耗。

对于 256 位操作（包括 `b256`），使用了专门的操作，尽可能高效。
<!-- default_num:example:end -->

## 布尔类型

<!-- This section should explain the `bool` type -->
<!-- bool:example:start -->
布尔类型 (`bool`) 有两个可能的值：`true` 或 `false`。布尔值通常用于条件逻辑或验证，比如在 `if` 表达式中。布尔值可以通过一元否定运算符 `!` 来取反。
<!-- bool:example:end -->

如:

```sway
fn returns_false() -> bool {
    let boolean_value: bool = true;
    !boolean_value
}
```

## 字符串切片

<!-- This section should explain the string type in Sway -->
<!-- str:example:start -->
在 Sway 中，字符串字面量存储为可变长度的字符串切片。这意味着它们存储为指向实际字符串数据及其长度的指针。
<!-- str:example:end -->

```sway
let my_string: str = "fuel";
```

字符串切片由于包含指针，其使用受到限制。它们不能用作常量、存储、可配置常量，也不能作为主函数的参数或返回值。

在这些情况下，必须使用下面描述的字符串数组。

## 字符串数组

<!-- This section should explain the string type in Sway -->
<!-- str:example:start -->
在 Sway 中，静态长度字符串是原始类型。这意味着当你声明一个字符串数组时，其大小是其类型的一部分。这对于编译器来说知道要为存储该数据分配多少内存是必要的。字符串的大小用方括号表示。
<!-- str:example:end -->

让我们来看一个例子：

```sway
let my_string: str[4] = __to_str_array("fuel");
```

因为字符串字面量 `"fuel"` 是四个字母，所以类型是 `str[4]`，表示静态长度为 4 个字符。在 Sway 中，默认字符串为 UTF-8 编码。

如上所述，字符串字面量被定义为字符串切片类型。这就是为什么需要 `__to_str_array` 在编译时将它们转换为字符串数组。

在运行时的转换可以使用 `from_str_array` 和 `try_as_str_array` 进行转换。后者可能会失败，因为指定的字符串数组必须足够大，以容纳字符串切片的内容。

```sway
let a: str = "abcd";
let b: str[4] = a.try_as_str_array().unwrap();
let c: str = from_str_array(b);
```

## 复合类型

复合类型是将多个值组合成一种类型的类型。在 Sway 中，我们有数组和元组。

## 元组类型

<!-- This section should explain what a tuple is -->
<!-- tuple:example:start -->
元组是一种通用的静态长度聚合类型。用更简单的话说，元组是一种单一类型，由零个或多个类型的聚合组成。元组内部的类型和元组的长度一起定义了元组的类型。
<!-- tuple:example:end -->

让我们看一些例子。

```sway
let x: (u64, u64) = (0, 0);
```

这是一个元组，用圆括号表示，逗号分隔的值。请注意，类型注解 `(u64, u64)` 与创建该类型的表达式 `(0, 0)` 的语法相似。

```sway
let x: (u64, bool) = (42, true);
assert(x.1);
```

在这个例子中，我们创建了一个新的元组类型 `(u64, bool)`，它是由一个 `u64` 和一个 `bool` 组成的。

<!-- This section should explain how to access a value in a tuple -->
<!-- tuple_val:example:start -->
要访问元组中的值，我们使用 _元组索引_(_tuple indexing_)：`x.1` 表示元组的第一个（从零开始索引，因此是 bool）值。同样，`x.0` 是元组的第零个，`u64` 值。元组值也可以通过解构来访问。
<!-- tuple_val:example:end -->

```sway
struct Foo {}
let x: (u64, Foo, bool) = (42, Foo {}, true);
let (number, foo, boolean) = x;
```

要创建一元元组，我们需要添加一个尾随逗号：

```sway
let x: u64 = (42);     // x 的类型是 u64
let y: (u64) = (42);   // y 也是 u64 类型
let z: (u64,) = (42,); // z 的类型是 (u64)，即一元元组
let w: (u64) = (42,);  // 类型错误
```

## 数组

<!-- This section should explain what an array is -->
<!-- array:example:start -->
数组类似于元组，但数组的值必须全部是相同类型。数组可以包含任意类型，包括非原始类型。
<!-- array:example:end -->

数组用方括号内的逗号分隔列表表示：

```sway
let x = [1, 2, 3, 4, 5];
```

<!-- This section should explain arrays in depth -->
<!-- array_details:example:start -->
数组在栈上分配，因为它们的大小是已知的。数组的大小总是静态的，即它不能改变。一个包含五个元素的数组不能变成包含六个元素的数组。

与元组不同，数组可以被迭代。数组的类型被写为数组包含的类型，后面跟着元素数量，用分号分隔，并在方括号内，例如 `[u64; 5]`。要访问数组中的元素，使用 _数组索引语法_，即方括号。
<!-- array_details:example:end -->

如果底层数组被声明为可变的，则数组元素也可以被改变：

```sway
let mut x = [1, 2, 3, 4, 5];
x[0] = 0;
```

```sway
script;

struct Foo {
    f1: u32,
    f2: b256,
}

fn main() {
    // 带类型断言的整数数组
    let array_of_integers: [u8; 5] = [1, 2, 3, 4, 5];

    // 字符串数组
    let array_of_strings = ["Bob", "Jan", "Ron"];

    // 结构体数组
    let array_of_structs: [Foo; 2] = [
        Foo {
            f1: 11,
            f2: 0x1111111111111111111111111111111111111111111111111111111111111111,
        },
        Foo {
            f1: 22,
            f2: 0x2222222222222222222222222222222222222222222222222222222222222222,
        },
    ];

    // 访问数组中的元素
    let mut array_of_bools: [bool; 2] = [true, false];
    assert(array_of_bools[0]);

    // 修改数组中的元素
    array_of_bools[1] = true;
    assert(array_of_bools[1]);
}
```
