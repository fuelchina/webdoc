# 与 Solidity的区别

本页概述了 Sway 和 Solidity 之间以及 FuelVM 和 EVM 之间的一些关键区别。

## 底层虚拟机

Sway 所针对的底层虚拟机是 FuelVM，具体请参见 [此处](https://github.com/FuelLabs/fuel-specs). Solidity 所针对的是以太坊虚拟机 (EVM)， 具体请参见 [此处](https://ethereum.github.io/yellowpaper/paper.pdf).

## Word Size

FuelVM 中的字为 64 位（8 字节），而不是 EVM 的 256 位（32 字节）。因此，所有小于且包括的原始整数 `u64` 都存储在寄存器中； `u256`, 大于寄存器，而哈希值 ( `b256` 类型) 不存储在寄存器中，而是存储在内存中。因此，它们是指向包含其数据的 32 字节内存区域的指针。

## 仅限无符号整数

只有无符号整数作为原语提供: `u8`, `u16`, `u32`, `u64`, 和 `u256`。 有符号整数算法在FuelVM中不可用。如果需要，有符号整数和有符号整数算术可以在高级库中实现。

## 全局恢复

FuelVM 中的恐慌（在 Solidity 和 EVM 中称为“恢复”）是全局性的，也就是说，它们无法被捕获。恐慌将完全无条件地恢复交易的状态效果，减去使用的 gas。

## 默认安全数学

<!-- This section should explain safe math in Fuel vs EVM -->
<!-- safe_math:example:start -->
FuelVM 中的数学运算默认是安全的（即任何溢出或异常都会引起恐慌）。安全检查是在 VM 实现中本地执行的，而不是像 [Solidity默认的安全数学运算](https://docs.soliditylang.org/en/latest/080-breaking-changes.html#silent-changes-of-the-semantics)那样在字节码级别执行的。
<!-- safe_math:example:end -->

## 无* 代码大小限制

Sway 合约没有实际的代码大小限制。物理限制由 [`VM_MAX_RAM` VM 参数](https://fuellabs.github.io/fuel-specs/master/vm#parameters)控制，在撰写本文时为 64 MiB。

## 账户类型

FuelVM中的帐户类型在原始`b256` 哈希周围有类型安全的包装，以清楚地区分它们各自的类型。包装器 `Address` 反映了EOA(外部拥有的帐户)的地址，并且能够在EVM的上下文中保存utxo。 另一个包装器 `ContractId` 反映了EVM中部署的合约，但不能保存utxo。
