## [Fuel的区块](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#fuel-blocks)

亮点：

1. 在Fuel中，区块是由称为区块构建者的实体所构建的。这些构建者处理交易和消息以创建Fuel区块链上的区块。用户可以直接向构建者发送交易，或者通过Layer 1进行，而消息则源自Layer 1。《Fuel和以太坊》章节中有关于这一过程的进一步说明。

2. 每个Fuel区块都以一个头部开始，该头部由三个主要部分组成：应用头部（Application Header）、共识头部（Consensus Header）和区块头部元数据（Block Header Metadata）。这种结构有助于高效管理和处理区块相关的信息。

3. 应用头部记录了Fuel汇总操作的关键运营细节，包括四个重要组件：`da_height`、`consensus_parameters_version`、`state_transition_bytecode_version`和生成字段。这些组件协同工作，以确保汇总正确和高效地运行。

4. 共识头部追踪应用头部的哈希值，提供了一种安全且可验证的方法来维护Fuel网络内的共识。这个头部对于确保区块的完整性至关重要。

5. Fuel区块还包括一笔Coinbase交易，这使得区块生产者能够收集他们工作的报酬。这笔铸造交易必须是区块中的最后一笔交易，并且其铸造量不得超过该区块内所有交易处理的总费用，从而确保了一个公平和受控的费用结构。

在Fuel中，区块是由称为区块构建者的实体所构建的。Fuel区块通过处理交易和消息生成。用户可以直接向区块构建者提交交易，或者选择通过Layer 1进行；而所有的消息都是从Layer 1发出。在《Fuel和以太坊》章节中，我们对L1发出的消息和交易有更深入的探讨。

## [区块头](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#block-header)

Fuel的区块头的由三个顶级字段组成：

- 应用头部（Application Header）
- 共识头部（Consensus Header）
- 区块头元数据（Block Header Metadata）

```
pub struct BlockHeaderV1 {

    pub application: ApplicationHeader<GeneratedApplicationFields>,

    pub consensus: ConsensusHeader<GeneratedConsensusFields>,

    metadata: Option<BlockHeaderMetadata>,
}
```

### [应用头部](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#application-header)

应用头部记录了一些关于Fuel rollup的基本信息。

应用头部主要由以下四个基本组件组成：

```
pub struct ApplicationHeader<Generated> {

    pub da_height: DaBlockHeight,
 
    pub consensus_parameters_version: ConsensusParametersVersion,

    pub state_transition_bytecode_version: StateTransitionBytecodeVersion,

    pub generated: Generated,
}
```

#### [da_height](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#da_height)

`da_height`字段记录了最新的L1区块高度，直到从L1到L2发送的消息被处理为止。这在欺诈证明中非常有用，因为它能证实一条特定的消息确实从L1发送到了L2汇总，但在处理至该消息所在区块时并未被纳入该区块。

#### [consensus_parameters_version](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#consensus_parameters_version)

Fuel rollup有一组可升级的[共识参数](https://docs.fuel.network/docs/specs/tx-format/consensus_parameters/#consensus-parameters)，可以通过Upgrade类型的交易进行。对于每一次共识参数的升级，都需要为`consensus_parameters_version`分配一个新的版本号，这有助于我们追踪在构建特定区块时使用的是哪一组共识参数。

#### [state_transition_bytecode_version](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#state_transition_bytecode_version)

Fuel汇总保持其WASM编译的状态转换函数字节码作为链的一部分，以促进无分叉升级。

新的状态转换函数通过`Upload`交易上传，而升级则是通过`Upgrade`交易完成。每次升级都会更新`state_transition_bytecode_version`，这个版本号有助于追踪处理特定区块的交易时使用的是哪个状态转换函数。

#### [generated](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#generated)

应用头部的生成部分包含了与执行相关的汇总特有字段，例如交易数量、消息收据数量、交易的Merkle根等。

```
pub struct GeneratedApplicationFields {
    /// Number of transactions in this block.
    pub transactions_count: u16,
    /// Number of message receipts in this block.
    pub message_receipt_count: u32,
    /// Merkle root of transactions.
    pub transactions_root: Bytes32,
    /// Merkle root of message receipts in this block.
    pub message_outbox_root: Bytes32,
    /// Root hash of all imported events from L1
    pub event_inbox_root: Bytes32,
}
```

### [共识头部](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#consensus-header)

The consensus header is another top-level field for the Block Header for Fuel rollups, it is configurable and for the flagship Fuel rollup only keeps track of the hash of the Application Header.

共识头部是Fuel汇总区块头部的另一个顶级字段，它配置灵活，在旗舰Fuel汇总中仅跟踪应用头部的哈希值。

```
pub struct GeneratedConsensusFields {
    /// Hash of the application header.
    pub application_hash: Bytes32,
}
```

### [Block Header Metadata](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#block-header-metadata)

The Block Header Metadata is used to track metadata. The current flagship Fuel rollup includes a field tracking the block ID, which represents the hash of the block header.

区块头部元数据用于跟踪元数据。当前旗舰Fuel汇总包括一个字段来跟踪区块ID，即区块头部的哈希值。

```
pub struct BlockHeaderMetadata {
    /// Hash of the header.
    id: BlockId,
}
```

## [代币生成交易](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-blocks/#coinbase-transaction)

Fuel区块还包括一笔Coinbase交易，这使得区块生产者能够收集他们工作的报酬。这笔铸造交易必须是区块中的最后一笔交易，并且其铸造量不得超过该区块内所有交易处理的总费用，从而确保了一个公平和受控的费用结构。



