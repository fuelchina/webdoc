# 初始化

在Sway中没有构造函数，因此初始化是以不太一样的方式进行的。预定的变量可以在forc.toml的常量下声明。在编译时，变量将被初始化并可以传递到合约的存储中。

forc.toml

```toml
[project]
authors = ["Call Delegation"]
entry = "main.sw"
license = "Apache-2.0"
name = "initialization"

# 下面的值是每次测试时Fuel SDK生成的第一个地址。它们每次都相同
[constants]
owner = { type = "b256", value = "0x1111111111111111111111111111111111111111111111111111111111111111" }

[dependencies]

```
main.sw

```sway
contract;

dep lib;
dep errors;

use lib::*;
use errors::*;
use std::{
    identity::Identity,
    constants::ZERO_B256,
};

abi Initialization {
    #[storage(write)]
    fn transfer_ownership(new_owner: Identity);

    #[storage(read)]
    fn owner() -> Identity;
}

storage {
    owner: Identity = Identity::Address(Address {
        // Forc.toml 初始化的拥有者
        value: owner,
    })
}

impl Initialization for Contract {
    #[storage(write)]
    fn transfer_ownership(new_owner: Identity) {
        require(
            new_owner != Identity::Address(Address {value: ZERO_B256}), 
            OwnerError::NewOwnerCannotBeZeroAddress
        );
        storage.owner = new_owner
    }

    #[storage(read)]
    fn owner() -> Identity {
        storage.owner
    }
}
```

另一种不同的方法是通过创建自己的构造函数来跟踪初始化状态。然后，可以通过要求后续相关函数检查状态是否已初始化来强制执行初始化。

main.sw

```sway
contract;

...

storage {
    state: State = State::NotInitialized,
    blockchain_type: str[11] = "monolithic!",
}

impl Initialization for Contract {
    #[storage(read, write)]
    fn initialize() {
        // 将合约状态设置为已初始化
        require(storage.state == State::NotInitialized, InitializationError::CannotReinitialize);
        storage.state = State::Initialized;
    }

    #[storage(read, write)]
    fn upgrade_blockchain() {
        // 函数确保合约已初始化
        require(storage.state == State::Initialized, InitializationError::ContractNotInitialized);
        storage.blockchain_type = "**modular**"
    }

    #[storage(read)]
    fn blockchain() -> str[11] {
        storage.blockchain_type
    }
}
```