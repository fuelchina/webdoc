# 高级类型

## 使用类型别名创建类型同义词

Sway 提供了声明类型别名的功能，以便为现有类型赋予另一个名称。为此，我们使用关键字。例如，我们可以像这样 `type` 创建别名： `Kilometers`  `u64` 

```sway
type Kilometers = u64;

```

现在，别名 `Kilometers` 是 `u64`的 _同义词_。注意 `Kilometers`  **不是** 一个单独的新类型。具有 `Kilometers` 类型的值将被视为与 `u64`类型的值相同:

```sway
    let x: u64 = 5;
    let y: Kilometers = 5;
    assert(x + y == 10);

```

因为 `Kilometers` 和 `u64` 是同一类型，我们可以添加这两种类型的值，也可以将 `Kilometers` 值传递给接受 `u64` 参数的函数。但是，使用这种方法，我们无法获得通过引入称为的 _separate_ 新类型所获得的类型检查优势 `Kilometers`。换句话说，如果我们在某个地方混淆了 `Kilometers` 和 `i32` 值，编译器不会给我们一个错误。

类型同义词的主要用途是减少重复。例如，我们可能有一个像这样的长数组类型：
```sway
[MyStruct<u64, b256>; 5]
```

在整个代码中将这种冗长的类型写入函数签名和类型注释可能非常繁琐且容易出错。想象一下，有一个项目充满了这样的代码：
```sway
fn foo_long(array: [MyStruct<u64, b256>; 5]) -> [MyStruct<u64, b256>; 5] {
    array
}
```

类型别名通过减少重复使此代码更易于管理。下面，我们引入了一个 `MyArray` 以详细类型命名的别名，并且可以用较短的别名替换该类型的所有用法 `MyArray`:

```sway
type MyArray = [MyStruct<u64, b256>; 5];
  
fn foo_shorter(array: MyArray) -> MyArray {
    array
}
```

这段代码更易于阅读和编写！为类型别名选择一个有意义的名称也有助于传达您的意图。
