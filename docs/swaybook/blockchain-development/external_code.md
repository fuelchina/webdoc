# [外部代码执行](https://docs.fuel.network/docs/sway/blockchain-development/external_code/#external-code-execution)

`std-lib`库中包含了一个名为`run_external`的函数，该函数允许Sway合约执行任意外部Sway代码。

这个功能启用了诸如可升级合约和代理等特性。

## [可升级合约](https://docs.fuel.network/docs/sway/blockchain-development/external_code/#upgradeable-contracts)

可升级合约的设计目的是允许在部署后更新智能合约的逻辑。

考虑以下代理合约的例子：

```
#[namespace(my_storage_namespace)]
storage {
    target_contract: Option<ContractId> = None,
}
 
impl Proxy for Contract {
    #[storage(write)]
    fn set_target_contract(id: ContractId) {
        storage.target_contract.write(Some(id));
    }
 
    #[storage(read)]
    fn double_input(_value: u64) -> u64 {
        let target = storage.target_contract.read().unwrap();
        run_external(target)
    }
}
```

该合约有两个函数：

- `set_target_contract` 使用外部合约的`ContractId`更新存储中的`target_contract`变量。
- `double_input` 从存储中读取`target_contract`并使用它来运行外部代码。如果`target_contract`有同名（`double_input`）的函数，则会运行外部`double_input`函数中的代码。在这种情况下，函数将返回一个`u64`。

注意在上面的`Proxy`例子中，存储块有一个`namespace`属性。使用此属性是所有Sway代理合约的最佳实践，因为它可以防止与实现合约之间的存储冲突，因为实现合约可以访问两个存储上下文。

下面是一个可能的实现合约的例子：

```
storage {
    value: u64 = 0,
    // 为了保持兼容性，这在下一个版本中必须保持不变
}
 
impl Implementation for Contract {
    #[storage(write)]
    fn double_input(value: u64) -> u64 {
        let new_value = value * 2;
        storage.value.write(new_value);
        new_value
    }
}
```

该合约有一个名为`double_input`的函数，计算输入值乘以二，更新存储中的`value`变量，并返回新值。

## [这与直接调用合约有何不同？](https://docs.fuel.network/docs/sway/blockchain-development/external_code/#how-does-this-differ-from-calling-a-contract)

直接调用合约与使用`run_external`方法有几个主要区别。

首先，使用`run_external`不需要外部合约的ABI。代理合约除了其`ContractId`外对任何外部合约都一无所知。

## [可升级合约存储](https://docs.fuel.network/docs/sway/blockchain-development/external_code/#upgradeable-contract-storage)

其次，代理合约的存储上下文在加载代码执行期间得以保留。这意味着在上述示例中，`value`变量是在*代理*合约的存储中更新的。

例如，如果你通过直接调用实现合约来读取`value`变量，你得到的结果将与通过代理合约读取的结果不同。代理合约加载代码并在自己的上下文中执行它。

## [回退函数](https://docs.fuel.network/docs/sway/blockchain-development/external_code/#fallback-functions)

如果目标合约中不存在函数名称但存在`fallback`函数，则将触发`fallback`函数。

> 若无回退函数，交易将会被撤销。

你可以使用`std-lib`中的`call_frames`模块来访问回退函数的参数。例如，要访问下面代理函数中的`_foo`输入参数，你可以在`fallback`函数中使用`called_args`方法：

```
fn does_not_exist_in_the_target(_foo: u64) -> u64 {
    run_external(TARGET)
}
```

```
#[fallback]
fn fallback() -> u64 {
    use std::call_frames::*;
    __log(3);
    __log(called_method());
    __log("double_value");
    __log(called_method() == "double_value");
    let foo = called_args::<u64>();
    foo * 3
}
```

在这种情况下，`does_not_exist_in_the_target`函数将返回`_foo * 3`。

## [限制](https://docs.fuel.network/docs/sway/blockchain-development/external_code/#limitations)

`run_external`函数的一些限制包括：

- 它仅能用于其他合约。脚本、谓词和库代码不支持外部执行。
- 如果更改实现合约，必须保持先前存储变量和类型的相同顺序，因为这就是存储在代理存储中的内容。
- 在调用`run_external`前，无法在其他调用帧中使用调用栈。你只能在包含`run_external`的调用帧内使用调用栈。