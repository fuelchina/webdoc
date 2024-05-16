# 事件

在Sway中，事件被定义为结构体，通常作为其自己的库，可以像错误或接口一样导入。通过利用标准库中的日志，可以发出自定义事件，以便在函数运行结束时被捕获和索引。

main.sw

```sway
contract;

dep events;

use events::*;
use std::{
    logging::log,
    auth::{
        msg_sender
    },
    constants::ZERO_B256,
};

abi NFT {
    fn mint();
}

impl NFT for Contract {
    fn mint() {
        let sender = Identity::Address(Address {value: ZERO_B256});
        let user = msg_sender().unwrap();
        
        // ... 一些铸造代码 ...

        log(Transfer {
            sender, 
            recipient: user, 
            token_id: 42, 
        })
    }
}
```

events.sw

```sway
library events;

pub struct Transfer {
    sender: Identity,
    recipient: Identity,
    token_id: u64,
}
```