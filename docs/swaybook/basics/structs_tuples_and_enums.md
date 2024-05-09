# 结构体、元组和枚举

## 结构体

<!-- 本节将解释Sway中的结构 -->
<!-- 结构:例如:开始 -->
Sway中的结构是一组命名的类型。您还可以通过另一个名称来熟悉结构:_producttype_。Sway对结构没有任何明显的独特用法;它们与大多数其他具有结构体的语言相似。如果您有面向对象的背景，那么结构就像对象的数据属性。
<!-- 结构:例如:结束 -->

首先，我们声明一个名为“Foo”的结构体，它有两个字段。第一个字段名为“bar”，它接受类型为“u64”的值，第二个字段名为“baz”，它接受类型为“bool”的值。 

```rust
library;

// Declare a struct type
pub struct Foo {
    bar: u64,
    baz: bool,
}

// Struct types for destructuring
pub struct Point {
    x: u64,
    y: u64,
}

pub struct Line {
    p1: Point,
    p2: Point,
}

pub struct TupleInStruct {
    nested_tuple: (u64, (u32, (bool, str))),
}

```

<!-- 本节将解释如何在Sway中实例化一个结构 -->
<!-- 新结构:例如:开始 -->
来实例化我们使用的结构体 _struct instantiation syntax_, 它与声明语法非常相似，只是用表达式代替了类型。

有三种方法可以实例化该结构。

- 字段的硬编码值
- 传入名称与结构字段不同的变量
- 通过与字段名称相同的变量使用速记符号
<!-- 新结构:例如:结束 -->

```rust
library;

mod data_structures;
use data_structures::{Foo, Line, Point, TupleInStruct};

fn hardcoded_instantiation() -> Foo {
    // Instantiate `foo` as `Foo`
    let mut foo = Foo {
        bar: 42,
        baz: false,
    };

    // Access and write to "baz"
    foo.baz = true;

    // Return the struct
    foo
}

fn variable_instantiation() -> Foo {
    // Declare variables with the same names as the fields in `Foo`
    let number = 42;
    let truthness = false;

    // Instantiate `foo` as `Foo`
    let mut foo = Foo {
        bar: number,
        baz: truthness,
    };

    // Access and write to "baz"
    foo.baz = true;

    // Return the struct
    foo
}

fn shorthand_instantiation() -> Foo {
    // Declare variables with the same names as the fields in `Foo`
    let bar = 42;
    let baz = false;

    // Instantiate `foo` as `Foo`
    let mut foo = Foo { bar, baz };

    // Access and write to "baz"
    foo.baz = true;

    // Return the struct
    foo
}

fn struct_destructuring() {
    let point1 = Point { x: 0, y: 0 };
    // Destructure the values from the struct into variables
    let Point { x, y } = point1;

    let point2 = Point { x: 1, y: 1 };
    // If you do not care about specific struct fields then use ".." at the end of your variable list
    let Point { x, .. } = point2;

    let line = Line {
        p1: point1,
        p2: point2,
    };
    // Destructure the values from the nested structs into variables
    let Line {
        p1: Point { x: x0, y: y0 },
        p2: Point { x: x1, y: y1 },
    } = line;
    // You may also destructure tuples nested in structs and structs nested in tuples
    let tuple_in_struct = TupleInStruct {
        nested_tuple: (42u64, (42u32, (true, "ok"))),
    };
    let TupleInStruct {
        nested_tuple: (a, (b, (c, d))),
    } = tuple_in_struct;

    let struct_in_tuple = (Point { x: 2, y: 4 }, Point { x: 3, y: 6 });
    let (Point { x: x0, y: y0 }, Point { x: x1, y: y1 }) = struct_in_tuple;
}
```

> **注释**
> 您可以混合和匹配所有3种方法来同时实例化结构。
> 此外，字段的顺序在实例化时并不重要，但是我们鼓励按字母顺序声明字段并以相同的字母顺序实例化它们

此外，可以使用解构语法从结构中提取多个变量。

### 结构内存布局

> **注释**
> 如果您是语言新手，或者是编程新手，那么这些信息并不重要

结构体的内存开销为零。这意味着在内存中，每个结构字段都是按顺序排列的。运行时不保留有关结构体名称或其他属性的元数据。换句话说，结构体是编译时构造。这在Rust中是相同的，但在其他具有运行时的语言(如Java)中则不同。
## 元组

<!-- 本节将解释什么是元组以及如何访问元组值 -->
<!-- 元组:例如:开始 -->
元组是[basic static-length type](./built_in_types.md#tuple-types) 它们内部包含多种不同的类型。元组的类型由其内部值的类型定义，元组可以包含基本类型以及结构体和枚举。
您可以使用。的语法。此外，可以使用解构语法从元组中提取多个变量。
<!-- 元组:例如:结束 -->

```rust
library;

fn tuple() {
    // You can declare the types youself
    let tuple1: (u8, bool, u64) = (100, false, 10000);

    // Or have the types be inferred
    let mut tuple2 = (5, true, ("Sway", 8));

    // Retrieve values from tuples
    let number = tuple1.0;
    let sway = tuple2.2.1;

    // Destructure the values from the tuple into variables
    let (n1, truthness, n2) = tuple1;

    // If you do not care about specific values then use "_"
    let (_, truthness, _) = tuple2;

    // Internally mutate the tuple
    tuple2.1 = false;

    // Or change the values all at once (must keep the same data types)
    tuple2 = (9, false, ("Fuel", 99));
}
```

## 枚举

<!-- 本节应该解释什么是枚举 -->
<!-- 枚举:例如:开始 -->
_Enumerations_, 或 _enums_,也被称为 _sum types_。 枚举是一种类型，可以是几种变体之一。要声明枚举，需要枚举所有可能的变体。
<!-- 枚举:例如:结束 -->

这里，我们定义了五种可能的颜色。每个枚举变体只是颜色名称。由于没有与每个变体相关联的额外数据，因此我们称每个变体为type `()`, 或单位。

```rust
library;

// Declare the enum
enum Color {
    Blue: (),
    Green: (),
    Red: (),
    Silver: (),
    Grey: (),
}

fn main() {
    // To instantiate a variable with the value of an enum the syntax is
    let blue = Color::Blue;
    let silver = Color::Silver;
}
```

### 结构的枚举

也可以让枚举变量包含额外的数据。看一下这个更实际的例子，它结合了结构体声明和枚举变量:
```rust
library;

struct Item {
    price: u64,
    amount: u64,
    id: u64,
}

enum MyEnum {
    Item: Item,
}

fn main() {
    let my_enum = MyEnum::Item(Item {
        price: 5,
        amount: 2,
        id: 42,
    });
}
```

### 枚举的枚举

可以定义枚举的枚举:

```rust
library;

pub enum Error {
    StateError: StateError,
    UserError: UserError,
}

pub enum StateError {
    Void: (),
    Pending: (),
    Completed: (),
}

pub enum UserError {
    InsufficientPermissions: (),
    Unauthorized: (),
}
```

#### 更喜欢使用

使用枚举的首选方式是直接使用单个(非嵌套)枚举，因为它们易于跟踪并且行很短:

```rust
library;

use ::enum_of_enums::{StateError, UserError};

fn preferred() {
    let error1 = StateError::Void;
    let error2 = UserError::Unauthorized;
}
```

#### Inadvisable

方法使用枚举的嵌套形式 `Error` 枚举，然后你可以使用以下语法将它们实例化为变量:

```rust
library;

use ::enum_of_enums::{Error, StateError, UserError};

fn avoid() {
    let error1 = Error::StateError(StateError::Void);
    let error2 = Error::UserError(UserError::Unauthorized);
}
```

注意要点:

- 必须导入所需的所有枚举，而不仅仅是 `Error` 枚举
- 行可能会变得不必要的长(取决于名称)
- 语法不是最符合人体工程学的

### 枚举 内存 布局

> **注释**
> 如果您是语言新手，或者是编程新手，那么这些信息并不重要。

枚举确实有一些内存开销。为了知道表示的是哪个变体，Sway为枚举变体存储一个一个单词(8字节)的标记。标记后保留的空间相当于标签的大小 _largest_ 枚举变量。 因此，要计算枚举在内存中的大小，请在最大变量的大小上加上8个字节。例如，在的情况下 `Color` 上面，所有的变体都是 `()`, 大小将是8字节，因为最大的变体的大小是0字节。
