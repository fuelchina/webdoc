# 变量

<!-- This section should explain how variables are immutable -->
<!-- immutable_vars:example:start -->
在Sway中，变量默认是**不可变的**(_immutable_)。这意味着声明后，变量的值不能改变。这种特性使得Sway支持安全编程，许多现代语言也采用了这种默认行为。
<!-- immutable_vars:example:end -->

让我们来一探究竟。

## 声明变量

让我们看一个变量声明的例子：

```sway
let foo = 5;
```

很棒！我们刚刚声明了一个变量 `foo`。关于 `foo` 我们知道些什么？

1. 它是不可变的。
1. 它的值是 `5`.
1. 它的类型是 `u64`， 即64位无符号整数。

`u64` 是默认的数值类型，表示64位无符号整数。更多关于内置类型的细节，可以在 [Built-in Types](./built_in_types)章节查看.

我们也可以创建一个可变变量。让我们看一下：

```sway
let mut foo = 5;
foo = 6;
```

现在，`foo` 是**可变的**(_mutate_)，可以被赋值为`6`，即允许对其值进行修改

## 类型注解

<!-- This section should explain type annotations -->
<!-- type_annotations:example:start -->
变量声明可以包含一个**类型注解**(_type annotation_)。类型注解用于声明变量的类型以及其值。
<!-- type_annotations:example:end -->

例如:

```sway
let foo: u32 = 5;
```

这里我们明确地声明`foo`的类型为`u32`，即32位无符号整数。下面是一些其他类型的类型注解示例：

```sway
let bar: str[4] = __to_str_array("sway");
let baz: bool = true;
```

<!-- This section should explain what happens if there is a type conflict -->
<!-- type_conflict:example:start -->
如果声明的值与声明的类型不符，编译器将会生成错误。
<!-- type_conflict:example:end -->
