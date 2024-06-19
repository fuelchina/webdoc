# 测试合约

## 在 Rust 中生成测试模板
要使用 Rust 创建您自己的测试模板，请按照以下步骤操作 cargo-generate 在合同项目目录中：

1. 安装 cargo-generate:
```
cargo install cargo-generate --locked
```


2. 生成模板：
```
cargo generate --init fuellabs/sway templates/sway-test-rs --name sway-store
```

我们有两个新文件！

这 Cargo.toml 是我们新测试工具的清单，并指定所需的依赖项，包括 fuels （Fuel Rust SDK）。
这 tests/harness.rs 包含一些让我们开始的样板测试代码，但尚未调用任何合约方法。
打开你的 Cargo.toml 文件并检查版本 fuels 在下使用 dev-dependencies。将版本更改为 0.62.0 如果还没有：

```
[dev-dependencies]
fuels = { version = "0.62.0", features = ["fuel-core-lib"] }
tokio = { version = "1.12", features = ["rt", "macros"] }
```

## 导入

我们将改变现有的 harness.rs 已经生成测试文件。首先我们需要改变进口。通过导入 Fuel Rust SDK，您将获得 Prelude 中包含的大部分功能。

```
use fuels::{prelude::*, types::{Identity, SizedAsciiString}};
```

在进行任何更改后，请务必编译您的合同。这可确保您使用的是最新的contract-abi生成。

在abigen宏以匹配您的合约名称：

```
// Load abi from json
abigen!(Contract(name="SwayStore", abi="out/debug/contract-abi.json"));
```

## 初始化函数
在为 Sway 编写测试时，需要两个关键对象：合约实例和与之交互的钱包。此帮助程序功能可确保每个新测试用例都重新开始，因此请将其复制到测试文件中。为此，它将导出已部署的合约、合约 ID 和所有生成的钱包。

将get_contract_instance在测试工具中具有以下功能的功能：

```
async fn get_contract_instance() -> (SwayStore<WalletUnlocked>, ContractId, Vec<WalletUnlocked>) {
    // Launch a local network and deploy the contract
    let wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(3),             /* Three wallets */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await
    .unwrap();
 
    let wallet = wallets.get(0).unwrap().clone();
    
    let id = Contract::load_from(
        "./out/debug/contract.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();
 
    let instance = SwayStore::new(id.clone(), wallet);
 
    (instance, id.into(), wallets)
}
```


## 测试用例
鉴于智能合约的不可变性，在测试中涵盖所有潜在的边缘情况非常重要。 让我们删除示例can_get_contract_id测试用例，并开始在我们的底部编写一些测试用例harness.rs文件。

### 设置所有者
对于此测试用例，我们使用合约实例并使用 SDK 的.with_account()方法。这让我们可以模拟第一个钱包。为了检查所有者是否设置正确，我们可以查看合约给出的地址是否与钱包 1 的地址匹配。如果您想更深入地挖掘，查看合约存储将显示钱包 1 的地址是否正确存储。

```
#[tokio::test]
async fn can_set_owner() {
    let (instance, _id, wallets) = get_contract_instance().await;
 
    // get access to a test wallet
    let wallet_1 = wallets.get(0).unwrap();
 
    // initialize wallet_1 as the owner
    let owner_result = instance
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
 
    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == owner_result.value);
}
```


### 设置所有者一次
我们需要警惕的一个边缘情况是尝试两次设置所有者。我们当然不希望未经授权转让我们的合同所有权！为了解决这个问题，我们在 Sway 合约中包含了以下行：require(owner.is_none(), "owner already initialized"); 这可确保只有在之前未建立所有者时才能设置所有者。为了测试这一点，我们创建了一个新的合约实例：最初，我们使用钱包 1 设置所有者。任何后续尝试使用钱包 2 设置所有者都应该不成功。

```
#[tokio::test]
#[should_panic]
async fn can_set_owner_only_once() {
    let (instance, _id, wallets) = get_contract_instance().await;
 
    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();
 
    // initialize wallet_1 as the owner
    let _owner_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
 
    // this should fail
    // try to set the owner from wallet_2
    let _fail_owner_result = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
}
```


### 在市场上买卖
测试智能合约的基本功能以确保其正常运行至关重要。 对于此测试，我们设置了两个钱包：

第一个钱包发起交易以列出待售物品。这是通过调用.list_item()方法，指定他们出售的商品的价格和详细信息。
第二个钱包继续使用.buy_item()方法，提供他们打算购买的物品的索引。
在这些交易之后，我们将评估两个钱包的余额，以确认交易的成功执行。

```
#[tokio::test]
async fn can_list_and_buy_item() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function
 
    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();
 
    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 15;
 
    // list item 1 from wallet_1
    let _item_1_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await
        .unwrap();
 
    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);
 
    // buy item 1 from wallet_2
    let _item_1_purchase = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .buy_item(1)
        .append_variable_outputs(1)
        .call_params(call_params)
        .unwrap()
        .call()
        .await
        .unwrap();
 
    // check the balances of wallet_1 and wallet_2
    let balance_1: u64 = wallet_1.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_2: u64 = wallet_2.get_asset_balance(&AssetId::zeroed()).await.unwrap();
 
    // make sure the price was transferred from wallet_2 to wallet_1
    assert!(balance_1 == 1000000015);
    assert!(balance_2 == 999999985);
 
    let item_1 = instance.methods().get_item(1).call().await.unwrap();
 
    assert!(item_1.value.price == item_1_price);
    assert!(item_1.value.id == 1);
    assert!(item_1.value.total_bought == 1);
}
```

### 提取业主费用
最重要的是，作为市场的创造者，您需要确保自己得到补偿。与前面的测试类似，我们将调用相关函数进行交换。这一次，我们将验证您是否可以提取资金差额。

```
#[tokio::test]
async fn can_withdraw_funds() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function
 
    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();
    let wallet_3 = wallets.get(2).unwrap();
 
    // initialize wallet_1 as the owner
    let owner_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
 
    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == owner_result.value);
 
    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 150_000_000;
 
    // list item 1 from wallet_2
    let item_1_result = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await;
    assert!(item_1_result.is_ok());
 
    // make sure the item count increased
    let count = instance.clone()
        .methods()
        .get_count()
        .simulate()
        .await
        .unwrap();
    assert_eq!(count.value, 1);
 
    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);
    
    // buy item 1 from wallet_3
    let item_1_purchase = instance.clone()
        .with_account(wallet_3.clone())
        .methods()
        .buy_item(1)
        .append_variable_outputs(1)
        .call_params(call_params)
        .unwrap()
        .call()
        .await;
    assert!(item_1_purchase.is_ok());
 
     // make sure the item's total_bought count increased
     let listed_item = instance
     .methods()
     .get_item(1)
     .simulate()
     .await
     .unwrap();
 assert_eq!(listed_item.value.total_bought, 1);
 
    // withdraw the balance from the owner's wallet
    let withdraw = instance
        .with_account(wallet_1.clone())
        .methods()
        .withdraw_funds()
        .append_variable_outputs(1)
        .call()
        .await;
    assert!(withdraw.is_ok());
 
    // check the balances of wallet_1 and wallet_2
    let balance_1: u64 = wallet_1.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_2: u64 = wallet_2.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_3: u64 = wallet_3.get_asset_balance(&AssetId::zeroed()).await.unwrap();
 
    assert!(balance_1 == 1007500000);
    assert!(balance_2 == 1142500000);
    assert!(balance_3 == 850000000);
}
```

# 检查
如果您已正确执行上述步骤，则您的harness.rs测试文件应如下所示：

```
use fuels::{prelude::*, types::{Identity, SizedAsciiString}};
 
// Load abi from json
abigen!(Contract(name="SwayStore", abi="out/debug/contract-abi.json"));
 
async fn get_contract_instance() -> (SwayStore<WalletUnlocked>, ContractId, Vec<WalletUnlocked>) {
    // Launch a local network and deploy the contract
    let wallets = launch_custom_provider_and_get_wallets(
        WalletsConfig::new(
            Some(3),             /* Three wallets */
            Some(1),             /* Single coin (UTXO) */
            Some(1_000_000_000), /* Amount per coin */
        ),
        None,
        None,
    )
    .await
    .unwrap();
 
    let wallet = wallets.get(0).unwrap().clone();
    
    let id = Contract::load_from(
        "./out/debug/contract.bin",
        LoadConfiguration::default(),
    )
    .unwrap()
    .deploy(&wallet, TxPolicies::default())
    .await
    .unwrap();
 
    let instance = SwayStore::new(id.clone(), wallet);
 
    (instance, id.into(), wallets)
}
 
#[tokio::test]
async fn can_set_owner() {
    let (instance, _id, wallets) = get_contract_instance().await;
 
    // get access to a test wallet
    let wallet_1 = wallets.get(0).unwrap();
 
    // initialize wallet_1 as the owner
    let owner_result = instance
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
 
    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == owner_result.value);
}
 
#[tokio::test]
#[should_panic]
async fn can_set_owner_only_once() {
    let (instance, _id, wallets) = get_contract_instance().await;
 
    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();
 
    // initialize wallet_1 as the owner
    let _owner_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
 
    // this should fail
    // try to set the owner from wallet_2
    let _fail_owner_result = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
}
 
#[tokio::test]
async fn can_list_and_buy_item() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function
 
    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();
 
    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 15;
 
    // list item 1 from wallet_1
    let _item_1_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await
        .unwrap();
 
    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);
 
    // buy item 1 from wallet_2
    let _item_1_purchase = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .buy_item(1)
        .append_variable_outputs(1)
        .call_params(call_params)
        .unwrap()
        .call()
        .await
        .unwrap();
 
    // check the balances of wallet_1 and wallet_2
    let balance_1: u64 = wallet_1.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_2: u64 = wallet_2.get_asset_balance(&AssetId::zeroed()).await.unwrap();
 
    // make sure the price was transferred from wallet_2 to wallet_1
    assert!(balance_1 == 1000000015);
    assert!(balance_2 == 999999985);
 
    let item_1 = instance.methods().get_item(1).call().await.unwrap();
 
    assert!(item_1.value.price == item_1_price);
    assert!(item_1.value.id == 1);
    assert!(item_1.value.total_bought == 1);
}
 
#[tokio::test]
async fn can_withdraw_funds() {
    let (instance, _id, wallets) = get_contract_instance().await;
    // Now you have an instance of your contract you can use to test each function
 
    // get access to some test wallets
    let wallet_1 = wallets.get(0).unwrap();
    let wallet_2 = wallets.get(1).unwrap();
    let wallet_3 = wallets.get(2).unwrap();
 
    // initialize wallet_1 as the owner
    let owner_result = instance.clone()
        .with_account(wallet_1.clone())
        .methods()
        .initialize_owner()
        .call()
        .await
        .unwrap();
 
    // make sure the returned identity matches wallet_1
    assert!(Identity::Address(wallet_1.address().into()) == owner_result.value);
 
    // item 1 params
    let item_1_metadata: SizedAsciiString<20> = "metadata__url__here_"
        .try_into()
        .expect("Should have succeeded");
    let item_1_price: u64 = 150_000_000;
 
    // list item 1 from wallet_2
    let item_1_result = instance.clone()
        .with_account(wallet_2.clone())
        .methods()
        .list_item(item_1_price, item_1_metadata)
        .call()
        .await;
    assert!(item_1_result.is_ok());
 
    // make sure the item count increased
    let count = instance.clone()
        .methods()
        .get_count()
        .simulate()
        .await
        .unwrap();
    assert_eq!(count.value, 1);
 
    // call params to send the project price in the buy_item fn
    let call_params = CallParameters::default().with_amount(item_1_price);
    
    // buy item 1 from wallet_3
    let item_1_purchase = instance.clone()
        .with_account(wallet_3.clone())
        .methods()
        .buy_item(1)
        .append_variable_outputs(1)
        .call_params(call_params)
        .unwrap()
        .call()
        .await;
    assert!(item_1_purchase.is_ok());
 
     // make sure the item's total_bought count increased
     let listed_item = instance
     .methods()
     .get_item(1)
     .simulate()
     .await
     .unwrap();
 assert_eq!(listed_item.value.total_bought, 1);
 
    // withdraw the balance from the owner's wallet
    let withdraw = instance
        .with_account(wallet_1.clone())
        .methods()
        .withdraw_funds()
        .append_variable_outputs(1)
        .call()
        .await;
    assert!(withdraw.is_ok());
 
    // check the balances of wallet_1 and wallet_2
    let balance_1: u64 = wallet_1.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_2: u64 = wallet_2.get_asset_balance(&AssetId::zeroed()).await.unwrap();
    let balance_3: u64 = wallet_3.get_asset_balance(&AssetId::zeroed()).await.unwrap();
 
    assert!(balance_1 == 1007500000);
    assert!(balance_2 == 1142500000);
    assert!(balance_3 == 850000000);
}
```

## 运行测试
运行位于tests/harness.rs，在您的contract文件夹：

```
cargo test
```

如果要在测试期间将输出打印到控制台，请使用 nocapture 标记：

```
cargo test -- --nocapture
```
现在我们对智能合约的功能充满信心，是时候构建一个前端了。这将使用户能够与我们的新市场无缝互动！