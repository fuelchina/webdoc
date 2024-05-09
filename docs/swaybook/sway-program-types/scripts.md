# 脚本

脚本是链上可运行的字节码，执行一次以完成某些任务。它不代表任何资源的所有权，也不能被合约调用。一个脚本可以返回任何类型的单个值。

脚本是有状态意识的，尽管它们没有持久存储（因为它们只存在于交易期间），但它们可以调用合约并根据返回的值和结果进行操作。
以下是一个调用合约的示例脚本：

```sway
script;

use std::constants::ZERO_B256;
use wallet_abi::Wallet;

fn main() {
    let contract_address = 0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b;
    let caller = abi(Wallet, contract_address);
    let amount_to_send = 200;
    let recipient_address = Address::from(0x9299da6c73e6dc03eeabcce242bb347de3f5f56cd1c70926d76526d7ed199b8b);
    caller
        .send_funds {
            gas: 10000,
            coins: 0,
            asset_id: ZERO_B256,
        }(amount_to_send, recipient_address);
}
```

脚本与谓词类似，都依赖一个 `main()` 函数作为入口点。你可以从 `main()` 函数调用脚本中定义的其他函数，或通过 [ABI 转换](./smart_contracts.md#calling-a-smart-contract-from-a-script) 调用另一个合约。

脚本的使用案例可以是一个路由器，它通过多个去中心化交易所进行资金交易以获得输入资产的价格，或者是一个通过闪贷重新调整抵押债务头寸的脚本。

## 脚本和SDK

与可以直接调用合约（但只能调用单个合约）的 EVM 交易不同，Fuel 交易执行一个脚本，该脚本可以调用零个或多个合约。Rust 和 TypeScript SDK 提供了函数来调用合约方法，就像它们直接调用合约一样。在底层，SDK 将所有合约调用包装在脚本中，这些脚本包含少量的代码，这些代码仅负责执行调用并将脚本数据作为调用参数转发。