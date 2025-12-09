# 请求签名安全系统

## 概述

这个安全系统为 PType 应用提供了请求签名验证功能，用于防止 API 滥用和自动化攻击。

## 文件结构

```
src/lib/security/
├── index.ts           # 统一导出（客户端）
├── signature.ts       # 基础签名生成器
├── advanced.ts        # 高级混淆签名生成器（推荐）
├── useSignature.ts    # React Hook
├── crypto.ts          # 服务端验证（基础版）
└── verifier.ts        # 服务端验证（高级版）
```

## 使用方法

### 1. 客户端 - 生成签名

```tsx
// 在组件中使用
import { sign } from '@/lib/security';

const MyComponent = () => {
    const handleSubmit = async (data) => {
        // 生成签名
        const signature = await sign(data);
        
        // 调用 action 时传入签名
        const result = await myServerAction(data, signature);
    };
};
```

### 2. 服务端 - 验证签名

```typescript
// 在 action 中验证
'use server';

import { verifyAdvancedSignature, AdvancedSignaturePayload } from '@/lib/security/verifier';

export async function myProtectedAction(
    data: MyDataType,
    signature?: AdvancedSignaturePayload
) {
    // 验证签名
    const verification = await verifyAdvancedSignature(signature, data);
    if (!verification.valid) {
        return { success: false, error: verification.error };
    }
    
    // 继续处理业务逻辑...
}
```

## 安全特性

1. **时间戳验证** - 签名在 5 分钟后过期
2. **Nonce 防重放** - 每个签名只能使用一次
3. **数据完整性** - 验证请求数据未被篡改
4. **浏览器指纹** - 增加请求唯一性
5. **多轮哈希** - 增加逆向难度
6. **混淆代码** - 变量名和逻辑混淆
7. **时间常量比较** - 防止时序攻击

## 环境变量

在 `.env` 文件中添加：

```
SIGNATURE_SECRET="你的密钥-请使用强随机字符串"
```

## 注意事项

⚠️ **重要提示**：
- 前端代码永远无法完全防止逆向工程
- 此系统增加了攻击成本，但不能替代服务端的身份验证和授权
- 生产环境应使用 Redis 存储 nonce 而不是内存 Set
- 建议配合 rate limiting 一起使用
