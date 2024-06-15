# 标识符

Sway 中的地址与 EVM 地址类似。两个主要区别是：

1. Sway 地址长度为 32 个字节（而不是 20 个）
2. Sway 地址是使用公钥的 SHA-256 哈希而不是 keccak-256 哈希计算的。

而合约则通过合约 ID 而非地址来唯一标识。合约 ID 也是 32 个字节长，并在[此处](https://docs.fuel.network/docs/specs/)计算。
