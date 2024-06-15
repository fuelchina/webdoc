# Class: Vault&lt;TOptions\>

[@fuel-ts/account](/api/Account/index).Vault

## Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | { `secret?`: `string`  } |

## Implemented by

- [`MnemonicVault`](/api/Account/MnemonicVault)
- [`PrivateKeyVault`](/api/Account/PrivateKeyVault)

## Constructors

### constructor

• **new Vault**&lt;`TOptions`\>(`_options`): [`Vault`](/api/Account/Vault)&lt;`TOptions`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | { `secret?`: `string`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options` | `TOptions` |

#### Returns

[`Vault`](/api/Account/Vault)&lt;`TOptions`\>

#### Defined in

[packages/account/src/wallet-manager/types.ts:37](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L37)

## Properties

### type

▪ `Static` `Readonly` **type**: `string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:35](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L35)

## Methods

### addAccount

▸ **addAccount**(): [`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)

#### Returns

[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)

#### Defined in

[packages/account/src/wallet-manager/types.ts:49](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L49)

___

### exportAccount

▸ **exportAccount**(`_address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress) |

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/types.ts:53](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L53)

___

### getAccounts

▸ **getAccounts**(): [`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Returns

[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Defined in

[packages/account/src/wallet-manager/types.ts:45](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L45)

___

### getWallet

▸ **getWallet**(`_address`): [`WalletUnlocked`](/api/Account/WalletUnlocked)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress) |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked)

#### Defined in

[packages/account/src/wallet-manager/types.ts:57](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L57)

___

### serialize

▸ **serialize**(): `TOptions`

#### Returns

`TOptions`

#### Defined in

[packages/account/src/wallet-manager/types.ts:41](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/types.ts#L41)
