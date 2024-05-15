# 你好，Sway

顶部的contract关键字定义了Sway中四种程序类型之一。其他类型包括libraries、scripts和predicates。

```sway
// 在Sway中编写的智能合约与Solidity中的智能合约没有区别
// 一些字节码与API和状态一起部署以进行交互
contract;

// ABI（应用程序二进制接口）清楚地定义了合约中存在的函数的签名
abi HelloModular {
    // "annotation"存储指示函数的不纯动作
    // 在这种情况下，greet()函数仅具有读取功能。
    // 注意：Storage只能在contract类型的程序中找到
    #[storage(read)]
    fn greet() -> str[16];
}

// Storage包含合约中所有可用的状态
storage {
    greet: str[16] = "Welcome to Sway!"
}

// 合约的ABI的实际实现
impl HelloModular for Contract {
    #[storage(read)]
    fn greet() -> str[16] {
        storage.greet
    }
}
```