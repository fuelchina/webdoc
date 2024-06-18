# forc解析字节码
将字节码文件解析为调试格式

# 用法：
forc 解析字节码 [选项] 

# 参数：
      

# 选项：
`-h`，`--help`

打印帮助信息

`-L`，`--log-level`<日志级别>

设置日志级别

`-s`，`--silent`

使所有输出静音

`-v`，`--verbose`

使用详细输出

# 例子
`forc init`我们可以使用计数器模板对使用创建的初始项目尝试此命令：

```sway
forc new --template counter counter
cd counter
forc build -o obj

```
```sway
counter$ forc parse-bytecode obj

  half-word   byte   op                   raw           notes
          0   0      JI(4)                90 00 00 04   conditionally jumps to byte 16
          1   4      NOOP                 47 00 00 00
          2   8      Undefined            00 00 00 00   data section offset lo (0)
          3   12     Undefined            00 00 00 c8   data section offset hi (200)
          4   16     LW(63, 12, 1)        5d fc c0 01
          5   20     ADD(63, 63, 12)      10 ff f3 00
         ...
         ...
         ...
         60   240    Undefined            00 00 00 00
         61   244    Undefined            fa f9 0d d3
         62   248    Undefined            00 00 00 00
         63   252    Undefined            00 00 00 c8

```
