# 区块链类型

Sway中区块链数据类型的示例

```sway
contract;

// 地址
// 合约ID
// 身份

abi MyContract {
    fn test_func() -> Identity;
}

impl MyContract for Contract {
    fn test_func() -> Identity {
        // 地址
        let b: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
        let addr: Address = Address::from(b);
        let b: b256 = addr.into();

        // 合约ID
        let b: b256 = 0x000000000000000000000000000000000000000000000000000000000000002A;
        let my_contract_id: ContractId = ContractId::from(b);
        let b: b256 = my_contract_id.into();

        // 身份类型
        let raw_addr: b256 = 0xddec0e7e6a9a4a4e3e57d08d080d71a299c628a46bc609aab4627695679421ca;
        let addr = Address::from(raw_addr);
        let my_id: Identity = Identity::Address(addr);

        // 匹配身份
        let id: Address = match my_id {
            Identity::Address(addr) => addr,
            Identity::ContractId(id) => revert(0),
        };

        my_id
    }
}
```