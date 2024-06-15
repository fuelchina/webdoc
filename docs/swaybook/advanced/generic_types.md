# 泛型类型

## 基本

在 Sway 中，泛型类型遵循与 Rust 非常相似的模式。让我们看一些示例语法，从泛型函数开始：

```sway
fn noop<T>(argument: T) -> T {
    argument
}

```

这里， `noop()` 函数简单地返回给它的内容。 `T` 是一个 _类型参数_, a它表示这个函数存在于所有类型 T 中。更正式地，这个函数可以被输入为：

```math
noop :: ∀T. T -> T
```

泛型类型是一种引用 _一般_, 即无需指定单一类型。我们的 `noop` 函数可以与语言中的任何类型一起使用，因此我们无需指定`noop(argument: u8) -> u8`, `noop(argument: u16) -> u16`, 等。

## 代码生成

处理泛型类型时会出现一个问题：程序集如何处理这个问题？有几种方法可以在最低级别处理泛型类型。 Sway 使用一种称为 [单态化](https://en.wikipedia.org/wiki/Monomorphization)的技术。 这意味着泛型函数会针对其所调用的每种类型编译为非泛型版本。这样，泛型函数纯粹是为了符合人体工程学而采用的简写形式。

## 特征约束

在深入研究特征约束之前，需要了解的重要背景是，该 `where` 子句可用于指定泛型参数所需的特征。因此，在编写类似的东西时， `HashMap` 您可能希望指定泛型参数实现 `Hash` 特征。

```sway
fn get_hashmap_key<T>(Key : T) -> b256
    where T: Hash
{
    // Code within here can then call methods associated with the Hash trait on Key
}

```

当然，我们的 `noop()` 函数没什么用。程序员经常会想要声明满足某些特征的类型上的函数。例如，让我们尝试 `successor()`, 为所有数字类型实现后继函数。

```sway
fn successor<T>(argument: T)
    where T: Add
{
    argument + 1
}

```

运行 `forc build`, 你将获得：

```console
.. |
 9 |   where T: Add
10 |   {
11 |       argument + 1                                        
   |                  ^ Mismatched types: expected type "T" but saw type "u64"
12 |   }
13 |

```

这是因为我们不知道 （ `1` 在本例中默认为） `1u64`实际上是否可以添加到`T`。如果 `T` 是  `f64`? 或者 `b256`? 在这些情况下 `1u64` 添加是什么意思？

我们可以用另一个特征约束来解决这个问题。我们只能找到某种类型 `T` 的值的后继数，如果该类型 `T` 定义了某种递增数。让我们来做一个特征:

```sway
trait Incrementable {
    /// Returns the value to add when calculating the successor of a value.
    fn incrementor() -> Self;
}

```

现在，我们可以修改我们的 `successor()` 函数：

```sway
fn successor<T>(argument: T)
    where T: Add,
          T: Incrementable
{
    argument + T::incrementor()
}

```

## 通用结构体和枚举

就像函数一样，结构体和枚举也可以是泛型。让我们看一下标准库版本 `Option<T>`:

```sway
enum Option<T> {
    Some: T,
    None: (),
}

```

就像不受约束的泛型函数一样，此类型存在于所有 (∀) 类型 `T`。 `Result<T, E>` 这是另一个例子：

```sway
enum Result<T, E> {
    Ok: T,
    Err: E,
}

```

通用枚举和通用结构体都可以受到特征约束。考虑这个结构体：
```sway
struct Foo<T>
    where T: Add
{
    field_one: T,
}

```

## 类型参数

与 Rust 类似，Sway 也有一个俗称的 [turbofish](https://github.com/rust-lang/rust/blob/e98309298d927307c5184f4869604bd068d26183/src/test/ui/parser/bastion-of-the-turbofish.rs)。 turbofish 看起来像这样： `::<>` (看到后面有气泡的小鱼了吗？）。  turbofish 用于在通用上下文中注释类型。假设您有以下函数：

```sway
fn foo<T, E>(t: T) -> Result<T, E> {
    Ok(t)
}

```

在这个代码示例中，你不可能知道类型 `E` 是什么，这无疑是愚蠢的。你需要使用 turbofish手动提供类型：

```sway
fn foo<T, E>(t: T) -> Result<T, E> {
    Ok::<T, MyErrorType>(t)
}

```

在函数本身上使用 turbofish used on the function 也很常见：

```sway
fn main() {
    foo::<Bar, Baz>()
}

```
