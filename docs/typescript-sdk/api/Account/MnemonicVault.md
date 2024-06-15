# Class: MnemonicVault

[@fuel-ts/account](/api/Account/index).MnemonicVault

## Implements

- [`Vault`](/api/Account/Vault)&lt;[`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions)\>

## Constructors

### constructor

• **new MnemonicVault**(`options`): [`MnemonicVault`](/api/Account/MnemonicVault)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions) |

#### Returns

[`MnemonicVault`](/api/Account/MnemonicVault)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:24](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L24)

## Properties

### #secret

• `Private` `Readonly` **#secret**: `string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:18](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L18)

___

### numberOfAccounts

• **numberOfAccounts**: `number` = `0`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:22](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L22)

___

### pathKey

• **pathKey**: `string` = `'{}'`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:20](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L20)

___

### rootPath

• **rootPath**: `string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:21](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L21)

___

### type

▪ `Static` `Readonly` **type**: ``"mnemonic"``

#### Implementation of

[Vault](/api/Account/Vault).[type](/api/Account/Vault.md#type)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:17](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L17)

## Methods

### addAccount

▸ **addAccount**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress) |
| `publicKey` | `string` |

#### Implementation of

[Vault](/api/Account/Vault).[addAccount](/api/Account/Vault.md#addaccount)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:63](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L63)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress) |

#### Returns

`string`

#### Implementation of

[Vault](/api/Account/Vault).[exportAccount](/api/Account/Vault.md#exportaccount)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:73](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L73)

___

### getAccounts

▸ **getAccounts**(): { `address`: [`AbstractAddress`](/api/Interfaces/AbstractAddress) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Returns

{ `address`: [`AbstractAddress`](/api/Interfaces/AbstractAddress) = wallet.address; `publicKey`: `string` = wallet.publicKey }[]

#### Implementation of

[Vault](/api/Account/Vault).[getAccounts](/api/Account/Vault.md#getaccounts)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:46](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L46)

___

### getDerivePath

▸ **getDerivePath**(`index`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`string`

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:31](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L31)

___

### getWallet

▸ **getWallet**(`address`): [`WalletUnlocked`](/api/Account/WalletUnlocked)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress) |

#### Returns

[`WalletUnlocked`](/api/Account/WalletUnlocked)

#### Implementation of

[Vault](/api/Account/Vault).[getWallet](/api/Account/Vault.md#getwallet)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:91](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L91)

___

### serialize

▸ **serialize**(): [`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions)

#### Returns

[`MnemonicVaultOptions`](/api/Account/MnemonicVaultOptions)

#### Implementation of

[Vault](/api/Account/Vault).[serialize](/api/Account/Vault.md#serialize)

#### Defined in

[packages/account/src/wallet-manager/vaults/mnemonic-vault.ts:38](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/mnemonic-vault.ts#L38)
