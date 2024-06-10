# 已知问题和解决方法

## 已知的问题

* [#870](https://github.com/FuelLabs/sway/issues/870): 所有 `impl` 块都需要先定义，然后才能调用它们定义的任何函数。这包括同一 `impl` 声明中的同级函数，即 中的函数 `impl` 还不能互相调用。

## 缺少的功能

* [#1182](https://github.com/FuelLabs/sway/issues/1182) 还不支持存储`存储块` 中的数组。 请参阅 [手动存储管理](../blockchain-development/storage.md#manual-storage-management) 部分，了解如何使用标准库中的 `store` 和 `get` 直接管理存储槽。但是请注意， `StorageMap<K, V>` _does_ 不支持任意类型的 `K` 和 `V` ，没有任何限制。

## 普遍的

* 目前尚未实现任何编译器优化过程，因此字节码将比生产时更昂贵且更大。请注意，优化器最终将支持零成本抽象，从而避免开发人员需要使用内联汇编来生成最佳代码。
