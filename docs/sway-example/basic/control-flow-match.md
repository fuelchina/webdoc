以下是Sway中match语句的示例：

```sway
contract;

// 控制流
// 分配变量
// 枚举

abi MyContract {
    fn test_function(x: u64, y: Option<u64>) -> u64;
}

fn do_something() {}

fn do_something_else() {}

impl MyContract for Contract {
    fn test_function(x: u64, y: Option<u64>) -> u64 {
        // 控制流
        match x {
            0 => do_something(),
            _ => do_something_else(),
        }

        // 分配变量
        let res: str[1] = match x {
            0 => "a",
            1 => "b",
            2 => "c",
            _ => "d",
        };

        // 枚举
        let z = match y {
            Option::Some(val) => val + 1,
            Option::None => 0,
        };

        z
    }
}

```