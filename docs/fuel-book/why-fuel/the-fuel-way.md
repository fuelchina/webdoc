## [Fuel怎样解决问题](https://docs.fuel.network/docs/fuel-book/why-fuel/the-fuel-way/#the-fuel-way)

自以太坊发布以来，多数区块链大体上沿袭了其发展路径。后继的链宣称提高了速度、可扩展性、功能和易用性，采用了新的共识机制、数据库和零知识证明系统。然而，核心系统大体上没有变化：开发者使用Solidity或Rust等语言编写智能合约来构建应用和资产；用户依赖中心化的服务器读取链上数据，并通过签署消息与链互动，然后将这些签名的消息再通过相同的中心化服务器路由回去。

Fuel为区块链行业绘制了一幅新的蓝图，将去中心化作为核心优先事项。我们不只是迭代，而是从头开始重新构建区块链架构。

## [去中心化...可持续的去中心化](https://docs.fuel.network/docs/fuel-book/why-fuel/the-fuel-way/#decentralized-sustainably-decentralized)

区块链本质上是由分布式节点组成的网络，所有节点都在验证新区块和交易。独立、分布式的参与者无需资格限制就能参与这一过程的能力赋予了区块链宝贵的生命力、抗审查性和可验证性特质。比特币在这方面保持着最坚定的原则立场，低节点要求和低带宽使用意味着可以在轻量级设备如树莓派上运行完整节点，甚至可以在偏远的地方如太空运行。

然而，后来的区块链不断做出妥协。如今大多数较新的区块链（包括大部分Layer 2）只能在高性能的数据中心服务器上运行。有些高吞吐量项目甚至移除了关键的密码学原语，比如状态元素的梅克尔化。

Fuel旨在将区块链空间从日益严重的中心化趋势中拉回来，回归到比特币的价值观。Fuel架构允许高性能的同时仍在消费级硬件上运行。Fuel始终维持着密码学可验证性的特性，让用户可以不依赖第三方就检查链的状态。

## [区块链不是计算机](https://docs.fuel.network/docs/fuel-book/why-fuel/the-fuel-way/#blockchains-are-not-computers)

推进区块链技术不仅仅需要渐进式升级。真正的创新往往需要革命性的行动——包括破坏性的改变。Fuel设想通过革新区块链架构和应用程序开发来解锁这项技术的全部潜力。传统的智能合约平台模仿计算机系统，将区块链视为硬件，智能合约视为软件。这些合约执行读写操作，将数据存储到链的状态中——实际上将其作为全球Postgres数据库对待。

Fuel认为区块链并不是普通的计算机，而是一种不同类型的计算机——“信任机器”。虽然这些机器仍然是可编程的，但它们的操作环境与传统执行环境有很大差异。区块链节点的角色不是充当云服务器，而是以无需信任的方式验证链的当前状态及所有未来状态转换。

将计算移出区块链全节点并将数据移出区块链状态之外可以保持全节点需求较低，使区块链能够在不集中化的情况下扩展。Fuel使得开发者能够在不使用智能合约的情况下构建智能应用，简化开发流程同时保持区块链技术的去中心化精神。

## [ZK实用主义](https://docs.fuel.network/docs/fuel-book/why-fuel/the-fuel-way/#zk-pragmatism)

零知识技术的务实态度已经吸引了整个区块链行业的研究人员和开发者的想象力。简洁验证任意计算的承诺为区块链扩容、验证、互操作性等方面开辟了全新的可能性。构建基于零知识技术的未来区块链的论点推动了一些最受期待且资金充足的项目。

Fuel采用务实的态度对待零知识技术，认识到其在区块链内外的突破性潜力。我们分享业界对这些新技术的兴奋，并积极将零知识技术整合到Fuel栈中（例如Fuel的混合证明模型和服务链的零知识桥接）。Fuel认为区块链的安全性、高性能和互操作性不应仅依赖于零知识技术。Fuel开创了以太坊上的第一个乐观汇总，偏离了以太坊扩容解决方案中普遍关注零知识汇总的趋势。Fuel坚持认为完全的零知识验证无法持续满足市场的严格成本和性能要求。生成证明的成本和时间限制使得完全零知识证明的链条与成本效益和高速操作不兼容。可持续的证明和‘实时证明’通常依赖于特定的零知识硬件，这面临着许多生产准备的障碍。

Fuel精心打造尖端区块链技术，选择性地集成现成的零知识解决方案以增强其栈。通用零知识虚拟机（如RISC Zero和Succinct的SP-1）的兴起指向了一个未来，在那里零知识技术变得商品化并且容易获得，无需直接处理必要的密码学。