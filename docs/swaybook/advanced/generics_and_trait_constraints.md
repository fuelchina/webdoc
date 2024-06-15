# 泛型和特征约束

## 泛型作为约束

从高层次上讲，Sway 允许您定义约束或限制，从而使您可以在编写抽象和可重用代码与强制编译时检查之间取得平衡，以确定您编写的抽象代码是否正确。

“抽象和可重用”部分主要来自 [泛型类型](./generic_types.md) ，“强制编译时检查”部分主要来自特征约束。泛型类型可以与函数、结构和枚举一起使用（正如我们在本书中看到的），但它们也可以与特征一起使用。

## 通用特征

将泛型类型与特征相结合，您可以编写可以为任意数量的数据类型实现的抽象且可重用的特征。

例如，假设您想要编写一个用于在不同类型之间进行转换的特征。这将类似于 Rust 的 `Into` 特征 `From` 。在 Sway 中，您的转换特征将如下所示：

```sway
trait Convert<T> {
    fn from(t: T) -> Self;
}
```

该特征 `Convert` 采用泛型类型 `T`。 `Convert` 有一个方法
`from`,它接受一个类型的参数 `T` 并返回一个 `Self`。这意味着当你 `Convert` 为数据类型实现时, `from` 将返回该数据类型的类型，但将以你定义为的类型作为输入 `T`。以下是一个例子：

```sway
struct Square {
    width: u64,
}

struct Rectangle {
    width: u64,
    length: u64,
}

impl Convert<Square> for Rectangle {
    fn from(t: Square) -> Self {
        Self {
            width: t.width,
            length: t.width,
        }
    }
}
```

在这个例子中，你有两种不同的数据类型， `Square` 和`Rectangle`。
你知道所有正方形都是矩形，因此 `Square` 可以转换成`Rectangle` （但反之则不行），因此你可以为这些类型实现转换特征。

如果我们想调用这些方法，我们可以这样做：

```sway
fn main() {
    let s = Square { width: 5 };
    let r = Rectangle::from(s);
}
```

## 特征约束

特征约束允许您使用泛型类型和特征来约束您愿意在程序中接受的正确抽象代码。这些约束采用编译时检查正确性的形式。

如果我们想将特征约束与 `Convert` 上一节中的特征一起使用，我们可以这样做：

```sway
fn into_rectangle<T>(t: T) -> Rectangle
where
    Rectangle: Convert<T>,
{
    Rectangle::from(t)
}
```

此函数允许您接受任何泛型数据类型 `T` 并将其转换为 `Rectangle` _只要 `Convert<T>` 为 `Rectangle`_ 实现。
使用未实现 `Convert<T>`的类型`T` 调用此函数 `Rectangle` 将导致 Sway 的编译时检查失败。
