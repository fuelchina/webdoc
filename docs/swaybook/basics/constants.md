# 常量

常量与变量类似; 但是，存在一些差异:

- 常量总是在编译时求值。
- 常量可以在[函数](../index.md)内部和全局/impl范围内声明。
- 该 `mut` 关键字不能与常量一起使用。
<!-- constants:example:end -->

```sway
const ID: u32 = 0;
```
常量初始值设定项表达式可能非常复杂，但它们不能使用例如汇编指令、存储访问、可变变量、循环和 `return`语句。
尽管如此，函数调用、原始类型和复合数据结构都非常适合使用：

```sway
fn bool_to_num(b: bool) -> u64 {
    if b {
        1
    } else {
        0
    }
}

fn arr_wrapper(a: u64, b: u64, c: u64) -> [u64; 3] {
    [a, b, c]
}

const ARR2 = arr_wrapper(bool_to_num(1) + 42, 2, 3);
```

## 相关常量

关联常量是与类型关联的常量，可以在`impl`块或`trait`定义中声明。

定义内声明的关联常量`trait`可以省略其初始值设定项，以指示特征的每个实现都必须指定这些初始值设定项。

标识符是路径中使用的常量的名称。类型是定义必须实现的类型。

您可以直接在特征的界面表面中定义关联： `const`
```sway
script;

trait ConstantId {
    const ID: u32 = 0;
}
```

或者，你也可以在特征中声明它，并在实现该特征的类型的接口中实现它。

```sway
script;

trait ConstantId {
    const ID: u32;
}

struct Struct {}

impl ConstantId for Struct {
    const ID: u32 = 1;
}

fn main() -> u32 {
    Struct::ID
}
```

### `impl self` 常量

常量也可以在非特征`impl`块内声明。

```sway
script;

struct Point {
    x: u64,
    y: u64,
}

impl Point {
    const ZERO: Point = Point { x: 0, y: 0 };
}

fn main() -> u64  {
    Point::ZERO.x
}
```

## 可配置常量

可配置常量是特殊常量，其行为类似于常规常量，因为它们在程序执行期间无法更改，但可以在构建 Sway 程序后对其进行配置。 
Rust 和 TS SDK 允许通过直接在字节码中注入新值来更新这些常量的值，而无需再次构建程序。
这些对于合同工厂很有用，其行为与`immutableSolidity` 等语言中的变量有些相似。

可配置常量在块内声明 `configurable` ，并且需要类型归属和初始值设定项，如下所示：

```sway
configurable {
    U8: u8 = 8u8,
    BOOL: bool = true,
    ARRAY: [u32; 3] = [253u32, 254u32, 255u32],
    STR_4: str[4] = __to_str_array("fuel"),
    STRUCT: StructWithGeneric<u8> = StructWithGeneric {
        field_1: 8u8,
        field_2: 16,
    },
    ENUM: EnumWithGeneric<bool> = EnumWithGeneric::VariantOne(true),
}

```

一个Sway项目中最多`configurable`允许有1个区块。此外，`configurable`图书馆中不允许使用区块。

可配置常量可以像常规常量一样直接读取：

```sway
    fn return_configurables() -> (u8, bool, [u32; 3], str[4], StructWithGeneric<u8>) {
        (U8, BOOL, ARRAY, STR_4, STRUCT)
    }
```
