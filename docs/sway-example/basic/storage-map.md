# 存储映射
在Sway中的存储映射示例

```sway
contract;

use std::auth::msg_sender;

// StorageMap
// - 基本操作（插入、读取、更新、删除）
// - 嵌套

abi MyContract {
    #[storage(read, write)]
    fn basic_examples();

    #[storage(read, write)]
    fn nested_examples();
}

storage {
    balance_of: StorageMap<Identity, u64> = StorageMap {},
    allowance: StorageMap<(Identity, Identity), u64> = StorageMap {},
}

const ADDR: b256 = 0x1000000000000000000000000000000000000000000000000000000000000000;

impl MyContract for Contract {
    #[storage(read, write)]
    fn basic_examples() {
        let sender = msg_sender().unwrap();

        // 插入
        storage.balance_of.insert(sender, 123);
        // 读取
        let bal = storage.balance_of.get(sender).unwrap_or(0);
        // 更新
        storage.balance_of.insert(sender, bal + 1);
        // 删除
        storage.balance_of.remove(sender);
    }

    #[storage(read, write)]
    fn nested_examples() {
        let sender = msg_sender().unwrap();
        let spender = Identity::Address(Address::from(ADDR));

        // 读取
        let val = storage.allowance.get((sender, spender)).unwrap_or(0);
        // 插入 / 更新
        storage.allowance.insert((sender, spender), val + 1);
        // 删除
        storage.allowance.remove((sender, spender));
    }
}
```
