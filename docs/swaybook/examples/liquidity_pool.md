# 流动性池示例

在 Fuel 中，所有的合约都可以铸造和销毁自己的本地资产。合约也可以接收和转移任何本地资产，包括它们自己的资产。通过调用或由合约铸造的所有本地资产的内部余额都由 FuelVM 跟踪，并可以使用 `std` 库中的 `balance_of` 函数在任何时候查询。因此，不需要使用持久存储手动进行合约余额的任何会计。

`std` 库提供了方便的方法来访问 Fuel 的本地资产操作。

在这个示例中，我们展示了一个基本的流动性池合约，它铸造了自己的本地资产 LP 资产。

```rust
contract;

use std::{
    asset::{
        mint_to,
        transfer,
    },
    call_frames::msg_asset_id,
    constants::DEFAULT_SUB_ID,
    context::msg_amount,
    hash::*,
};

abi LiquidityPool {
    fn deposit(recipient: Address);
    fn withdraw(recipient: Address);
}

const BASE_ASSET: AssetId = AssetId::from(0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c);

impl LiquidityPool for Contract {
    fn deposit(recipient: Address) {
        assert(msg_asset_id() == BASE_ASSET);
        assert(msg_amount() > 0);

        // 铸造两倍的数量。
        let amount_to_mint = msg_amount() * 2;

        // 根据基础资产的数量铸造一些 LP 资产。
        mint_to(Identity::Address(recipient), DEFAULT_SUB_ID, amount_to_mint);
    }

    fn withdraw(recipient: Address) {
        let asset_id = AssetId::default();
        assert(msg_asset_id() == asset_id);
        assert(msg_amount() > 0);

        // 要提取的金额。
        let amount_to_transfer = msg_amount() / 2;

        // 将基础资产转移到接收者。
        transfer(Identity::Address(recipient), BASE_ASSET, amount_to_transfer);
    }
}
```