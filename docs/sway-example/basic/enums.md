# 枚举

Sway中枚举的示例

```sway
contract;

// 枚举
// - 基础
// - 结构体的枚举
// - 枚举的枚举

// 基础枚举
enum Color {
    Red: (),
    Blue: (),
    Green: (),
}

// 结构体的枚举
struct Point {
    x: u64,
    y: u64,
}

enum Shape {
    Circle: (Point, u64),
    Triangle: [Point; 3],
}

// 枚举的枚举
enum Error {
    Auth: AuthError,
    Transfer: TransferError,
}

enum AuthError {
    NotOwner: (),
    NotApproved: (),
}

enum TransferError {
    TransferToZeroAddress: (),
    InsufficientBalance: (),
}

abi MyContract {
    fn test_func() -> Error;
}

impl MyContract for Contract {
    fn test_func() -> Error {
        let color = Color::Blue;

        let circle = Shape::Circle((Point { x: 0, y: 0 }, 1));
        let triangle = Shape::Triangle([
            Point { x: 0, y: 0 },
            Point { x: 1, y: 1 },
            Point { x: 2, y: 0 },
        ]);

        let error = Error::Auth(AuthError::NotOwner);

        error
    }
}
```