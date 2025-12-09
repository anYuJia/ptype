// 客户端导出 - 基础版
export { generateSignature, signedAction, createSignedCaller } from './signature';
export { useSignature } from './useSignature';
export type { SignaturePayload } from './signature';

// 客户端导出 - 高级混淆版（推荐）
export { generateAdvancedSignature, sign } from './advanced';
export type { AdvancedSignaturePayload } from './advanced';

// 服务端导出需要单独导入：
// import { verifyAdvancedSignature } from '@/lib/security/verifier';
// import type { AdvancedSignaturePayload } from '@/lib/security/verifier';
