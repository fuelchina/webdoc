# 复合类型

Sway中复合数据类型的示例

```sway
contract;

// 复合类型
// - 元组
//   - 解构
// - 结构体
// - 数组

struct Point {
    x: u64,
    y: u64,
}

abi MyContract {
    fn test_func() -> Point;
}

impl MyContract for Contract {
    fn test_func() -> Point {
        // 元组
        let t: (u64, bool) = (42, true);
        // 访问元组的值
        assert(t.0 == 42);
        assert(t.1);

        // 解构元组（类型注解是可选的）
        let (num, boo) = t;

        // 长度为1的元组
        let one: (u64, ) = (123, );

        // 结构体
        let p = Point { x: 1, y: 2 };
        // 访问结构体字段
        assert(p.x == 1);
        assert(p.y == 2);

        // 数组
        let u_arr: [u8; 5] = [1, 2, 3, 4, 5];
        let s_arr: [str[3]; 3] = ["cat", "dog", "rat"];

        let struct_arr: [Point; 2] = [Point { x: 1, y: 2 }, Point { x: 11, y: 22 }];

        // 修改数组
        let mut mut_arr: [bool; 2] = [true, false];
        mut_arr[1] = true;

        p
    }

}
```