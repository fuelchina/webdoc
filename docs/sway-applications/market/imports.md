# 项目导入

这[Sway 标准库](https://fuellabs.github.io/sway/master/std/)
提供了我们可以在合约中使用的几种实用程序类型和方法。要导入库，您可以使用use关键字和::，也称为命名空间限定符，以链接库名称，如下所示：

``` sway
use std::auth::msg_sender;
```

您还可以使用大括号将导入组合在一起：

``` sway
use std::{
	auth::msg_sender,
	storage::StorageVec,
}
```

对于此合约，以下是需要导入的内容。将此复制到您的main.sw文件：

```sway
use std::{
    auth::msg_sender,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    asset::transfer,
    hash::Hash,
};
```

在接下来的步骤中，我们将介绍这些导入在使用它们时的作用。