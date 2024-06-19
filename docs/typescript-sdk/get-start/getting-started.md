<script setup>
  import { data } from '../versions.data'
  const { fuels } = data
</script>

# 入门指南

本指南将带您逐步了解如何在您的前端项目中设置并使用 Fuels-ts 库。

## 基础条件

在使用此库之前，我们期望您安装[燃料工具链](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/#the-fuel-toolchain)。请按照[此指南](https://docs.fuel.network/guides/installation/)进行安装。

## 安装

首先，您需要向您的项目添加 `fuels` 依赖项。您可以使用以下命令来完成此操作：

::: code-group

```sh-vue [npm]
npm install fuels@{{fuels}} --save
```

```sh-vue [pnpm]
pnpm add fuels@{{fuels}}
```

:::

**注意**: 使用版本 `{{fuels}}` 以确保与 `beta-5` 网络兼容性—请查看[文档](https://docs.fuel.network/guides/installation/#using-the-latest-toolchain)。

### 注意

如果您使用的是 bun，则需要向您的 `package.json` 添加一个 `trustedDependencies` 字段：

```json
{
  // ...
  "trustedDependencies": ["@fuel-ts/fuel-core", "@fuel-ts/forc"]
}
```

这是为了确保 bun 在您的项目中包含 `fuel-core` 和 `forc` 二进制文件。

> 重要提示：我们尚未正式支持 `bun`；请自行承担使用风险。

## 使用方法

使用 Fuels 依赖项设置好后，您现在可以创建一个 React 组件，该组件将连接到 Fuel 提供程序并检索给定钱包地址的基本资产余额。以下是如何执行此操作的示例：

<!-- TODO: Create properly code snippet on new package: `app/react-app` after https://github.com/FuelLabs/fuels-ts/pull/827 got merged -->

```tsx
import { BN, Provider, Wallet } from "fuels";
import { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async () => {
      const provider = await Provider.create("https://beta-5.fuel.network/graphql");
      const myWallet = Wallet.fromAddress("0x...", provider);
      myWallet.getBalances().then((data) => {
        setBalance(new BN(data[0].amount).toNumber());
      });
    }()
  }, []);

  return <div>My Balance: {balance}</div>;
}

export default App;
```

## CDN 使用（仅限浏览器）

对于快速测试或仅供试玩，您可以直接从我们的 CDN 加载它到您的 Web 应用程序中。

```html
<script type="module">
  import {
    Wallet,
    Provider,
  } from "https://cdnjs.cloudflare.com/ajax/libs/fuels/{{fuels}}/browser.mjs";

  const exec = async () => {
    const provider = await Provider.create(
      "https://beta-5.fuel.network/graphql",
    );
    const { name } = provider.getChain();
    console.log(name);
  };
  exec();
</script>
```

## 连接到网络

在高层次上，您可以使用 Fuel TypeScript SDK 构建可以通过与 Sway 编写的智能合约交互来在 Fuel 虚拟机上运行计算的应用程序。

为了使此交互工作，SDK 必须能够与 [`fuel-core`](https://github.com/FuelLabs/fuel-core) 节点进行通信；您有两种选择：

1. 连接到 [测试网](#连接到测试网)。（用于应用程序构建）
2. 运行 [本地节点](https://docs.fuel.network/guides/running-a-node/)。（用于智能合约测试）

### 连接到测试网

**测试网** 是一个公共网络，允许您与 Fuel 虚拟机进行交互，用于测试和开发目的。

> [!NOTE] 最新的测试网
> Beta 5
>
> `https://beta-5.fuel.network/graphql`

我们有一些有用的资源供测试网使用：

- [**水龙头**](https://faucet-beta-5.fuel.network/) - 用于为已创建的钱包提供资金。
- [**浏览器**](https://app.fuel.network/) - 用于查看交易和区块。
- [**GraphQL Playground**](https://beta-5.fuel.network/playground) - 用于测试 GraphQL 查询和突变。

---

在下面的示例中，我们将一个 [Provider](./guide/provider/index) 连接到最新的测试网，并从私钥创建一个新钱包。

> **注意：** 在测试网上创建的新钱包将没有任何资产！您可以使用[水龙头](https://faucet-beta-5.fuel.network/)为您的钱包提供资金。

``` rust
    // #import { Provider, Wallet, FUEL_BETA_5_NETWORK_URL };

    // 使用最新的测试网URL创建提供程序。
    const provider = await Provider.create(FUEL_BETA_5_NETWORK_URL);

    // 创建我们的钱包(使用私钥)。
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);

    // 进行余额检查。
    const balances = await wallet.getBalances();
    // [{ assetId: '0x..', amount: bn(..) }, ..]
```

### 连接到本地节点

首先，您需要在您的机器上运行一个本地节点。我们推荐以下方法之一：

- [测试工具](../guide/testing/index.md#wallet-test-utilities) 可以帮助您以编程方式启动一个短暂的节点。
- 直接运行 [fuel-core](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)，或通过 CLI [fuels](../guide/fuels-cli/commands.md#fuels-core)。

在以下示例中，我们创建了一个提供程序以连接到本地节点并签署消息。

``` rust
// #import { Provider, Wallet };

    // 创建一个 provider.
    const LOCAL_FUEL_NETWORK = 'http://127.0.0.1:4000/v1/graphql';
    const provider = await Provider.create(LOCAL_FUEL_NETWORK);

    // 创建我们的钱包(使用私钥)。
    const PRIVATE_KEY = 'a1447cd75accc6b71a976fd3401a1f6ce318d27ba660b0315ee6ac347bf39568';
    const wallet = Wallet.fromPrivateKey(PRIVATE_KEY, provider);
```

## 更多资源和下一步

要了解更多关于与更广泛的 Fuel 生态系统一起工作的深入、逐步指南，请查看[开发者快速入门](https://docs.fuel.network/guides/quickstart/)。此指南包括：

1. 安装与 Fuel 生态系统开发所需的所有工具。

2. 编写您的第一个 Sway 项目。

3. 部署您的合约。

4. 构建一个简单的前端 dApp 来与您部署的合约进行交互。
