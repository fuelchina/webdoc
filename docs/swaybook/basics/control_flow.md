# 控制流

## `if` 表达式

Sway 支持`if`、`else`和`else if`表达式，允许您根据条件对代码进行分支。

例如:

```sway
fn main() {
    let number = 6;

    if number % 4 == 0 {
        // do something
    } else if number % 3 == 0 {
        // do something else
    } else {
        // do something else
    }
}
```

### `if`在`let`声明中使用

与 Rust 一样，`if` 是 `Sway` 中的表达式。这意味着您可以使用语句`if`右侧的表达式`let`将结果分配给变量。
```sway
let my_data = if some_bool < 10 { foo() } else { bar() };
```

请注意，表达式的所有分支`if`必须返回相同类型的值。

### `match` 表达式

Sway 通过穷举式`match`表达式支持高级模式匹配。与`if`语句不同,`match`表达式在编译时断言所有可能的模式都已匹配。如果你没有处理所有的模式，你会得到编译器错误，表明你的`match`表达式不是穷举的。

语句的基本语法`match`如下:

```sway
let result = match expression {
    pattern1 => code_to_execute_if_expression_matches_pattern1,
    pattern2 => code_to_execute_if_expression_matches_pattern2,
    pattern3 | pattern4 => code_to_execute_if_expression_matches_pattern3_or_pattern4
    ...
    _ => code_to_execute_if_expression_matches_no_pattern,
}
```

有关如何使用 match 语句的一些示例:

```sway
script;

// helper functions for our example
fn on_even(num: u64) {
    // do something with even numbers
}
fn on_odd(num: u64) {
    // do something with odd numbers
}

fn main(num: u64) -> u64 {
    // Match as an expression
    let is_even = match num % 2 {
        0 => true,
        _ => false,
    };

    // Match as control flow
    let x = 12;
    match x {
        5 => on_odd(x),
        _ => on_even(x),
    };

    // Match an enum
    enum Weather {
        Sunny: (),
        Rainy: (),
        Cloudy: (),
        Snowy: (),
    }
    let current_weather = Weather::Sunny;
    let avg_temp = match current_weather {
        Weather::Sunny => 80,
        Weather::Rainy => 50,
        Weather::Cloudy => 60,
        Weather::Snowy => 20,
    };

    let is_sunny = match current_weather {
        Weather::Sunny => true,
        Weather::Rainy | Weather::Cloudy | Weather::Snowy => false,
    };

    // match expression used for a return
    let outside_temp = Weather::Sunny;
    match outside_temp {
        Weather::Sunny => 80,
        Weather::Rainy => 50,
        Weather::Cloudy => 60,
        Weather::Snowy => 20,
    }
}

```

## 循环

### `while`

Sway 中的循环目前仅限于 `while`循环。这是它们的样子:

```sway
while counter < 10 {
    counter = counter + 1;
}
```

你需要`while`关键字，每次迭代都会计算的一些条件(在本例中为`value < 10`)，以及花括号(`{...}`)内的代码块来执行每次迭代。

### `break` 和 `continue`

`break`和 `continue` 关键字可在 `while` 循环体中使用。`break`语句的目的是提前终止循环:
```sway
fn break_example() -> u64 {
    let mut counter = 1;
    let mut sum = 0;
    let num = 10;
    while true {
        if counter > num {
            break;
        }
        sum += counter;
        counter += 1;
    }
    sum // 1 + 2 + .. + 10 = 55
}

```

`continue`语句的目的是在迭代中跳过循环的一部分,直接跳转到下一个迭代:

```sway
fn continue_example() -> u64 {
    let mut counter = 0;
    let mut sum = 0;
    let num = 10;
    while counter < num {
        counter += 1;
        if counter % 2 == 0 {
            continue;
        }
        sum += counter;
    }
    sum // 1 + 3 + .. + 9 = 25
}

```

### 嵌套循环

`while`如果需要，你还可以使用嵌套循环:
```sway
while condition_1 == true {
    // do stuff...
    while condition_2 == true {
        // do more stuff...
    }
}
```
