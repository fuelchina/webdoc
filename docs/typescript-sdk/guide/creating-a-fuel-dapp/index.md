
<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# 创建一个 Fuel dApp

`npm create fuels` 是一个命令行工具，可以帮助您快速搭建一个新的全栈 Fuel dApp。在本指南中，我们将使用 `npm create fuels` 创建一个新的计数器 dApp，并向其添加减法功能。最终结果将如下所示：

![此指南的最终结果](../../public/creating-a-fuel-dapp-create-fuels-end-result.png)

## 初始化项目

第一步是运行命令：

::: code-group

```sh-vue [npm]
npm create fuels@{{fuels}}
```

```sh-vue [pnpm]
pnpm create fuels@{{fuels}}
```

:::

一旦运行了该命令，您将会被问到几个简单的问题。我们将按照以下方式回答它们：

```md
◇ 您的项目的名称是什么？
│ my-fuel-project
│
◇ 选择一个包管理器：
│ pnpm
│
◆ 您想要哪些 Sway 程序？（空格切换）
│ ● 合约
│ ○ 谓词
│ ○ 脚本
└
```

该工具将为您搭建项目并安装必要的依赖项。然后您将收到以下消息：

```md
⚡️ 成功！在 my-fuel-project 创建了一个全栈 Fuel dapp

开始：

- 进入项目目录：cd my-fuel-project
- 启动本地 Fuel 开发服务器：pnpm fuels:dev
- 运行前端：pnpm dev

-> TS SDK 文档: https://docs.fuel.network/docs/fuels-ts/
-> Sway 文档: https://docs.fuel.network/docs/sway/
-> 如果您有任何问题，请查看 Fuel 论坛: https://forum.fuel.network/
```

## 目录结构

由 `npm create fuels` 创建的项目大致具有以下目录结构：

```md
my-fuel-project
├── src
│ ├── pages
│ │ ├── index.tsx
│ │ └── ...
│ ├── components
│ │ └── ...
│ ├── styles
│ │ └── ...
│ └── lib.ts
├── public
│ └── ...
├── sway-programs
│ ├── contract
│ │ └── src
│ │ └── main.sw
│ ├── Forc.lock
│ └── Forc.toml
├── fuels.config.ts
├── package.json
└── ...
```

它是一个使用 Next.js 构建的项目，具有一些额外的文件和文件夹。让我们更仔细地看一下其中一些重要的内容：

### `./fuels.config.ts`

这是[`fuels` CLI](../fuels-cli/index.md)的配置文件，这个 CLI 和工具支持该项目的内部功能。它确保您的所有 Sway 程序持续编译并部署到本地的 Fuel 节点。您可以在[Fuels CLI 文档](../fuels-cli/config-file.md)中了解有关 `fuels.config.ts` 文件的更多信息。

### `./sway-programs/contract/src/main.sw`

这是我们的 Sway 合约所在的地方。默认情况下，它是一个简单的计数器合约，只能递增。我们将在下一步中为其添加减法功能。

### `./src/pages/index.tsx`

这个文件包含了我们 dApp 前端的源代码。它是一个 Next.js 页面，用于呈现计数器值并允许用户递增计数器。

### 开发环境设置

现在我们已经搭建好了项目，让我们设置我们的开发环境。

让我们首先启动我们的 Fuel Dev 服务器。这将启动一个本地 Fuel 节点，并持续编译和部署我们的 Sway 程序到它上面。

::: code-group

```sh [npm]
pnpm fuels:dev
```

```sh [pnpm]
pnpm fuels:dev
```

:::

一旦服务器启动并运行，我们可以在另一个终端中启动我们的 Next.js 开发服务器。

::: code-group

```sh [npm]
pnpm dev
```

```sh [pnpm]
pnpm dev
```

:::

现在您应该能够在 `http://localhost:3000` 看到计数器 dApp 运行起来了。您可以尝试更改 `./sway-programs/contract/src/main.sw` 文件的内容，看到 UI 中的变化而无需重新启动服务器。

![全栈 Fuel 开发工作流](../../public/creating-a-fuel-dapp-create-fuels-split-view.png)

## 添加减法功能

要向我们的计数器添加减法功能，我们需要做两件事：1. 向我们的 Sway 合约添加一个 `decrement_counter` 函数，2. 修改 `./src/pages/index.tsx` 文件以添加一个调用此函数的按钮。

### 1. 修改 Sway 合约

要向我们的 Sway 合约添加一个 `decrement_counter` 函数，我们将修改 `./sway-programs/contract/src/main.sw` 文件。

当向 Sway 程序添加新函数时，有两个步骤。第一步是指定函数的 ABI。

在文件顶部，您将找到合约的 ABI 部分。让我们向其中添加一个新函数：

``` rust
abi Counter {
    #[storage(read)]
    fn get_count() -> u64;

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64;

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64;
}
```
第二步是实现函数。

我们将在 `increment_counter` 函数的下方添加 `decrement_counter` 函数的实现。

``` rust
impl Counter for Contract {
    #[storage(read)]
    fn get_count() -> u64 {
        storage.counter.read()
    }

    #[storage(write, read)]
    fn increment_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current + amount);
        storage.counter.read()
    }

    #[storage(write, read)]
    fn decrement_counter(amount: u64) -> u64 {
        let current = storage.counter.read();
        storage.counter.write(current - amount);
        storage.counter.read()
    }
}
```

### 2. 修改前端

现在，我们将向前端添加一个新按钮，当点击时将调用 `decrement_counter` 函数。为此，我们将修改 `./src/pages/index.tsx` 文件。

首先，我们将添加一个名为 `onDecrementPressed` 的函数，类似于 `onIncrementPressed` 函数：

``` ts
  const onDecrementPressed = async () => {
    if (!contract) {
      return toast.error("Contract not loaded");
    }

    if (walletBalance?.eq(0)) {
      return toast.error(
        "Your wallet does not have enough funds. Please click the 'Top-up Wallet' button in the top right corner, or use the local faucet.",
      );
    }

    const { value } = await contract.functions.decrement_counter(bn(1)).call();
    setCounter(value.toNumber());

    await refreshWalletBalance?.();
  };
```

其次，我们将向 UI 添加一个新按钮，当点击时将调用 `onDecrementPressed` 函数：

<!-- TODO: 我们的文档引擎当前无法检测 JSX 中的注释 -->

```tsx
<Button onClick={onDecrementPressed} className="mt-6">
  Decrement Counter
</Button>
```

恭喜！这就是全部。您现在应该能够在 `http://localhost:3000` 看到计数器 dApp 运行，并具有我们新添加的减法功能。

您可以在我们构建的 dApp 的完整源代码中找到[此处](https://github.com/FuelLabs/fuels-ts/tree/master/apps/create-fuels-counter-guide)。

![此指南的最终结果](../../public/creating-a-fuel-dapp-create-fuels-end-result.png)

每当您想要向您的 dApp 添加一个新功能并快速原型设计时，您都可以遵循我们在本指南中所述的相同步骤。

## 下一步

- 现在您已经运行了一个基本的计数器 dApp，并且拥有了 `npm create fuels` 工作流，您可以开始使用 Fuel Stack 构建更复杂的 dApp。一个好的开始点是[Sway 应用程序仓库](https://github.com/FuelLabs/sway-applications)，那里有一些想法和参考代码。

- 如果您想要将您的 dApp 部署到测试网，可以查看我们的[将 dApp 部署到测试网](./deploying-a-dapp-to-testnet.md)指南。

- 如果您有任何问题或需要帮助，请随时在[官方 Fuel 论坛](https://forum.fuel.network/)上与我们联系。

- 如果您想要了解更多关于 Fuel Stack 的信息，请查看[Fuel 文档](https://docs.fuel.network/)。
