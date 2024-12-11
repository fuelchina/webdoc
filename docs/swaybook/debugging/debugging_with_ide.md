# [使用IDE进行调试](https://docs.fuel.network/docs/sway/debugging/debugging_with_ide/#debugging-with-ide)

在VSCode中使用`forc debug`插件让我们可以逐行的进行Sway单元测试。

## [安装](https://docs.fuel.network/docs/sway/debugging/debugging_with_ide/#installation)

1. 在[插件市场](https://marketplace.visualstudio.com/items?itemName=FuelLabs.sway-vscode-plugin)安装Sway VSCode 插件。
2. 在进行正式调试之前确保安装了`forc-debug`，可以通过下面这个命令进行安装：`fuelup component add forc-debug`
3. 创建 `.vscode/launch.json`文件，文件内容如下：

```
{
    "version": "0.2.0",
    "configurations": [
        {
        "type": "sway",
        "request": "launch",
        "name": "Debug Sway",
        "program": "${file}"
    }]
}
```

## [示例工程](https://docs.fuel.network/docs/sway/debugging/debugging_with_ide/#an-example-project)

示例工程如下：

```
contract;
 
abi CallerContract {
    fn test_false() -> bool;
}
 
impl CallerContract for Contract {
    fn test_false() -> bool {
        false
    }
}
 
abi CalleeContract {
    fn test_true() -> bool;
}
 
#[test]
fn test_multi_contract_calls() {
    let caller = abi(CallerContract, CONTRACT_ID);
    let callee = abi(CalleeContract, callee::CONTRACT_ID);
 
    let should_be_false = caller.test_false();
    let should_be_true = callee.test_true();
    assert(!should_be_false);
    assert(should_be_true);
}
```

在 VSCode 中打开的 Sway 文件内，你可以在测试代码或被测试函数内部的行上设置断点，并通过点击 Run -> Start Debugging 来启动单元测试的调试过程。

这将构建 Sway 项目并在调试模式下运行它。调试器会在遇到断点时暂停虚拟机的执行。

调试面板将在 Variables 标签页下显示虚拟机寄存器，以及当前暂停执行的虚拟机操作码。你可以继续执行，也可以使用 Step Over 功能逐条指令地向前推进。