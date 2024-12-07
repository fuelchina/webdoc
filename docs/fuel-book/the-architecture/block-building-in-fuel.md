## [Block Building in Fuel](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#block-building-in-fuel)

要点：

- 区块构建器在Fuel中发挥核心作用，通过处理消息和交易、构建区块并提交给Layer 1，同时确保Layer 2上的软终局性。
- Fuel区块构建器使用消息系统促进Layer 1与Layer 2之间的信息交换，允许普通交易和强制交易包含。这一特性赋予用户绕过潜在审查的权力。
- 为了确保消息和交易的可靠处理，区块构建器为每个区块附加一个数据高度(da_height)，将其与特定的Layer 1区块关联。利用默克尔树存储承诺，确保所有事件都以确定的方式处理，必要时可以透明地验证和削减区块构建器。
- 区块构建器还处理本地交易，使用户可以直接向其发送交易，从而实现更高效的批处理和压缩。这降低了交易成本，加速了软终局性，为用户提供比传统Layer 1提交更快的确认。
- 区块构建器决定交易顺序并管理矿工可提取价值(MEV)。根据提供的小费优先级处理交易，而不是许多其他Layer 2解决方案中常见的先进先出方法，优化网络内的用户激励。

该部分重点讨论了Fuel中的区块构建过程以及区块构建器在此过程中所起的作用。

Fuel区块构建器是Fuel汇总（rollups）中的一个组件，负责执行以下任务：

- 处理从Layer 1到Layer 2的消息
- 处理内存池中的交易
- 构建区块并提交给Layer 1
- 在Layer 2上提供软终局性

## [从Layer 1到Layer 2的处理](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#l1--l2-processing)

Fuel汇总拥有一个消息系统（从Layer 1到Layer 2及反向），我们将在下一节关于桥接的部分进一步讨论。除了传递桥接消息外，该系统还允许交易直接从Layer 1发送，这用于强制交易包含。

Fuel区块构建器使用中继来接收从Layer 1到Layer 2的消息和交易，接下来我们将逐一探讨这两种情形。

## [来自L1的消息](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#l1-messages)

区块构建器接收来自Layer 1作为L1事件发出的中继消息。随后，这些消息会被区块构建过程中拾取并处理；每个从Layer 1发送的消息都具有以下格式：

| name      | type      | description                                                  |
| :-------- | :-------- | :----------------------------------------------------------- |
| sender    | bytes[32] | The identity of the sender of the message on the L1          |
| recipient | bytes[32] | The recipient of the message on the Fuel Blockchain          |
| nonce     | bytes[32] | Unique identifier of the message assigned by the L1 contract |
| amount    | uint64    | The amount of the base asset transfer                        |
| data      | byte[]    | Arbitrary message data                                       |

区块构建器创建一个`OutputMessage`类型的输出，并在创建此输出后完成消息处理。

应用程序可根据自身需求充分利用这些`OutputMessage(s)`。一个例子是存款流程，其中桥接合约在接收到证明Layer 1上存款的消息后，会在Layer 2上创建对应的ETH余额（我们将在下一节进一步讨论这一点）。

## [Layer 1交易与强制包含](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#l1-transactions-and-forced-inclusion)

Fuel提供了交易的强制包含功能。如果用户觉得Layer 2区块构建器尝试审查他们的交易，他们可以从Layer 1发出序列化的交易作为事件，迫使Layer 2区块构建器将交易包含在区块构建中。这个过程称为“强制包含”，保证了用户的抗审查性。

从Layer 1发出的Fuel交易作为事件通过Layer 1发出，具有以下格式：

| name                   | type      | description                                                  |
| :--------------------- | :-------- | :----------------------------------------------------------- |
| nonce                  | bytes[32] | Unique identifier of the transaction assigned by the L1 contract |
| max_gas                | uint64    | The maximum amount of gas allowed to use on Fuel Blockchain  |
| serialized_transaction | byte[]    | The serialized transaction bytes following canonical serialization |

强制包含允许处理所有类型的交易，除了只能由Fuel区块构建器创建的`Mint`交易。这一例外情况并不限制用户抗审查性的安全保证。

## [L1处理的保障](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#guarantees-around-l1-processing)


L2如何确保它会持续处理来自L1的消息或交易？

这是通过记录da_height来实现的，即当前区块处理的所有消息和交易所对应的最高L1区块高度。所有事件和交易的承诺，通过Merkle树根的形式存储于区块头中，确保了数据的完整性和存在性。

所有从L1到L2的事件（包括收件箱消息和强制交易），依据其所在区块编号及区块内索引进行排序。按照这一顺序创建Merkle树，确保了方法的确定性。我们将Merkle树根存储在区块头的event_inbox_root字段中。

Fuel区块可能面临后续挑战。如果发现某特定消息或交易被遗漏或未处理，相关区块建造者可能会受到惩罚。

## [本地交易处理](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#processing-local-transactions)

除了处理L1至L2的消息和交易外，区块建造者还需处理直接发送给它的本地交易。用户可以直接向区块建造者的内存池发送交易，这些交易随后会被处理并发往Layer 1。

借助智能批处理和压缩技术（例如gzip或zstd），该系统为用户提供低于直接Layer 1提交的交易成本。

此外，直接发送到区块建造者的交易能够更快地获得L2上的软终结性。若交易通过L1发送，则必须等待L1区块最终确认后才能处理。

## [区块构建与提案](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#block-building-and-proposing)

Fuel区块建造者负责将交易打包成区块，并向Layer 1提议这些区块作为交易处理的一部分。承诺后的区块进入“[挑战窗口](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#challenge-window)”，窗口关闭后，区块及其状态便达到了“L1最终确定性”。

目前，Fuel区块建造者会发送区块哈希和区块高度作为链上消息门户的新更新，并附带包含交易及其他数据的blobs，以确保特定区块的数据可用性。

## [交易排序和MEV](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#transaction-ordering-and-mev)

当前，Fuel区块建造者依据tip/max_gas比率来决定交易优先级，这意味着与其他L2s不同的是，Fuel不是FIFO（先进先出）模式。因此，在Fuel中，您的交易优先级与您提供的交易小费成正比，而与允许的最大gas成反比。

## [软最终确定性](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#soft-finality)

区块建造者在提供L2交易的软最终确定性方面起着关键作用。作为L2参与者，您可以选择在哪个最终确定性级别上做出商业决策。

当区块建造者排序并处理您的交易时，它提供了软最终确定性。除非未能在L1上完成最终确认，否则这可以视为确认。

## [附录](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#appendix)

## [全节点](https://docs.fuel.network/docs/fuel-book/the-architecture/block-building-in-fuel/#full-nodes)

[fuel-core](https://github.com/FuelLabs/fuel-core?spm=5176.28103460.0.0.69395d27hIu0yw)软件还允许您运行一个全节点（Full Node）。全节点会从对等节点那里收集Layer 2的最新更新，并向网络广播传入的交易。

全节点不能构建区块；相反，它们通过点对点网络接收区块更新，并在本地重新执行这些区块，以维持正确且完全验证后的状态。

通过运行全节点，作为用户，您可以持续自行验证Layer 2的状态，并因此能够发送欺诈证明。您可以使用自己的GraphQL端点来广播交易。

所有的Fuel GraphQL提供商都自己运行全节点，以便为您提供最新的Fuel状态，并让您能够广播交易。