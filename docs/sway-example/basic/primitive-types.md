# 原始数据类型

Sway中原始数据类型的示例

```sway
contract;

// 原始类型
// - 无符号整数
// - 固定长度字符串
// - 布尔值
// - 256位 = 32字节

abi MyContract {
    fn test_func() -> bool;
}

impl MyContract for Contract {
    fn test_func() -> bool {
        // 无符号整数
        // 0 <= u8 <= 2**8 - 1
        let u_8: u8 = 123;
        // 0 <= u16 <= 2**16 - 1
        let u_16: u16 = 123;
        // 0 <= u32 <= 2**32 - 1
        let u_32: u32 = 123;
        // 0 <= u64 <= 2**64 - 1
        let u_64: u64 = 123;

        let u_64_max = u64::max();

        // 固定长度字符串
        let s: str[4] = "fuel";
        // 布尔值
        let boo: bool = true;
        // 256位 = 32字节
        let b_256: b256 = 0x1111111111111111111111111111111111111111111111111111111111111111;

        true
    }
}
```