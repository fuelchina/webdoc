# 强制完成
为你的 shell 生成制表符补全脚本

# 用法：
forc 补全 [选项] --shell

# 选项：

`-h`，`--help`

打印帮助信息

`-L`，`--log-level`<日志级别>

设置日志级别

`-s`，`--silent`

使所有输出静音

`-S`, `--shell`<外壳>

指定 shell 以启用 tab 补全

[可能的值：zsh、bash、fish、powershell、elvish]

更多信息请访问：https://fuellabs.github.io/sway/latest/forc/commands/forc_completions.html

`-v`，`--verbose`

使用详细输出

# 讨论
为 Bash、Fish、Zsh 或 PowerShell 启用制表符补全 脚本输出在 上`stdout`，允许将输出重定向到他们选择的文件。文件的位置取决于您使用的 shell 和操作系统。您的特定配置也可能决定需要将这些脚本放在何处。

以下是 Unix 和类似操作系统（如 GNU/Linux）下支持的三种 shell 的一些常见设置。

# 重击
完成文件通常存储在`/etc/bash_completion.d/`系统范围的命令中，但也可以存储在 `~/.local/share/bash-completion/completions`用户特定命令中。运行以下命令：

```sway
mkdir -p ~/.local/share/bash-completion/completions
forc completions --shell=bash >> ~/.local/share/bash-completion/completions/forc

```
这将安装完成脚本。您可能需要注销并重新登录到 shell 会话才能使更改生效。

# BASH(masOS/Homebrew)

Homebrew 将 bash 补全文件存储在 Homebrew 目录中。 `bash-completion` 安装 brew formula 后，运行以下命令：

```sway
mkdir -p $(brew --prefix)/etc/bash_completion.d
forc completions --shell=bash > $(brew --prefix)/etc/bash_completion.d/forc.bash-completion

```
# FISH

Fish 补全文件通常存储在 中  `$HOME/.config/fish/completions`。运行命令：
```sway
mkdir -p ~/.config/fish/completions
forc completions --shell=fish > ~/.config/fish/completions/forc.fish

```
这将安装完成脚本。您可能需要注销并重新登录到 shell 会话才能使更改生效。

# ZSH
ZSH 补全通常存储在变量中列出的任何目录中`$fpath`。要使用这些补全，您必须将生成的脚本添加到其中一个目录，或将您自己的脚本添加到此列表中。

如果您不确定要使用哪个目录，添加自定义目录通常是最安全的选择。首先创建目录；在此示例中，我们将在`$HOME` 目录中创建一个隐藏目录：

```sway
mkdir ~/.zfunc

```

然后将以下几行添加到`.zshrc`之前 `compinit`：
```sway
fpath+=~/.zfunc

```
现在您可以使用以下命令安装完成脚本：
```sway
forc completions --shell=zsh > ~/.zfunc/_forc

```
然后你必须注销并重新登录，或者直接运行
```sway
exec zsh

```
以使新完工项目得以生效。

# 自定义位置

或者，您可以将这些文件保存到您选择的位置，例如 $HOME 内的自定义目录。这样做需要您添加适当的指令，例如`source`登录脚本中的 ing。请参阅您的 shell 文档以了解如何添加此类指令。

# POWERSHELL

powershell 完成脚本需要 PowerShell v5.0+（随 Windows 10 提供，但可以为 Windows 7 或 8.1 单独下载）。

首先，检查是否已设置配置文件
```sway
Test-Path $profile

```

如果上述命令返回，则False运行以下命令
```sway
New-Item -path $profile -type file -force

```
现在打开提供的文件`$profile`（如果你使用 `New-Item`命令它将是 `${env:USERPROFILE}\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`

接下来，我们要么将完成文件保存到我们的配置文件中，要么保存到单独的文件中，然后将其导入到我们的配置文件中。要将完成文件保存到我们的配置文件中，只需使用
```sway
forc completions --shell=powershell >> ${env:USERPROFILE}\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1

```
