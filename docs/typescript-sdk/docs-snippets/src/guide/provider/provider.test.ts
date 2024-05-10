import {
  FUEL_NETWORK_URL,
  Provider,
  ScriptTransactionRequest,
  ZeroBytes32,
  sleep,
  WalletUnlocked,
  Address,
} from 'fuels';

async function fetchSomeExternalCredentials() {
  return Promise.resolve('credential');
}

function decorateResponseWithCustomLogic(response: Response) {
  return response;
}

/**
 * @group node
 * @group browser
 */
describe('Provider', () => {
  it('base examples', async () => {
    // #region provider-definition
    // #import { Provider, FUEL_NETWORK_URL, WalletUnlocked };

    // 创建提供者
    const provider = await Provider.create(FUEL_NETWORK_URL);

    // 查询区块链
    const { consensusParameters } = provider.getChain();

    // 创建一个新钱包
    const wallet = WalletUnlocked.generate({ provider });

    // 获取钱包的余额(在我们拥有资产之前，这将是空的)
    const balances = await wallet.getBalances();
    // []
    // #endregion provider-definition

    expect(provider).toBeDefined();
    expect(provider).toBeInstanceOf(Provider);
    expect(consensusParameters).toBeDefined();
    expect(consensusParameters).toBeInstanceOf(Object);
    expect(balances).toEqual([]);
  });

  test('options: requestMiddleware', async () => {
    // #region options-requestMiddleware
    // 同步请求中间件
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: (request: RequestInit) => {
        request.credentials = 'omit';

        return request;
      },
    });

    // 同步请求中间件
    await Provider.create(FUEL_NETWORK_URL, {
      requestMiddleware: async (request: RequestInit) => {
        const credentials = await fetchSomeExternalCredentials();
        request.headers ??= {};
        (request.headers as Record<string, string>).auth = credentials;

        return request;
      },
    });
    // #endregion options-requestMiddleware
  });

  it('options: timeout', async () => {
    // #region options-timeout
    await Provider.create(FUEL_NETWORK_URL, {
      timeout: 30000, // 如果请求需要30秒才能完成，是否会中止
    });
    // #endregion options-timeout
  });

  it('options: retryOptions', async () => {
    // #region options-retryOptions
    await Provider.create(FUEL_NETWORK_URL, {
      retryOptions: {
        maxRetries: 5,
        baseDelay: 100,
        backoff: 'linear',
      },
    });
    // #endregion options-retryOptions
  });

  it('options: fetch', async () => {
    // #region options-fetch
    await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url: string, requestInit: RequestInit | undefined) => {
        // 干一些事情
        await sleep(100);

        // 原生 fetch 请求
        const response = await fetch(url, requestInit);

        const updatedResponse = decorateResponseWithCustomLogic(response);

        return updatedResponse;
      },
    });
    // #endregion options-fetch
  });

  it('fetches the base asset ID', async () => {
    const recipientAddress = Address.fromRandom();

    // #region provider-getBaseAssetId
    // #import { Provider, FUEL_NETWORK_URL, ScriptTransactionRequest };

    // 使用提供者获取基本资产ID
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const baseAssetId = provider.getBaseAssetId();
    // 0x...

    // 创建事务请求
    const transactionRequest = new ScriptTransactionRequest();
    // 为操作使用基本资产
    transactionRequest.addCoinOutput(recipientAddress, 100, baseAssetId);
    // #endregion provider-getBaseAssetId

    expect(baseAssetId).toBe(ZeroBytes32);
  });

  it('using operations', async () => {
    // #region operations
    const provider = await Provider.create(FUEL_NETWORK_URL);

    const chain = await provider.operations.getChain();
    const nodeInfo = await provider.operations.getNodeInfo();
    // #endregion operations

    expect(chain).toBeDefined();
    expect(nodeInfo).toBeDefined();
  });
});
