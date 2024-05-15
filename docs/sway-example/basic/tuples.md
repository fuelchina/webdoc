# 元组

Sway中元组的示例

```sway
contract;

// 元组
// - 创建、读取、更新
// - 嵌套
// - 解构和"_"

abi MyContract {
    fn test_func() -> (u64, (str[4], bool));
}

impl MyContract for Contract {
    fn test_func() -> (u64, (str[4], bool)) {
        let mut tuple: (u64, bool, u64) = (1, false, 2);
        tuple.0 = 123;
        let x = tuple.0;

        let nested = (1, ("Fuel", false));
        let s = nested.1.0;

        let (n, (s, b)) = nested;
        // 跳过第0和第1.1个变量
        let (_, (s, _)) = nested;

        nested
    }
}
```