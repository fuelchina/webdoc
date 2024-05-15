# 变量

Sway中变量的示例

```sway
contract;

abi MyContract {
    fn test_func() -> u64;
}

impl MyContract for Contract {
    fn test_func() -> u64 {
        // 不可变
        // 0 <= u64 <= 2**64 - 1
        let x = 5;
        // 不能将 x 重新赋值为另一个值
        // x = 6;

        // 可变
        let mut y = 5;
        y = 6;

        // 类型注解
        let i: u32 = 123;

        y
    }
}
```