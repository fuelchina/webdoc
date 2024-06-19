# 定义合约函数



最后，是时候编写我们的合约函数了。首先复制并粘贴我们之前概述的 ABI。确保合同中的功能至关重要 确切地 与 ABI 保持一致；否则，编译器将产生错误。现在，用大括号替换每个函数末尾的分号。另外，修改 abi SwayStore 到 impl SwayStore for Contract，如下所示：

``` sway
impl SwayStore for Contract {
	#[storage(read, write)]
	fn list_item(price: u64, metadata: str[20]){
		
	}
 
	#[storage(read, write), payable]
	fn buy_item(item_id: u64) {
		
	}
 
	#[storage(read)]
	fn get_item(item_id: u64) -> Item {
		
	}
 
	#[storage(read, write)]
	fn initialize_owner() -> Identity {
		
	}
 
	#[storage(read)]
	fn withdraw_funds(){
		
	}
 
	#[storage(read)]
	fn get_count() -> u64{
 
	}
}
```

本指南将首先展示上面每个已完成的功能。然后，我们将对其进行分解以解释每个部分，阐明具体语法并讨论 Sway 中的基本概念。

## 1. 发布商品
我们的第一个功能使卖家能够列出待售商品。他们可以指定物料的价格，并提供引用有关物料的外部存储数据的字符串。

``` sway
#[storage(read, write)]
fn list_item(price: u64, metadata: str[20]) {
    
    // increment the item counter
    storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);
    
    // get the message sender
    let sender = msg_sender().unwrap();
    
    // configure the item
    let new_item: Item = Item {
        id: storage.item_counter.try_read().unwrap(),
        price: price,
        owner: sender,
        metadata: metadata,
        total_bought: 0,
    };
 
    // save the new item to storage using the counter value
    storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);
}
```


### 更新列表存储
第一步涉及递增item_counter在存储中，这将用作项目的 ID。在 Sway 中，所有存储变量都包含在storage关键字，确保清晰度并防止与其他变量名称冲突。这也使开发人员能够轻松跟踪访问或更改存储的时间和位置。Sway 中的标准库提供read(), write()和try_read()访问或操作合约存储的方法。建议使用try_read()如果可能，以防止因访问未初始化的存储而产生的潜在问题。在这种情况下，我们读取列出项目的当前计数，对其进行修改，然后将更新的计数存储回存储中，利用组织良好且无冲突的存储系统。

当函数返回Option或Result类型，我们可以使用unwrap()来获取其内在价值。例如try_read()返回一个Option类型。如果它屈服Some，我们得到包含的值;但如果它返回None，合约调用立即停止。

``` sway
// increment the item counter
storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);
```


### 获取消息发件人
接下来，我们将检索Identity列出该项目的帐户。

要获得Identity，利用msg_sender函数。这msg_sender表示发起当前函数调用的实体的地址（无论是用户地址还是其他合约地址）。

此函数生成一个Result，这是一个枚举类型，可以是 OK 也可以是 ERROR。使用Result键入，以预测可能导致错误的值。例如，在以下情况下msg_sender当涉及外部调用方并且硬币输入所有者不同时，识别调用者变得不可能。在这种极端情况下，一个Err(AuthError)返回。

```sway
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

在 Sway 中，可以使用任一let或const.

```sway
// get the message sender
let sender = msg_sender().unwrap();
```

要检索内部值，可以使用unwrap方法。如果Result正常，如果结果指示错误，则触发恐慌(rust 中的panic)。

### 创建新项目
您可以使用Item结构。使用item_countervalue from storage 作为 ID，根据输入参数设置价格和元数据，初始化total_bought更改为 0。

由于owner字段需要Identity类型，则应利用从以下位置获取的发送方值msg_sender().

``` sway
// configure the item
let new_item: Item = Item {
    id: storage.item_counter.try_read().unwrap(),
    price: price,
    owner: sender,
    metadata: metadata,
    total_bought: 0,
};
```

### 更新 StorageMap
最后，将项目添加到item_map在存储中使用insert方法。对密钥使用相同的 ID，并将项目指定为其对应值。

```sway
// save the new item to storage using the counter value
storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);
```

## 2. 购买商品
接下来，我们的目标是允许买家购买列出的商品。为此，我们需要：

接受买家提供的所需物料 ID 作为函数参数。
确保买家使用有效硬币支付正确的价格。
增加total_bought计入该项目。
从物料成本中扣除合同费，并将剩余金额转移给卖方。
```rust

#[storage(read, write), payable]
fn buy_item(item_id: u64) {
    // get the asset id for the asset sent
    let asset_id = msg_asset_id();
 
    // require that the correct asset was sent
    require(asset_id == AssetId::base(), InvalidError::IncorrectAssetId(asset_id));
 
    // get the amount of coins sent
    let amount = msg_amount();
 
    // get the item to buy
    let mut item = storage.item_map.get(item_id).try_read().unwrap();
 
    // require that the amount is at least the price of the item
    require(amount >= item.price, InvalidError::NotEnoughTokens(amount));
 
    // update the total amount bought
    item.total_bought += 1;
 
    // update the item in the storage map
    storage.item_map.insert(item_id, item);
 
    // only charge commission if price is more than 0.1 ETH
    if amount > 100_000_000 {
        // keep a 5% commission
        let commission = amount / 20;
        let new_amount = amount - commission;
        // send the payout minus commission to the seller
        transfer(item.owner, asset_id, new_amount);
    } else {
        // send the full payout to the seller
        transfer(item.owner, asset_id, amount);
    }
}
```

### 验证付款
我们可以使用msg_asset_id函数，以获取交易中正在转移的硬币的资产 ID。

```
let asset_id = msg_asset_id();
```

接下来，我们将利用require语句，以确保发送的资产是正确的。

这require语句接受两个参数：一个条件和一个在条件为 false 时记录的值。如果条件的计算结果为 false，则整个事务将回滚，不会留下任何更改。

在这种情况下，条件检查asset_id匹配基础资产 ID（与基础区块链关联的默认资产），使用AssetId::base().例如，如果基础区块链是以太坊，则基础资产将是 ETH。

如果资产不匹配，例如，如果有人尝试使用不同的硬币购买物品，我们将触发之前定义的自定义错误，传递asset_id.

``` sway
require(asset_id == AssetId::base(), InvalidError::IncorrectAssetId(asset_id));
```

接下来，我们可以使用msg_amount函数，用于检索买方在交易中传输的硬币数量。

```
let amount = msg_amount();
```

为确保发送的金额不低于商品的价格，我们应该使用item_id参数。

要获取存储映射中特定键的值，请get方法很方便，其中键值被传递。对于映射存储访问，try_read()方法被利用。由于此方法产生Result类型，unwrap方法可以应用于提取项目值。

```
let mut item = storage.item_map.get(item_id).try_read().unwrap();
```

在 Sway 中，默认情况下所有变量都是不可变的，无论是否声明为let或const.要修改任何变量的值，必须使用mut关键词。由于我们计划更新该项目的total_bought值，它应该被定义为可变的。

此外，必须确保为该物品发送的硬币数量不低于该物品的价格。

```
require(amount >= item.price, InvalidError::NotEnoughTokens(amount));
```

更新购买存储
我们可以增加项目的total_bought字段值，然后将其重新插入到item_map.此操作将用修订后的项目替换前面的值。

```sway
// update the total amount bought
item.total_bought += 1;
 
// update the item in the storage map
storage.item_map.insert(item_id, item);
```

### 转账付款
最后，我们可以处理向卖家的付款。建议仅在完成所有存储修改后才转移资产，以防止重入攻击.

对于达到特定价格阈值的商品，可以使用有条件的if结构.

```sway
// only charge commission if price is more than 0.1 ETH
if amount > 100_000_000 {
    // keep a 5% commission
    let commission = amount / 20;
    let new_amount = amount - commission;
    // send the payout minus commission to the seller
    transfer(item.owner, asset_id, new_amount);
} else {
    // send the full payout to the seller
    transfer(item.owner, asset_id, amount);
}
```

在上述 if 条件下，我们评估传输量是否超过 100,000,000。为了清楚起见，大量使用，例如100000000，我们可以将其表示为100_000_000.如果此合约的基础资产是 ETH，则考虑到 Fuel 使用 9 十进制系统，这相当于 0.1 ETH。

如果金额超过 0.1 ETH，则确定佣金，然后从总额中扣除。

为了方便向物品所有者付款，transfer功能被利用。此函数源自标准库，需要三个参数：硬币发送到的身份、硬币的资产 ID 和用于转移的硬币数量。

## 3. 获取物品
为了获取项目的详细信息，我们可以创建一个只读函数，该函数返回Item给定项 ID 的结构。

``` sway
#[storage(read)]
fn get_item(item_id: u64) -> Item {
    // returns the item for the given item_id
    return storage.item_map.get(item_id).try_read().unwrap();
}
```

要返回函数中的值，可以使用return关键字，类似于 JavaScript。或者，您可以省略最后一行中的分号以返回该值，就像在 Rust 中一样。

``` sway
fn my_function_1(num: u64) -> u64{
    // returns the num variable
    return num;
}

 
fn my_function_2(num: u64) -> u64{
    // returns the num variable
    num
}
```

## 4. 初始化所有者
此方法设置所有者的Identity对于合同，但只有一次。

``` sway
#[storage(read, write)]
fn initialize_owner() -> Identity {
    let owner = storage.owner.try_read().unwrap();
    
    // make sure the owner has NOT already been initialized
    require(owner.is_none(), "owner already initialized");
    
    // get the identity of the sender        
    let sender = msg_sender().unwrap(); 
 
    // set the owner to the sender's identity
    storage.owner.write(Option::Some(sender));
    
    // return the owner
    return sender;
}
```

为了确保此函数只能调用一次，特别是在合约部署之后，所有者的值必须保持设置为None.我们可以使用以下方法实现此验证is_none方法，用于评估 Option 类型是否为None.

同样重要的是要注意以下方面的潜在风险, 在此上下文中，此代码尚未经过审核。

```sway
let owner = storage.owner.try_read().unwrap();
 
// make sure the owner has NOT already been initialized
require(owner.is_none(), "owner already initialized");
```

要分配owner作为消息发送方，有必要将Result键入Option类型。

``` sway
// get the identity of the sender        
let sender = msg_sender().unwrap(); 
 
// set the owner to the sender's identity
storage.owner.write(Option::Some(sender));
```

最后，我们将返回Identity的消息发送者。

``` sway
// return the owner
return sender;
```

## 5. 提取资金
这withdraw_funds功能允许所有者从合同中提取任何累积资金。

```sway
#[storage(read)]
fn withdraw_funds() {
    let owner = storage.owner.try_read().unwrap();
 
    // make sure the owner has been initialized
    require(owner.is_some(), "owner not initialized");
    
    let sender = msg_sender().unwrap(); 
 
    // require the sender to be the owner
    require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));
    
    // get the current balance of this contract for the base asset
    let amount = this_balance(AssetId::base());
 
    // require the contract balance to be more than 0
    require(amount > 0, InvalidError::NotEnoughTokens(amount));
    
    // send the amount to the owner
    transfer(owner.unwrap(), AssetId::base(), amount);
}
```

首先，我们将确保所有者已初始化为特定地址。

```sway
let owner = storage.owner.try_read().unwrap();
 
// make sure the owner has been initialized
require(owner.is_some(), "owner not initialized");
```

接下来，我们将验证试图提取资金的个人确实是所有者。

```sway
let sender = msg_sender().unwrap(); 
 
// require the sender to be the owner
require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));
```

此外，我们可以使用 this_balance 函数。此函数返回合约的当前余额。

``` sway
// get the current balance of this contract for the base asset
let amount = this_balance(AssetId::base());
 
// require the contract balance to be more than 0
require(amount > 0, InvalidError::NotEnoughTokens(amount));
```

最后，我们会将合同的全部余额转移给用户。

```sway
// send the amount to the owner
transfer(owner.unwrap(), AssetId::base(), amount);
```


## 6. 获取总项目数

我们将介绍的最后一个功能是get_count.这个简单的 getter 函数返回item_counter变量存储在合约的存储中。

``` sway
#[storage(read)]
fn get_count() -> u64 {
    return storage.item_counter.try_read().unwrap();
}
```


## 回顾
这SwayStore合同在您的main.sw现在应该看起来像这样，遵循我们之前写的所有其他内容：

```sway
contract;
 
use std::{
    auth::msg_sender,
    call_frames::msg_asset_id,
    context::{
        msg_amount,
        this_balance,
    },
    asset::transfer,
    hash::Hash,
};
 
struct Item {
    id: u64,
    price: u64,
    owner: Identity,
    metadata: str[20],
    total_bought: u64,
}
 
abi SwayStore {
    // a function to list an item for sale
    // takes the price and metadata as args
    #[storage(read, write)]
    fn list_item(price: u64, metadata: str[20]);
 
    // a function to buy an item
    // takes the item id as the arg
    #[storage(read, write), payable]
    fn buy_item(item_id: u64);
 
    // a function to get a certain item
    #[storage(read)]
    fn get_item(item_id: u64) -> Item;
 
    // a function to set the contract owner
    #[storage(read, write)]
    fn initialize_owner() -> Identity;
 
    // a function to withdraw contract funds
    #[storage(read)]
    fn withdraw_funds();
 
    // return the number of items listed
    #[storage(read)]
    fn get_count() -> u64;
}
 
storage {
    // counter for total items listed
    item_counter: u64 = 0,
 
    // map of item IDs to Items
    item_map: StorageMap<u64, Item> = StorageMap {},
 
    // owner of the contract
    owner: Option<Identity> = Option::None,
}
 
enum InvalidError {
    IncorrectAssetId: AssetId,
    NotEnoughTokens: u64,
    OnlyOwner: Identity,
}
 
impl SwayStore for Contract {
    #[storage(read, write)]
    fn list_item(price: u64, metadata: str[20]) {
        
        // increment the item counter
        storage.item_counter.write(storage.item_counter.try_read().unwrap() + 1);
        
        // get the message sender
        let sender = msg_sender().unwrap();
        
        // configure the item
        let new_item: Item = Item {
            id: storage.item_counter.try_read().unwrap(),
            price: price,
            owner: sender,
            metadata: metadata,
            total_bought: 0,
        };
 
        // save the new item to storage using the counter value
        storage.item_map.insert(storage.item_counter.try_read().unwrap(), new_item);
    }
 
    #[storage(read, write), payable]
    fn buy_item(item_id: u64) {
        // get the asset id for the asset sent
        let asset_id = msg_asset_id();
 
        // require that the correct asset was sent
        require(asset_id == AssetId::base(), InvalidError::IncorrectAssetId(asset_id));
 
        // get the amount of coins sent
        let amount = msg_amount();
 
        // get the item to buy
        let mut item = storage.item_map.get(item_id).try_read().unwrap();
 
        // require that the amount is at least the price of the item
        require(amount >= item.price, InvalidError::NotEnoughTokens(amount));
 
        // update the total amount bought
        item.total_bought += 1;
 
        // update the item in the storage map
        storage.item_map.insert(item_id, item);
 
        // only charge commission if price is more than 0.1 ETH
        if amount > 100_000_000 {
            // keep a 5% commission
            let commission = amount / 20;
            let new_amount = amount - commission;
            // send the payout minus commission to the seller
            transfer(item.owner, asset_id, new_amount);
        } else {
            // send the full payout to the seller
            transfer(item.owner, asset_id, amount);
        }
    }
 
    #[storage(read)]
    fn get_item(item_id: u64) -> Item {
        // returns the item for the given item_id
        return storage.item_map.get(item_id).try_read().unwrap();
    }
 
    #[storage(read, write)]
    fn initialize_owner() -> Identity {
        let owner = storage.owner.try_read().unwrap();
        
        // make sure the owner has NOT already been initialized
        require(owner.is_none(), "owner already initialized");
        
        // get the identity of the sender        
        let sender = msg_sender().unwrap(); 
 
        // set the owner to the sender's identity
        storage.owner.write(Option::Some(sender));
        
        // return the owner
        return sender;
    }
 
    #[storage(read)]
    fn withdraw_funds() {
        let owner = storage.owner.try_read().unwrap();
 
        // make sure the owner has been initialized
        require(owner.is_some(), "owner not initialized");
        
        let sender = msg_sender().unwrap(); 
 
        // require the sender to be the owner
        require(sender == owner.unwrap(), InvalidError::OnlyOwner(sender));
        
        // get the current balance of this contract for the base asset
        let amount = this_balance(AssetId::base());
 
        // require the contract balance to be more than 0
        require(amount > 0, InvalidError::NotEnoughTokens(amount));
        
        // send the amount to the owner
        transfer(owner.unwrap(), AssetId::base(), amount);
    }
 
    #[storage(read)]
    fn get_count() -> u64 {
        return storage.item_counter.try_read().unwrap();
    }
}
```