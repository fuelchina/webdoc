# forc 加密
用于散列任意数据的 Forc 插件。

# 用法：
forc-加密

# 选项：
`-h`，`--help`

打印帮助信息

`-V`，`--version`

打印版本信息

# 子命令：
`address`

将地址转换为另一种格式

`help`

打印此消息或给定子命令的帮助

`keccak256`

使用此算法对参数或文件进行哈希处理

`new-key`

创建用于 fuel-core 的新密钥

`parse-secret`

解析私钥以查看关联的公钥

`sha256`

使用此算法对参数或文件进行哈希处理

`EXAMPLES:`

`#Hashes`

与 SHA256 的争论

`forc`

加密 keccak256 测试

`#Hashes`

带有 SHA256 的文件路径

`forc`

加密 sha256 src/args.rs

`#Hashes`

带有 Keccak256 的文件路径

`forc`

加密 keccak256 src/args.rs

`#Convert`

转换为另一种格式的地址

`forc`

加密地址 fuel12e0xwx34nfp7jrzvn9mp5qkac3yvp7h8fx37ghl7klf82vv2wkys6wd523

`#Creates`

区块生产的新密钥默认值

`forc`

加密新密钥

`#Creates`

对等互联的新密钥

`forc`

加密新密钥-k 对等

`#Creates`

区块生产的新钥匙

`forc`

加密新密钥-k 区块生产

`#Parses`

区块生产的秘密

`forc`

加密解析秘密“f5204427d0ab9a311266c96a377f7c329cb8a41b9088225b6fcf40eefb423e28”

`#Parses`

窥视的秘密

`forc`

crypto parse-secret -k 对等

`"f5204427d0ab9a311266c96a377f7c329cb8a41b9088225b6fcf40eefb423e28"
`
