 #  Sway中的内联汇编

虽然许多用户在编写 Sway 代码时永远不需要接触汇编语言，但它是一个强大的工具，可以实现许多高级用例（例如，优化、构建库等）。

## ASM 块

在 Sway 中，我们使用内联汇编的方式是声明一个 `asm` 这样的块： 

```sway
asm() {...}
```

声明 `asm` 块类似于声明函数。我们可以指定要作为参数操作的寄存器名称，可以在块内执行操作，还可以返回值。以下是显示此操作的示例：

```sway
pub fn add_1(num: u32) -> u32 {
    asm(r1: num, r2) {
        add r2 r1 one;
        r2: u32
    }
}
```

一个 `asm` 块只能返回一个寄存器。如果你确实需要返回多个值，你可以修改元组。下面是一个示例，展示了如何实现这一点 `(u64, u64)`:

```sway
script;

fn adder(a: u64, b: u64, c: u64) -> (u64, u64) {
    let empty_tuple = (0u64, 0u64);
    asm(output: empty_tuple, r1: a, r2: b, r3: c, r4, r5) {
        add r4 r1 r2; // add a & b and put the result in r4
        add r5 r2 r3; // add b & c and put the result in r5
        sw output r4 i0; // store the word in r4 in output + 0 words
        sw output r5 i1; // store the word in r5 in output + 1 word
        output: (u64, u64) // return both values
    }
}

fn main() -> bool {
    let (first, second) = adder(1, 2, 3);
    assert(first == 3);
    assert(second == 5);
    true
}
```

请注意，这是一个旨在演示语法的故意设计的例子；完全没有必要使用汇编来添加整数！

请注意，在上面的例子中：

-  `r1` 我们用 的值初始化寄存器 `num`。
- 我们声明了第二个寄存器 `r2` (您可以选择任何您想要的寄存器名称)。
- 我们使用 `add` 操作码将 `one` 加到 `r1` 的值上并将其存储在 `r2`中。
- `one` 是“保留寄存器”的示例，总共有 16 个。有关此内容的更多阅读链接位于下面的“语义”下。
- 我们返回 `r2` 并指定返回类型为 u32（默认返回类型为 u64）。

需要注意的是， `ji` 和 `jnei` 和 `asm` 。对于那些希望将控制流引入`asm` 块的人来说，建议用 `asm` 控制流 (`if`, `else`, 和`while`)包围较小的块。

## 有用的网址

有关组装实际操作的示例，请查看 [Sway 标准库](https://github.com/FuelLabs/sway/tree/master/sway-lib-std)。

有关 FuelVM 中支持的所有指令的完整列表： [指令](https://fuellabs.github.io/fuel-specs/master/vm/instruction_set)。

要了解有关 FuelVM 语义的更多信息： [语义](https://fuellabs.github.io/fuel-specs/master/vm#semantics)。 
