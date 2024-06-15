# Class: PrivateKeyVault

[@fuel-ts/account](/api/Account/index).PrivateKeyVault

## Implements

- [`Vault`](/api/Account/Vault)&lt;[`PkVaultOptions`](/api/Account/PkVaultOptions)\>

## Constructors

### constructor

• **new PrivateKeyVault**(`options?`): [`PrivateKeyVault`](/api/Account/PrivateKeyVault)

If privateKey vault is initialized with a secretKey, it creates
one account with the fallowing secret

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`PkVaultOptions`](/api/Account/PkVaultOptions) |

#### Returns

[`PrivateKeyVault`](/api/Account/PrivateKeyVault)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:23](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L23)

## Properties

### #privateKeys

• `Private` **#privateKeys**: `string`[] = `[]`

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:17](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L17)

___

### type

▪ `Static` `Readonly` **type**: ``"privateKey"``

#### Implementation of

[Vault](/api/Account/Vault).[type](/api/Account/Vault.md#type)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:15](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L15)

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

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:49](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L49)

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

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:57](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L57)

___

### getAccounts

▸ **getAccounts**(): [`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Returns

[`WalletManagerAccount`](/api/Account/index.md#walletmanageraccount)[]

#### Implementation of

[Vault](/api/Account/Vault).[getAccounts](/api/Account/Vault.md#getaccounts)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:45](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L45)

___

### getPublicAccount

▸ **getPublicAccount**(`privateKey`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `privateKey` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress) |
| `publicKey` | `string` |

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:37](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L37)

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

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:73](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L73)

___

### serialize

▸ **serialize**(): [`PkVaultOptions`](/api/Account/PkVaultOptions)

#### Returns

[`PkVaultOptions`](/api/Account/PkVaultOptions)

#### Implementation of

[Vault](/api/Account/Vault).[serialize](/api/Account/Vault.md#serialize)

#### Defined in

[packages/account/src/wallet-manager/vaults/privatekey-vault.ts:31](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/wallet-manager/vaults/privatekey-vault.ts#L31)
