## [在Fuel上开始构建 - 快速开始](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/#building-on-fuel-an-overview)

在Fuel上构建赋予开发者能力，使其能够利用前沿的工具和基础设施创建高性能、可扩展的去中心化应用。Fuel的架构注重速度、安全性和开发者效率。本节概述了Fuel生态系统的组成部分。我们将在第二部分详细探讨每个组件。

## [**FuelVM（Fuel虚拟机）**](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/#building-on-fuel-an-overview)

FuelVM融合了多年的区块链设计经验，为以太坊社区带来了可靠且持久的机器架构。它驱动Fuel网络，通过并行处理交易提供了卓越的性能。与大多数区块链虚拟机如以太坊虚拟机（EVM），它们通常串行执行交易不同，FuelVM处理并发处理，大幅增加了吞吐量。FuelVM借鉴了RISC-V、ARM指令集架构、比特币脚本和EVM等多样的架构，创建了一个针对区块链用例优化的低级别执行环境。通过提供状态最小化的设施，如原生资产、临时脚本和花费条件，它减轻了全节点的负担，提高了网络的可持续性。开发者可以避免传统重状态设计的低效，构建高绩效的应用程序，同时保持网络的去中心化和可访问性。截至2024年5月，FuelVM可以在高端CPU上每核心达到21,000笔交易/秒（TPS）的资产转账基准测试成绩，为现代区块链应用提供了无与伦比的速度。

## [**Fuel交易架构**](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/#building-on-fuel-an-overview)

Fuel的交易架构结合了比特币、以太坊、Cosmos和Solana的经验教训，创造了一个高度并行和高效的交易模型。通过使用UTXO（未花费交易输出）模型，Fuel使得交易可以在区块内部和跨区块之间并行执行，让开发者可以快速处理交易而不超载网络。Fuel交易足够灵活，可以处理从简单的资产转移，到复杂的多方、多资产互动以及批处理智能合约调用。通过使用谓词进行高级条件逻辑，开发者可以减少对重状态智能合约的需求，确保应用程序高效运行而不加重网络资源的负担。Fuel的交易模型还解决了其他UTXO基础区块链中看到的并发问题，这为来自以太坊的开发者维持了熟悉的体验，同时受益于UTXO执行的性能优势。

## [**Fuel Ignition（rollup）**](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/#building-on-fuel-an-overview)

Fuel Ignition将是第一个在以太坊主网上线的Fuel V2 rollup。它旨在通过提供改进显著的执行设计，超越传统的EVM rollup。最初作为一个较为可信的Layer-2开始，Ignition最终目标是进化成一个完全由以太坊保障安全的rollup，具备欺诈证明、去中心化排序和通过延迟多重签名过程的安全升级。Ignition专注于利用以太坊的安全性，确保开发者可以构建高性能的应用程序，同时受益于以太坊提供的强大安全保障。随着Ignition的发展，它将引入去中心化排序和基于以太坊的数据可用性（DA），进一步增强其无需信任的、可扩展的设计。

## [**Fuel网络**](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/#building-on-fuel-an-overview)

Fuel作为一个互联rollup网络运作，旨在提供不同区块链和rollup之间的无缝交互。Fuel rollup不同于许多rollup网络常见的复制粘贴方法。Fuel的可定制VM配置允许根据开发者的特定需求调整每个网络区块链，增强了各种用例中的适应性。结合其由共享排序和构建者网络支持的去中心化区块生产模式，Fuel提供了一个公平和高效的系统来管理交易包含和rollup之间的互操作性。

## [**开发者工具**](https://docs.fuel.network/docs/fuel-book/why-fuel/building-on-fuel-an-overview/#building-on-fuel-an-overview)

Fuel项目很早就意识到深思熟虑和体贴的开发者工具的重要性。我们认为开发者的时间是我们社区最重要的资产之一，旨在优化开发者的时间，以编写高质量代码。为了最大化开发者生产力并支持未来兼容的应用程序开发，我们创建了自己的工具套件。这些工具简化了去中心化应用的构建、测试和部署过程，使开发者能够专注于创新。

**Sway:** Sway是一种用于现代区块链编程的领域特定语言（DSL），具有类似于Rust的语法、语法规则和设计理念，同时融入了区块链特有的功能，如智能合约接口概念。Sway本质上是为了节省开发者时间而设计的，它提供了一种单一的编程语言来构建所有关键的区块链应用组件，如谓词、脚本、智能合约、库、测试、部署脚本、索引等。

为什么不是Rust或Solidity？Rust主要被设计为一种系统级语言，大量绑定到LLVM工具链，缺乏对区块链开发特殊考虑的关注。Solidity是在以太坊虚拟机上开发的强大语言，但有许多已知的缺点。Sway旨在结合这两种语言的最佳方面，为区块链开发提供一种既熟悉又强大的工具。

其他工具包括：

- **Forc（Fuel Orchestrator）:** 这个命令行工具链是Fuel开发的基础。它支持从编译Sway智能合约到管理依赖关系和部署应用程序的一切。Forc简化了整个开发过程，确保开发者可以轻松构建稳健的dApps。
- **Fuel Rust SDK:** Rust SDK允许开发者使用Rust编程语言与Fuel区块链互动。它为创建系统级应用程序和管理Fuel网络的互动提供了无缝体验。
- **Fuel Wallet SDK:** Fuel钱包SDK为开发者提供了创建安全、用户友好型钱包的工具，这些钱包可以本地与Fuel生态系统互动。它确保开发者可以轻松构建集成进分散式应用的钱包。
- **Fuel Typescript SDK:** Typescript SDK允许前端开发者将Fuel集成到Web应用程序中，简化了与Fuel区块链的互动，使他们能够构建连接至Fuel基础设施的去中心化应用。