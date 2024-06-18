# 构建前端


## 设置
使用以下命令在与合约相同的父文件夹中使用 TypeScript 初始化新的 React 应用程序。

```
npx create-react-app frontend --template typescript
```

让我们进入前端文件夹：

```
cd frontend
```

接下来，在您的系统中安装以下软件包 frontend 文件夹：

```
npm install fuels @fuels/react @fuels/connectors @tanstack/react-query
```

## 生成合同类型
这 fuels init 命令生成一个 fuels.config.ts SDK 用于生成合约类型的文件。 使用 contracts 标志来定义您的合同文件夹所在的位置，以及 output 标志来定义要在何处创建生成的文件。

在前端文件夹中运行以下命令以生成配置文件：

```
npx fuels init --contracts ../contract/ --output ./src/contracts
```

现在你有一个 fuels.config.ts 文件，您可以使用 fuels build 命令来重建合约并生成类型。 运行此命令将解释合约中的输出 ABI JSON 并生成正确的 TypeScript 定义。 如果您看到该文件夹 fuel-project/counter-contract/out 您将能够在那里看到 ABI JSON。

在 fuel-project/frontend 目录运行：

```
npx fuels build
```

成功的进程应按如下方式打印和输出：

```
Building..
Building Sway programs using built-in 'forc' binary
Generating types..
🎉  Build completed successfully!
```

现在，您应该能够找到一个新文件夹fuel-project/frontend/src/contracts.

## 钱包提供商
在你的index.tsx文件，包装你的App组件与FuelProvider和QueryClientProvider组件，用于启用 Fuel 的自定义 React 钩子以实现钱包功能。

您可以在此处传入自定义钱包连接器，以自定义用户可用于连接到应用的钱包。

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FuelProvider } from '@fuels/react';
import {
  FuelWalletConnector,
  FuelWalletDevelopmentConnector,
  FueletWalletConnector,
} from '@fuels/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
const queryClient = new QueryClient();
 
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
       <QueryClientProvider client={queryClient}>
      <FuelProvider
        fuelConfig={{
          connectors: [
            new FuelWalletConnector(),
            new FuelWalletDevelopmentConnector(),
            new FueletWalletConnector(),
          ],
        }}
      >
        <App />
      </FuelProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
```

## 连接到合同
接下来，打开src/App.tsx文件，并将样板代码替换为以下模板：

```
import { useState, useMemo } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { ContractAbi__factory } from "./contracts";
import AllItems from "./components/AllItems";
import ListItem from "./components/ListItem";
import "./App.css";
 
const CONTRACT_ID =
  "0x797d208d0104131c2ab1f1e09c4914c7aef5b699fb494be864a5c37057076921";
 
function App() {
  const [active, setActive] = useState<"all-items" | "list-item">("all-items");
  const { isConnected } = useIsConnected();
  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();
 
  const contract = useMemo(() => {
    if (wallet) {
      const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
      return contract;
    }
    return null;
  }, [wallet]);
 
  return (
    <div className="App">
      <header>
        <h1>Sway Marketplace</h1>
      </header>
      <nav>
        <ul>
          <li
            className={active === "all-items" ? "active-tab" : ""}
            onClick={() => setActive("all-items")}
          >
            See All Items
          </li>
          <li
            className={active === "list-item" ? "active-tab" : ""}
            onClick={() => setActive("list-item")}
          >
            List an Item
          </li>
        </ul>
      </nav>
      <div>
        {isConnected ? (
          <div>
            {active === "all-items" && <AllItems contract={contract} />}
            {active === "list-item" && <ListItem contract={contract} />}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                connect();
              }}
            >
              {isConnecting ? "Connecting" : "Connect"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
 ```


在文件顶部，将CONTRACT_ID添加到之前部署并设置为常量的协定 ID。

```
const CONTRACT_ID =
  "0x797d208d0104131c2ab1f1e09c4914c7aef5b699fb494be864a5c37057076921";
```

React 钩子@fuels/react包用于将我们的钱包连接到 dapp。在App函数，我们可以这样调用这些钩子：
```
const { isConnected } = useIsConnected();
const { connect, isConnecting } = useConnectUI();
const { wallet } = useWallet();
```

这wallet变量useWallethook 将具有类型FuelWalletLocked.

您可以将锁定的钱包视为无法签署交易的用户钱包，将解锁的钱包视为拥有私钥并能够签署交易的钱包。
```
const { wallet } = useWallet();
```

这useMemohook 用于连接我们与连接钱包的合约。

```
const contract = useMemo(() => {
  if (wallet) {
    const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
    return contract;
  }
  return null;
}, [wallet]);
```

## 样式
将下面的 CSS 代码复制并粘贴到您的App.css文件来添加一些简单的样式。
```
.App {
  text-align: center;
}
 
nav > ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding-inline-start: 0;
}
 
nav > ul > li {
  cursor: pointer;
}
 
.form-control{
  text-align: left;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
}
 
.form-control > input {
  margin-bottom: 1rem;
}
 
.form-control > button {
  cursor: pointer;
  background: #054a9f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 0;
  font-size: 20px;
}
 
.items-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
}
 
.item-card{
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-width: 300px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
 
.active-tab{
  border-bottom: 4px solid #77b6d8;
}
 
button {
  cursor: pointer;
  background: #054a9f;
  border: none;
  border-radius: 12px;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 20px;
  color: white;
}
```
## 用户界面
在我们的应用程序中，我们将有两个选项卡：一个用于查看列出的所有待售商品，另一个用于列出待售的新商品。

我们使用另一个状态变量，称为active我们可以用来在选项卡之间切换。我们可以设置默认选项卡来显示所有列出的项目。
```
const [active, setActive] = useState<"all-items" | "list-item">("all-items");
```

接下来，我们可以创建组件来显示和列出项目。

列出项目
在src名为components.
```
mkdir components
```

然后在里面创建一个名为ListItem.tsx.
```
touch ListItem.tsx
```

在文件顶部，导入useState钩子从react，生成的合约 ABIcontracts文件夹，以及bn（大数）类型从fuels.
```
import { useState } from "react";
import { ContractAbi } from "../contracts";
import { bn } from "fuels";
```

该组件将采用我们签订的合同App.tsx作为一个道具，让我们为组件创建一个接口。
```
interface ListItemsProps {
  contract: ContractAbi | null;
}
```

我们可以像这样设置函数的模板。

```
export default function ListItem({contract}: ListItemsProps){
```

要列出商品，我们将创建一个表单，用户可以在其中输入要发布的商品的元数据字符串和价格。 让我们首先为metadata和price.我们还可以添加一个status变量来跟踪提交状态。
```
const [metadata, setMetadata] = useState<string>("");
const [price, setPrice] = useState<string>("0");
const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
```

我们需要添加handleSubmit功能。 我们可以使用合约 prop 来调用list_item函数并传入price和metadata从表单。
```
async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus('loading')
    if(contract !== null){
        try {
            const priceInput = bn.parseUnits(price.toString());
            await contract.functions
            .list_item(priceInput, metadata)
            .txParams({
                gasLimit: 300_000,
            })
            .call();
            setStatus('success')
        } catch (e) {
            console.log("ERROR:", e);
            setStatus('error')
        }
    } else {
        console.log("ERROR: Contract is null");
    }
}
```

在标题下，为表单添加以下代码：
```
return (
        <div>
            <h2>List an Item</h2>
            {status === 'none' &&
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="metadata">Item Metadata:</label>
                    <input 
                        id="metadata" 
                        type="text" 
                        pattern="\w{20}" 
                        title="The metatdata must be 20 characters"
                        required 
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>
 
                <div className="form-control">
                    <label htmlFor="price">Item Price:</label>
                    <input
                        id="price"
                        type="number"
                        required
                        min="0"
                        step="any"
                        inputMode="decimal"
                        placeholder="0.00"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                </div>
 
                <div className="form-control">
                    <button type="submit">List item</button>
                </div>
            </form>
            }
 
            {status === 'success' && <div>Item successfully listed!</div>}
            {status === 'error' && <div>Error listing item. Please try again.</div>}
            {status === 'loading' && <div>Listing item...</div>}
            
        </div>
    )
}

```


现在，尝试列出一个项目以确保它有效。 您应该会看到以下消息Item successfully listed!.

## 显示所有商品
接下来，让我们创建一个名为AllItems.tsx在components文件夹。
```
touch AllItems.tsx
```

复制并粘贴以下此组件的模板代码：

```
mport { useState, useEffect } from "react";
import { ContractAbi } from "../contracts";
import ItemCard from "./ItemCard";
import { BN } from "fuels";
import { ItemOutput } from "../contracts/contracts/ContractAbi";
 
interface AllItemsProps {
  contract: ContractAbi | null;
}
 
export default function AllItems({ contract }: AllItemsProps) {}
```

在这里，我们可以获取项目计数以查看列出了多少个项目，然后遍历每个项目以获取项目详细信息。

首先，让我们创建一些状态变量来存储列出的项目数、项目详细信息的数组和加载状态。
```
const [items, setItems] = useState<ItemOutput[]>([]);
const [itemCount, setItemCount] = useState<number>(0);
const [status, setStatus] = useState<"success" | "loading" | "error">(
  "loading"
);
```

接下来，让我们获取useEffect钩。 因为这些是只读函数，所以我们可以使用get方法代替call因此，用户不必签署任何内容。
``` js
// useEffect(() => {
//   async function getAllItems() {
//     if (contract !== null) {
//       try {
//         let { value } = await contract.functions
//           .get_count()
//           .txParams({
//             gasLimit: 100_000,
//           })
//           .get();
//         let formattedValue = new BN(value).toNumber();
//         setItemCount(formattedValue);
//         let max = formattedValue + 1;
//         let tempItems = [];
//         for (let i = 1; i < max; i++) {
//           let resp = await contract.functions
//             .get_item(i)
//             .txParams({
//               gasLimit: 100_000
//             })
//             .get();
//           tempItems.push(resp.value);
//         }
//         setItems(tempItems);
//         setStatus("success");
//       } catch (e) {
//         setStatus("error");
//         console.log("ERROR:", e);
//       }
//     }
//   }
//   getAllItems();
// }, [contract]);

```


如果项目计数大于0我们能够成功加载物品，我们可以映射它们并显示物品卡。

物品卡片将显示物品详细信息和购买该物品的购买按钮，因此我们需要将合同和物品作为道具传递。
``` ts
return (
    <div>
      <h2>All Items</h2>
      {status === "success" && (
        <div>
          {itemCount === 0 ? (
            <div>Uh oh! No items have been listed yet</div>
          ) : (
            <div>
              <div>Total items: {itemCount}</div>
              <div className="items-container">
                {items.map((item) => (
                  <ItemCard
                    key={item.id.format()}
                    contract={contract}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {status === "error" && (
        <div>Something went wrong, try reloading the page.</div>
      )}
      {status === "loading" && <div>Loading...</div>}
    </div>
  );
```

## 商品卡
现在，让我们创建商品卡组件。 创建一个名为ItemCard.tsx在 components 文件夹中。
```
touch ItemCard.tsx
```

之后，复制并粘贴下面的模板代码。
```
import { useState } from "react";
import { ItemOutput } from "../contracts/contracts/ContractAbi";
import { ContractAbi } from "../contracts";
import { BN } from 'fuels';
 
interface ItemCardProps {
  contract: ContractAbi | null;
  item: ItemOutput;
}
 
export default function ItemCard({ item, contract }: ItemCardProps) {
```

添加一个status变量来跟踪购买按钮的状态。
```
const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
```

创建一个名为handleBuyItem. 因为这个功能是付费的，并且会将硬币转移给物品所有者，所以我们需要在这里做一些特殊的事情。

每当我们在 Sway 中调用任何使用 transfer 或 mint 函数的函数时，我们都必须将匹配数量的变量输出附加到调用中txParams方法。因为buy_item函数只是将资产转移给项目所有者，变量输出的数量为1.

接下来，因为这个函数是付费的，用户需要转移商品的价格，所以我们会使用callParams转发金额的方法。使用 Fuel，您可以转移任何类型的资产，因此我们需要指定金额和资产 ID。

```
async function handleBuyItem() {
  if (contract !== null) {
    setStatus('loading')
    try {
      const baseAssetId = contract.provider.getBaseAssetId();
      await contract.functions.buy_item(item.id)
      .txParams({ 
        variableOutputs: 1,
      })
      .callParams({
          forward: [item.price, baseAssetId],
        })
      .call()
      setStatus("success");
    } catch (e) {
      console.log("ERROR:", e);
      setStatus("error");
    }
  }
}
```

然后将项目详细信息和状态消息添加到卡片中。
```
return (
    <div className="item-card">
      <div>Id: {new BN(item.id).toNumber()}</div>
      <div>Metadata: {item.metadata}</div>
      <div>Price: {new BN(item.price).formatUnits()} ETH</div>
      <h3>Total Bought: {new BN(item.total_bought).toNumber()}</h3>
      {status === 'success' && <div>Purchased ✅</div>}
      {status === 'error' && <div>Something went wrong ❌</div>}
      {status === 'none' &&  <button data-testid={`buy-button-${item.id}`} onClick={handleBuyItem}>Buy Item</button>}
      {status === 'loading' && <div>Buying item..</div>}
    </div>
  );
```

现在，您应该能够查看和购买合同中列出的所有物品。

## 检查点
通过检查以下代码，确保所有文件都已正确配置。如果您需要其他帮助，请参阅存储库

**App.tsx**
```
import { useState, useMemo } from "react";
import { useConnectUI, useIsConnected, useWallet } from "@fuels/react";
import { ContractAbi__factory } from "./contracts";
import AllItems from "./components/AllItems";
import ListItem from "./components/ListItem";
import "./App.css";
 
const CONTRACT_ID =
  "0x797d208d0104131c2ab1f1e09c4914c7aef5b699fb494be864a5c37057076921";
 
function App() {
  const [active, setActive] = useState<"all-items" | "list-item">("all-items");
  const { isConnected } = useIsConnected();
  const { connect, isConnecting } = useConnectUI();
  const { wallet } = useWallet();
 
  const contract = useMemo(() => {
    if (wallet) {
      const contract = ContractAbi__factory.connect(CONTRACT_ID, wallet);
      return contract;
    }
    return null;
  }, [wallet]);
 
  return (
    <div className="App">
      <header>
        <h1>Sway Marketplace</h1>
      </header>
      <nav>
        <ul>
          <li
            className={active === "all-items" ? "active-tab" : ""}
            onClick={() => setActive("all-items")}
          >
            See All Items
          </li>
          <li
            className={active === "list-item" ? "active-tab" : ""}
            onClick={() => setActive("list-item")}
          >
            List an Item
          </li>
        </ul>
      </nav>
      <div>
        {isConnected ? (
          <div>
            {active === "all-items" && <AllItems contract={contract} />}
            {active === "list-item" && <ListItem contract={contract} />}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                connect();
              }}
            >
              {isConnecting ? "Connecting" : "Connect"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
 
export default App;
```


**AllItems.tsx**

```
import { useState, useEffect } from "react";
import { ContractAbi } from "../contracts";
import ItemCard from "./ItemCard";
import { BN } from "fuels";
import { ItemOutput } from "../contracts/contracts/ContractAbi";
 
interface AllItemsProps {
  contract: ContractAbi | null;
}
 
export default function AllItems({ contract }: AllItemsProps) {
  const [items, setItems] = useState<ItemOutput[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [status, setStatus] = useState<"success" | "loading" | "error">(
    "loading"
  );
  useEffect(() => {
    async function getAllItems() {
      if (contract !== null) {
        try {
          let { value } = await contract.functions
            .get_count()
            .txParams({
              gasLimit: 100_000,
            })
            .get();
          let formattedValue = new BN(value).toNumber();
          setItemCount(formattedValue);
          let max = formattedValue + 1;
          let tempItems = [];
          for (let i = 1; i < max; i++) {
            let resp = await contract.functions
              .get_item(i)
              .txParams({
                gasLimit: 100_000,
              })
              .get();
            tempItems.push(resp.value);
          }
          setItems(tempItems);
          setStatus("success");
        } catch (e) {
          setStatus("error");
          console.log("ERROR:", e);
        }
      }
    }
    getAllItems();
  }, [contract]);
  return (
    <div>
      <h2>All Items</h2>
      {status === "success" && (
        <div>
          {itemCount === 0 ? (
            <div>Uh oh! No items have been listed yet</div>
          ) : (
            <div>
              <div>Total items: {itemCount}</div>
              <div className="items-container">
                {items.map((item) => (
                  <ItemCard
                    key={item.id.format()}
                    contract={contract}
                    item={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {status === "error" && (
        <div>Something went wrong, try reloading the page.</div>
      )}
      {status === "loading" && <div>Loading...</div>}
    </div>
  );
}
```

**ItemCard.tsx**
```
import { useState } from "react";
import { ItemOutput } from "../contracts/contracts/ContractAbi";
import { ContractAbi } from "../contracts";
import { BN } from 'fuels';
 
interface ItemCardProps {
  contract: ContractAbi | null;
  item: ItemOutput;
}
 
export default function ItemCard({ item, contract }: ItemCardProps) {
  const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
  async function handleBuyItem() {
    if (contract !== null) {
      setStatus('loading')
      try {
        const baseAssetId = contract.provider.getBaseAssetId();
        await contract.functions.buy_item(item.id)
        .txParams({ 
          variableOutputs: 1,
        })
        .callParams({
            forward: [item.price, baseAssetId],
          })
        .call()
        setStatus("success");
      } catch (e) {
        console.log("ERROR:", e);
        setStatus("error");
      }
    }
  }
  return (
    <div className="item-card">
      <div>Id: {new BN(item.id).toNumber()}</div>
      <div>Metadata: {item.metadata}</div>
      <div>Price: {new BN(item.price).formatUnits()} ETH</div>
      <h3>Total Bought: {new BN(item.total_bought).toNumber()}</h3>
      {status === 'success' && <div>Purchased ✅</div>}
      {status === 'error' && <div>Something went wrong ❌</div>}
      {status === 'none' &&  <button data-testid={`buy-button-${item.id}`} onClick={handleBuyItem}>Buy Item</button>}
      {status === 'loading' && <div>Buying item..</div>}
    </div>
  );
}
```

**ListItem.tsx**
```
import { useState } from "react";
import { ContractAbi } from "../contracts";
import { bn } from "fuels";
 
interface ListItemsProps {
  contract: ContractAbi | null;
}
 
export default function ListItem({contract}: ListItemsProps){
    const [metadata, setMetadata] = useState<string>("");
    const [price, setPrice] = useState<string>("0");
    const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setStatus('loading')
        if(contract !== null){
            try {
                const priceInput = bn.parseUnits(price.toString());
                await contract.functions
                .list_item(priceInput, metadata)
                .txParams({
                    gasLimit: 300_000,
                })
                .call();
                setStatus('success')
            } catch (e) {
                console.log("ERROR:", e);
                setStatus('error')
            }
        } else {
            console.log("ERROR: Contract is null");
        }
    }
    return (
        <div>
            <h2>List an Item</h2>
            {status === 'none' &&
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="metadata">Item Metadata:</label>
                    <input 
                        id="metadata" 
                        type="text" 
                        pattern="\w{20}" 
                        title="The metatdata must be 20 characters"
                        required 
                        onChange={(e) => setMetadata(e.target.value)}
                    />
                </div>
 
                <div className="form-control">
                    <label htmlFor="price">Item Price:</label>
                    <input
                        id="price"
                        type="number"
                        required
                        min="0"
                        step="any"
                        inputMode="decimal"
                        placeholder="0.00"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                </div>
 
                <div className="form-control">
                    <button type="submit">List item</button>
                </div>
            </form>
            }
 
            {status === 'success' && <div>Item successfully listed!</div>}
            {status === 'error' && <div>Error listing item. Please try again.</div>}
            {status === 'loading' && <div>Listing item...</div>}
            
        </div>
    )
}
```

## 运行项目
在里面fuel-project/frontend目录运行：
```
npm start
```
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.4.48:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

这就是前端！您刚刚在 Fuel 上创建了一个完整的 dapp！