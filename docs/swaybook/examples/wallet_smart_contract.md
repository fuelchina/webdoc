
# 钱包智能合约

ABI 声明是与 ABI 实现分开的项目。代码的项目结构应该组织如下，其中 `wallet_abi` 被视为外部库：

```sh
.
├── wallet_abi
│   ├── Forc.toml
│   └── src
│       └── main.sw
└── wallet_smart_contract
    ├── Forc.toml
    └── src
        └── main.sw
```

在使用外部库时，在项目的 `Forc.toml` 文件中指定依赖项的来源也很重要。在 `wallet_smart_contract` 项目内部，需要这样的声明：

```sh
[dependencies]
wallet_abi = { path = "../wallet_abi/" }
```

## ABI 声明

```rust
library;

abi Wallet {
    #[storage(read, write), payable]
    fn receive_funds();

    #[storage(read, write)]
    fn send_funds(amount_to_send: u64, recipient_address: Address);
}

```

## ABI 实现

```rust
contract;

use std::{asset::transfer, call_frames::msg_asset_id, context::msg_amount,};

use wallet_abi::Wallet;
const OWNER_ADDRESS = Address::from(0x8900c5bec4ca97d4febf9ceb4754a60d782abbf3cd815836c1872116f203f861);

storage {
    balance: u64 = 0,
}

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