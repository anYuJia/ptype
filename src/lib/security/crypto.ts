'use server';

/**
 * 服务端加密验证模块
 * 用于验证客户端请求的签名
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

// 服务端密钥 - 应该从环境变量获取
const SERVER_SECRET = process.env.SIGNATURE_SECRET || 'ptype-secure-signature-key-2024';
const TIMESTAMP_TOLERANCE = 5 * 60 * 1000; // 5分钟容差

interface SignaturePayload {
    signature: string;
    timestamp: number;
    nonce: string;
    data?: string;
}

/**
 * 验证请求签名
 */
export async function verifyRequestSignature(payload: SignaturePayload): Promise<boolean> {
    try {
        const { signature, timestamp, nonce, data } = payload;

        // 1. 检查时间戳是否在有效范围内
        const now = Date.now();
        if (Math.abs(now - timestamp) > TIMESTAMP_TOLERANCE) {
            console.warn('Signature timestamp out of range');
            return false;
        }

        // 2. 获取用户标识（如果已登录）
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value || '';

        // 3. 重建签名并验证
        const expectedSignature = generateServerSignature(timestamp, nonce, token, data);

        // 使用时间常量比较防止时序攻击
        const isValid = crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        );

        return isValid;
    } catch (error) {
        console.error('Signature verification error:', error);
        return false;
    }
}

/**
 * 服务端生成签名（用于验证）
 */
function generateServerSignature(timestamp: number, nonce: string, token: string, data?: string): string {
    // 使用与客户端相同的算法
    const baseString = `${timestamp}:${nonce}:${token}:${data || ''}`;

    // 多轮哈希增加复杂度
    let hash = crypto.createHmac('sha256', SERVER_SECRET)
        .update(baseString)
        .digest('hex');

    // 二次哈希
    hash = crypto.createHmac('sha256', hash.substring(0, 32))
        .update(hash)
        .digest('hex');

    return hash;
}

/**
 * 用于 action 的验证装饰器
 * 在 action 开头调用来验证请求
 */
export async function validateRequest(signatureData: SignaturePayload | null): Promise<{ valid: boolean; error?: string }> {
    if (!signatureData) {
        return { valid: false, error: 'Missing signature' };
    }

    const isValid = await verifyRequestSignature(signatureData);

    if (!isValid) {
        return { valid: false, error: 'Invalid signature' };
    }

    return { valid: true };
}

/**
 * 生成一个服务端 challenge（可选，用于更复杂的验证流程）
 */
export async function generateChallenge(): Promise<string> {
    const challenge = crypto.randomBytes(32).toString('hex');
    const timestamp = Date.now();

    // 可以将 challenge 存储到 Redis 或内存缓存中
    // 这里简单返回一个签名的 challenge
    const signedChallenge = crypto.createHmac('sha256', SERVER_SECRET)
        .update(`${challenge}:${timestamp}`)
        .digest('hex');

    return `${challenge}:${timestamp}:${signedChallenge}`;
}
