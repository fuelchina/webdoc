# 注释和日志

## 注释

Sway 中的注释以两个斜杠开始，一直持续到行尾。对于超出一行的注释，您需要//在每一行中包含注释。

```rust
// hello world
```

```rust
// let's make a couple of lines
// commented.
```

你还可以在包含代码的行的末尾放置注释。

```rust
fn main() {
    let baz = 8; // Eight is a lucky number
}
```

你还可以进行块注释。

```rust
fn main() {
    /*
    You can write on multiple lines
    like this if you want
    */
    let baz = 8;
}
```

## Logging


`logging` 库提供了一个通用 `log` 函数，可以使用该函数导入 `use std::logging::log` 并用于记录任何类型的变量。每次调用 `log` 都会在 `receipts list` 中添加一个 `receipts`。
`log` 可以生成两种类型的收据:`Log` 和 `LogData`。

```rust
fn log_values(){
  // Generates a Log receipt
  log(42);

  // Generates a LogData receipt
  let string = "sway";
  log(string);
}
```

### Log Receipt

收据`Log` 是为非引用类型生成的，即`bool`、`u8`、`u16`、`u32`和`u64`。

例如，使用`log(x)`记录保存值`42`的整数变量`x`可能会生成以下收据:

```console
"Log": {
  "id": "0000000000000000000000000000000000000000000000000000000000000000",
  "is": 10352,
  "pc": 10404,
  "ra": 42,
  "rb": 1018205,
  "rc": 0,
  "rd": 0
}
```

请注意`ra`将包含被记录的值。当使用`log`时，额外的寄存器`rc`和`rd`将为零，而`rb`可能包含一个非零值，表示`log`实例的唯一ID。唯一ID本身没有意义，但允许Rust和TS sdk通过在JSON ABI文件中查找日志ID来知道记录的数据的类型。

### LogData Receipt

`LogData` 为引用类型生成，其中包括除非引用类型之外的所有类型；对于 大于 64 位整数的非引用类型，例如 `u256`；

例如，使用 `log(b)` 记录一个名为 `b` 的 `b256` 变量，其值为 `0x1111111111111111111111111111111111111111111111111111111111111111`，可能会生成以下收据:


```console
"LogData": {
  "data": "1111111111111111111111111111111111111111111111111111111111111111",
  "digest": "02d449a31fbb267c8f352e9968a79e3e5fc95c1bbeaa502fd6454ebde5a4bedc",
  "id": "0000000000000000000000000000000000000000000000000000000000000000",
  "is": 10352,
  "len": 32,
  "pc": 10444,
  "ptr": 10468,
  "ra": 0,
  "rb": 1018194
}
```

请注意 `data`上面的 中将包含以十六进制记录的值。与`log`收据类似，附加寄存器被写入:`ra`使用 时将始终为零 `log`,同时 `rb` 将包含实例的唯一 ID `log`。
> **Note**
> 注意 Rust SDK 公开了[APIs](https://fuellabs.github.io/fuels-rs/master/calling-contracts/logs.html#logs)，允许您检索记录的值并根据 JSON ABI 文件中指示的类型很好地显示它们。
