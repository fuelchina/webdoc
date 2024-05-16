# 结构体

Sway中结构体的示例

```sway
contract;

// 结构体
// - 创建、读取和更新
// - 简写符号
// - 解构

struct Point {
    x: u64,
    y: u64,
}

// 嵌套结构体
struct Line {
    p0: Point,
    p1: Point,
}

abi MyContract {
    fn test_func() -> Line;
}

impl MyContract for Contract {
    fn test_func() -> Line {
        // 创建、读取和更新
        let mut p0 = Point { x: 1, y: 2 };

        p0.x = 11;

        // 简写
        let x: u64 = 123;
        let y: u64 = 123;

        let p1 = Point { x, y };

        // 嵌套结构体
        let line = Line { p0, p1 };

        // 解构
        let Line {
            p0: Point { x: x0, y: y0 },
            p1: Point { x: x1, y: y1 },
        } = line;

        line
    }
}
```