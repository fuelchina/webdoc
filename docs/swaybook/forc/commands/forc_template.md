# 强制模板
从 git 模板创建一个新的 Forc 项目

# 用法：
forc 模板 [选项] <项目名称>

# 参数：
<项目名称>

将要创建的项目的名称

# 选项：
`-h`，`--help`

打印帮助信息

`-L`，`--log-level`[<日志级别>]

设置日志级别

`-s`，`--silent`

使所有输出静音

`-t`，`--template-name`[<模板名称>]

需要从提供的 git repo 中获取并使用的模板名称

`-u`，`--url`[<网址>]

模板 URL 应该是一个 git repo [默认：https://github.com/fuellabs/sway]

`-v`，`--verbose`

使用详细输出

# 例子
```sway
forc template --url https://github.com/owner/template/ --project_name my_example_project

```
上述命令获取存储库`HEAD`的，并在获取的存储库的根目录中template搜索。它将获取存储库并使用新项目名称准备一个新存储库。将所有内容输出到。`Forc.toml``Forc.toml``current_dir/project_name`

```sway
forc template --url https://github.com/FuelLabs/sway --template_name counter --project_name my_example_project

```
上述命令获取`sway`repo 的 HEAD并在其中搜索示例（在 下`counter`有一个名为 的示例）。它将获取示例并使用新项目名称准备一个新示例。将所有内容输出到。`countersway/examplescounterForc.tomlcurrent_dir/project_name`
