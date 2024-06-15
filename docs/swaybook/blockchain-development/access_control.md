# 访问控制

智能合约需要能够限制对某些用户或合约的访问并对其进行识别。与基于账户的区块链不同，基于 UTXO 的区块链（即 Fuel）中的交易不一定具有唯一的交易发送者。需要额外的逻辑来处理这种差异，标准库提供了该逻辑。

## `msg_sender`

为了提供类似于 EVM 访问控制的体验，该 `std` 库提供了一个 `msg_sender` 函数，可以根据调用和/或交易输入数据来识别唯一的调用者。

```sway
contract;

abi MyOwnedContract {
    fn receive(field_1: u64) -> bool;
}

const OWNER = Address::from(0x9ae5b658754e096e4d681c548daf46354495a437cc61492599e33fc64dcdc30c);

impl MyOwnedContract for Contract {
    fn receive(field_1: u64) -> bool {
        let sender = msg_sender().unwrap();
        if let Identity::Address(addr) = sender {
            assert(addr == OWNER);
        } else {
            revert(0);
        }

        true
    }
}

```

该 `msg_sender` 函数的工作原理如下：

- 如果调用者是合约，则 `Ok(Sender)` 返回 `ContractId` 发送者变体。
- 如果调用者是外部的（即来自脚本），则检查交易中的所有硬币输入所有者。如果所有所有者都相同，则 `Ok(Sender)` 返回 `Address` 发送者变体。
- 如果调用者是外部的，并且硬币输入所有者不同，则无法确定调用者并 `Err(AuthError)` 返回。

## 合同所有权

许多合约需要某种形式的所有权来控制访问。  [SRC-5 所有权 标准](https://github.com/FuelLabs/sway-standards/tree/master/standards/src5-ownership) 已被定义，为合约内的所有权提供可互操作的接口。

为了实现这一点，请使用 [所有库](https://github.com/FuelLabs/sway-libs/tree/master/libs/ownership) 来跟踪所有者。这样就可以分别使用变体 `Some(..)` 和来设置和撤销所有权 `None` 。这比直接使用类型更好、更安全、更易读，因为 `Identity` 在直接使用类型时，必须使用某些魔法值 ( 例如`std::constants::ZERO_B256`)  来撤销所有权。

- 以下是如何正确锁定函数以便只有所有者可以调用该函数的示例：
```sway
    #[storage(read)]
    fn only_owner() {
        storage.owner.only_owner();
        // Do stuff here
    }

```

可以通过以下两种方式之一设置所有权：在编译时或运行时。

- 以下是如何在编译时正确设置合约所有权的示例：
```sway
storage {
    owner: Ownership = Ownership::initialized(Identity::Address(Address::from(ZERO_B256))),
}

```
- 以下是如何在运行时正确设置合同所有权的示例：
```sway
  #[storage(write)]
  fn set_owner(identity: Identity) {
  storage.owner.set_ownership(identity);
  }
```

- 以下是如何正确撤销合同所有权的示例：
```sway
    #[storage(write)]
    fn revoke_ownership() {
        storage.owner.renounce_ownership();
    }
```
- 以下是如何正确检索所有权状态的示例：
```sway
    #[storage(read)]
    fn owner() -> State {
        storage.owner.owner()
    }

```
