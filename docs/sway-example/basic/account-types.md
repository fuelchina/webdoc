# 账户类型

账户类型封装了一个b256哈希，以清晰且安全地定义其特定用例。每种相应类型在拥有的令牌和处理方式上有所不同。

| 类型        | 包括                               | 是否支持地址       | 是否支持合约       |
|-------------|------------------------------------|-------------------|-------------------|
| 地址         | 外部拥有账户（EOAs）和谓词         | ✅               | ❌                |
| ContractId  | 合约                               | ❌                | ✅                |

身份（Identity）账户类型将前述的地址和合约ID类型统一起来。当预期类型是不可知的时候，应该使用它。

```
Identity
├── Address
└── ContractId
```

```sway
contract;

dep interface;
use interface::*;

use std::{
    constants::ZERO_B256,
    auth::msg_sender,
    identity::*,
};

storage {
    my_address_identity: Address = Address::from(secret_b256),
    my_contract_identity: ContractId = ContractId::from(secret_b256),
}

impl AccountTypes for Contract {
    fn convert_b256_to_address(some_b256: b256) -> Address {
        return Address::from(some_b256);
    }

    fn convert_b256_to_contract(some_b256: b256) -> ContractId {
        return ContractId::from(some_b256);
    }

    fn convert_b256_to_identity(some_b256: b256) -> Identity {
        return Identity::ContractId(ContractId::from(some_b256));
        // return Identity::Address(Address::from(some_b256));
    }
    
    // 期望调用此函数的是合约和/或EOA
    #[storage(read)]
    fn match_identity(some_identity: Identity) -> str[17] {
        let my_contract_identity = storage.my_contract_identity;
        let my_address_identity = storage.my_address_identity;

        match some_identity {
            my_contract_identity => {
                /* 
                处理合约相关的操作
                transfer_to_address(amount, token_id, address)
                */
                "Contract Identity"
            },
            my_address_identity => {
                /* 
                处理地址相关的操作
                force_transfer_to_contract(amount, token_id, contract_id)
                */
                "Address Identity!"
            },
            _ => "Mismatch Identity",
        }
    }
}
```