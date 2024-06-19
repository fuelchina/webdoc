# forc客户端

Forc 插件用于与 Fuel 节点交互。

## 初始化钱包并添加账户

如果您没有初始化的钱包或任何钱包账户，您将无法签署交易。

要创建钱包，您可以使用 `forc wallet new`。 它会要求您选择一个密码来加密您的钱包。初始化完成后，您将获得助记词。

创建钱包后，您可以通过运行来派生一个新帐户 `forc wallet account new`。在派生帐户之前，它会要求您输入密码来解密钱包。

##  `forc-wallet` 使用CLI签署交易

`forc deploy` 要提交由或创建的交易 `forc run`，您需要先对其进行签名（除非您使用没有 UTXO 验证的客户端）。要签署交易，您可以使用 `forc-wallet` CLI。本节将引导您完成整个签名过程。

默认情况下 `fuel-core` 运行时无需 UTXO 验证，这允许您发送无效输入来模拟不同的条件。

如果您想 `fuel-core` 使用 UTXO 验证运行，您可以传递 `--utxo-validation` 给 `fuel-core run`。

要安装， `forc-wallet` 请参考 `forc-wallet`[GitHub repo](https://github.com/FuelLabs/forc-wallet#forc-wallet)。

1. `forc deploy` 使用或构建交易 `forc run`。为此，只需使用所需参数运行 `forc deploy` 或 `forc run` 即可。有关参数列表，请参阅本书的 [forc-deploy](./forc_deploy) 或 [forc-run](./forc_run) 部分。一旦您运行任一命令，系统将询问您要签名的钱包的地址。输入地址后，将生成交易，并为您提供交易 ID。此时 CLI 将主动等待您插入签名。
2. 把第一步生成的交易ID用 进行签名， `forc wallet sign --account <account_index> tx-id <transaction_id>`这样就会生成一个签名。
3. 将第二步生成的签名提供给 `forc-deploy` (或 `forc-run`)，一旦提供签名，签名的交易就会被提交。

## 其他有用的命令 `forc-wallet`

- 您可以使用命令查看现有帐户的列表 `accounts` 。

```sh
forc wallet accounts
```

- 如果您想通过索引检索帐户的地址，则可以使用`account`命令。

```sh
forc wallet account <account_index>
```

> 如果你想签署由 `forc-deploy` 或 `forc-run` 生成的交易，一旦你启动本地节点，你可以传递 `--default-signer` 给他们。请注意，这只适用于您的本地节点。
>
> ```sh
> forc-deploy --default-signer
> ```
>
> ```sh
> forc-run --default-signer
> ```

默认情况下， `--default-signer`标志将使用以下私钥签署您的交易：

```sh
0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c
```

## 与测试网交互

要与最新的测试网交互，请使用 `--testnet` 标志。传递此标志后，创建的交易 `forc-deploy` 将发送到 `beta-4` 测试网。

```sh
forc-deploy --testnet
```

在使用时也可以传递精确的节点 URL `forc-deploy` ， `forc-run` 这可以使用 `--node-url` 标志来完成。

```sh
forc-deploy --node-url https://beta-3.fuel.network
```

另一个选择是 `--target` 选项，它为所有目标提供有用的别名。例如，如果你想部署到， `beta-3` 你可以使用：

```sh
forc-deploy --target beta-3
```

由于在测试网上部署和运行项目需要消耗 gas，因此您需要使用代币来支付。您可以使用 [测试网水龙头](https://faucet-beta-4.fuel.network/)获取一些代币。

## 部署工件

forc-deploy  将每个部署的详细信息保存在 `out/deployments` 项目根目录下的文件夹中。以下是部署工件的示例：

```json
{
  "transaction_id": "0xec27bb7a4c8a3b8af98070666cf4e6ea22ca4b9950a0862334a1830520012f5d",
  "salt": "0x9e35d1d5ef5724f29e649a3465033f5397d3ebb973c40a1d76bb35c253f0dec7",
  "network_endpoint": "http://127.0.0.1:4000",
  "chain_id": 0,
  "contract_id": "0x767eeaa7af2621e637f9785552620e175d4422b17d4cf0d76335c38808608a7b",
  "deployment_size": 68,
  "deployed_block_id": "0x915c6f372252be6bc54bd70df6362dae9bf750ba652bf5582d9b31c7023ca6cf"
}
```
