# [使用命令行进行调试](https://docs.fuel.network/docs/sway/debugging/debugging_with_cli/#debugging-with-cli)

命令行工具 `forc debug` CLI 允许开发者在一个运行中的Fuel客户端节点上对实时交易进行调试。

## [示例工程](https://docs.fuel.network/docs/sway/debugging/debugging_with_cli/#an-example-project)

首先，我们需要创建一个工程开始我们的调试，可以使用以下命令行创建一个示例工程：

```shell
forc new --script dbg_example && cd dbg_example
```

然后在`src/main.sw`添加以下内容：

```sway
script;
 
use std::logging::log;
 
fn factorial(n: u64) -> u64 {
    let mut result = 1;
    let mut counter = 0;
    while counter < n {
        counter = counter + 1;
        result = result * counter;
    }
    return result;
}
 
fn main() {
    log::<u64>(factorial(5)); // 120
}
```

## [编译和字节码输出](https://docs.fuel.network/docs/sway/debugging/debugging_with_cli/#building-and-bytecode-output)

现在我们可以开始编译我们的工程：

```
forc build
```

执行上一步骤后，我们可以在 `out/debug/dbg_example.bin`找到编译生成的二进制文件。我们可以使用以下命令行来读取字节码内容：

```
forc parse-bytecode out/debug/dbg_example.bin
```

上述命令行输入结果如下：

```
  half-word   byte   op                                    raw           notes
          0   0      JI { imm: 4 }                         90 00 00 04   jump to byte 16
          1   4      NOOP                                  47 00 00 00
          2   8      InvalidOpcode                         00 00 00 00   data section offset lo (0)
          3   12     InvalidOpcode                         00 00 00 44   data section offset hi (68)
          4   16     LW { ra: 63, rb: 12, imm: 1 }         5d fc c0 01
          5   20     ADD { ra: 63, rb: 63, rc: 12 }        10 ff f3 00
          6   24     MOVE { ra: 18, rb: 1 }                1a 48 10 00
          7   28     MOVE { ra: 17, rb: 0 }                1a 44 00 00
          8   32     LW { ra: 16, rb: 63, imm: 0 }         5d 43 f0 00
          9   36     LT { ra: 16, rb: 17, rc: 16 }         16 41 14 00
         10   40     JNZI { ra: 16, imm: 13 }              73 40 00 0d   conditionally jump to byte 52
         11   44     LOG { ra: 18, rb: 0, rc: 0, rd: 0 }   33 48 00 00
         12   48     RET { ra: 0 }                         24 00 00 00
         13   52     ADD { ra: 17, rb: 17, rc: 1 }         10 45 10 40
         14   56     MUL { ra: 18, rb: 18, rc: 17 }        1b 49 24 40
         15   60     JI { imm: 8 }                         90 00 00 08   jump to byte 32
         16   64     NOOP                                  47 00 00 00
         17   68     InvalidOpcode                         00 00 00 00
         18   72     InvalidOpcode                         00 00 00 05
```

我们可以通过条件跳转指令 `JNZI` 来识别出 `while` 循环的存在。在第一次跳转前的条件可以通过 `LT` 指令（用于 `<` 比较）看出。我们的代码中有一些指令只生成了一次，比如乘法运算指令`MUL`以及日志函数`LOG {.., 0, 0, 0}`。

## [设置调试环境](https://docs.fuel.network/docs/sway/debugging/debugging_with_cli/#setting-up-the-debugging)

我们可以启动调试环境。在一个新的终端窗口中运行 `fuel-core run --db-type in-memory --debug`；我们需要保持这个进程运行，因为它实际上是在执行程序。现在我们可以启动调试器本身：`forc-debug`。如果一切设置正确，你会看到调试器的提示符 (`>>`)。你可以使用 `help` 命令来列出所有可用的命令。

现在我们希望在程序运行过程中对其进行检查。为此，我们首先需要将脚本发送给执行器，即 `fuel-core`。为此，我们需要一个交易规范文件 `tx.json`。其格式如下所示：

```
{
  "Script": {
    "body": {
      "script_gas_limit": 1000000,
      "script": [
        144,
        0,
        0,
        4,
        71,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        68,
        93,
        252,
        192,
        1,
        16,
        255,
        243,
        0,
        26,
        72,
        16,
        0,
        26,
        68,
        0,
        0,
        93,
        67,
        240,
        0,
        22,
        65,
        20,
        0,
        115,
        64,
        0,
        13,
        51,
        72,
        0,
        0,
        36,
        0,
        0,
        0,
        16,
        69,
        16,
        64,
        27,
        73,
        36,
        64,
        144,
        0,
        0,
        8,
        71,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        5
      ],
      "script_data": [],
      "receipts_root": "0000000000000000000000000000000000000000000000000000000000000000"
    },
    "policies": {
      "bits": "MaxFee",
      "values": [
        0,
        0,
        0,
        0
      ]
    },
    "inputs": [
      {
        "CoinSigned": {
          "utxo_id": {
            "tx_id": "c49d65de61cf04588a764b557d25cc6c6b4bc0d7429227e2a21e61c213b3a3e2",
            "output_index": 18
          },
          "owner": "f1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e",
          "amount": 10599410012256088000,
          "asset_id": "2cafad611543e0265d89f1c2b60d9ebf5d56ad7e23d9827d6b522fd4d6e44bc3",
          "tx_pointer": {
            "block_height": 0,
            "tx_index": 0
          },
          "witness_index": 0,
          "maturity": 0,
          "predicate_gas_used": null,
          "predicate": null,
          "predicate_data": null
        }
      }
    ],
    "outputs": [],
    "witnesses": [
      {
        "data": [
          156,
          254,
          34,
          102,
          65,
          96,
          133,
          170,
          254,
          105,
          147,
          35,
          196,
          199,
          179,
          133,
          132,
          240,
          208,
          149,
          11,
          46,
          30,
          96,
          44,
          91,
          121,
          195,
          145,
          184,
          159,
          235,
          117,
          82,
          135,
          41,
          84,
          154,
          102,
          61,
          61,
          16,
          99,
          123,
          58,
          173,
          75,
          226,
          219,
          139,
          62,
          33,
          41,
          176,
          16,
          18,
          132,
          178,
          8,
          125,
          130,
          169,
          32,
          108
        ]
      }
    ]
  }
}
```

`script` 键应包含实际要执行的字节码，即将 `out/debug/dbg_example.bin` 文件中的二进制内容转换为 JSON 数组。可以使用以下命令来生成它：

```
python3 -c 'print(list(open("out/debug/dbg_example.bin", "rb").read()))'
```

接下来，用生成的结果替换 `script` 数组的内容，并将文件保存为 `tx.json`。

## [使用调试器](https://docs.fuel.network/docs/sway/debugging/debugging_with_cli/#using-the-debugger)

现在我们可以实际的开始执行脚本

```
>> start_tx tx.json

Receipt: Log { id: 0000000000000000000000000000000000000000000000000000000000000000, ra: 120, rb: 0, rc: 0, rd: 0, pc: 10380, is: 10336 }
Receipt: Return { id: 0000000000000000000000000000000000000000000000000000000000000000, val: 0, pc: 10384, is: 10336 }
Receipt: ScriptResult { result: Success, gas_used: 60 }
Terminated
```

观察第一行输出，我们可以看到它记录了 `ra: 120`，这是 `factorial(5)` 的正确返回值。它还告诉我们执行终止时没有触发任何断点。这是因为我们尚未设置任何断点。我们可以通过 `breakpoint` 命令来设置：

```
>> breakpoint 0

>> start_tx tx.json

Receipt: ScriptResult { result: Success, gas_used: 0 }
Stopped on breakpoint at address 0 of contract 0x0000000000000000000000000000000000000000000000000000000000000000
```

现在我们在入口处（地址 `0`）的断点处停止了执行。我们现在可以检查虚拟机（VM）的初始状态。

```
>> register ggas

reg[0x9] = 1000000  # ggas

>> memory 0x10 0x8

 000010: e9 5c 58 86 c8 87 26 dd
```

不过，这也没有太多值得留意的地方，所以让我们直接执行到结束，然后重置虚拟机以移除断点。

```
>> continue

Receipt: Log { id: 0000000000000000000000000000000000000000000000000000000000000000, ra: 120, rb: 0, rc: 0, rd: 0, pc: 10380, is: 10336 }
Receipt: Return { id: 0000000000000000000000000000000000000000000000000000000000000000, val: 0, pc: 10384, is: 10336 }
Terminated

>> reset
```

接下来，我们将设置一个断点，以检查每次 `while` 循环迭代时的状态。例如，如果我们想要看到哪些数字被相乘在一起，我们可以在操作之前设置断点。字节码中只有一个 `MUL` 指令：

```
  half-word   byte   op                                    raw           notes
         14   56     MUL { ra: 18, rb: 18, rc: 17 }        1b 49 24 40
```

我们可以在其地址上设置断点，即半字偏移量 `14` 处。

```
>>> breakpoint 14

>> start_tx tx.json

Receipt: ScriptResult { result: Success, gas_used: 9 }
Stopped on breakpoint at address 56 of contract 0x0000000000000000000000000000000000000000000000000000000000000000
```

现在我们可以检查乘法的输入。根据[规范文档](https://github.com/FuelLabs/fuel-specs/blob/master/src/fuel-vm/instruction-set.md#mul-multiply)，指令 `MUL { ra: 18, rb: 18, rc: 17 }` 表示 `reg[18] = reg[18] * reg[17]`。因此检查输入可以告诉我们：

```
>> r 18 17

reg[0x12] = 1        # reg18
reg[0x11] = 1        # reg17
```

在第一轮中，数字是 `1` 和 `1`，我们可以继续进行下一次迭代：

```
>> c

Stopped on breakpoint at address 56 of contract 0x0000000000000000000000000000000000000000000000000000000000000000

>> r 18 17

reg[0x12] = 1        # reg18
reg[0x11] = 2        # reg17
```

第三轮：

```
>> c

Stopped on breakpoint at address 56 of contract 0x0000000000000000000000000000000000000000000000000000000000000000

>> r 18 17

reg[0x12] = 2        # reg18
reg[0x11] = 3        # reg17
```

第四轮：

```
>> c

Stopped on breakpoint at address 56 of contract 0x0000000000000000000000000000000000000000000000000000000000000000

>> r 18 17

reg[0x12] = 6        # reg18
reg[0x11] = 4        # reg17
```

第五轮：

```
>> c

Stopped on breakpoint at address 56 of contract 0x0000000000000000000000000000000000000000000000000000000000000000

>> r 18 17

reg[0x12] = 24       # reg18
reg[0x11] = 5        # reg17
```

现在我们可以查看所有值：

| 17   | 18   |
| :--- | :--- |
| 1    | 1    |
| 2    | 1    |
| 3    | 2    |
| 4    | 6    |
| 5    | 24   |

从这里我们可以清楚地看到，左侧的寄存器 `17` 是 `counter` 变量，而寄存器 `18` 是 `result`。现在计数器等于给定阶乘函数参数 `5`，循环终止。当我们继续时，程序将在不遇到其他断点的情况下结束。

```
>> c

Receipt: Log { id: 0000000000000000000000000000000000000000000000000000000000000000, ra: 120, rb: 0, rc: 0, rd: 0, pc: 10380, is: 10336 }
Receipt: Return { id: 0000000000000000000000000000000000000000000000000000000000000000, val: 0, pc: 10384, is: 10336 }
Terminated
```

