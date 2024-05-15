# 常量

以下是Sway中常量的示例：

```sway
contract;

// 常量

// 0x0000000000000000000000000000000000000000000000000000000000000000
const ZERO_B256: b256 = b256::min();
const ZERO_ADDRESS = Address::from(ZERO_B256);

// 关联常量
struct Point {
    x: u64,
    y: u64,
}

impl Point {
    const ZERO: Point = Point { x: 0, y: 0 };
}

abi MyContract {
    fn test_func() -> Point;
}

impl MyContract for Contract {
    fn test_func() -> Point {
        // 也可以在函数内定义常量
        const MY_NUM: u64 = 123;
        Point::ZERO
    }
}
```