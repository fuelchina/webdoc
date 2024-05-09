<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# 命令行参数

`npm create fuels` 命令有几个命令行参数，您可以使用它们来定制您的项目。

::: code-group

```sh-vue [pnpm]
pnpm create fuels@{{fuels}} [project-name] [options]
```

```sh-vue [npm]
npm create fuels@{{fuels}} [project-name] [options]
```

:::

## `-c, --contract`

通知工具在您的项目中包含一个 Sway 合约程序。

## `-p, --predicate`

通知工具在您的项目中包含一个 Sway 谓词程序。

## `-s, --script`

通知工具在您的项目中包含一个 Sway 脚本程序。

## `--pnpm`

通知工具使用 pnpm 作为包管理器来安装必要的依赖项。

## `--npm`

通知工具使用 npm 作为包管理器来安装必要的依赖项。

## `-cs, -cp, -sp, -cps`

快捷方式，包含合约、脚本和谓词程序的组合。

## `--verbose`

启用详细日志记录。在调试工具问题时很有用。

## `-h, --help`

显示带有所有可用选项的帮助消息。

## `-V, --version`

显示 `npm create fuels` 命令的版本号。
