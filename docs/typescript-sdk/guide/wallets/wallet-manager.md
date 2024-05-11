# 钱包管理器

`WalletManager` 是一个强大的钱包管理工具，设计用于安全地管理和存储多个钱包的保险库。

## 主要特性

### 使用 `WalletManager` 管理库

这包括向特定保险库添加新钱包、从保险库中检索所有钱包、导出特定保险库以及导出私钥。`WalletManager`类目前支持两种类型的保险库：`PrivateKeyVault`和`MnemonicVault`。

### 自定义存储解决方案

`WalletManager` 支持定义自定义存储解决方案，允许你指定加密库的存储方式和位置。有了自定义存储的支持，你可以使 `WalletManager` 适应你的特定需求和安全要求。

### 锁定和解锁 `WalletManager`

`WalletManager` 实现了自动加密机制，安全地保存钱包的保险库。这不仅保留了你的库的状态，还确保了对存储信息的强大保护。当需要时，你可以使用之前定义的密码轻松解锁和解密库。

## `WalletManager` 入门

本指南提供了如何使用 `WalletManager` 的逐步说明。

### 实例化 `WalletManager`

`WalletManager` 构造函数接受一个可选对象来定义其存储。存储描述了 `WalletManager` 将如何以及在何处存储其钱包库。如果没有提供存储，`WalletManager` 使用一个不持久化数据的默认存储。

现在，让我们简单点，不必考虑存储。稍后我们会更详细地讨论它。

要实例化一个 WalletManager，你只需：

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-1{ts:line-numbers}

### 设置 `WalletManager` 密码

默认情况下，创建时 `WalletManager` 实例处于锁定状态。在使用之前，你需要通过调用 `unlock` 方法来设置密码来解锁它。

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-2{ts:line-numbers}

一旦你的 `WalletManager` 解锁，它就可以管理你的钱包了。

### 使用 `WalletManager` 管理库

`WalletManager` 中的库充当钱包的安全容器。`WalletManager` 通过与这些库交互来管理钱包，支持诸如 `getAccounts`之类的操作，它返回存储在库中所有钱包的公共信息，以及 `exportAccount`，它导出给定钱包地址的私钥。

要添加一个库，我们使用 `addVault` 方法。以下是我们如何创建一个私钥库并添加一个我们拥有的钱包的私钥：

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-3{ts:line-numbers}

`addVault` 方法需要一个具有三个属性的对象：`type`、`secret` 和 `title`。`WalletManager` 目前支持两种类型的库：`privateKeyVault` 和 `mnemonicVault`。对于 `secret`，我们使用我们钱包的私钥，对于 `title`，我们可以提供一个自定义名称。

运行此代码后，`WalletManager` 将创建一个新的 `privateKey` 类型的库实例，并将一个账户（我们的钱包）添加到这个新创建的库中。

`WalletManager` 的一个关键特性是其能够管理多个库，甚至是同一类型的。这意味着如果你再次运行 `addVault` `方法，使用相同的参数，WalletManager` 将创建另一个 `privateKey` 类型的库，持有同一个钱包。以下是示例：

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-4{ts:line-numbers}

执行此操作后，你将发现你的 `WalletManager` 正在管理两个 `privateKey` 库，这两个库都存储着同一个钱包。

记住，添加库时 `title` 和 `secret` 都是可选的，但提供 `title` 可以更方便地管理你的库和钱包。如果你在添加库时没有提供 `secret`，这将导致库本身生成一个新账户（钱包）。

### 使用 `WalletManager`

设置好 `WalletManager` 后，你现在可以访问你的库和钱包。以下是如何检索你的库的详细信息：

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-5{ts:line-numbers}

这将输出类似于：

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-6{bash:line-numbers}

如你所见，`WalletManager` 为每个库分配了唯一的 `vaultIds`。你添加的第一个库有一个 `vaultId` 为 `0`，第二个有一个 `vaultId` 为 `1`。

让我们使用 `getWallet` 方法检索你的钱包实例：

<<< ../../docs-snippets/src/guide/wallet-manager/getting-started-with-wallet-manager.test.ts#getting-started-with-wallet-manager-7{ts:line-numbers}

本指南介绍了如何实例化 `WalletManager`，设置它的第一个库，并检索库信息的步骤。接下来的部分将探索 `WalletManager` 的更多功能，并深入了解其库的使用和其存储系统的详细信息。

## 锁定和解锁 `WalletManager`

本指南将向你介绍如何使用 `WalletManager` 管理你的钱包的锁定状态。

### 初始化和解锁 `WalletManager`

如前所述，`WalletManager` 实例一开始处于锁定状态。在使用之前，你需要通过 unlock 方法提供密码来解锁它。

<<< ../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-1{ts:line-numbers}

### 锁定 `WalletManager`

当你使用 `lock` 方法锁定 `WalletManager` `时，它所有的库和关联账户（钱包）都会被清除。由于存储系统对所有数据进行了加密和保存，这种清除是可能的。WalletManager` 频繁使用存储系统来保存其状态。因此，当它被锁定时，包括导出库、私钥、访问钱包和保存/加载 `WalletManager` 状态在内的敏感操作是不可能的。

<<< ../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-2{ts:line-numbers}

记住，使用完毕后锁定你的 `WalletManager` 是确保资金安全的关键步骤。

### 通过解锁 `WalletManager` 重新访问你的钱包

`unlock` 方法需要之前设置的密码来解锁 `WalletManager` 及其所有库。密码解密了存储的库，允许 `WalletManager` 加载其保存的数据。

<<< ../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-3{ts:line-numbers}

提供错误的密码将导致错误。然而，当成功解锁时，`WalletManager` 又可以再次使用了。

### 验证锁定状态

你可以使用 `isLocked` 方法来确认 `WalletManager` 的当前锁定状态：

<<< ../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-4{ts:line-numbers}

### 更新密码

要更改当前密码，请调用 `updatePassphrase` 方法，并提供旧密码和新密码：

<<< ../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-5{ts:line-numbers}

### 提醒： 始终锁定你的 `WalletManager`

始终确保在完成后锁定 `WalletManager`。这一步对于保护你的钱包至关重要。

<<< ../../docs-snippets/src/guide/wallet-manager/locking-and-unlocking-wallet-manager.test.ts#locking-and-unlocking-wallet-manager-6{ts:line-numbers}

通过使用 `WalletManager` 来管理锁定和解锁状态，你引入了额外的安全层。当不使用时，切勿忘记锁定你的 `WalletManager`。
