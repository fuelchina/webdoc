# 错误处理

错误将回滚事务期间进行的所有状态更改。与Solidity类似，可以通过使用revert、assert、require来抛出错误。

- **revert** 函数调用直接回滚事务
- **assert** 只有在条件不满足时才会回滚
- **require** 只有在条件不满足时才会引发错误

#### 注意：在谓词中，revert关键字将会引发 panic。

```sway
contract;

dep errors;
dep interface;

use errors::*;
use interface::*;

use std::{
    revert::require,
    assert::assert,
    logging::log
};

impl Error for Contract {
    fn test_revert(special_number: u64) {
        if (special_number != 42) {
            revert(0)
        }
    }

    fn test_require(special_number: u64) {
        require(special_number == 42, "Special number must be equal to 42");
    }

    fn test_assert(special_number: u64) {
        assert(special_number == 42);
    }

    fn test_custom_require(special_number: u64) {
        require(special_number == 42, InputError::InputSmallerThan42);
    }

    fn test_option(special_number: Option<u64>) {
        require(special_number.is_some(), InputError::NumberDoesNotExist);
        // require(special_number.is_none(), InputError::NumberExist);
    }

    fn test_result(special_number: u64) -> Result<u64, InputError> {
        match special_number == 42 {
            true => Result::Ok(special_number),
            false => Result::Err(InputError::InputIsNot42),
        }
    }
}
```

这是导入自定义错误的项目结构。

```
└── Import
    └── src
        ├── main.sw
        └── errors.sw
```

注意：与Solidity类似，使用自定义错误将有助于减少字节码大小并提供燃气节省。

```sway
library errors;

pub enum InputError {
    InputSmallerThan42: (),
    InputIsNot42: (),
    NumberDoesNotExist: (),
    NumberExist: (),
}
```