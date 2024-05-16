# 闪电贷
仍在开发和测试中

liquidity_pool.sw

```sway
contract;

/* 
imports,
std-lib,
etc.
*/ 

pub struct flashData {
    amount: u64,
    liquidity_pool: Address,
}

storage {
    state: State = State::NotInitialized,
    token0: ContractId = ContractId{value:0x0000000000000000000000000000000000000000000000000000000000000000},
    token1: ContractId = ContractId{value:0x0000000000000000000000000000000000000000000000000000000000000000},
    flash_fee: u64 = 0,
}

impl LiquidityPool for Contract {
    // 初始化令牌
    #[storage(read, write)]
    fn init(_token0: ContractId, _token1: ContractId, swap_fee: u64) {
        require(storage.state == State::NotInitialized, InitializationError::CannotReinitialize);
        storage.state = State::Initialized;
        storage.token0 = _token0;
        storage.token1 = _token1;

    }

    #[storage(read)]
    fn flash(
        recipient: Identity,
        amount0: u64,
        amount1: u64,
        // TODO 添加某种自定义数据
        // 一些包含数据的结构体（最好有自定义数据）
    ) {
        reentrancy_guard();
        
        let sender = msg_sender().unwrap();

        // 要求有一些流动性来执行闪电贷款
        let balance_before0 = this_balance(storage.token0);
        let balance_before1 = this_balance(storage.token1);

        require(balance_before0 > 0, "token0-zero-liquidity-depth");
        require(balance_before1 > 0, "token1-zero-liquidity-depth");

        // 根据被提取的数量计算费用
        let fee_amount0 = mul_div_rounding_up_u64(amount0, storage.flash_fee, 1000000);
        let fee_amount1 = mul_div_rounding_up_u64(amount1, storage.flash_fee, 1000000);

        // 发送令牌
        if (amount0 > 0) { transfer(amount0, storage.token0, recipient) };
        if (amount1 > 0) { transfer(amount1, storage.token1, recipient) };

        let flashloaner_contract = abi(
            // TODO 不好的命名情况
            FlashLoaner, 
            caller_contract_id().into()
        );

        flashloaner_contract.callback(fee_amount0, fee_amount1);

        let balance_after0 = this_balance(storage.token0);
        let balance_after1 = this_balance(storage.token1);

        // TODO 在U128 std库更新后将'<'更改为'<='
        require((balance_before0 + storage.flash_fee) < balance_after0, "token0-insufficient-returned");
        require((balance_before1 + storage.flash_fee) < balance_after1, "token1-insufficient-returned");
        
        // sub是安全的，因为我们知道balanceAfter至少比balanceBefore大至少一笔费用
        let paid0 = balance_after0 - balance_before0;
        let paid1 = balance_after1 - balance_before1;

        log(FlashEvent {
            sender, 
            recipient, 
            amount0, 
            amount1, 
            paid0, 
            paid1
        });
    }
    

    /* 
    提款
    存款
    */ 
}
```

flashloaner.sw

```sway
contract;

dep interfaces;

use liquidity_pool::*;

use std::{
    call_frames::{
        contract_id,
    }
};

abi FlashLoaner {
    // flashCallback
    fn callback(
        fee0: u64,
        fee1: u64,
        // 一些数据
    );
    fn init_flash(
        curve: ContractId,
    );
}

// 简化起见，应该把它放在这里
impl FlashLoaner for Contract {
    fn callback(fee0: u64, fee1: u64) {
        // TODO: 定义token0，token1和lp合同 - 应该来自第三个字段，即数据
        // 现在可以硬编码

        // 确保请求的令牌数量存在

        // 对令牌做些事情！

        // 计算需要返回的令牌数量

        // 将令牌转移到原始合同
    }

    // 在这里添加更多参数
    fn init_flash(lp_contract_id: ContractId){
        // 获取我们正在调用的函数的地址
        let lp_pool = abi(
            LiquidityPool,
            lp_contract_id.into()
        );

        // 调用闪电函数
        lp_pool.flash(
            Identity::ContractId(contract_id()),
            10,
            10,
        );

    }
}

```

闪电贷款GIF即将到来！这是一只猫

<img src="https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif" alt="GIF of a cat" />
