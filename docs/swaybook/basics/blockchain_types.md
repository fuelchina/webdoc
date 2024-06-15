# 区块链类型

Sway 本质上是一种面向区块链的语言，它提供了一系列针对区块链应用场景优化的类型。

这些类型通过标准库（[`lib-std`](https://github.com/FuelLabs/sway/tree/master/sway-lib-std)）提供，既增加了类型安全程度，也使得开发者的意图更加明确。

## `Address` 类型

<!-- This section should explain the `Address` type -->
<!-- address:example:start -->
`Address` 类型是对原始 `b256` 类型的类型安全封装。与 EVM 不同，`Address` **从不** 指向已部署的智能合约（见下文的 `ContractId` 类型）。`Address` 可以是公钥的哈希（相当于[外部所有账户](https://ethereum.org/en/whitepaper/#ethereum-accounts)）或 [谓词](../sway-program-types/predicates) 的哈希。地址拥有 UTXOs。
<!-- address:example:end -->

`Address` 的实现如下：

```sway
pub struct Address {
    value: b256,
}
```

必须显式地在 `b256` 和 `Address` 类型之间进行转换：

```sway
let my_number: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
let my_address: Address = Address::from(my_number);
let forty_two: b256 = my_address.into();
```

## `ContractId` 类型

<!-- This section should explain the `ContractId` type -->
<!-- contract_id:example:start -->
`ContractId` 类型也是对原始 `b256` 类型的类型安全封装。合约ID是一个唯一的、确定性的标识符，类似于 EVM 中合约地址。合约不能拥有 UTXOs，但可以拥有资产。
<!-- contract_id:example:end -->

`ContractId` 的实现如下：

```sway
pub struct ContractId {
    value: b256,
}
```

`b256` 和 `ContractId` 类型间的转换同样需要显式操作：

```sway
let my_number: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
let my_contract_id: ContractId = ContractId::from(my_number);
let forty_two: b256 = my_contract_id.into();
```

## `Identity` 类型

<!-- This section should explain the `Identity` type -->
<!-- identity:example:start -->
`Identity` 类型是一个枚举，允许处理 `Address` 和 `ContractId` 类型。这在可以接受任一类型的场合非常有用，例如，从已识别的发送者那里接收资金，但不关心发送者是地址还是合约。
<!-- identity:example:end -->

`Identity` 的实现如下：

```sway
pub enum Identity {
    Address: Address,
    ContractId: ContractId,
}
```

必须显式地转换为 `Identity`：

```sway
let raw_address: b256 = 0xddec0e7e6a9a4a4e3e57d08d080d71a299c628a46bc609aab4627695679421ca;
let my_identity: Identity = Identity::Address(Address::from(raw_address));

```

使用 `match` 语句可以根据情况分别处理 `Address` 或 `ContractId`，并处理它们执行逻辑不同的情况。

```sway
let my_contract_id: ContractId = match my_identity {
    Identity::ContractId(identity) => identity,
    _ => revert(0),
};
```

```sway
match my_identity {
    Identity::Address(address) => transfer_to_address(address, asset_id, amount),
    Identity::ContractId(contract_id) => force_transfer_to_contract(contract_id, asset_id, amount),
};
```
<!-- This section should explain the use case for the `Identity` type -->
<!-- use_identity:example:start -->
`Identity` 类型的一个常见应用场景是访问控制。通过使用 `Identity`，可以同时允许 `ContractId` 和 `Address` 独立地进行访问控制。
<!-- use_identity:example:end -->

```sway
let sender = msg_sender().unwrap();
require(
    sender == storage
        .owner
        .read(),
    MyError::UnauthorizedUser(sender),
);

```
