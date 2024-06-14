# 单元测试

<!-- This section should explain unit testing in Sway -->
<!-- unit_test:example:start -->
Forc 为包的构建和执行测试提供了内置支持。
测试被写为具有 `#[test]` 属性的自由函数。
<!-- unit_test:example:end -->

例如：
```sway
#[test]
fn test_meaning_of_life() {
    assert(6 * 7 == 42);
}
```

运行每个测试函数，就好像它是a的入口点一样
[脚本](../sway-program-types/scripts.md)。如果测试返回，则测试“通过”
成功，如果它们在 [测试失败](#testing-failure)时恢复，则为“失败”。

如果项目测试失败，`forc test` 将以退出状态退出 `101`.

## 构建和运行测试
我们可以使用以下命令构建并执行包中的所有测试：
```console
forc test
```

输出应类似于此：
```console
  Compiled library "core".
  Compiled library "std".
  Compiled library "lib_single_test".
  Bytecode size is 92 bytes.
   Running 1 tests
      test test_meaning_of_life ... ok (170.652µs)
   Result: OK. 1 passed. 0 failed. Finished in 1.564996ms.
```

访问 [`forc test`](../forc/commands/forc_test.md) 命令参考来找到可用的选项 `forc test`.

## 测试失败

<!-- This section should explain support for failing unit tests in Sway -->
<!-- unit_test_fail:example:start -->
Forc 支持测试用 声明的测试函数的失败案例 `#[test(should_revert)]`。
<!-- unit_test_fail:example:end -->

例如：

```sway
#[test(should_revert)]
fn test_meaning_of_life() {
    assert(6 * 6 == 42);
}
```

还可以指定预期的恢复代码，如以下示例。
```sway
#[test(should_revert = "18446744073709486084")]
fn test_meaning_of_life() {
    assert(6 * 6 == 42);
}
```

如果测试正在恢复，则认为测试 `#[test(should_revert)]` 通过。

## 调用合约

单元测试可以调用合约函数，此类调用的示例如下所示。
```sway
contract;

abi MyContract {
    fn test_function() -> bool;
}

impl MyContract for Contract {
    fn test_function() -> bool {
        true
    }
}
```

为了测试 `test_function()`, 可以编写如下的单元测试。

#[test]

```sway
#[test]
fn test_success() {
    let caller = abi(MyContract, CONTRACT_ID);
    let result = caller.test_function {}();
    assert(result == true)
}
```

也可以通过合约调用来测试失败。

```sway
#[test(should_revert)]
fn test_fail() {
    let caller = abi(MyContract, CONTRACT_ID);
    let result = caller.test_function {}();
    assert(result == false)
}
```

<!-- This section should explain how the `CONTRACT_ID` variable works in Sway unit tests -->
<!-- contract_id:example:start -->
> **注意:** 当运行`forc test`时，你的合同将被构建两次:第一次 *没有* 单元测试，以确定合同的ID，然后第二次 *有* 单元测试，提供给他们的命名空间 `CONTRACT_ID` 。此 `CONTRACT_ID` '可与 `abi` 强制转换一起使用，以便在单元测试中启用合约调用。
<!-- contract_id:example:end -->

如果将外部合约添加为合约依赖项（即在[`contract-dependencies`](../forc/manifest_reference.md#the-contract-dependencies-section) 清单文件的部分中），则单元测试可以调用外部合约的方法。此类调用的示例如下所示：

```sway
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

`Forc.toml` 上述合同示例：

```toml
[project]
authors = ["Fuel Labs <contact@fuel.sh>"]
entry = "main.sw"
license = "Apache-2.0"
name = "caller"

[dependencies]
std = { path = "../../../sway-lib-std/" }

[contract-dependencies]
callee = { path = "../callee" }
```

## 并行或串行运行测试

<!-- This section should explain how unit tests do not share storage -->
<!-- storage:example:start -->
默认情况下，项目中的所有单元测试都是并行运行的。请注意，这不会导致存储中的任何数据争用，因为每个单元测试都有自己的存储空间，不会与任何其他单元测试共享。<!-- storage:example:end -->

默认情况下， `forc test` 将使用系统中所有可用的线程。要请求使用特定数量的线程， `--test-threads <val>` 可以向 提供标志 `forc test`。

```console
forc test --test-threads 1
```
