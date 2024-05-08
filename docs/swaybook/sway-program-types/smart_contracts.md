
# 什么是智能合约？

智能合约与脚本或谓词没有太大的区别，因为它们都是通过[交易](https://fuellabs.github.io/fuel-specs/master/protocol/tx_format)部署到区块链上的一段字节码。智能合约与脚本或谓词的主要区别在于它们是可调用的且有状态的。换句话说，智能合约类似于部署了一些数据库状态的API。

智能合约的接口，也称为合约，必须严格定义为[ABI声明](#the-abi-declaration)。参见[此合约](../examples/wallet_smart_contract.md)作为示例。

## 智能合约的语法

与任何Sway程序一样，程序始于声明其[程序类型](./index.md)。合约还必须定义或导入[ABI声明](#the-abi-declaration)并实现它。

<!-- This section should explain best practices for ABIs -->
<!-- ABI:example:start -->
定义ABI声明为一个单独的库并将其导入到合约中被认为是一种良好的做法。这允许调用者只需直接导入ABI，并在其脚本中使用它来调用您的合约。
<!-- ABI:example:end -->

让我们看看库中的ABI声明：

```rust
library;

abi Wallet {
    #[storage(read, write), payable]
    fn receive_funds();

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);
}
```

让我们专注于ABI声明并逐行检查它。

### ABI声明

```rust
abi Wallet {
    #[storage(read, write), payable]
    fn receive_funds();

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);
}

```

---

在第一行中，我们声明了这个_应用程序二进制接口_（ABI）的名称，或ABI。我们将这个ABI命名为`Wallet`。要将此ABI导入到调用或实现的脚本中，您可以使用

```rust
use wallet_abi::Wallet;
```

---

在第二行中，

```rust
#[storage(read, write), payable]
fn receive_funds();
```

我们声明了一个名为`receive_funds`的ABI方法，当调用时，应将资金收到此钱包。请注意，我们只是定义了一个接口，所以没有_函数体_或函数的实现。我们只需要定义接口本身。在这方面，ABI声明类似于[特征声明](../advanced/traits.md)。这个特定的ABI方法不接受任何参数。

---

在第三行中，

```rust
#[storage(read, write)]
fn send_funds(amount_to_send: u64, recipient_address: Address);
```

我们声明了另一个ABI方法，这次称为`send_funds`。它接受两个参数：要发送的金额和要发送资金的地址。

>**注意**：ABI方法`receive_funds`和`send_funds`还需要注释`#[storage(read, write)]`，因为它们的实现需要读取和写入存储变量，用于跟踪钱包余额，稍后我们将看到。有关存储注释的更多信息，请参阅[Purity](../blockchain-development/purity.md#Purity)。

## 为智能合约实现ABI

现在我们已经讨论了如何定义接口，让我们讨论如何使用它。我们将从为特定合约实现上面的ABI开始。

通过使用`impl <ABI name> for Contract`语法实现合约的ABI。`for Contract`语法只能用于为合约实现ABI；为结构体实现方法应使用`impl Foo`语法。

```rust
impl Wallet for Contract {
    #[storage(read, write), payable]
    fn receive_funds() {
        if msg_asset_id() == AssetId::base() {
            // 如果我们收到的是基础资产，则跟踪余额。
            // 否则，我们收到的是其他本地资产，我们不关心我们的货币余额。
            storage.balance.write(storage.balance.read() + msg_amount());
        }
    }

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address) {
        let sender = msg_sender().unwrap();
        match sender {
            Identity::Address(addr) => assert(addr == OWNER_ADDRESS),
            _ => revert(0),
        };

        let current_balance = storage.balance.read();
        assert(current_balance >= amount_to_send);

        storage.balance.write(current_balance - amount_to_send);

        // 注意：`transfer()` 不是一个调用，因此不是一个交互。
        // 尽管如此，此代码符合检查-效果-交互以避免重入。
        transfer(
            Identity::Address(recipient_address),
            AssetId::base(),
            amount_to_send,
        );
    }
}
```

您可能会再次注意到[特征](../advanced/traits.md)和ABI之间的相似之处。实际上，作为额外的奖励，您可以定义除ABI的接口表面之外的方法，就像一个特征。这些预先实现的ABI方法自动成为实现相应ABI的合约的一部分的接口。

请注意，ABI的上述实现遵循[检查、影响、交互](https://docs.soliditylang.org/en/v0.6.11/security-considerations.html#re-entrancy)模式。

## 从脚本中调用智能合约

>**注意**：在大多数情况下，应该使用[Rust SDK](../testing/testing-with-rust.md)或[TypeScript SDK](../frontend/typescript_sdk.md)来调用合约，这些SDK提供了更符合人体工程学的UI来与合约交互。但是，有时需要手动编写脚本来调用合约。

现在我们已经定义了接口并为我们的合约实现了它，我们需要知道如何实际地_调用_我们的合约。让我们看一下合约调用：

```rust
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

主要的新概念是`abi cast`：`abi(AbiName, contract_address)`。这将返回一个`ContractCaller`类型，可用于调用合约。ABI的方法成为此合约调用者可用的方法：`send_funds`和`receive_funds`。然后，我们直接调用合约ABI方法，就像它只是一个常规方法一样。您还可以选择在主要参数列表之前的大括号中指定以下特殊参数：

1. `gas`：表示调用合约时转发的燃气的`u64`。
2. `coins`：表示与此调用一起转发的硬币数量的`u64`。
3. `asset_id`：表示转发的硬币的资产类型的`b256`的ID。

每个特殊参数都是可选的，当跳过时假定默认值：

1. `gas`的默认值为上下文燃气（即特殊寄存器`$cgas`的内容）。有关上下文燃气的更多信息，请参阅[FuelVM规范](https://fuellabs.github.io/fuel-specs/master/vm)。
2. `coins`的默认值为0。
3. `asset_id`的默认值为`ZERO_B256`。

