# 提供者选项

您可以在实例化 `Provider` 时提供各种[选项](../../api/Account/index.md#provideroptions)来修改其行为。

### `retryOptions`

通过 `Provider` 对 fuel 节点的调用将在无法建立连接时失败。
指定重试选项允许您在最终抛出错误之前自定义处理此失败情况的方式。

_注意：仅当无法建立连接时才会重试。如果建立了连接并且节点抛出错误，则不会进行重试。_

您可以提供以下设置：

- `maxRetries` - 在初始尝试失败之后在失败调用之前重试的次数。
- `backoff` - 用于定义尝试之间间隔的策略。
  - `exponential` _(默认)_: 每次尝试都会加倍延迟。
  - `linear` - 每次尝试都会线性增加延迟。
  - `fixed`: 尝试之间使用固定延迟。
- `baseDelay` _(默认 150ms)_ - 回退策略的基本时间（以毫秒为单位）。

<<< ../../docs-snippets/src/guide/provider/provider.test.ts#options-retryOptions{ts:line-numbers}

### `requestMiddleware`

允许您修改请求对象以添加额外的标头、修改请求的正文等。

<<< ../../docs-snippets/src/guide/provider/provider.test.ts#options-requestMiddleware{ts:line-numbers}

### `timeout`

指定以毫秒为单位的超时时间，在此超时后，每个请求都将被中止。

<<< ../../docs-snippets/src/guide/provider/provider.test.ts#options-timeout{ts:line-numbers}

### `fetch`

提供一个自定义的 `fetch` 函数，该函数将替换默认的 fetch 调用。

_注意：如果定义了 `fetch`，则 `requestMiddleware`、`timeout` 和 `retryOptions` 也将应用于此自定义的 `fetch` 函数。_

<<< ../../docs-snippets/src/guide/provider/provider.test.ts#options-fetch{ts:line-numbers}