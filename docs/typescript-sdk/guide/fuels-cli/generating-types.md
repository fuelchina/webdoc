
<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# 从 ABI 生成类型

## 安装

首先我们将 `fuels` 安装到我们的项目中：

```console-vue
pnpm add fuels@{{fuels}}
```

## 帮助

首先看一下文档：

```console
$ pnpm fuels typegen -h

使用方法: fuels typegen [选项]

从 Sway ABI JSON 文件生成 TypeScript

选项:
  -i, --inputs <路径|glob...>  ABI JSON 文件的输入路径/全局路径
  -o, --output <目录>           生成文件的目录路径
  -c, --contract               为合约生成类型 [默认]
  -s, --script                 为脚本生成类型
  -p, --predicate              为谓词生成类型
  -S, --silent                 省略输出消息
  -h, --help                   显示帮助信息
```

## 为合约生成类型

您可以使用以下命令为 Sway 合约生成类型：

<!-- gen_types:example:start -->

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types
```

<!-- gen_types:example:end -->

<!-- flags:example:start -->

输入标志 `-i` 后的路径应该指向在构建合约时生成的以 `-abi.json` 结尾的文件。

输出标志 `-o` 后的路径将是生成类型的输出目录。

您可以在这里省略 `--contract` 选项，因为它是默认值。

<!-- flags:example:end -->

## 为脚本生成类型

要为 Sway 脚本生成类型，请使用 `--script` 标志：

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --script
```

## 为谓词生成类型

要为 Sway 谓词生成类型，请使用 `--predicate` 标志：

```console
pnpm fuels typegen -i ./abis/*-abi.json -o ./types --predicate
```

---

另请参阅：

- [使用生成的合约类型](./using-generated-types.md#using-generated-contract-types)
- [使用生成的脚本类型](./using-generated-types.md#using-generated-script-types)
- [使用生成的谓词类型](./using-generated-types.md#using-generated-predicate-types)
