# 日志记录
在Sway中的日志记录示例

```sway
contract;

use std::logging::log;

abi MyContract {
    fn test_func(msg: str[4]);
}

impl MyContract for Contract {
    fn test_func(msg: str[4]) {
        log(msg);
    }
}
```
