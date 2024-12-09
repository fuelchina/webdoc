## [Fuel网络的安全](https://docs.fuel.network/docs/fuel-book/the-architecture/security-on-fuel/#security-on-fuel)

要点：

- Fuel在其rollup生态系统中强调安全性，特别是通过其安全理事会，该理事会操作多重签名钱包来监督和升级栈的不同组件。随着Fuel向完全无需许可的系统过渡，这个理事会扮演着保护网络安全的关键角色。
- 项目认识到当前区块构建和排序的集中化是一个挑战。为了解决这个问题，Fuel计划分阶段推进去中心化，从所有区块构建者都可以访问的共享排序器开始，逐步迈向完全去中心化的区块构建。
- Fuel积极识别和缓解潜在的安全攻击向量，包括桥梁合约中的bug、Layer 2客户端实现以及Sway编译器。通过与不同的团队合作，并吸引顶级安全组织参与，Fuel致力于建立强大的安全协议和多样的实现方式，以减少漏洞的可能性。
- 平台还通过开发Sway的安全支持库和推广最佳实践来解决应用层的bug，这种对安全的关注促进了更稳健的应用开发生态系统。
- Fuel持续升级其协议以进一步提升安全性，减少对安全理事会的依赖，并最小化多重签名被攻破的风险。项目还优先进行严格的审计和测试，确保欺诈证明机制能够有效防止虚假声明，并保证合法的区块构建者得到公正对待。

此部分讨论了Fuel Ignition和rollups目前的安全状况。

## [Fuel安全理事会](https://docs.fuel.network/docs/fuel-book/the-architecture/security-on-fuel/#fuel-security-council)

Fuel目前有一个安全理事会，它操作各种多重签名来升级栈的不同部分。

Rollups尚处于早期发展阶段，因此在完全去中心化之前，安全理事会必须谨慎行事。网络问题可能难以解决，使得这种监督至关重要。

开发具有第二类型安全保证的栈是Fuel路线图中的首要任务。

## [区块构建](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#block-building)

目前，区块构建和排序是中心化的。去中心化这些过程，尤其是区块构建，需要进一步的发展和慎重考虑。区块构建的权利赋予构建者从系统中提取矿工可提取价值（MEV）的能力，这可能会影响用户的交易体验。

Fuel正在实施一个分阶段的方法来去中心化区块构建者和排序器。

Fuel将首先推出一个去中心化的排序器集合，即所有Fuel rollups的区块构建者可以使用的共享排序器。去中心化的区块构建将在下一阶段跟进。

## [安全攻击向量](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#security-attack-vectors)

在本节中，我们列出了当前系统的各种攻击向量，并探讨了加强安全性的路径。

### [跨链桥合约漏洞](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#bridge-contract-bugs)

Fuel拥有一个允许L1和L2之间消息传递的桥梁；这个消息传递系统构成了存款和提款系统的基础，以及如强制交易包含和调用L2上的L1合约等功能。

如果L1或L2上的合约实现存在漏洞，可能会危及roll-up系统，包括传递假消息和交易。多重签名的攻破也可能导致这些合约的恶意升级。

Fuel对其智能合约进行了严格的审计，并参与了漏洞赏金计划，以尽量降低这种情况发生的可能性。这些问题在第2阶段设置中更加令人担忧，因为第1阶段设置确实允许逆转潜在的桥梁合约问题。

### [Layer 2客户端漏洞](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#layer-2-client-bugs)

像任何软件一样，Fuel执行客户端可能存在漏洞，这些漏洞可能被利用以启用未预期的行为。如果只有一个执行客户端的实现，恶意行为者可以在没有被欺诈证明机制捕捉到的情况下操纵系统，因为不存在其他客户端来验证或挑战状态。这一风险特别适用于依赖单一执行客户端进行ZK证明游戏或欺诈证明验证的Layer 2解决方案，使其成为潜在的攻击向量。

Fuel通过邀请不同的团队协作于栈上，并追求多种实现，随后由业内顶尖的安全组织进行严格测试和安全审计，以此加强此类场景的安全性。

### [Sway编译器漏洞](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#sway-compiler-bugs)

Sway语言是在Fuel VM上构建的主要语言。Sway编译器中的漏洞可能会使恶意字节码成为特定断言、智能合约或脚本的一部分，而这并非开发者所期望的结果。类似的问题曾在ETH生态系统中的Vyper出现过，详情请参见[这里](https://medium.com/rektify-ai/the-vyper-compiler-saga-unraveling-the-reentrancy-bug-that-shook-defi-86ade6c54265)。

Fuel旨在通过拥有一流的人才工作在编译器上，并由行业领先的安全部门进行严格的测试和审计，来避免这种情况的发生。未来，我们也希望有多重编译器实现，这有助于发现其他实现中的漏洞。

### [应用层漏洞](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#application-level-bugs)

应用程序实现往往存在漏洞，因为它们可能忽略了某些必要的检查或基于有底层漏洞的库之上。

Fuel通过创建一流的Sway支持库来避免这种情况，这些库经过良好的审计和测试，安全可靠。同时，这些Sway库也通过开发者宣传推广使用安全模式。

### [多重签名攻破](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#multisig-compromisation)

如果安全理事会的多重签名被攻破，可能会导致各部分栈的恶意升级或其他不当行为。

Fuel希望通过组建一个享有极高声誉的安全理事会，并利用其社会影响力来解决问题。同时，连续不断的协议升级降低了对安全理事会的依赖，并不断加速向第二阶段rollup架构的演进。

### [欺诈证明漏洞](https://docs.fuel.network/docs/fuel-network/the-architecture/security-on-fuel/#fraud-proving-bugs)

欺诈证明实现中的漏洞可能会造成挑战，并对构建正确区块的区块构建者进行处罚，或者允许有人无法证明一个故障区块。这可能导致好的构建者被处罚或错误的状态被最终确认。

Fuel旨在通过最初借助安全理事会纠正任何这样的问题，并力求实现欺诈证明客户端或系统的多重实现，尽可能采用最佳安全实践，并定期进行系统审计来解决这一问题。