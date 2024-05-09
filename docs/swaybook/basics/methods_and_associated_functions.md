# 方法和函数

<!-- This section should explain methods & associated functions in Sway -->
<!-- methods_af:example:start -->
方法与函数类似，我们使用`fn`关键字声明它们，并且它们具有参数并返回一个值。然而，与函数不同，方法是在结构（或枚举）的上下文中定义的，并且引用该类型或改变它。方法的第一个参数总是`self`，它表示调用该方法的结构体的实例。

关联函数与方法非常相似，因为它们也是在结构体或枚举的上下文中定义的，但它们实际上并不使用结构体中的任何数据，因此不将`self`作为参数。关联函数可以是独立函数，但出于组织或语义原因，它们包含在特定类型中。

要声明结构体或枚举的方法和关联函数，请使用`impl`块。这里，`impl`是实现的缩写。
<!-- methods_af:example:end -->

```rust
script;

struct Foo {
    bar: u64,
    baz: bool,
}

impl Foo {
    // this is a _method_, as it takes `self` as a parameter.
    fn is_baz_true(self) -> bool {
        self.baz
    }

    // this is an _associated function_, since it does not take `self` as a parameter.
    fn new_foo(number: u64, boolean: bool) -> Foo {
        Foo {
            bar: number,
            baz: boolean,
        }
    }
}

fn main() {
    let foo = Foo::new_foo(42, true);
    assert(foo.is_baz_true());
}

```

<!-- This section should explain how to call a method -->
<!-- call_method:example:start -->
To call a method, simply use dot syntax: `foo.iz_baz_true()`.
<!-- call_method:example:end -->

<!-- This section should explain how methods + assoc. fns can accept `ref mut` params -->
<!-- ref_mut:example:start -->
Similarly to [free functions](functions.md), methods and associated functions may accept `ref mut` parameters.
<!-- ref_mut:example:end -->

For example:

```rust
struct Coordinates {
    x: u64,
    y: u64,
}

impl Coordinates {
    fn move_right(ref mut self, distance: u64) {
        self.x += distance;
    }
}

```

当被调用时:

```rust
    let mut point = Coordinates { x: 1, y: 1 };
    point.move_right(5);
    assert(point.x == 6);
    assert(point.y == 1);

```
