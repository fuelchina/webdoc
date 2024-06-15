# 使用 Rust进行测试

Sway 的一个常见用途是编写作为更广泛的 Rust 应用程序的一部分存在的契约或脚本。为了测试我们的 Sway 代码和 Rust 代码之间的交互，我们可以添加集成测试。

## 添加 Rust 集成测试

要将 Rust 集成测试添加到 Forc 项目，我们可以使用[cargo generate 模板](https://github.com/FuelLabs/sway/tree/master/templates/sway-test-rs) 。
[`sway-test-rs`](https://github.com/FuelLabs/sway/tree/master/templates/sway-test-rs)
此模板使 Sway 开发人员可以更轻松地添加设置 Rust 集成测试时所需的样板。

让我们将Rust集成测试添加到 [我们在介绍中创建的新项目](../introduction/forc_project.md)。

### 1. 进入项目

回顾一下，我们的空项目如下所示：
```console
$ cd my-fuel-project
$ tree .
├── Forc.toml
└── src
    └── main.sw

```

### 2. 安装`cargo generate`

我们将使用 Cargo Generate 模板添加 Rust 集成测试工具。确保已 `cargo generate` 安装该命令！

```console
cargo install cargo-generate
```

> _**注意**: :您可以通过访问 [其存储库](https://github.com/cargo-generate/cargo-generate)了解更多关于cargo generate的信息。_

### 3. 生成测试工具

让我们使用以下命令生成默认测试工具：
```console
cargo generate --init fuellabs/sway templates/sway-test-rs --name my-fuel-project --force
```

`--force` 强制你的' `--name` 输入保留你想要的 `{{project-name}}`的大小写。
模板中的占位符。 否则， `cargo-generate` 会自动将其转换为 `kebab-case`。
使用 `--force`, 这意味着`my_fuel_project` 和 `my-fuel-project` 都是有效的项目名，
取决于你的需要。

如果一切顺利，输出应该如下所示：
```console
⚠️   Favorite `fuellabs/sway` not found in config, using it as a git repository: https://github.com/fuellabs/sway
🤷   Project Name : my-fuel-project
🔧   Destination: /home/user/path/to/my-fuel-project ...
🔧   Generating template ...
[1/3]   Done: Cargo.toml
[2/3]   Done: tests/harness.rs
[3/3]   Done: tests
🔧   Moving generated files into: `/home/user/path/to/my-fuel-project`...
✨   Done! New project created /home/user/path/to/my-fuel-project
```

我们来看看结果：

```console
$ tree .
├── Cargo.toml
├── Forc.toml
├── src
│   └── main.sw
└── tests
    └── harness.rs
```

我们有两个新文件！

- 这 `Cargo.toml` 是我们新测试工具的清单，并指定了所需的依赖项，包括 `fuels` Fuel Rust SDK。
- 包含 `tests/harness.rs` 一些样板测试代码来帮助我们入门，但目前还没有调用任何契约方法。

### 4. 构建 forc 项目

在运行测试之前，我们需要构建合约，以便获得必要的 ABI、存储和字节码工件。我们可以使用以下命令进行操作 `forc
build`:

```console
$ forc build
  Creating a new `Forc.lock` file. (Cause: lock file did not exist)
    Adding core
    Adding std git+https://github.com/fuellabs/sway?tag=v0.24.5#e695606d8884a18664f6231681333a784e623bc9
   Created new lock file at /home/user/path/to/my-fuel-project/Forc.lock
  Compiled library "core".
  Compiled library "std".
  Compiled contract "my-fuel-project".
  Bytecode size is 60 bytes.
```

此时，我们的项目应该如下所示：
```console
$ tree
├── Cargo.toml
├── Forc.lock
├── Forc.toml
├── out
│   └── debug
│       ├── my-fuel-project-abi.json
│       ├── my-fuel-project.bin
│       └── my-fuel-project-storage_slots.json
├── src
│   └── main.sw
└── tests
    └── harness.rs
```

我们现在有一个 `out` 包含所需 JSON 文件的目录！

> _**注意**: 此步骤将来可能不再需要，因为我们计划启用集成测试来根据需要自动构建工件，以便 ABI JSON 等文件始终保持最新。_

### 5. 构建并运行测试

现在我们准备构建并运行默认集成测试。
```console
$ cargo test
    Updating crates.io index
   Compiling version_check v0.9.4
   Compiling proc-macro2 v1.0.46
   Compiling quote v1.0.21
   ...
   Compiling fuels v0.24.0
   Compiling my-fuel-project v0.1.0 (/home/user/path/to/my-fuel-project)
    Finished test [unoptimized + debuginfo] target(s) in 1m 03s
     Running tests/harness.rs (target/debug/deps/integration_tests-373971ac377845f7)

running 1 test
test can_get_contract_id ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.36s
```

> _**注意**: 第一次运行时 `cargo test`, cargo 将花费一些时间来获取和构建 Fuel 的 Rust SDK 的依赖项。这可能需要一段时间，但只是第一次！

如果一切顺利，我们应该会看到一些类似上面的输出！
## 编写测试

现在我们已经了解了如何在项目中设置 Rust 集成测试，让我们尝试编写一些我们自己的测试！

首先，让我们用一个简单的反例来更新我们的合约代码：

```sway
contract;

abi TestContract {
    #[storage(write)]
    fn initialize_counter(value: u64) -> u64;

    #[storage(read, write)]
    fn increment_counter(amount: u64) -> u64;
}

storage {
    counter: u64 = 0,
}

impl TestContract for Contract {
    #[storage(write)]
    fn initialize_counter(value: u64) -> u64 {
        storage.counter.write(value);
        value
    }

    #[storage(read, write)]
    fn increment_counter(amount: u64) -> u64 {
        let incremented = storage.counter.read() + amount;
        storage.counter.write(incremented);
        incremented
    }
}
```

为了从 Rust 测试工具测试我们的 `initialize_counter`和 `契约方法` ，我们可以使用以下内容更新我们的文件：`tests/harness.rs` 

<!--TODO add test here once examples are tested-->

```rust,ignore
use fuels::{prelude::*, tx::ContractId};

// Load abi from json
abigen!(TestContract, "out/debug/my-fuel-project-abi.json");

async fn get_contract_instance() -> (TestContract, ContractId) {
    // Launch a local network and deploy the contract
    let mut wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(1),             /* Single wallet */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
    )
    .await;
    let wallet = wallets.pop().unwrap();

    let id = Contract::deploy(
        "./out/debug/my-fuel-project.bin",
        &wallet,
        TxParameters::default(),
        StorageConfiguration::with_storage_path(Some(
            "./out/debug/my-fuel-project-storage_slots.json".to_string(),
        )),
    )
    .await
    .unwrap();

    let instance = TestContract::new(id.to_string(), wallet);

    (instance, id.into())
}

#[tokio::test]
async fn initialize_and_increment() {
    let (contract_instance, _id) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function

    let result = contract_instance
        .methods()
        .initialize_counter(42)
        .call()
        .await
        .unwrap();

    assert_eq!(42, result.value);

    // Call `increment_counter()` method in our deployed contract.
    let result = contract_instance
        .methods()
        .increment_counter(10)
        .call()
        .await
        .unwrap();

    assert_eq!(52, result.value);
}
```

让我们再次构建项目并运行测试：
```console
forc build
```

```console
$ cargo test
   Compiling my-fuel-project v0.1.0 (/home/mindtree/programming/sway/my-fuel-project)
    Finished test [unoptimized + debuginfo] target(s) in 11.61s
     Running tests/harness.rs (target/debug/deps/integration_tests-373971ac377845f7)

running 1 test
test initialize_and_increment ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 1.25s
```

当 Cargo 运行我们的测试时，我们的测试使用 SDK 启动本地内存 Fuel 网络，将我们的合约部署到其中，并通过 ABI 调用合约方法。

`#[tokio::test]` 您可以添加任意 数量的装饰函数，并且`cargo test` 会自动测试每一个函数！
