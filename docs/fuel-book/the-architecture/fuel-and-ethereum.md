## [Fuel and Ethereum](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#fuel-and-ethereum)

亮点：

- Fuel Ignition利用Ethereum作为其Layer 1来进行结算和数据可用性，这符合Ethereum的核心价值——可持续性、安全性和对日常用户的易用性。这一选择强调了Fuel致力于构建一个长期的、去中心化的生态系统。
- 利用最成熟和去中心化的Layer 1网络之一，Ethereum为Fuel的汇总提供了坚实的基础，保证了可靠的性能和安全性。Fuel的汇总继承了Ethereum的安全模型，保护用户资金，并在Ethereum区块链上直接启用欺诈证明机制。
- Fuel实现了Layer 1和Layer 2之间的无缝消息传递，确保任何发送给Ethereum的消息必须在Fuel上处理，反之亦然。此功能增强了用户体验并确保了抗审查能力。
- 用户可以轻松地存入和提取ETH，在Layer 1和Layer 2之间转移资产。他们可以直接向Fuel存款ETH，并通过在Layer 2上燃烧代币来发起提款，系统确保及时且安全地处理这些操作。
- Fuel通过诸如混合证明等技术创新，优化证明系统，简化流程并缩短挑战窗口。通过采用模块化技术栈，Fuel保持灵活性，探索与其他Layer 1和数据可用性解决方案的集成，以增强其生态系统。

Fuel Ignition使用Ethereum作为Layer 1，我们之所以选择Ethereum作为Fuel的L1，利用以太坊来提供结算层和数据可用性层，是因为我们认为Fuel与Ethereum共享许多价值观：

- 致力于长期可持续发展
- 强调安全性
- 关注消费级硬件，使普通用户能方便地参与协议。

Ethereum是最去中心化的Layer 1之一，拥有悠久历史，并多年来一直专注于以rollup为核心的发展路径。这些因素使其成为构建rollup的理想基础。

![2.5 Fuel and Ethereum](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.5-fuel-and-ethereum-light.png)

## [继承以太坊的安全性](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#inheriting-ethereums-security)

Fuel的核心汇总方案Ignition继承了以太坊的安全性。对于上述说法，自然会产生的问题是，我们所说的“继承以太坊的安全性”具体指的是什么呢？

Fuel使用以太坊作为保存用户资金、提议最新区块及其对应状态更新的Layer 1。我们在以太坊上部署智能合约，这些合约不断接收Fuel Layer 2的状态更新。

然后，我们在以太坊Layer 1上直接执行欺诈证明，以证明已发布的区块或相关状态更新是否有误。我们还允许通过Layer 1进行无权限的消息传递和交易包含，确保用户不会遭遇审查。

这为用户提供了以下保障，只要以太坊是安全的，并且维持着诚实多数假设：

- 不会有欺诈性的区块或状态更新被发送；
- 用户资金始终安全；
- 用户可以随时提现或发送交易至Layer 2，即使遇到审查也能强制包含。

接下来，我们将讨论上面描述的每个属性。

## [消息传递](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#messaging)

Fuel支持Layer 1与Layer 2之间的消息传递，这意味着您可以从Layer 1向Layer 2发送任意消息，反之亦然。协议保证，如果一条消息被包含在Layer 1中，则必须在Layer 2上处理；同样，如果消息在Layer 2上被包含，则也必须在Layer 1上处理。让我们分别讨论这两种情况。

### [L1 → L2 的消息传递](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#l1--l2-messaging)

[Fuel消息门户](https://github.com/FuelLabs/fuel-bridge/blob/main/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol)促进了从Layer 1到Layer 2的消息处理。其[sendMessage](https://github.com/FuelLabs/fuel-bridge/blob/6030a40ce9c58a533c09f73e837f85ab4784ef58/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol#L250))方法接受一个Layer 2接收者（Fuel地址）和对应要发送的消息。成功调用此方法后，Layer 1上会发出一个[MessageSent](https://github.com/FuelLabs/fuel-bridge/blob/6030a40ce9c58a533c09f73e837f85ab4784ef58/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol#L49)事件。

如区块构建部分所述，处理Fuel区块的一部分要求是承诺某些Layer 1区块高度，直到该高度，区块建造者需处理所有消息和交易。这迫使区块建造者包括所有的Layer 1消息（如果未能做到这一点，区块建造者可能会被削减权益）。

![2.5 L1 → L2 Messaging](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.5-l1-l2-messaging-light.png)

作为处理来自Layer 1的消息区块的一部分，区块建造者查看事件并生成一个OutputMessage交易至特定的Fuel地址，附带特定的数据。

## [L2 → L1的消息传递](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#l2--l1-messaging)

Fuel还允许使用[MessageOut](https://github.com/FuelLabs/fuel-specs/blob/master/src/abi/receipts.md#messageout-receipt)收据从Layer 2向Layer 1发送消息。每个Fuel区块都包含一个收据根，这是该区块内所有收据的根。这使得任何人都可以调用Fuel消息门户的[relayMessage](https://github.com/FuelLabs/fuel-bridge/blob/6030a40ce9c58a533c09f73e837f85ab4784ef58/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol#L188)函数；需要提供Merkle包含证明，并且检查该消息对应的区块是否已经过最终确认（即不在挑战窗口期内）。

![2.5 L2 → L1 Messaging](https://raw.githubusercontent.com/FuelLabs/fuel-book/refs/heads/main/assets/2.5-l2-l1-messaging-light.png)

来自Layer 2的消息在Layer 1上的处理是通过调用指定的Layer 1地址，并附带所需的有效载荷来完成的。

## [ETH 存款与提款](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#eth-deposits-and-withdrawals)

使用 Fuel rollup 的核心部分是从 L1 向 Fuel 存入 ETH 和从 L2 提取 ETH。我们将分别讨论这两种情况。

## [ETH 存款](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#eth-deposits)

用户可以在 L1 上调用[depositEth](https://github.com/FuelLabs/fuel-bridge/blob/6030a40ce9c58a533c09f73e837f85ab4784ef58/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol#L256)函数来创建一笔存款。该方法是可支付的，并且会发出一个带有空负载的 [messageSent](https://github.com/FuelLabs/fuel-bridge/blob/6030a40ce9c58a533c09f73e837f85ab4784ef58/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol#L49) 事件，这使得排序器识别出这是 L1 上的一笔存款，并为用户铸造一枚新的 ETH 币，对应于存款的价值。

## [ETH 提款](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#eth-withdrawals)

在 L2 上的提款是通过[L2 网关](https://github.com/FuelLabs/fuel-bridge/blob/main/packages/fungible-token/bridge-fungible-token/implementation/src/main.sw#L147)燃烧 L2 上的代币来完成的。然后，网关会发出一个[MessageOut](https://docs.fuel.network/docs/specs/abi/receipts/#messageout-receipt)收据，它是区块头的一部分，允许这条消息传递到 Layer 1。

Layer 1 上的[Message Portal](https://github.com/FuelLabs/fuel-bridge/blob/de18552d4a23c6ec1477c6532732dbcdc05a8c16/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol)合约拥有一个[relayMessage](https://github.com/FuelLabs/fuel-bridge/blob/de18552d4a23c6ec1477c6532732dbcdc05a8c16/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol#L188)函数（详情请参阅 [L2 → L1 消息]()），它可以处理旨在发往 L1 的 L2 消息。在这种情况下，我们会发送一条消息，其中包含用户在 L2 上燃烧的价值对应的金额，因此[Message Portal](https://github.com/FuelLabs/fuel-bridge/blob/de18552d4a23c6ec1477c6532732dbcdc05a8c16/packages/solidity-contracts/contracts/fuelchain/FuelMessagePortal.sol)合约会提供相应的资金给 L1 的接收方进行提款。

**注意**：提款需要在“[挑战窗口](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#challenge-window)”清算后才能处理，因此用户必须等到“挑战窗口”结束（尽管有[快速终结小工具](http://ethresear.ch/t/why-wait-a-week-fast-finality-optimistic-rollups/18868) which can bring this down.)可以缩短这一时间）。

## [状态更新](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#state-updates)

Fuel 使用以太坊提交新的状态更新。这是通过 Layer 1 上的[状态合约](https://github.com/FuelLabs/fuel-bridge/blob/main/packages/solidity-contracts/contracts/fuelchain/FuelChainState.sol)完成的，区块通过发送区块哈希和区块高度来提交。合约还记录特定区块提交时的时间戳。

这些状态更新和发布在以太坊上的 Blob 数据允许对任何发送到 L1 的状态更新提出挑战。

## [挑战窗口](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#challenge-window)

挑战窗口是以太坊上区块及相关状态被提交到 L1 后被认为最终确定所需的时间。最终确定意味着任何提款或作为该区块一部分的消息都可以在 L1 上处理。目前，Fuel 的挑战窗口为七天。

像混合证明和其他快速终结小工具这样的技术可以减少挑战窗口的持续时间；我们正积极投入资源研究这些领域，并建议您阅读 Nick Dodson 关于更快的终结小工具用于乐观汇总的[文章](http://ethresear.ch/t/why-wait-a-week-fast-finality-optimistic-rollups/18868)。

## [混合证明](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#hybrid-proving)

Fuel 相信 [zk-实用主义哲学](https://docs.fuel.network/docs/fuel-book/why-fuel/the-fuel-way/#zk-pragmatism)；与其他汇总不同，Fuel 不是在链上玩二分法游戏（这增加了证明系统的复杂性），也不为每个批次发送 zk 证明（这增加了每笔交易的成本），而是采用了一种混合的证明系统。

该系统在一个乐观的环境中运行。如果系统中的某个人认为已发送了一个欺诈性的状态，他们会在链下创建一个关于该主张的 zk 证明，并通过一次与 L1 的交互来证明欺诈行为。这减少了证明系统的复杂性，并限制了挑战窗口。

混合证明通过基于RISC-V的zkVM（如SP-1 and RISC-0）来部署以及原型机制造。你可以在[这篇文章](https://fuel.mirror.xyz/gY0Clw114Ipnel1Bhrey9LCsxX94ly3I9yAfnSWYWTg)了解到更多关于证明系统的信息。

## [附录](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#appendix)

## [可选的DA层和L1s](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#alt-das-and-l1s)

我们已经推出了我们的旗舰rollup，选择以太坊作为我们的L1进行结算和数据可用性，但Fuel致力于创建一个中立且模块化的技术栈。Fuel的技术栈能够延伸至其他L1如比特币和Solana，以及与不同的数据可用性解决方案（DAs）如Celestia和Avail合作。若有需求，用户亦可利用Fuel技术栈部署其专属的第一层区块链。

我们将继续推进我们的技术栈，使其适应多种场景，具备韧性，并能在消费级硬件上运行。

## [Blobs](https://docs.fuel.network/docs/fuel-book/the-architecture/fuel-and-ethereum/#blobs)

EIP 4844引入了Blobs作为一种为以太坊rollups提供更便宜的数据可用性的方法。Fuel的区块构建者也使用blobs，尽管这仍是一个正在进行中的工作。

Fuel区块被批量打包成一个捆绑包，通过流行的技术（如gzip或zstd）压缩，并作为blobs发布。由于blobs的尺寸固定，上传必须通过一系列交易完成。

Blobs及其具体实现仍在最终确定阶段，很快就会实装上线，但上述文本总结了目前的一般做法。