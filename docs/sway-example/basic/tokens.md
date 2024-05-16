# 代币（UTXO）
UTXO vs ERC20（账户模型）类比

在代币交易中，与银行中仅更新其账户余额不同，他们花费的硬币被标记为“已花费”，并为发送资金的人创建新的硬币。可以将其类比为将现金交给某人并收到找零，而不仅仅是在计算机中移动数字。

比较Fuel的本机UTXO资产和以太坊的ERC20标准有几个重要的区别。

- 没有token.approval()
- 没有token.transferFrom()

使用之前的类比，代币合约可以被认为是联邦造币厂，就像现实生活中没有批准或transferFrom来移动钱包中已经铸造的现金一样。

额外奖励：没有批准和transferFrom意味着受损合约不能窃取您钱包中的代币！

```sway
contract;

use std::{context::*, token::*};

abi NativeAssetToken {
    fn mint_coins(mint_amount: u64);
    fn burn_coins(burn_amount: u64);
    fn force_transfer_coins(coins: u64, asset_id: ContractId, target: ContractId);
    fn transfer_coins_to_output(coins: u64, asset_id: ContractId, recipient: Address);
    fn deposit();
    fn get_balance(target: ContractId, asset_id: ContractId) -> u64;
    fn mint_and_send_to_contract(amount: u64, destination: ContractId);
    fn mint_and_send_to_address(amount: u64, recipient: Address);
}

...

// 合约实现

```

本机UTXO资产的铸造和销毁仍然需要通过合约进行，转账可以自由进行，无需代币合约。联邦造币厂能够铸造和销毁代币，但不能控制人们如何花费现金。所有余额都由FuelVM处理，防止合约存储膨胀。