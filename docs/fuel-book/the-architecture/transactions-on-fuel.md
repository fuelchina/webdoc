## [Fuel上的交易](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#transactions-on-fuel)

亮点：

1. Fuel采用UTXO模型进行交易，这是比特币协议中广泛使用的方法。此方法允许实现诸如并行处理交易等优势。在这个模型下，账户可以持有原生资产，并通过交易来花费这些资产。

2. Fuel中有五种交易类别，根据其操作进行分类：脚本（Script）、创建（Create）、铸造（Mint）、升级（Upgrade）和上传（Upload）。这种分类有助于定义用户在Fuel生态系统内可执行的各种功能。

3. Fuel交易由几个关键组件构成：输入（Inputs）、脚本（Scripts）、输出（Outputs）和见证人（Witnesses）。输入包括用户在交易过程中访问的状态元素，如货币、合约和消息。
4. Fuel交易结构允许将智能合约作为输入包含进来，可以保持持久化存储，用于执行超出简单交易之外的复杂操作，而这是比特币协议所面临的限制。
5. 见证人在Fuel交易中扮演着重要角色，提供数字签名和验证以供花费货币。区块建造者会填充这些字段，并将其从交易ID中排除，从而在交易处理中实现灵活的数据处理。

Fuel在其区块链上使用UTXO模型进行交易。这个模型在比特币协议中非常流行，具有多种优势，包括并行处理交易。

在Fuel中，账户可以持有原生资产，并通过交易来花费这些资产。Fuel根据区块链操作将交易分为五类：

1. 脚本
2. 创建
3. 铸造
4. 升级
5. 上传。

![2.2 Transaction Types](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-transaction-types-light.png)

Fuel使用UTXO模型进行交易，引入了我们在探讨各种交易类型之前需要详细了解的具体构造：

1. 输入
2. 脚本
3. 输出
4. 见证人。

我们将深入研究Fuel交易组件，然后逐一检查每种交易类型。

## [交易输入](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#inputs)

Fuel交易使用三种类型的输入，即用户在交易过程中可以访问的状态元素：

货币（Coins）
合约（Contracts）
消息（Messages）

## [货币](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#coins)

货币（Coins）是用户可以在交易中花费的资产单位。与仅支持一种基础资产（如以太坊的ETH）的区块链不同，Fuel原生支持多种资产。资产创建功能已内置于Fuel协议中。如果有关于原生资产的更多信息，请参阅相关章节或文档链接。

用户可以持有特定资产的各种面额，在不同的货币数量中体现。例如，Fuel地址A可以有某种资产的余额为100，分为四个面额各25的货币；而另一个地址B对于相同的资产也有100的余额，但分为三个面额分别为10、40、50的货币。

![2.2 Input Coins](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-input-coins-light.png)

一个输入货币包含以下参数：

| name                | type      | description                                         |
| :------------------ | :-------- | :-------------------------------------------------- |
| txID                | byte[32]  | Hash of transaction.                                |
| outputIndex         | uint16    | Index of transaction output.                        |
| owner               | byte[32]  | Owning address or predicate root.                   |
| amount              | uint64    | Amount of coins.                                    |
| asset_id            | byte[32]  | Asset ID of the coins.                              |
| txPointer           | TXPointer | Points to the TX whose output is being spent.       |
| witnessIndex        | uint16    | Index of witness that authorizes spending the coin. |
| predicateGasUsed    | uint64    | Gas used by predicate.                              |
| predicateLength     | uint64    | Length of predicate, in instructions.               |
| predicateDataLength | uint64    | Length of predicate input data, in bytes.           |
| predicate           | byte[]    | Predicate bytecode.                                 |
| predicateData       | byte[]    | Predicate input data (parameters).                  |

关于这种输入类型的交易无效规则，请参阅[[交易无效规则](https://docs.fuel.network/docs/specs/tx-format/input/#inputcoin)]。

## [智能合约](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#contracts)

关于UTXO模型的一个常见问题是，如何实现超越一次性脚本的智能合约。比特币对复杂智能合约的支持有限，这源于几个核心问题：

- 比特币脚本不是图灵完备的，这意味着你无法在比特币中进行诸如循环这样的操作。
- 比特币交易中的脚本缺乏持久化存储，限制了区块链的功能。

许多人误以为比特币的局限性源自其UTXO模型。然而，这些限制实际上是源自有意的设计选择。在Fuel中，我们采用UTXO模型，同时支持带有持久化存储的完整图灵完备智能合约。我们通过将有状态的智能合约作为Fuel交易的输入来解决这个问题。

合约拥有持久化存储，并且可以持有原生资产。用户通过将合约作为交易的输入来消耗合约。然后，用户可以通过附加到交易上的一次性脚本来调用合约的各种外部函数。

![2.2 Input Contracts](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-input-contracts-light.png)

| name        | type      | description                                                  |
| :---------- | :-------- | :----------------------------------------------------------- |
| txID        | byte[32]  | Hash of transaction.                                         |
| outputIndex | uint16    | Index of transaction output.                                 |
| balanceRoot | byte[32]  | Root of amount of coins owned by contract before transaction execution. |
| stateRoot   | byte[32]  | State root of contract before transaction execution.         |
| txPointer   | TXPointer | Points to the TX whose output is being spent.                |
| contractID  | byte[32]  | Contract ID.                                                 |

在签署合约时，交易ID（txID）、输出索引（outputIndex）、余额树根（balanceRoot）、状态树根（stateRoot）和交易指针（txPointer）被设置为0，区块建造者稍后会填充这些字段。这有助于避免合约的并发问题，如先前Cardano模型中所见。

当与Fuel上的AMM合约交互时，该过程遵循特定流程。首先，将合约作为输入包含在你的交易中。接下来，在一个一次性脚本内调用合约的外部方法。最后，将合约作为输出发出。这个发出的合约随后可以作为涉及此特定AMM合约的后续交易的输入。这种方法允许高效的状态管理，并使与Fuel平台上的AMM交互变得无缝。

关于这种输入类型的交易无效规则，请参阅[[交易无效规则](https://docs.fuel.network/docs/specs/tx-format/input/#inputcontract)]。

## [消息](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#messages)

区块建造者负责创建从L1发送至L2的消息。这些消息使得从L1向Fuel汇总存款成为可能，我们将在稍后的“Fuel与Ethereum”章节中更详细地讨论它们。

请注意，输入消息只能作为交易输入被一次性消费，之后将从UTXO集合中移除。

![2.2 Input Messages](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-input-messages-light.png)

Fuel的输入消息包含以下参数：

| name                | type     | description                                             |
| :------------------ | :------- | :------------------------------------------------------ |
| sender              | byte[32] | The address of the message sender.                      |
| recipient           | byte[32] | The address or predicate root of the message recipient. |
| amount              | uint64   | Amount of base asset coins sent with message.           |
| nonce               | byte[32] | The message nonce.                                      |
| witnessIndex        | uint16   | Index of witness that authorizes spending the coin.     |
| predicateGasUsed    | uint64   | Gas used by predicate execution.                        |
| dataLength          | uint64   | Length of message data, in bytes.                       |
| predicateLength     | uint64   | Length of predicate, in instructions.                   |
| predicateDataLength | uint64   | Length of predicate input data, in bytes.               |
| data                | byte[]   | The message data.                                       |
| predicate           | byte[]   | Predicate bytecode.                                     |
| predicateData       | byte[]   | Predicate input data (parameters).                      |

关于这种输入类型的交易无效规则，请参阅[[交易无效规则](https://docs.fuel.network/docs/specs/tx-format/input/#inputmessage)]。

## [Fuel脚本](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#scripts)

Fuel脚本为一次性脚本，用于表达交易期间执行的各种操作。脚本可以调用作为输入提供的合约或执行其他任意计算。

Fuel通过脚本实现了多调用功能，使批量交易更加高效。这允许用户：

1. 在一个交易中包含最多[MAX_INPUTS](https://docs.fuel.network/docs/specs/tx-format/consensus_parameters/)个合约；
2. 调用这些合约上的外部函数。

正如在FuelVM章节中提到的，FuelVM位于脚本上下文中，因此脚本不具有自己的持久化存储。

## [Outputs](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#outputs)

Fuel交易有输出（Outputs），它们定义了交易后新UTXO的创建；这些输出随后可以成为下一批交易的输入。

Fuel交易中有五种可能的输出类型：

1. 货币（Coin）
2. 合约（Contract）
3. 找零（Change）
4. 变量（Variable）
5. 创建的合约（ContractCreated）

需要注意的是，我们有三种处理货币的输出类型，下表总结了核心差异（我们将在后续章节中进一步扩展）：

|         | OutputCoin | OutputChange      | OutputVariable         |
| :------ | :--------- | :---------------- | :--------------------- |
| Amount  | Static     | Automatically set | Set by script/contract |
| AssetID | Static     | Static            | Set by script/contract |
| To      | Static     | Static            | Set by script/contract |

**注意**：金额为零的货币输出将从UTXO集合中移除，这意味着金额为零的货币输出不会成为UTXO集合的一部分。

## [OutputCoin](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#outputcoin)

输出货币是发送到Fuel地址的新货币，它们可以在后续交易中作为输入货币被消费。

| name     | type     | description                          |
| :------- | :------- | :----------------------------------- |
| to       | byte[32] | Receiving address or predicate root. |
| amount   | uint64   | Amount of coins to send.             |
| asset_id | byte[32] | Asset ID of coins.                   |

![2.2 Output Coins](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-output-coin-light.png)

关于这种输出类型的交易无效规则，请参阅[这里](https://docs.fuel.network/docs/specs/tx-format/output/#outputcoin)。

## [输出类型的智能合约](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#outputcontract)

新生成的合约输出（OutputContracts）在被处理为交易的一部分后，成为后续交易中特定合约ID的可用输入合约。它们包含经处理后的合约更新的索引、余额树根和状态树根。

**注意**：交易中的每个输入合约都必须有一个对应的输出合约。

OutputContracts are newly generated contract outputs that become available as InputContracts for a specific contract ID in subsequent transactions utilizing this contract as an Input. They contain the newly updated index, balanceRoot, and stateRoot of the contract after being processed as part of the transaction.

**NOTE:** Every InputContract part of the transaction must always have a corresponding Output Contract.

![2.2 Output Contract](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-output-contract-light.png)

| name        | type     | description                                                  |
| :---------- | :------- | :----------------------------------------------------------- |
| inputIndex  | uint16   | Index of input contract.                                     |
| balanceRoot | byte[32] | Root of amount of coins owned by contract after transaction execution. |
| stateRoot   | byte[32] | State root of contract after transaction execution.          |

关于这种输出类型的交易无效规则，请参阅[这里](https://docs.fuel.network/docs/specs/tx-format/output/#outputcontract)。

## [输出找零](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#outputchange)

输出找零（OutputChange）用于特定资产Id的输出之一，使用户能够回收交易中该资产Id提供的总输入余额中未使用的部分。

例如，输出找零可以收集任何未用作Gas费用的ETH或未在DEX交易中交换的USDC。

![2.2 Output Change](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-output-change-light.png)

**注意**：每笔交易中每个`asset_id`只能有一个输出找零（OutputChange）。

| name     | type     | description                          |
| :------- | :------- | :----------------------------------- |
| to       | byte[32] | Receiving address or predicate root. |
| amount   | uint64   | Amount of coins to send.             |
| asset_id | byte[32] | Asset ID of coins.                   |

关于这种输出类型的交易无效规则，请参阅[这里](https://docs.fuel.network/docs/specs/tx-format/output/#outputchange)。

## [输出变量](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#outputvariable)

输出变量（OutputVariable）作为脚本和合约执行期间创建货币的占位符，适用于无法提前确定确切输出金额和所有者的情况。

**注意**：这意味着每笔使用内部铸造功能的交易都需要为那个特定的`assetID`提供一个输出变量（OutputVariable）。

![2.2 Output Variable](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-output-variable-light.png)

考虑一个场景，即合约仅在接收到正确值时才将输出货币转移给用户。在这种情况下，我们可以在交易结束时使用一个变量输出。这个输出可能附带也可能不附带价值，取决于条件是否满足，并且可以拥有任意所有者。

输出变量通过[TRO操作吗](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#tro-transfer-coins-to-output)使用。

| name     | type     | description                          |
| :------- | :------- | :----------------------------------- |
| to       | byte[32] | Receiving address or predicate root. |
| amount   | uint64   | Amount of coins to send.             |
| asset_id | byte[32] | Asset ID of coins.                   |

关于这种输出类型的交易无效规则，请参阅[我们的文档](https://docs.fuel.network/docs/specs/tx-format/output/#outputvariable)。

## [OutputContractCreated](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#outputcontractcreated)

`OutputContractCreated`输出表明交易过程中创建了新的合约。参数包括`contractID`和该合约的初始状态根。

| name       | type     | description                     |
| :--------- | :------- | :------------------------------ |
| contractID | byte[32] | Contract ID.                    |
| stateRoot  | byte[32] | Initial state root of contract. |

关于这种输出类型的交易无效规则，请参阅[这里](https://docs.fuel.network/docs/specs/tx-format/output/#outputcontractcreated)。

## [见证人](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#witness)

见证（Witness）是附加到交易的一个参数。区块建造者负责填写见证人信息，这些信息不包含在交易ID中。见证人通常用于提供数字签名以进行验证，例如，用作证明货币的花费或其他操作的签名。

见证人不包含在交易ID中，使得签名后的交易可作为交易的一部分提供。

**注意**：协议不限制见证人仅提供签名；它们还可以填充任何数据，支持各种有趣的使用案例，如[状态重现技术](https://docs.fuel.network/docs/fuel-book/fuels-future/state-rehydration/)。

每个见证人包含一个字节数组数据及字段`dataLength`，用于标识数据长度。

| name       | type     | description                       |
| :--------- | :------- | :-------------------------------- |
| dataLength | uint64   | Length of witness data, in bytes. |
| data       | byte[]   | Witness data.                     |
| asset_id   | byte[32] | Asset ID of coins.                |

单个交易可以提供多个见证人，输入可以指示区块建造者、合约、脚本或谓词查看哪个见证人以验证输入的有效性，通过提供其见证人所在的索引来实现。

## [交易脚本](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#transactionscript)

脚本交易顾名思义，包括输入、输出以及一个决定交易过程中发生什么行为的脚本。

请注意，在TransactionScript类型的交易中，脚本并非必需，即某些情况下无需脚本。例如，简单的代币转账只需要输入和输出即可完成，无需脚本。脚本主要是在交易中除了简单转移或销毁资产外还需要执行其他操作时使用。

交易中的脚本可以计算任意数量并调用其他合约。一个著名的脚本交易例子是使用自动做市商(AMM)或进行代币转账。

| name             | type       | description                             |
| :--------------- | :--------- | :-------------------------------------- |
| scriptGasLimit   | uint64     | Gas limits the script execution.        |
| receiptsRoot     | byte[32]   | Merkle root of receipts.                |
| scriptLength     | uint64     | Script length, in instructions.         |
| scriptDataLength | uint64     | Length of script input data, in bytes.  |
| policyTypes      | uint32     | Bitfield of used policy types.          |
| inputsCount      | uint16     | Number of inputs.                       |
| outputsCount     | uint16     | Number of outputs.                      |
| witnessesCount   | uint16     | Number of witnesses.                    |
| script           | byte[]     | Script to execute.                      |
| scriptData       | byte[]     | Script input data (parameters).         |
| policies         | Policy []  | List of policies, sorted by PolicyType. |
| inputs           | Input []   | List of inputs.                         |
| outputs          | Output []  | List of outputs.                        |
| witnesses        | Witness [] | List of witnesses.                      |

注意：脚本交易没有创建合约的能力，因此它们不能产生ContractCreated类型的输出。有关更多关于交易无效性的规则，请参阅[此处](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionscript)。

## [交易创建](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#transactioncreate)

TransactionCreate用于创建新的合约；其参数允许初始化存储槽的合约。

Fuel网络上的智能合约ID是确定性计算得出的，具体的计算机制请参考[此处](https://docs.fuel.network/docs/specs/identifiers/contract-id/)。

![2.2 Transaction Create](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-transaction-create-light.png)

| name                 | type                   | description                                       |
| :------------------- | :--------------------- | :------------------------------------------------ |
| bytecodeWitnessIndex | uint16                 | Witness index of contract bytecode to create.     |
| salt                 | byte[32]               | Salt.                                             |
| storageSlotsCount    | uint64                 | Number of storage slots to initialize.            |
| policyTypes          | uint32                 | Bitfield of used policy types.                    |
| inputsCount          | uint16                 | Number of inputs.                                 |
| outputsCount         | uint16                 | Number of outputs.                                |
| witnessesCount       | uint16                 | Number of witnesses.                              |
| storageSlots         | (byte[32], byte[32])[] | List of storage slots to initialize (key, value). |
| policies             | Policy []              | List of policies.                                 |
| inputs               | Input []               | List of inputs.                                   |
| outputs              | Output []              | List of outputs.                                  |
| witnesses            | Witness []             | List of witnesses.                                |

这种交易类型的交易无效规则可见[此处](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionscript)。

## [交易铸造](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#transactionmint)

区块生成者利用此类交易来铸造新资产。它不需要签名。目前，该交易用于创建区块生产者的费用。每个区块的最后一笔交易是Coinbase交易，允许区块生产者因构建区块而收取费用。

![2.2 Transaction Mint](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-transaction-mint-light.png)

| name           | type           | description                                                  |
| :------------- | :------------- | :----------------------------------------------------------- |
| txPointer      | TXPointer      | The location of the Mint transaction in the block.           |
| inputContract  | InputContract  | The contract UTXO that assets are minted to.                 |
| outputContract | OutputContract | The contract UTXO that assets are being minted to.           |
| mintAmount     | uint64         | The amount of funds minted.                                  |
| mintAssetId    | byte[32]       | The asset IDs corresponding to the minted amount.            |
| gasPrice       | uint64         | The gas price to be used in calculating all fees for transactions on block |

这种交易类型的交易无效规则可见此处。

## [交易升级](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#transactionupgrade)

Fuel网络采用[共识参数](https://docs.fuel.network/docs/specs/tx-format/consensus_parameters/)，并会偶尔进行升级。网络的状态转换函数位于链上，允许特权地址在必要时升级它。

因此，在任何时候，TransactionUpgrade可能会尝试执行以下动作之一：

- 尝试升级共识参数
- 尝试升级状态转换函数

![2.2 Transaction Upgrade](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-transaction-upgrade-light.png)

| name           | type           | description                    |
| :------------- | :------------- | :----------------------------- |
| upgradePurpose | UpgradePurpose | The purpose of the upgrade.    |
| policyTypes    | uint32         | Bitfield of used policy types. |
| inputsCount    | uint16         | Number of inputs.              |
| outputsCount   | uint16         | Number of outputs.             |
| witnessesCount | uint16         | Number of witnesses.           |
| policies       | Policy []      | List of policies.              |
| inputs         | Input []       | List of inputs.                |
| outputs        | Output []      | List of outputs.               |
| witnesses      | Witness []     | List of witnesses.             |

这种交易类型的交易无效规则可见[此处](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionmint)。

## [交易上传](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#transactionupload)

在进行升级之前，运营商必须通过多个交易将Fuel状态转换字节码上传到链上。TransactionUpload使我们能够将字节码分割成多个部分，并通过多个交易依次上传每个部分。

一旦所有子部分成功上传完毕，交易便告完成，系统随即采纳新的字节码。

![2.2 Transaction Upload](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.2-transaction-upload-light.png)

| name              | type       | description                                                  |
| :---------------- | :--------- | :----------------------------------------------------------- |
| root              | byte[32]   | The root of the Merkle tree is created over the bytecode.    |
| witnessIndex      | uint16     | The witness index of the subsection of the bytecode.         |
| subsectionIndex   | uint16     | The index of the subsection of the bytecode.                 |
| subsectionsNumber | uint16     | The total number of subsections on which bytecode was divided. |
| proofSetCount     | uint16     | Number of Merkle nodes in the proof.                         |
| policyTypes       | uint32     | Bitfield of used policy types.                               |
| inputsCount       | uint16     | Number of inputs.                                            |
| outputsCount      | uint16     | Number of outputs.                                           |
| witnessesCount    | uint16     | Number of witnesses.                                         |
| proofSet          | byte[32][] | The proof set of Merkle nodes to verify the connection of the subsection to the root. |
| policies          | Policy []  | List of policies.                                            |
| inputs            | Input []   | List of inputs.                                              |
| outputs           | Output []  | List of outputs.                                             |
| witnesses         | Witness [] | List of witnesses.                                           |

这种交易类型的交易无效规则可见[此处](https://docs.fuel.network/docs/specs/tx-format/transaction/#transactionupload)。

## [附录](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#appendix)

## [原生资产](https://docs.fuel.network/docs/fuel-book/the-architecture/transactions-on-fuel/#native-assets)

在Fuel中，除了以太坊（称为基础资产）之外，协议内建有铸造和销毁资产的功能。FuelVM提供了用于创建、铸造和销毁资产的操作码[MINT](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#mint-mint-new-coins)和[BURN](https://docs.fuel.network/docs/specs/fuel-vm/instruction-set/#burn-burn-existing-coins)。

所有原生资产都可以按照基础资产相同的规则进行花费，让Fuel开发者和用户能够充分利用UTXO模型及其带来的并行化优势。

为了进一步了解原生资产，建议查阅Sway标准，它提供了与原生资产相关的各种标准（如SRC-3，SRC-20等）。