# 关键词

以下列表包含 Sway 语言为当前或未来使用而保留的关键字。因此，它们不能用作标识符。标识符是函数、变量、参数、模块、常量、属性、类型或特征等的名称。

## 当前使用的关键字

以下是当前使用的关键字列表及其功能描述。

- `as` -  重命名 `use` 语句中的项目，例如， `use type::a as alias_name`
- [`abi`](../sway-program-types/smart_contracts.md#the-abi-declaration) - 以与特征语法类似的方式定义智能合约 ABI
- [`break`](../basics/control_flow.md#break-and-continue) - 立即退出循环
- [`const`](../basics/constants) - 定义常量项
- [`continue`](../basics/control_flow.md#break-and-continue) - 继续下一次循环迭代
- `else` - 与控制流构造的 `if` 条件一起使用
- [`enum`](../basics/structs_tuples_and_enums.md#enums) - 定义一个枚举
- `false` - 布尔值假文字
- [`fn`](../basics/functions)- 定义函数或函数指针类型
- [`if`](../basics/control_flow.md#if-expressions) - 根据条件表达式的结果进行分支
- `impl` - 实现固有或特征功能
- `let` - 绑定变量
- [`match`](../basics/control_flow.md#match-expressions) - 将值与模式进行详尽匹配
- `mod` - 定义一个模块
- `mut` - 表示引用或模式绑定中的可变性
- `pub` - 表示 Sway 数据结构、特征或模块的公共可见性
- `ref` - 通过引用绑定
- `return` -  从函数中提前返回
- `Self` - 我们正在定义或实现的类型的类型别名
- `self` - 方法主题
- [`struct`](../basics/structs_tuples_and_enums.md#structs) - 定义一个结构
- [`trait`](../advanced/traits.md#declaring-a-trait) - 定义一个特征
- `true` - 布尔真文字
- [`type`](../advanced/advanced_types.md#creating-type-synonyms-with-type-aliases) - 定义类型别名或关联类型
- `use` - 将符号纳入范围
- `where` - 指定泛型类型的特征
- [`while`](../basics/control_flow.md#while) - 根据表达式的结果进行条件循环

## 为将来可能使用而保留的关键字

- `abstract`
- `async`
- `await`
- `become`
- `box`
- `do`
- `dyn`
- `extern`
- `for`
- `in`
- `loop`
- `macro`
- `move`
- `override`
- `priv`
- `static`
- `super`
- `try`
- `typeof`
- `unsafe`
- `unsized`
- `virtual`
- `yield`

## 特殊关键字

### 程序关键词

与定义要编译的 Sway 程序类型相关的关键字

- [`contract`](../sway-program-types/smart_contracts) - 类似于具有某些数据库状态的已部署 API
- [`library`](../sway-program-types/libraries) - 定义新常见行为的 Sway 代码
- [`predicate`](../sway-program-types/predicates) - 返回布尔值并表示执行时对某些资源的所有权为 true 的程序
- [`script`](../sway-program-types/scripts) - 链上可运行的字节码，执行一次即可完成一项任务


### 属性关键字

与定义属性功能相关的关键字

- [`allow`](./attributes.md#allow) - 覆盖否则会导致错误或警告的检查
- [`doc`](./attributes.md#doc) - 指定文件
- [`inline`](./attributes.md#inline) - 建议将属性函数的副本放在调用者中，而不是生成代码来调用定义该函数的地方
- [`payable`](./attributes.md#payable) -  暗示方法在编译时是付费的
- [`storage`](./attributes.md#storage) -  包含存储变量列表的声明
- [`test`](./attributes.md#test) - 将要执行的函数标记为测试
- [`deprecated`](./attributes.md#deprecated) -  将某项标记为已弃用
