# 纯度（Purity）

如果一个函数不访问任何[持久存储](./storage)，那么它就是纯函数。相反，如果该函数访问任何存储，则该函数是不纯的。当然，由于存储仅在智能合约中可用，因此不纯函数不能在谓词、脚本或库中使用。纯函数不能调用非纯函数。

在 Sway 中，函数默认是纯函数，但可以通过 `storage` function 属性选择不纯函数。该 `storage` 属性可以采用 `read` 和/或 `write` 参数来指示该函数需要哪种类型的访问。

```sway
#[storage(read)]
fn get_amount() -> u64 {
    ...
}

#[storage(read, write)]
fn increment_amount(increment: u64) -> u64 {
    ...
}
```

> **注意**: `#[storage(write)]` 属性也允许函数从存储中读取。这是因为部分写入存储插槽需要先读取插槽的原因。

调用其他不纯函数的不纯函数必须至少具有与被调用函数相同的存储权限或超集。例如，要调用具有写访问权限的函数，调用者还必须具有写访问权限，或者同时具有读和写访问权限。要调用具有读取和写入访问权限的函数，调用者还必须拥有这两种权限。

`storage` 属性还可以应用于[方法和关联函数](../basics/methods_and_associated_functions)、[特征](../advanced/traits)和[ABI](../sway-program-types/smart_contracts.md#the-abi-declaration)声明。

纯函数可以为您提供一些保证：您不会产生过多的存储气体成本，编译器可以应用额外的优化，并且它们通常很容易推理和审计。

[Solidity 中也存在类似的概念](https://docs.soliditylang.org/en/v0.8.10/contracts.html#pure-functions)。请注意，Solidity 将合约存储称为合约状态，在 Sway/Fuel 生态系统中，这两个术语在很大程度上可以互换。
