
<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# 内置二进制文件

`fuels` 方便地附带了 [`forc`](https://docs.fuel.network/docs/forc/commands/) 和 [`fuel-core`](https://docs.fuel.network/guides/running-a-node/running-a-local-node/) 的 `built-in` 二进制文件。

如果您尚未安装 [Fuel 工具链](#the-fuel-toolchain)，这些将会被使用。

以下是如何明确配置这一点：

- [`useBuiltinForc`](./config-file.md#usebuiltinforc): `true`
- [`useBuiltinFuelCore`](./config-file.md#usebuiltinfuelcore): `true`

<<< ../../demo-fuels/fuels.config.explicit-built-in.ts#config-built-in{ts:line-numbers}

您也可以直接调用 `built-in` 二进制文件：

```console-vue
npx fuels@{{fuels}} help forc
npx fuels@{{fuels}} forc --version
npx fuels@{{fuels}} forc test -h
```

```console-vue
npx fuels@{{fuels}} help core
npx fuels@{{fuels}} core --version
npx fuels@{{fuels}} core run -h
```

查看 `forc` 和 `fuel-core` 的文档：

- [Forc 命令](https://docs.fuel.network/docs/forc/commands/)
- [使用 `fuel-core` 运行本地节点](https://docs.fuel.network/guides/running-a-node/running-a-local-node/)

## Fuel 工具链

Fuel 工具链包括多个[组件](https://docs.fuel.network/docs/sway/introduction/fuel_toolchain/)。

您可以使用 [`fuel-up`](https://docs.fuel.network/docs/fuelup/installation/) 将其启动并运行。

使用以下命令检查它是否正常工作：

```console
forc --version
```

```console
fuel-core --version
```

`forc` 和 `fuel-core` 二进制文件将自动在您的 `system` 和 `fuels` 中可用，并优先使用它们，而不是 `built-in` 二进制文件。

以下是如何明确配置这一点：

- [`useBuiltinForc`](./config-file.md#usebuiltinforc): `false`
- [`useBuiltinFuelCore`](./config-file.md#usebuiltinfuelcore): `false`

<<< ../../demo-fuels/fuels.config.explicit-system.ts#config-system{ts:line-numbers}
