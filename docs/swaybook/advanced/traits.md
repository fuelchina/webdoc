# 特质

## 声明特征

 _trait_ 将类型选择为可以在类型之间共享的特定类型的行为或功能。这使得代码和泛型编程易于重用。如果你曾经使用过Haskell中的类型类，Rust中的trait，甚至Java中的接口，这些都是类似的概念。

我们来看一些代码：
```sway
trait Compare {
    fn equals(self, b: Self) -> bool;
} {
    fn not_equals(self, b: Self) -> bool {
        !self.equals(b)
    }
}

```

我们刚刚声明了一个名为 `Compare`的特性。 在trait的名字之后，有两个 _blocks_ 代码( (一个 _block_ 是用 `{}`括号括起来的代码。). 第一个块是 _界面表面_。第二个块是trait提供的 _methods_ 。如果一个类型可以在接口表面中提供方法，那么它就可以免费访问trait中的方法!上述特征的意思是:如果你能确定两个值是否相等，那么你就可以确定它们不相等。注意，trait方法可以访问接口表面中定义的方法。

## 实现特征

下面的示例实现了一个`Compare` 特征来 `u64` 检查两个数字是否相等。让我们看看这是如何做到的：

```sway
impl Compare for u64 {
    fn equals(self, b: Self) -> bool {
        self == b
    }
}

```

上面的代码片段声明了类型为`u64`的 trait `Compare` 中的所有方法。。现在，我们可以访问`u64`的 `equals` 和 `not_equals` 方法，只要 trait `Compare` 在作用域中。

## 超级特质

使用多个特征时，经常会出现一个特征可能需要另一个特征的功能的情况。这时，超特征就派上用场了，因为它们允许您在实现另一个特征时需要一个特征，即一个特征带有另一个特征。Sway库 `Ord` 的特征就是一个很好的例子 `core` 。该 `Ord` 特征需要该 `Eq` 特征，因此 `Eq` 将其保留为单独的特征，因为人们可能会决定 `Eq`在不实现该特征的其他部分的情况下实现该`Ord`特征。


```sway


trait Eq {
    fn equals(self, b: Self) -> bool;
}

trait Ord: Eq {
    fn gte(self, b: Self) -> bool;
}

impl Ord for u64 {
    fn gte(self, b: Self) -> bool {
        // As `Eq` is a supertrait of `Ord`, `Ord` can access the equals method
        self.equals(b) || self.gt(b)
    }
}

```

要需要超特征，请 `:` 在特征名称后添加 ，然后列出您想要需要的特征并用 将它们分隔开 `+`。

### ABI 超级特征

ABIs 还可以具有超特征注释：

```sway
contract;

struct Foo {}
impl ABIsupertrait for Foo {
    fn foo() {}
}

trait ABIsupertrait {
    fn foo();
}

abi MyAbi : ABIsupertrait {
    fn bar();
} {
    fn baz() {
        Self::foo() // supertrait method usage
    }
}

impl ABIsupertrait for Contract {
    fn foo() {}
}

// The implementation of MyAbi for Contract must also implement ABIsupertrait
impl MyAbi for Contract {
    fn bar() {
        Self::foo() // supertrait method usage
    }
}

```

为 `MyAbi` 实现 `Contract`也必须实现 `ABIsupertrait` 特性。  `ABIsupertrait` 中的方法在外部不可用，也就是说，它们实际上不是契约方法，但它们可以在实际的契约方法中使用，如上面的例子所示。

ABI 超特征旨在使合约实现组合，允许使用例如库来组合正交合约特性。

### 超级ABI

除了超特征之外，ABI 还可以具有 _超ABI_ 注释：

```sway
contract;

abi MySuperAbi {
    fn foo();
}

abi MyAbi : MySuperAbi {
    fn bar();
}

impl MySuperAbi for Contract {
    fn foo() {}
}

// The implementation of MyAbi for Contract must also implement MySuperAbi
impl MyAbi for Contract {
    fn bar() {}
}
   ```

`Contract`的  `MyAbi` 也必须实现 `MySuperAbi` 的超级abi。 `MySuperAbi` 中的方法将成为 `MyAbi` 合约接口的一部分，即可以在外部使用(因此不能从其他 `MyAbi` 合约方法中调用)。 

superabi旨在使契约实现组合，例如，允许使用库组合正交的契约特性。

## 相关商品

特征可以在其界面表面声明不同类型的关联项目：

- [功能](#associated-functions)
- [常量](#associated-constants)
- [类型](#associated-types)

### 相关函数

特征中的关联函数仅由函数签名组成。这表明给定类型的每个特征实现都必须定义所有特征函数。

```sway
trait Trait {
    fn associated_fn(self, b: Self) -> bool;
}
```

### 相关常量

关联常量是与类型关联的常量。

```sway
trait Trait {
    const ID: u32 = 0;
}
```

[特征定义中关联常量](../basics/constants.md#associated-constants) 的初始化表达式可以省略，以表明 `trait` 给定类型的每个实现都必须指定一个初始化器：

```sway
trait Trait {
    const ID: u32;
}
```

检查 [常量](../basics/constants.md)`associated consts` 页面上的部分。

### 关联类型

Sway 中的关联类型允许您在特征中定义占位符类型，这些类型可以通过该特征的具体实现进行自定义。这些关联类型用于指定特征方法的返回类型或定义特征中的类型关系。

```sway
trait MyTrait {
    type AssociatedType;
}
```

检查 [关联类型](./associated_types.md)页面`associated types` 上的部分。

## 用例

### 自定义类型 (结构, 枚举)

通常，库和 API 具有抽象于实现特定特征的类型上的接口。接口的使用者需要为他们希望与接口一起使用的类型实现该特征。例如，让我们看一下特征和基于该特征构建的接口。
```sway
library;

pub enum Suit {
    Hearts: (),
    Diamonds: (),
    Clubs: (),
    Spades: (),
}

pub trait Card {
    fn suit(self) -> Suit;
    fn value(self) -> u8;
}

fn play_game_with_deck<T>(a: Vec<T>) where T: Card {
    // insert some creative card game here
}
```

> **注意** 特征约束 (即使用 `where` 关键字) [尚未实现](https://github.com/FuelLabs/sway/issues/970)

现在，如果你想在struct中使用 `play_game_with_deck` 函数，你必须为你的struct实现 `Card` 。注意，下面的代码示例假设一个依赖 _games_ 已经包含在 `Forc.toml` 文件。

```sway
script;

use games::*;

struct MyCard {
    suit: Suit,
    value: u8
}

impl Card for MyCard {
    fn suit(self) -> Suit {
        self.suit
    }
    fn value(self) -> u8 {
        self.value
    }
}

fn main() {
    let mut i = 52;
    let mut deck: Vec<MyCard> = Vec::with_capacity(50);
    while i > 0 {
        i = i - 1;
        deck.push(MyCard { suit: generate_random_suit(), value: i % 4}
    }
    play_game_with_deck(deck);
}

fn generate_random_suit() -> Suit {
  [ ... ]
}
```
