# Class: AbstractContract

[@fuel-ts/interfaces](/api/Interfaces/index).AbstractContract

## Hierarchy

- `AbstractProgram`

  ↳ **`AbstractContract`**

## Constructors

### constructor

• **new AbstractContract**(): [`AbstractContract`](/api/Interfaces/AbstractContract)

#### Returns

[`AbstractContract`](/api/Interfaces/AbstractContract)

#### Inherited from

AbstractProgram.constructor

## Properties

### account

• `Abstract` **account**: ``null`` \| [`AbstractAccount`](/api/Interfaces/AbstractAccount)

#### Inherited from

AbstractProgram.account

#### Defined in

[index.ts:71](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L71)

___

### id

• `Abstract` **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress)

#### Defined in

[index.ts:82](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L82)

___

### interface

• `Abstract` **interface**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `jsonAbi` | `any` |

#### Inherited from

AbstractProgram.interface

#### Defined in

[index.ts:72](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L72)

___

### provider

• `Abstract` **provider**: ``null`` \| { `sendTransaction`: (`transactionRequest`: `any`, `options?`: `any`) => `any`  }

#### Inherited from

AbstractProgram.provider

#### Defined in

[index.ts:76](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packag/api/src/index.ts#L76)
