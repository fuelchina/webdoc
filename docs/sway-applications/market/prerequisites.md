# 基础条件

## 安装
要安装 Fuel 工具链，您可以使用fuelup-init脚本。 这将安装forc, forc-client, forc-fmt, forc-lsp, forc-wallet以及fuel-core在~/.fuelup/bin.

```bash
curl https://install.fuel.network | sh
```

如果您使用的是 VSCode，我们建议安装 [Sway 扩展](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin)

## 已经安装fuelup
如果您已经有fuelup安装后，运行以下命令以确保您使用的是最新的工具链。

```
fuelup self update
fuelup update
fuelup default latest
```

## 安装fuel钱包
我们的前端应用程序将允许用户连接钱包，因此您需要安装浏览器钱包。

在执行后续步骤之前，请安装[燃料钱包](https://chromewebstore.google.com/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok)

设置钱包后，单击钱包中的“水龙头”按钮以获取一些测试网代币。

此外，对于本指南，请确保使用的是 Node.js/npm 版本18.18.2 || ^20.0.0. 您可以通过以下方式检查Node.js版本：

```
node -v
```


## 项目设置
从一个新的空文件夹开始并为其命名fuel-project.

```
mkdir fuel-project
```


进入 fuel-project 文件夹：

```
cd fuel-project
```

在您的终端中，首先创建一个名为的新 Sway 项目contract:

```
forc new contract
```
您的项目结构生成自 forc 命令应该是这样的：

```
tree contract
```

```
Icon ClipboardText
contract
├── Forc.toml
└── src
    └── main.sw

1 directory, 2 files
```

进入您的合约文件夹：

```
cd contract
```

打开contract文件夹，并在src文件夹，您应该会看到一个名为main.sw.这是您将编写 Sway 合约的地方。

由于我们正在创建一个全新的合约，因此您可以删除此文件中的所有内容，但contract关键词。

```
contract;
```

文件的第一行是专门保留的，用于通知编译器我们是在编写协定、脚本、谓词还是库。要将文件指定为协定，请使用contract关键词。



