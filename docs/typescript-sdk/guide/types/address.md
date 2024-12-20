# Address

In Sway, the [`Address`](../../api/Address/Address) type serves as a type-safe wrapper around the primitive `b256` type. The SDK takes a different approach and has its own abstraction for the [Address](../../api/Address/Address) type.

## [`AbstractAddress`](../../api/Interfaces/AbstractAddress) Class

The SDK defines the [AbstractAddress](../../api/Interfaces/AbstractAddress) class, which provides a set of utility functions for easy manipulation and conversion between address formats.

<!-- <<< ../../../packages/interfaces/src/index.md.ts#address-1{ts:line-numbers} -->

## Address Class

Besides conforming to the interface of the [`AbstractAddress`](../../api/Interfaces/AbstractAddress), the [`Address`](../../api/Address/Address) class also defines one property; `bech32Address`, which is of the [`Bech32`](./bech32) type.

<!-- <<< ../../../packages/address/src/address.ts#address-2{ts:line-numbers} -->

## Creating an Address

Thanks to the utility functions provided by the [`AbstractAddress`](../../api/Interfaces/AbstractAddress) class, there are several ways to create an [`Address`](../../api/Address/Address) instance:

### From a `Bech32` Address

To create an [`Address`](../../api/Address/Address) from a `Bech32` address, use the following code snippet:

<<< ../../docs-snippets/src/guide/types/address.test.ts#address-2{ts:line-numbers}

### From a Public Key

To create an [`Address`](../../api/Address/Address) from a public key, use the following code snippet:

<<< ../../docs-snippets/src/guide/types/address.test.ts#address-3{ts:line-numbers}

### From a 256-bit Address

To create an [`Address`](../../api/Address/Address) from a 256-bit address, use the following code snippet:

<<< ../../docs-snippets/src/guide/types/address.test.ts#address-4{ts:line-numbers}

## Utility Functions

The [`Address`](../../api/Address/Address) class also provides some practical utility functions:

1. `fromString`: Create a new [`Address`](../../api/Address/Address) from an ambiguous source that may be a `Bech32` or `B256` address:

<<< ../../docs-snippets/src/guide/types/address.test.ts#address-5{ts:line-numbers}

2. `fromDynamicInput`: Create a new [`Address`](../../api/Address/Address) when the address source is unknown:

<<< ../../docs-snippets/src/guide/types/address.test.ts#address-6{ts:line-numbers}

3. `equals:` As you may already notice, the `equals` function can compare addresses instances:

<<< ../../docs-snippets/src/guide/types/address.test.ts#address-7{ts:line-numbers}
