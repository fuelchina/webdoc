import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  //base: '/webdoc/',
  title: "Fuel 中文社区",
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
    logo: 'https://avatars.githubusercontent.com/u/168461719',
    nav: [
      { text: '主页', link: '/' },
      { text: 'Awesome-Fuel', link: 'https://fuellabs.notion.site/Awesome-Fuel-7b4ca6b262d3414a9968f275cba43fc9' },
      // {
      //   text: "版本",
      //   items: [
      //     { text: "v0.0.1", link: "" },
      //     { text: "v0.0.2", link: "" },
      //     { text: "v0.0.3", link: "" },
      //   ],
      // },
      { text: '贡献者们', link: '/team_member.md' },
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
          ],

        },
        {
          text: '2. 示例',
          collapsed: false,
          link: '/swaybook/examples/' ,
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
          link: '/swaybook/sway-program-types/',
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
          link: '/swaybook/basics/',
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
            { text: '4.10 控制流', link: '/swaybook/basics/control_flow' }
          ]
        },
        {
          text: '5. 使用 Sway 进行区块链开发',
          collapsed: false,
          link: '/swaybook/blockchain-development/',
          items: [
            {text: '5.1 哈希和密码学', link: '/swaybook/blockchain-development/hashing_and_cryptography'},
            {text: '5.2 合约存储', link: '/swaybook/blockchain-development/storage'},
            {text: '5.3 函数纯度', link: '/swaybook/blockchain-development/purity'},
            {text: '5.4 标识符', link: '/swaybook/blockchain-development/identifiers'},
            {text: '5.5 原生资产', link: '/swaybook/blockchain-development/native_assets'},
            {text: '5.6 访问控制', link: '/swaybook/blockchain-development/access_control'},
            {text: '5.7 调用合约', link: '/swaybook/blockchain-development/calling_contracts'}
          ]
        },
        {
          text: '6. 高级概念',
          collapsed: false,
          link: '/swaybook/advanced/',
          items: [
            {text: '6.1 高级类型', link: '/swaybook/advanced/advanced_types'},
            {text: '6.2 泛型类型', link: '/swaybook/advanced/generic_types'},
            {text: '6.3 特征', link: '/swaybook/advanced/traits'},
            {text: '6.4 关联类型', link: '/swaybook/advanced/associated_types'},
            {text: '6.5 泛型和特征约束', link: '/swaybook/advanced/generics_and_trait_constraints'},
            {text: '6.6 组装', link: '/swaybook/advanced/assembly'}
          ]
        },
        {
          text: '7. 常用集合',
          collapsed: false,
          link: '/swaybook/common-collections/',
          items: [
            { text: '7.1 堆上的向量', link: '/swaybook/common-collections/vec' },
            { text: '7.2 储存的向量', link: '/swaybook/common-collections/storage_vec' },
            { text: '7.3 储存映射', link: '/swaybook/common-collections/storage_map' },
          ]
        },
        {
          text: '8.  测试 ',
          collapsed: false,
          link: '/swaybook/testing/',
          items: [
            { text: '8.1 单元测试', link: '/swaybook/testing/unit-testing' },
            { text: '8.2 使用Rust进行测试', link: '/swaybook/testing/testing-with-rust' },
          ]
        },
        {
          text: '9. 应用程序前端',
          collapsed: false,
          link: '/swaybook/frontend/',
          items: [
            { text: '9.1 TypeScript SDK', link: '/swaybook/frontend/typescript_sdk' },
          ]
        },
        {
          text: '10.  Sway LSP ',
          collapsed: false,
          link: '/swaybook/lsp/',
          items: [
            { text: '10.1 安装', link: '/swaybook/lsp/installation' },
            { text: '10.2 特点', link: '/swaybook/lsp/features' },
          ]
        },
        {
          text: '11.  Sway 参考 ',
          collapsed: false,
          link: '/swaybook/reference/',
          items: [
            {text: '11.1 编译器内部函数', link: '/swaybook/reference/compiler_intrinsics'},
            {text: '11.2 属性', link: '/swaybook/reference/attributes'},
            {text: '11.3 风格指南', link: '/swaybook/reference/style_guide'},
            {text: '11.4 已知问题和解决方法', link: '/swaybook/reference/known_issues_and_workarounds'},
            {text: '11.5 与Solidity的区别', link: '/swaybook/reference/solidity_differences'},
            {text: '11.6 与 Rust 的区别', link: '/swaybook/reference/rust_differences'},
            {text: '11.7 为 Sway 做贡献', link: '/swaybook/reference/contributing_to_sway'},
            {text: '11.8 关键字', link: '/swaybook/reference/keywords'},
          ]
        },
        {
          text: '12. Forc参考 ',
          collapsed: false,
          link: '/swaybook/forc/',
          items: [
            {text: '12.1 清单参考', link: '/swaybook/forc/manifest_reference'},
            {text: '12.2 工作区', link: '/swaybook/forc/workspaces'},
            {text: '12.3 依赖项', link: '/swaybook/forc/dependencies'},
            {
              text: '12.4 命令',
              collapsed: false,
              link: '/swaybook/forc/commands/index',
              items: [
                {text: '12.4.1 forc addr 2 line', link: '/swaybook/forc/commands/forc_addr2line'},
                {text: '12.4.2 强制构建', link: '/swaybook/forc/commands/forc_build'},
                {text: '12.4.3 强制检查', link: '/swaybook/forc/commands/forc_check'},
                {text: '12.4.4 强制清理', link: '/swaybook/forc/commands/forc_clean'},
                {text: '12.4.5 forc 补全', link: '/swaybook/forc/commands/forc_completions'},
                {text: '12.4.6 forc 合约编号', link: '/swaybook/forc/commands/forc_contract-id'},
                {text: '12.4.7 强制初始化', link: '/swaybook/forc/commands/forc_init'},
                {text: '12.4.8 forc new', link: '/swaybook/forc/commands/forc_new'},
                {text: '12.4.9 forc 解析字节码', link: '/swaybook/forc/commands/forc_parse-bytecode'},
                {text: '12.4.10 forc 插件', link: '/swaybook/forc/commands/forc_plugins'},
                {text: '12.4.11 forc 谓词根', link: '/swaybook/forc/commands/forc_predicate-root'},
                {text: '12.4.12 forc 测试', link: '/swaybook/forc/commands/forc_test'},
                {text: '12.4.13 强制更新', link: '/swaybook/forc/commands/forc_update'},
                {text: '12.4.14 forc 模板 ', link: '/swaybook/forc/commands/forc_template'},
              ]
            },
            {text: '12.5 与Solidity的区别', link: '/swaybook/forc/plugins/index'},
          ]
        },
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
          text: 'Provider',
          link: '/typescript-sdk/guide/provider/',
          collapsed: true,
          items: [
            {
              text: 'Provider选项',
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
              text: '测试钱包',
              link: '/typescript-sdk/guide/wallets/test-wallets',
            },
          ],
        },
        {
          text: '合约',
          link: '/typescript-sdk/guide/contracts/',
          collapsed: true,
          items: [
            {
              text: '方法',
              link: '/typescript-sdk/guide/contracts/methods',
            },
            {
              text: '调用参数',
              link: '/typescript-sdk/guide/contracts/call-parameters',
            },
            {
              text: '合约余额',
              link: '/typescript-sdk/guide/contracts/contract-balance',
            },
            {
              text: '费用估算',
              link: '/typescript-sdk/guide/contracts/cost-estimation',
            },
            {
              text: '依赖性估计',
              link: '/typescript-sdk/guide/contracts/dependency-estimation',
            },
            {
              text: '变量输出',
              link: '/typescript-sdk/guide/contracts/variable-outputs',
            },
            {
              text: '日志',
              link: '/typescript-sdk/guide/contracts/logs',
            },
            {
              text: '合约间调用',
              link: '/typescript-sdk/guide/contracts/inter-contract-calls',
            },
            {
              text: '多合约调用',
              link: '/typescript-sdk/guide/contracts/multi-contract-calls',
            },
            {
              text: '使用不同的钱包',
              link: '/typescript-sdk/guide/contracts/using-different-wallets',
            },
            {
              text: '转移资产',
              link: '/typescript-sdk/guide/contracts/transferring-assets',
            },
            {
              text: '部署合约',
              link: '/typescript-sdk/guide/contracts/deploying-contracts',
            },
            {
              text: '存储槽',
              link: '/typescript-sdk/guide/contracts/storage-slots',
            },
            {
              text: '可配置常量',
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
      "/sway-example": [
        {
          text: 'Solidity 备忘录',
          collapsed: false,
          link: '/sway-example/cheatsheet'
        },
        {
          text: '基础',
          collapsed: true,
          items: [
            { text: '你好，Sway', link: '/sway-example/basic/hello-sway' },
            { text: '导入', link: '/sway-example/basic/imports' },
            { text: '错误处理', link: '/sway-example/basic/error-handling' },
            { text: '账户类型', link: '/sway-example/basic/account-types' },
            { text: '初始化', link: '/sway-example/basic/initialization' },
            { text: '所有权', link: '/sway-example/basic/ownership' },
            { text: '事件', link: '/sway-example/basic/events' },
            { text: '代币', link: '/sway-example/basic/tokens' },
            { text: '调用其他合约', link: '/sway-example/basic/contract-calls' },
            { text: '变量', link: '/sway-example/basic/variables' },
            { text: '原始数据类型', link: '/sway-example/basic/primitive-types' },
            { text: '复合类型', link: '/sway-example/basic/compound-types' },
            { text: '区块链类型', link: '/sway-example/basic/blockchain-types' },
            { text: '函数', link: '/sway-example/basic/functions' },
            { text: '结构体', link: '/sway-example/basic/structs' },
            { text: '元组', link: '/sway-example/basic/tuples' },
            { text: '枚举', link: '/sway-example/basic/enums' },
            { text: '常量', link: '/sway-example/basic/constants' },
            { text: '可配置常量', link: '/sway-example/basic/configurable-constants' },
            { text: '选项', link: '/sway-example/basic/options' },
            { text: '结果', link: '/sway-example/basic/results' },
            { text: 'if语句', link: '/sway-example/basic/control-flow-if' },
            { text: 'match语句', link: '/sway-example/basic/control-flow-match' },
            { text: 'While循环', link: '/sway-example/basic/control-flow-while-loop' },
            { text: '日志记录', link: '/sway-example/basic/logging' },
            { text: '存储映射', link: '/sway-example/basic/storage-map' },
            { text: '向量', link: '/sway-example/basic/vector' },
            { text: '基础资产', link: '/sway-example/basic/base-asset' },

          ]
        },
        {
          text: '应用',
          collapsed: true,
          items: [
            { text: '拥有权和msg_sender示例', link: '/sway-example/apps/ownership' },
            { text: '钱包', link: '/sway-example/apps/wallet' },
          ]
        },
        {
          text: '去中心化金融',
          collapsed: true,
          items: [
            { text: '闪电贷', link: '/sway-example/defi/flashloans' },
            { text: 'Staking Contracts', link: '/sway-example/defi/staking-contract' },

          ]
        },


      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/fuelchina/webdoc' },
      { icon: 'twitter', link: 'https://x.com/fuelchina' },
    ]
  }
})

