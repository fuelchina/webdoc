# 所有权

在Sway中没有修饰符，这意味着需要访问控制的函数需要以不同的方式进行错误检查。设置和撤销所有权也需要有它们自己的函数。

注意：这里使用 Identity 类型，因为所有者可以是地址或合约ID。

```sway
contract;

dep errors;

use errors::*;

use std::{
    revert::require,
    auth::{AuthError, msg_sender},
};

abi OwnershipExample {
    #[storage(read, write)]
    fn revoke_ownership();
    #[storage(read, write)]
    fn set_owner(identity: Identity);
    #[storage(read)]
    fn owner() -> Option<Identity>;
}

storage {
    owner: Option<Identity> = Option::None,
}

impl OwnershipExample for Contract {
    #[storage(read, write)]
    fn revoke_ownership() {
        let sender: Result<Identity, AuthError> = msg_sender(); 
        // 所有权访问控制！
        require(sender.unwrap() == storage.owner.unwrap(), OwnerError::IsNotOwner);
        storage.owner = Option::None();
    }

    #[storage(read, write)]
    fn set_owner(identity: Identity) {
        let sender: Result<Identity, AuthError> = msg_sender(); 
        // 所有权访问控制！
        require(sender.unwrap() == storage.owner.unwrap(), OwnerError::IsNotOwner);
        storage.owner = Option::Some(identity);
    }

    #[storage(read)]
    fn owner() -> Option<Identity> {
        storage.owner
    }
}
```