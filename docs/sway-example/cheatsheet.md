
# Solidity → Sway 的常用项目快速对照表

- block.timestamp
- msg.sender
- 等等
- 如果这里缺少某些内容，你可以在 Sway 标准库[这里](/swaybook/introduction/index)找到

```sway
contract;

dep interface;
use interface::*;

use std::{
    identity::Identity,
    block::{ height, timestamp },
    auth::msg_sender,
    constants::*,
    u128::U128
};

impl SolidityCheatsheet for Contract {
    fn get_blocknumber() -> u64 {
        return height(); // block.number 的等价物
    }
    
    fn get_blocktime() -> u64 {
        return timestamp(); // block.timestamp 的等价物
    }
    
    fn get_msg_sender() -> Identity{
        return msg_sender().unwrap(); // msg.sender 的等价物
    }

    fn get_u128_number() -> U128 { 
        /*  在 Sway 中没有 uint128，所以它由两个 64 位组件组成
            在库中，Sway 团队还提供了完整的操作列表
            如指数、加法、减法、乘法、除法、平方根等
            操作列表位于此处 https://github.com/FuelLabs/sway/blob/master/sway-lib-std/src/u128.sw
            请注意，还有一个由四个 64 位组件组成的 uint256 的等价物
        */
        return U128::from((0, 12)) + U128::from((0, 12)); // uint128 的等价物
    }
}
```
