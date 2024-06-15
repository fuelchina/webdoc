# 调用合约

智能合约可以被其他合约或脚本调用。在 FuelVM 中，这主要通过指令来实现 [`call`](https://github.com/FuelLabs/fuel-specs/blob/master/specs/vm/instruction_set.md#call-call-contract) 。

Sway 通过其 `ABI` 系统提供了一种管理可调用接口的好方法。 Fuel ABI 规范可在 [此处](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/abi.md)找到。

## 例子

以下是 Sway 中一个合约调用另一个合约的示例。脚本可以以相同的方式调用合约。

```sway
// ./contract_a.sw
contract;

abi ContractA {
    fn receive(field_1: bool, field_2: u64) -> u64;
}

impl ContractA for Contract {
    fn receive(field_1: bool, field_2: u64) -> u64 {
        assert(field_1 == true);
        assert(field_2 > 0);
        return_45()
    }
}

fn return_45() -> u64 {
  45
}
```

```sway
// ./contract_b.sw
contract;

use contract_a::ContractA;

abi ContractB {
    fn make_call();
}

const contract_id = 0x79fa8779bed2f36c3581d01c79df8da45eee09fac1fd76a5a656e16326317ef0;

impl ContractB for Contract {
    fn make_call() {
      let x = abi(ContractA, contract_id);
      let return_value = x.receive(true, 3); // will be 45
    }
}
```

> **注意**: ABI 仅供外部调用，因此您无法在 ABI 中定义方法并在同一合约中调用它。如果您想为合约定义一个函数，但将其保持为私有，以便只有您的合约可以调用它，您可以在合约外部定义它 `impl` 并在合约内部调用它，类似于 `return_45()` 上面的函数。

## 高级呼叫

所有呼叫都会转发一笔燃气津贴，并且可能通过呼叫额外转发一项本地资产。

以下是如何指定要转发的gas 数量 (`gas`)、原生资产的资产 ID (`asset_id`), 和原生资产数量 (`amount`) 的示例：`coins`

```sway
script;

abi MyContract {
    fn foo(field_1: bool, field_2: u64);
}

fn main() {
    let x = abi(MyContract, 0x79fa8779bed2f36c3581d01c79df8da45eee09fac1fd76a5a656e16326317ef0);
    let asset_id = 0x7777_7777_7777_7777_7777_7777_7777_7777_7777_7777_7777_7777_7777_7777_7777_7777;
    x.foo {
        gas: 5000, asset_id: asset_id, amount: 5000
    }
    (true, 3);
}
```

## 处理重入

智能合约常见的攻击媒介是 [重入](https://docs.soliditylang.org/en/v0.8.4/security-considerations.html#re-entrancy)。与 EVM 类似，FuelVM 也允许重入。

库中包含一个无状态重入保护 [sway-libs](https://github.com/FuelLabs/sway-libs) 。 如果检测到重入，保护将在运行时崩溃（恢复）。

```sway
contract;

use std::reentrancy::reentrancy_guard;

abi MyContract {
    fn some_method();
}

impl ContractB for Contract {
    fn some_method() {
        reentrancy_guard();
        // do something
    }
}
```

## CEI 模式违规静态分析

避免与重入相关的攻击的另一种方法是遵循所谓的 CEI模式。CEI 代表“检查、效果、交互”，这意味着合约代码应首先执行安全检查，也称为“先决条件”，然后执行效果，即修改或读取合约存储并仅在函数/方法的最后执行外部合约调用（交互）。

请参阅此 [博客文章](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html) 以了解有关交互后存储修改时的一些漏洞的更多详细信息，并参阅此[博客文章](https://chainsecurity.com/curve-lp-oracle-manipulation-post-mortem/)以了解有关交互后存储读取的更多信息。

Sway 编译器会检查用户契约中是否违反了 CEI 模式，如果违反则会发出警告。

例如，在以下合约中，CEI 模式被违反，因为在存储写入之前执行了外部合约调用。

```sway
contract;

mod other_contract;

use other_contract::*;
use std::hash::*;

abi MyContract {
#[storage(read, write)]
fn withdraw(external_contract_id: ContractId);
}

storage {
balances: StorageMap<Identity, u64> = StorageMap::<Identity, u64> {},
}

impl MyContract for Contract {
#[storage(read, write)]
fn withdraw(external_contract_id: ContractId) {
let sender = msg_sender().unwrap();
let bal = storage.balances.get(sender).try_read().unwrap_or(0);

        assert(bal > 0);

        // External call
        let caller = abi(OtherContract, external_contract_id.into());
        caller.external_call {
            coins: bal,
        }();

        // Storage update _after_ external call
        storage.balances.insert(sender, 0);
    }
}
```

其中，`other_contract`定义如下：
```sway
library;

abi OtherContract {
    #[payable]
    fn external_call();
}

```
CEI 模式分析器发出如下警告，指出存储修改之前的交互：

```sway
warning
  --> /path/to/contract/main.sw:28:9
   |
26 |
27 |           let caller = abi(OtherContract, external_contract_id.into());
28 |           caller.external_call { coins: bal }();
   |  _________-
29 | |
30 | |         // Storage update _after_ external call
31 | |         storage.balances.insert(sender, 0);
   | |__________________________________________- Storage write after external contract interaction in function or method "withdraw". Consider making all storage writes before calling another contract
32 |       }
33 |   }
   |
____

```

如果交互后有存储读取，CEI 分析器将发出类似的警告。

除了交互后的存储读写之外，CEI 分析器还会报告有关以下方面的类似警告：

- 平衡树更新，即平衡树读取并随后写入，这可能是由`tr`和`troASM` 指令或在后台使用它们的库函数生成的；
- 平衡树读取`bal`指令；
- `__smo`更改由内部函数或ASM 指令生成的输出消息`smo`。

## 与EVM的区别

虽然 Fuel 合约调用范例与 EVM 类似（使用 ABI，转发 gas 和数据），但它在两个关键方面有所不同：

1. [**原生资产**](./native_assets.md): FuelVM 调用可以转发任何原生资产，而不仅仅是基础资产。

2. **无需数据序列化**: FuelVM 中的合约调用无需序列化数据即可在合约之间传递数据；相反，它们只需传递指向数据的指针即可。这是因为 FuelVM 具有一个共享的全局内存，所有调用框架都可以从中读取。


