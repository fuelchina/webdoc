# 向量
在Sway中的向量示例

```sway
contract;

use std::{storage::StorageVec};

// storage vector, heap

abi MyContract {
    #[storage(read, write)]
    fn storage_vec_examples();
    fn heap_vec_examples();
}

storage {
    nums: StorageVec<u64> = StorageVec {},
}

impl MyContract for Contract {
    #[storage(read, write)]
    fn storage_vec_examples() {
        // push - 添加元素
        // pop - 弹出最后一个元素
        // get - 获取元素
        // set - 设置元素
        // remove - 移除元素，并将后续元素向前移动
        // swap remove - 移除指定元素，并将最后一个元素移动到指定位置
        // len - 获取向量长度
        // clear - 清空向量
        // loop - 循环示例

        // push - 添加元素
        storage.nums.push(100);
        storage.nums.push(200);
        storage.nums.push(300);
        storage.nums.push(400);
        storage.nums.push(500);
        storage.nums.push(600);

        // pop - 弹出最后一个元素 - 返回 Option<u64>
        let last = storage.nums.pop();

        // get - 获取元素
        let first = storage.nums.get(0).unwrap();
        let none = storage.nums.get(1000);

        // set - 设置元素
        storage.nums.set(0, 123);

        // remove - 移除元素 - 返回被移除的值
        // 移除前 [100, 200, 300, 400]
        // 移除后 [100, 300, 400]
        let removed_val = storage.nums.remove(1);

        // swap remove - 移除指定元素，并将最后一个元素移动到指定位置
        // 移除前 [100, 300, 400, 500]
        // 移除后 [100, 500, 400]
        storage.nums.swap_remove(1);

        let len = storage.nums.len();

        // clear - 清空向量
        storage.nums.clear();

        // Loop example - 循环示例
        let mut i = 0;
        while i < len {
            let val = storage.nums.get(i).unwrap();
            i += 1;
        }
    }

    fn heap_vec_examples() {
        // new - 创建一个新的向量
        // push - 添加元素
        // pop - 弹出最后一个元素
        // remove - 移除元素
        // get - 获取元素
        // set - 设置元素
        // len - 获取向量长度
        let mut v: Vec<u64> = Vec::new();

        v.push(100);
        v.push(200);
        v.push(300);
        v.push(400);
        v.push(500);

        // 返回 Option<u64>
        v.pop();

        // 移除前 [100, 200, 300, 400]
        // 移除后 [100, 300, 400]
        // 返回被移除的元素
        v.remove(1);

        let val = v.get(1).unwrap();

        v.set(1, val + 1);

        let len = v.len();
    }
}
```
