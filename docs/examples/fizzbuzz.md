# `FizzBuzz`

这个示例不是传统的 [`FizzBuzz`](https://en.wikipedia.org/wiki/Fizz_buzz#Programming); 而是智能合约版本！脚本可以调用该合约的 `fizzbuzz` ABI 方法，并传入一些 `u64` 值，然后以 `enum` 的形式返回结果。

诸如 `FizzBuzzResult` 这样的自定义结构体和枚举的格式将自动包含在 ABI JSON 中，以便离链代码可以处理返回数据的编码形式。

```sway
contract;

enum FizzBuzzResult {
    Fizz: (),
    Buzz: (),
    FizzBuzz: (),
    Other: u64,
}

abi FizzBuzz {
    fn fizzbuzz(input: u64) -> FizzBuzzResult;
}

impl FizzBuzz for Contract {
    fn fizzbuzz(input: u64) -> FizzBuzzResult {
        if input % 15 == 0 {
            FizzBuzzResult::FizzBuzz
        } else if input % 3 == 0 {
            FizzBuzzResult::Fizz
        } else if input % 5 == 0 {
            FizzBuzzResult::Buzz
        } else {
            FizzBuzzResult::Other(input)
        }
    }
}
```