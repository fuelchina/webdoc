# 调用其他合约
合约到合约的调用可以通过导入被调用合约的ABI并调用所需的函数来简单实现。

main.sw

```sway
contract;

dep alice;
use alice::Alice;

abi Bob {
    #[storage(write, read)]
    fn copy_alices_number(contract_id: b256) -> u64;
}

storage {
    copied_number: u64 = 0,
}

impl Bob for Contract {
    #[storage(write, read)]
    fn copy_alices_number(contract_id: b256) -> u64 {
        // 调用其他合约
        let alice_contract = abi(Alice, contract_id);
        storage.copied_number = alice_contract.get_number();
        return storage.copied_number;
    }
}
```

interface.sw

```sway
contract;

abi Alice {
    #[storage(read)]
    fn get_number() -> u64;
}

storage {
    favourite_number: u64 = 42,
}

impl Alice for Contract {
    #[storage(read)]
    fn get_number() -> u64 {
        return storage.favourite_number;
    }
}
```