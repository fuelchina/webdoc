import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  //base: '/webdoc/',
  title: "Fuelup.cc",
  description: "Fuel China Community",
  ignoreDeadLinks: true,
  markdown: {
    languageAlias: {
      'sway': 'rs'
    }
  },
  head: [
    ['link', { rel: 'icon', href: 'https://fuellabs.github.io/fuels-ts/favicon.ico', type: 'image/png' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '资源', link: 'https://fuellabs.notion.site/Awesome-Fuel-7b4ca6b262d3414a9968f275cba43fc9' },
      {
        text: "版本",
        items: [
          { text: "v0.0.1", link: "" },
          { text: "v0.0.2", link: "" },
          { text: "v0.0.3", link: "" },
        ],
      },
      { text: '关于我们', link: '/team_member.md' },
    ],

    sidebar: {
      "/swaybook": [
        {
          text: '1. 简介',
          collapsed: false,
          link: '/swaybook/introduction/index',
          items: [
            { text: '1.1 入门指南', link: '/swaybook/introduction/getting_started' },
            { text: '1.2 Fuel 工具链', link: '/swaybook/introduction/fuel_toolchain' },
            { text: '1.3 Forc 项目', link: '/swaybook/introduction/forc_project' },
            { text: '1.4 标准库', link: '/swaybook/introduction/standard_library' }
          ]
        },
        {
          text: '2. 示例',
          collapsed: false,
          link: '/swaybook/examples/index' ,
          items: [
            { text: '2.1 计数器', link: '/swaybook/examples/counter' },
            { text: '2.2 菲兹巴兹', link: '/swaybook/examples/fizzbuzz' },
            { text: '2.3 钱包智能合约', link: '/swaybook/examples/wallet_smart_contract' },
            { text: '2.4 流动性池示例', link: '/swaybook/examples/liquidity_pool' }
          ]
        },
        {
          text: '3. Sway程序类型',
          collapsed: false,
          link: '/swaybook/sway-program-types/index',
          items: [
            { text: '3.1 合约', link: '/swaybook/sway-program-types/smart_contracts' },
            { text: '3.2 库', link: '/swaybook/sway-program-types/libraries' },
            { text: '3.3 脚本', link: '/swaybook/sway-program-types/scripts' },
            { text: '3.4 谓词', link: '/swaybook/sway-program-types/predicates' }
          ]
        },
        {
          text: '4. Sway语言基础',
          collapsed: false,
          link: '/swaybook/basics/index',
          items: [
            { text: '4.1 变量', link: '/swaybook/basics/variables' },
            { text: '4.2 内置类型', link: '/swaybook/basics/built_in_types' },
            { text: '4.3 常用库类型', link: '/swaybook/basics/commonly_used_library_types' },
            { text: '4.4 区块链类型', link: '/swaybook/basics/blockchain_types' },
            { text: '4.5 函数', link: '/swaybook/basics/functions' },
            { text: '4.6 结构体、元组和枚举', link: '/swaybook/basics/structs_tuples_and_enums' },
            { text: '4.7 方法和函数', link: '/swaybook/basics/methods_and_associated_functions' },
            { text: '4.8 常量', link: '/swaybook/basics/constants' },
            { text: '4.9 评论和记录', link: '/swaybook/basics/comments_and_logging' },
            { text: '4.10 控制流', link: '/swaybook/basics/control_flow' },
          ]
        }
      ],
      '/typescript-sdk': [
        {
          text: '入门指南',
          link: '/typescript-sdk/getting-started.md',
        },
        {
          text: '创建一个 Fuel dApp',
          link: '/typescript-sdk/guide/creating-a-fuel-dapp/',
          collapsed: true,
          items: [
            {
              text: '命令行参数',
              link: '/typescript-sdk/guide/creating-a-fuel-dapp/options',
            },
            {
              text: '部署测试网',
              link: '/typescript-sdk/guide/creating-a-fuel-dapp/deploying-a-dapp-to-testnet',
            },
          ],
        },
        {
          text: 'Fuels 脚手架',
          link: '/typescript-sdk/guide/fuels-cli/',
          collapsed: true,
          items: [
            {
              text: 'ABI 类型生成器',
              link: '/typescript-sdk/guide/fuels-cli/abi-typegen',
            },
            {
              text: '内置二进制文件',
              link: '/typescript-sdk/guide/fuels-cli/binaries',
            },
            {
              text: '命令',
              link: '/typescript-sdk/guide/fuels-cli/commands',
            },
            {
              text: '配置文件',
              link: '/typescript-sdk/guide/fuels-cli/config-file',
            },
            {
              text: '生成类型',
              link: '/typescript-sdk/guide/fuels-cli/generating-types',
            },
            {
              text: '使用生成的类型',
              link: '/typescript-sdk/guide/fuels-cli/using-generated-types',
            },
          ],
        },
        {
          text: '提供者',
          link: '/typescript-sdk/guide/provider/',
          collapsed: true,
          items: [
            {
              text: '提供者选项',
              link: '/typescript-sdk/guide/provider/provider-options',
            },
            {
              text: '查询链',
              link: '/typescript-sdk/guide/provider/querying-the-chain',
            },
          ],
        },
        {
          text: '钱包',
          link: '/typescript-sdk/guide/wallets/',
          collapsed: true,
          items: [
            {
              text: '创建钱包',
              link: '/typescript-sdk/guide/wallets/instantiating-wallets',
            },
            {
              text: '私钥',
              link: '/typescript-sdk/guide/wallets/private-keys',
            },
            {
              text: '助记词钱包',
              link: '/typescript-sdk/guide/wallets/mnemonic-wallet',
            },
            {
              text: '加密和解密',
              link: '/typescript-sdk/guide/wallets/encrypting-and-decrypting',
            },
            {
              text: '查询余额',
              link: '/typescript-sdk/guide/wallets/checking-balances',
            },
            {
              text: '钱包转账',
              link: '/typescript-sdk/guide/wallets/wallet-transferring',
            },
            {
              text: '签名',
              link: '/typescript-sdk/guide/wallets/signing',
            },
            {
              text: '连接器',
              link: '/typescript-sdk/guide/wallets/connectors',
            },
            {
              text: '钱包管理器',
              link: '/typescript-sdk/guide/wallets/wallet-manager',
            },
            {
              text: '锁定和解锁',
              link: '/typescript-sdk/guide/wallets/locking-and-unlocking',
            },
            {
              text: 'Test Wallets',
              link: '/typescript-sdk/guide/wallets/test-wallets',
            },
          ],
        },
        {
          text: 'Contracts',
          link: '/typescript-sdk/guide/contracts/',
          collapsed: true,
          items: [
            {
              text: 'Methods',
              link: '/typescript-sdk/guide/contracts/methods',
            },
            {
              text: 'Call Parameters',
              link: '/typescript-sdk/guide/contracts/call-parameters',
            },
            {
              text: 'Contract Balance',
              link: '/typescript-sdk/guide/contracts/contract-balance',
            },
            {
              text: 'Cost Estimation',
              link: '/typescript-sdk/guide/contracts/cost-estimation',
            },
            {
              text: 'Dependency Estimation',
              link: '/typescript-sdk/guide/contracts/dependency-estimation',
            },
            {
              text: 'Variable Outputs',
              link: '/typescript-sdk/guide/contracts/variable-outputs',
            },
            {
              text: 'Logs',
              link: '/typescript-sdk/guide/contracts/logs',
            },
            {
              text: 'Inter-contract Calls',
              link: '/typescript-sdk/guide/contracts/inter-contract-calls',
            },
            {
              text: 'Multi-contract calls',
              link: '/typescript-sdk/guide/contracts/multi-contract-calls',
            },
            {
              text: 'Using different Wallets',
              link: '/typescript-sdk/guide/contracts/using-different-wallets',
            },
            {
              text: 'Transferring Assets',
              link: '/typescript-sdk/guide/contracts/transferring-assets',
            },
            {
              text: 'Deploying Contracts',
              link: '/typescript-sdk/guide/contracts/deploying-contracts',
            },
            {
              text: 'Storage Slots',
              link: '/typescript-sdk/guide/contracts/storage-slots',
            },
            {
              text: 'Configurable Constants',
              link: '/typescript-sdk/guide/contracts/configurable-constants',
            },
            {
              text: 'Managing Deployed Contracts',
              link: '/typescript-sdk/guide/contracts/managing-deployed-contracts',
            },
            {
              text: 'Understanding the FuelVM Binary File',
              link: '/typescript-sdk/guide/contracts/understanding-the-fuelvm-binary-file',
            },
          ],
        },
        {
          text: 'Scripts',
          link: '/typescript-sdk/guide/scripts/',
          collapsed: true,
          items: [
            {
              text: 'Instantiating A Script',
              link: '/typescript-sdk/guide/scripts/instantiating-a-script',
            },
            {
              text: 'Configurable Constants',
              link: '/typescript-sdk/guide/scripts/configurable-constants',
            },
            {
              text: 'Running scripts',
              link: '/typescript-sdk/guide/scripts/running-scripts',
            },
            {
              text: 'Custom script Call',
              link: '/typescript-sdk/guide/scripts/custom-script-call',
            },
          ],
        },
        {
          text: 'Predicates',
          link: '/typescript-sdk/guide/predicates/',
          collapsed: true,
          items: [
            {
              text: 'Instantiating A Predicate',
              link: '/typescript-sdk/guide/predicates/instantiating-a-predicate',
            },
            {
              text: 'Configurable Constants',
              link: '/typescript-sdk/guide/predicates/configurable-constants',
            },
            {
              text: 'Send And Spend Funds From Predicates',
              link: '/typescript-sdk/guide/predicates/send-and-spend-funds-from-predicates',
            },
          ],
        },
        {
          text: 'Transactions',
          link: '/typescript-sdk/guide/transactions/',
          collapsed: true,
          items: [
            {
              text: 'Transaction Request',
              link: '/typescript-sdk/guide/transactions/transaction-request',
            },
            {
              text: 'Transaction Response',
              link: '/typescript-sdk/guide/transactions/transaction-response',
            },
            {
              text: 'Transaction Parameters',
              link: '/typescript-sdk/guide/transactions/transaction-parameters',
            },
            {
              text: 'Transaction Policies',
              link: '/typescript-sdk/guide/transactions/transaction-policies',
            },
          ],
        },
        {
          text: 'Utilities',
          link: '/typescript-sdk/guide/utilities/',
          collapsed: true,
          items: [
            {
              text: 'Date conversion',
              link: '/typescript-sdk/guide/utilities/date-conversion',
            },
            {
              text: 'Address conversion',
              link: '/typescript-sdk/guide/utilities/address-conversion',
            },
            {
              text: 'Unit conversion',
              link: '/typescript-sdk/guide/utilities/unit-conversion',
            },
          ],
        },
        {
          text: 'Cookbook',
          link: '/typescript-sdk/guide/cookbook/',
          collapsed: true,
          items: [
            {
              text: 'Transferring Assets',
              link: '/typescript-sdk/guide/cookbook/transferring-assets',
            },
            {
              text: 'Deposit And Withdraw',
              link: '/typescript-sdk/guide/cookbook/deposit-and-withdraw',
            },
            {
              text: 'Wallet SDK and React Hooks',
              link: '/typescript-sdk/guide/cookbook/wallet-sdk-and-react-hooks',
            },
            {
              text: 'Custom Transactions',
              link: '/typescript-sdk/guide/cookbook/custom-transactions',
            },
            {
              text: 'Custom Transactions from Contract Calls',
              link: '/typescript-sdk/guide/cookbook/custom-transactions-from-contract-calls',
            },
            {
              text: 'Transactions with Multiple Signers',
              link: '/typescript-sdk/guide/cookbook/transactions-with-multiple-signers',
            },
            {
              text: 'GraphQL Integration',
              link: '/typescript-sdk/guide/cookbook/graphql-integration',
            },
          ],
        },
        {
          text: 'Testing',
          link: '/typescript-sdk/guide/testing/',
          collapsed: true,
          items: [
            {
              text: 'Testing in TS',
              link: '/typescript-sdk/guide/testing/testing-in-ts',
            },
            {
              text: 'Setting Up a Custom Chain',
              link: '/typescript-sdk/guide/testing/setting-up-a-custom-chain',
            },
            {
              text: 'Tweaking the Blockchain',
              link: '/typescript-sdk/guide/testing/tweaking-the-blockchain',
            },
          ],
        },
        {
          text: 'Types',
          link: '/typescript-sdk/guide/types/',
          collapsed: true,
          items: [
            {
              text: 'Address',
              link: '/typescript-sdk/guide/types/address',
            },
            {
              text: 'Arrays',
              link: '/typescript-sdk/guide/types/arrays',
            },
            {
              text: 'Asset Id',
              link: '/typescript-sdk/guide/types/asset-id',
            },
            {
              text: 'Bech32',
              link: '/typescript-sdk/guide/types/bech32',
            },
            {
              text: 'Bits256',
              link: '/typescript-sdk/guide/types/bits256',
            },
            {
              text: 'Bits512',
              link: '/typescript-sdk/guide/types/bits512',
            },
            {
              text: 'Bytes',
              link: '/typescript-sdk/guide/types/bytes',
            },
            {
              text: 'Bytes32',
              link: '/typescript-sdk/guide/types/bytes32',
            },
            {
              text: 'Enums',
              link: '/typescript-sdk/guide/types/enums',
            },
            {
              text: 'Evm Address',
              link: '/typescript-sdk/guide/types/evm-address',
            },
            {
              text: 'Native Parameters',
              link: '/typescript-sdk/guide/types/native-parameters',
            },
            {
              text: 'Numbers',
              link: '/typescript-sdk/guide/types/numbers',
            },
            {
              text: 'Options',
              link: '/typescript-sdk/guide/types/options',
            },
            {
              text: 'Raw Slice',
              link: '/typescript-sdk/guide/types/raw-slice',
            },
            {
              text: 'Std String',
              link: '/typescript-sdk/guide/types/std-string',
            },
            {
              text: 'String',
              link: '/typescript-sdk/guide/types/string',
            },
            {
              text: 'Structs',
              link: '/typescript-sdk/guide/types/structs',
            },
            {
              text: 'Tuples',
              link: '/typescript-sdk/guide/types/tuples',
            },
            {
              text: 'Vectors',
              link: '/typescript-sdk/guide/types/vectors',
            },
          ],
        },
        {
          text: 'Errors',
          link: '/typescript-sdk/guide/errors/',
          collapsed: true,
          items: [
            {
              text: 'Error Codes',
              link: '/typescript-sdk/guide/errors/error-codes',
            },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: '' },
      { icon: 'discord', link: '' }
    ]
  }
})

