# 合约

在Fuel Network中，合约在促进用户与网络上构建的去中心化应用之间的交互方面扮演者关键角色。一旦部署了合约，你可能想要执行各种任务，例如：

1. 调用合约方法；
2. 配置调用和交易参数，如gas价格、byte价格和gas限制；
3. 在合约调用中转发代币和gas；
4. 读取和解释返回值和日志。

例如，假设有一个Sway合约，其中有两个ABI方法，分别是`echo_str_8(str[8])`和`echo_u8(u8)`。在部署合约后，你可以如下所示调用这些方法：

<<< ../../docs-snippets/src/guide/contracts/index.test.ts#echo-values{ts:line-numbers}

上述示例展示了使用默认配置进行简单的合约调用。接下来的部分将探讨如何进一步配置合约调用的各种参数，以便在Fuel Network中实现与部署合约的更高级交互。
