# [Sway 标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#sway-standards)

如同许多其他智能合约语言一样，为了确保智能合约间的互操作性，已制定了使用标准。

关于使用Sway标准的更多信息，请参阅[Sway-Standards Repository](https://github.com/FuelLabs/sway-standards)。

## [标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#standards)

## [原生资产标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#native-asset-standards)

- [SRC-20；原生资产标准](https://docs.fuel.network/docs/sway-standards/src-20-native-asset/)使用Sway语言实现了原生资产的标准API。
- [SRC-3；铸造和销毁](https://docs.fuel.network/docs/sway-standards/src-3-minting-and-burning/)用于启用原生资产的铸造和销毁功能。
- [SRC-7；任意资产元数据标准](https://docs.fuel.network/docs/sway-standards/src-7-asset-metadata/)用于存储原生资产（通常作为NFT）的元数据。
- [SRC-9；元数据键标准](https://docs.fuel.network/docs/sway-standards/src-9-metadata-keys/)结合SRC-7标准，用于存储标准化的原生资产元数据键。
- [SRC-6；金库标准](https://docs.fuel.network/docs/sway-standards/src-6-vault/)定义了使用Sway开发的资产金库的标准API实现。

## [谓词标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#predicate-standards)

- [SRC-13；灵魂绑定地址标准](https://docs.fuel.network/docs/sway-standards/src-13-soulbound-address/)定义了一个特定的`Address`作为灵魂绑定地址，使灵魂绑定资产不可转让。

## [访问控制标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#access-control-standards)

- [SRC-5；所有权标准](https://docs.fuel.network/docs/sway-standards/src-5-ownership/)用于在合约中限制函数调用给管理员用户。

## [合约标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#contract-standards)

- [SRC-12；合约工厂](https://docs.fuel.network/docs/sway-standards/src-12-contract-factory/)定义了合约工厂的标准API实现。

## [桥接标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#bridge-standards)

- [SRC-8；桥接资产](https://docs.fuel.network/docs/sway-standards/src-8-bridged-asset/)定义了资产桥接到Fuel网络时所需的元数据。
- [SRC-10；原生桥接标准](https://docs.fuel.network/docs/sway-standards/src-10-native-bridge/)定义了Fuel链与主链之间原生桥接的标准API。

## [文档标准](https://docs.fuel.network/docs/sway/introduction/sway_standards/#documentation-standards)

- [SRC-2；内联文档](https://docs.fuel.network/docs/sway-standards/src-2-inline-documentation/)定义了如何为Sway文件添加注释。

## [标准支持](https://docs.fuel.network/docs/sway/introduction/sway_standards/#standards-support)

为了支持Sway标准，还开发了一些库。这些库可以在[Sway-Libs](https://docs.fuel.network/docs/sway/reference/sway_libs/)中找到。