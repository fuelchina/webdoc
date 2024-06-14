# 为 Sway做贡献

感谢您有兴趣为 Sway 做贡献！本文档概述了安装和设置 Sway 开发工具链的过程，以及为 Sway 做贡献的一些惯例。

如果您在入门时遇到任何困难，您可以随时在我们的 [Discourse](https://forum.fuel.network/)上提问。

## 构建并设置开发工作区

有关安装和设置 Sway 工具链的说明，请参阅 [介绍](../introduction/index.md) 部分。

## 获取存储库

1. 访问 [Sway](https://github.com/FuelLabs/sway) repo 并分叉该项目。
2. 然后将你的分叉副本克隆到本地机器并开始工作。

```sh
git clone https://github.com/FuelLabs/sway
cd sway
```

## 构建和测试

以下步骤将运行 sway 测试套件并确保一切设置正确。

首先，打开一个新终端并开始 `fuel-core` ：

```sh
fuel-core
```

然后打开第二个终端 `cd` 进入 `sway` 并运行：

```sh
cargo run --bin test
```

测试套件运行后，您应该看到：

```console
Tests passed.
_n_ tests run (0 skipped)
```

恭喜！现在您已完成所有设置并准备开始做出贡献。

## 找到可以做的事情


您可以通过多种方式为 Sway 项目做出贡献，其中一些需要编码知识，而另一些则不需要。以下是一些示例：

- 报告错误
- 向 Sway 书籍添加文档
- 添加新功能或修复已存在未解决问题的错误
- 提出功能请求

查看我们的 [Help Wanted](https://github.com/FuelLabs/sway/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22), [Sway Book](https://github.com/FuelLabs/sway/issues?q=is%3Aopen+is%3Aissue+label%3A%22The+Sway+Book%22) 或 [Good First Issue](https://github.com/FuelLabs/sway/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) 问题来找到合适的任务。

如果您正在计划某件大事，例如与多个组件相关或改变当前行为，请确保在开始实施之前打开一个问题与我们讨论。

## 贡献流程

这是贡献者工作流程的粗略概述：

- 确保您想要贡献的内容已被跟踪为问题。
  - 我们可以在这个问题中讨论问题和解决方案。
- 创建您想要作为工作基础的 Git 分支。这通常是 master。
- 编写代码、添加测试用例并提交您的工作。
- 运行测试并确保所有测试通过。
- 如果 PR 包含任何重大更改，请将重大标签添加到您的 PR。
- 将您的更改推送到存储库的分支中并提交拉取请求。
  - 确保在提交消息中提及在步骤 1 中创建的问题。
- 您的 PR 将被审核，并且可能会要求进行一些更改。
  - 一旦您做出更改，您的 PR 必须重新审核和批准。
  - 如果 PR 过期，您可以使用 GitHub 的“更新分支”按钮。
  -  如果存在冲突，您可以合并并在本地解决。然后推送到您的 PR 分支。对分支的任何更改都需要重新审核。
- 我们的 CI 系统（Github Actions）会自动测试所有授权的拉取请求。
- 一旦获得批准，就使用 Github 合并 PR。

感谢您的贡献！

### 链接问题

拉取请求应该链接到同一个存储库中的至少一个问题。

如果拉取请求解决了相关问题，并且你希望 GitHub 在合并到默认分支后自动关闭这些问题，则可以使用 (`KEYWORD #ISSUE-NUMBER`) 这样的语法：

```markdown
close #123
```

如果拉取请求链接了某个问题但没有关闭它，你可以使用 `ref` 如下关键字：

```markdown
ref #456
```

多个问题应该使用完整的语法并用逗号分隔，例如：
```markdown
close #123, ref #456
```
