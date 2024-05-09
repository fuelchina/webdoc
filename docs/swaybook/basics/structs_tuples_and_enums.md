# 结构体、元组和枚举

## 结构体

Sway 中的结构是类型的命名分组。您可能还通过另一个名称来熟悉结构:产品类型。 Sway 没有对结构进行任何明显独特的用法；它们与大多数具有结构的其他语言类似。如果您有面向对象的背景，那么结构就像对象的数据属性。

首先，我们声明一个名为`Foo`的结构体，它有两个字段。第一个字段名为`bar`，它接受类型为`u64`的值，第二个字段名为`baz`，它接受类型为`bool`的值。 

```sway
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

为了实例化结构，我们使用结构实例化语法，它与声明语法非常相似，只是用表达式代替类型。

实例化结构体的方法有3种。

- 字段的硬编码值
- 传入名称与结构字段不同的变量
- 通过与字段名称相同的变量使用简写符号
<!-- 新结构:例如:结束 -->

```sway
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
> 您可以混合和匹配所有3种方法来同时实例化结构。 此外，字段的顺序在实例化时并不重要，但是我们鼓励按字母顺序声明字段并以相同的字母顺序实例化它们

此外，可以使用解构语法从结构中提取多个变量。

### 结构内存布局

> **注释**
> 如果您是语言新手，或者是编程新手，那么这些信息并不重要

结构体的内存开销为零。这意味着在内存中，每个结构字段都是按顺序排列的。运行时不保留有关结构体名称或其他属性的元数据。换句话说，结构体是编译时构造。这在Rust中是相同的，但在其他具有运行时的语言(如Java)中则不同。

## 元组

元组是一种[基本的静态长度类型](./built_in_types.md#tuple-types) 其内部包含多种不同的类型。元组的类型由其中值的类型定义，元组可以包含基本类型以及结构体和枚举。

您可以使用`.`语法直接访问值。此外，可以使用解构语法从元组中提取多个变量。


```sway
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

枚举也称为求和类型。枚举是一种可能是多种变体之一的类型。要声明枚举，您需要枚举所有潜在的变体。

这里，我们定义了五种可能的颜色。每个枚举变体只是颜色名称。由于没有与每个变体关联的额外数据，因此我们说每个变体的类型为`()`或单位。

```sway
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

### 结构枚举
枚举变量也可以包含额外的数据。看一下这个更实质性的示例，它将结构声明与枚举变体相结合:

```sway
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

```sway
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

#### 首选用途

使用枚举的首选方法是直接使用单个（非嵌套）枚举，因为它们很容易理解并且行很短：

```sway
library;

use ::enum_of_enums::{StateError, UserError};

fn preferred() {
    let error1 = StateError::Void;
    let error2 = UserError::Unauthorized;
}
```

#### 不适宜

如果您希望通过上面示例中的枚举来使用枚举的嵌套形式`Error`，那么您可以使用以下语法将它们实例化为变量:

```sway
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

### 枚举内存布局

> **注释**
> 如果您是语言新手，或者是编程新手，那么这些信息并不重要。

枚举确实有一些内存开销。为了了解所表示的变体，Sway 为枚举变体存储一个单字（8 字节）标签。标记后保留的空间相当于最大枚举变量的大小。因此，要计算内存中枚举的大小，请将 8 个字节添加到最大变体的大小。例如，在上述情况下 `Color` ，变体均为`()`，则大小将为 8 字节，因为最大变体的大小为 0 字节。
