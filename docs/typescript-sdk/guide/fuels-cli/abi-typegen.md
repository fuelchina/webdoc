
# ABI 类型生成器

## JSON ABI 文件

无论您是要部署还是连接到预先存在的智能合约，[JSON ABI](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#the-abi-declaration) 文件都是实现这一目标的关键。

它向 SDK 提供有关您的[智能合约](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/)和[脚本](https://docs.fuel.network/docs/sway/sway-program-types/scripts/)中的[ABI 方法](https://docs.fuel.network/docs/sway/sway-program-types/smart_contracts/#the-abi-declaration)的信息。

假设有以下 Sway 智能合约：

```rust:line-numbers
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

JSON ABI 文件将如下所示：

```json
$ cat out/debug/my-test-abi.json
[
  {
    "type": "function",
    "inputs": [],
    "name": "test_function",
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "components": null
      }
    ]
  }
]
```

另请参阅：

- [生成类型](./generating-types.md)
- [使用生成的类型](./using-generated-types.md)