# 导入

导入对于代码的重用性和交互非常有用。通常，所有Sway程序类型都遵循相同的导入范式。

main.sw

```sway
contract;
// 1. 在同一项目中进行导入
// "dep"关键字将库定义为程序内的依赖项
dep imports_library;

// 与之前的hello world示例不同，实际上在ABI中进行导入是一个好习惯
// 这也是一种好的做法，用这种方式定义和导入自定义错误

// "use"关键字在库中进行导入
use imports_library::*;

// 2. 导入标准库
// 标准库包含
//     a. 语言基元
//     b. 区块链上下文操作
//     c. 本地资产管理
//     等等。
// Solidity中的诸如msg.sender() block.timestamp()之类的功能在这里找到
// https://github.com/FuelLabs/sway/tree/master/sway-lib-std
use std::{
    identity::*,
    address::*,
    constants::*,
    auth::msg_sender,
};

// 3. 从不同项目导入库
// 注意，“math_lib”未在文件中列为依赖项，但在forc.toml中有
// 从 https://github.com/sway-libs/concentrated-liquidity/ 复制的数学库
use math_lib::full_math::*;

storage {
    z: u64 = 0,
    last_user: Identity = Identity::Address(Address::from(ZERO_B256)),
}

impl Imports for Contract {
    #[storage(write)]
    fn add(x: u64, y: u64) {
        storage.z = x + y;
    }

    #[storage(write)]
    fn last_user() {
        storage.last_user = msg_sender().unwrap();
    }

    #[storage(write)]
    fn fixed_point_multiply_and_divide(a: u64, b: u64, c: u64) {
        storage.z = mul_div_u64(a, b, c);
    }
}
```

## 标准库
## 本地
这是文件夹结构。

```
└── Import
    └── src
        ├── main.sw
        └── imports_library.sw
```

## 外部依赖
这是项目结构。

```
├── Import
│   ├── src
│   │   └── main.sw
│   └── Forc.toml
└── math_lib
    ├── concentrated
    │   ├── I24.sw
    │   ├── Q64x64.sw
    │   ├── Q128x128.sw
    │   └── full_math.sw
    └── math_lib.sw
```

外部导入应该在Forc.toml中被定义为依赖项。

Forc.toml

```
[project]
authors = ["Call Delegation"]
entry = "main.sw"
license = "Apache-2.0"
name = "imports"

[dependencies]
math_lib = { path = "../math_lib/" }
```

注意：如果您有一个复杂的库，最好为子库有一个入口点。

math_lib.sw

```sway
library math_lib;

dep concentrated/I24;
dep concentrated/Q128x128;
dep concentrated/Q64x64;
dep concentrated/full_math;
```