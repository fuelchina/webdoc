# 原生支持多种资产类型

FuelVM 内置了对多种资产处理的支持。

这在实践中意味着什么？

与 EVM 一样，将 ETH 发送到地址或合约是 FuelVM 内置的操作，这意味着它不依赖某些代币智能合约来更新余额以追踪所有权。

然而，与 EVM 不同的是，发送任何原生资产的过程都是相同的。这意味着，虽然你仍然需要一个智能合约来处理可替代资产的铸造和销毁，但这些资产的发送和接收可以独立于资产合约进行。


## 流动资金池示例

Fuel 中的所有合约都可以铸造和销毁自己的原生资产。合约还可以接收和转移任何原生资产，包括自己的原生资产。通过调用推送或由合约铸造的所有原生资产的内部余额均由 FuelVM 跟踪，并且可以随时使用库中的 balance_of 函数进行查询 `std` 。因此，无需使用持久存储手动核算合约的余额。

该 `std` 库提供了访问 Fuel 原生资产操作的便捷方法。

在这个例子中，我们展示了一个基本的流动性池合约铸造了自己的原生资产LP资产。

```sway
contract;

use std::{
    asset::{
        mint_to_address,
        transfer_to_address,
    },
    call_frames::{
        contract_id,
        msg_asset_id,
    },
    constants::DEFAULT_SUB_ID,
    context::msg_amount,
    hash::*,
};

abi LiquidityPool {
    fn deposit(recipient: Address);
    fn withdraw(recipient: Address);
}

const BASE_ASSET: AssetId = AssetId {
    value: 0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c,
};

impl LiquidityPool for Contract {
    fn deposit(recipient: Address) {
        assert(msg_asset_id() == BASE_ASSET);
        assert(msg_amount() > 0);

        // Mint two times the amount.
        let amount_to_mint = msg_amount() * 2;

        // Mint some LP assets based upon the amount of the base asset.
        mint_to_address(recipient, DEFAULT_SUB_ID, amount_to_mint);
    }

    fn withdraw(recipient: Address) {
        let asset_id = AssetId::default();
        assert(msg_asset_id() == asset_id);
        assert(msg_amount() > 0);

        // Amount to withdraw.
        let amount_to_transfer = msg_amount() / 2;

        // Transfer base asset to recipient.
        transfer_to_address(recipient, BASE_ASSET, amount_to_transfer);
    }
}

```

## 原生资产示例

在这个例子中，我们展示了具有更多铸造、销毁和转移功能的原生资产合约。

```sway
contract;

use std::{asset::*, constants::DEFAULT_SUB_ID, context::*};

abi NativeAsset {
    fn mint_coins(mint_amount: u64);
    fn burn_coins(burn_amount: u64);
    fn force_transfer_coins(coins: u64, asset_id: AssetId, target: ContractId);
    fn transfer_coins_to_output(coins: u64, asset_id: AssetId, recipient: Address);
    fn deposit();
    fn get_balance(target: ContractId, asset_id: AssetId) -> u64;
    fn mint_and_send_to_contract(amount: u64, destination: ContractId);
    fn mint_and_send_to_address(amount: u64, recipient: Address);
}

impl NativeAsset for Contract {
    /// Mint an amount of this contracts native asset to the contracts balance.
    fn mint_coins(mint_amount: u64) {
        mint(DEFAULT_SUB_ID, mint_amount);
    }

    /// Burn an amount of this contracts native asset.
    fn burn_coins(burn_amount: u64) {
        burn(DEFAULT_SUB_ID, burn_amount);
    }

    /// Transfer coins to a target contract.
    fn force_transfer_coins(coins: u64, asset_id: AssetId, target: ContractId) {
        force_transfer_to_contract(target, asset_id, coins);
    }

    /// Transfer coins to a transaction output to be spent later.
    fn transfer_coins_to_output(coins: u64, asset_id: AssetId, recipient: Address) {
        transfer_to_address(recipient, asset_id, coins);
    }

    /// Get the internal balance of a specific coin at a specific contract.
    fn get_balance(target: ContractId, asset_id: AssetId) -> u64 {
        balance_of(target, asset_id)
    }

    /// Deposit coins back into the contract.
    fn deposit() {
        assert(msg_amount() > 0);
    }

    /// Mint and send this contracts native asset to a destination contract.
    fn mint_and_send_to_contract(amount: u64, destination: ContractId) {
        mint_to_contract(destination, DEFAULT_SUB_ID, amount);
    }

    /// Mind and send this contracts native asset to a destination address.
    fn mint_and_send_to_address(amount: u64, recipient: Address) {
        mint_to_address(recipient, DEFAULT_SUB_ID, amount);
    }
}

```
