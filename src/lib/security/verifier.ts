'use server';

/**
 * 高级签名验证器（服务端）
 */

import { cookies } from 'next/headers';
import crypto from 'crypto';

const SECRET = process.env.SIGNATURE_SECRET || 'ptype-secure-2024-sign';
const TIME_WINDOW = 5 * 60 * 1000; // 5分钟

// 用于存储已使用的 nonce（防重放）
// 生产环境应该使用 Redis
const usedNonces = new Set<string>();

// 定期清理过期的 nonce
setInterval(() => {
    usedNonces.clear();
}, TIME_WINDOW);

interface AdvancedSignaturePayload {
    s: string;    // signature
    t: number;    // timestamp
    n: string;    // nonce
    f: string;    // fingerprint hash
    d?: string;   // data hash
}

// 服务端哈希
function hash(data: string, rounds: number = 3): string {
    let result = data;
    for (let i = 0; i < rounds; i++) {
        result = crypto.createHash('sha256').update(result).digest('hex');
    }
    return result;
}

// 服务端 HMAC
function hmac(key: string, msg: string): string {
    return crypto.createHmac('sha256', key).update(msg).digest('hex');
}

// 混淆的反向映射（与客户端相同）
function reverseMap(s: string): string {
    const a = 'abcdefghijklmnopqrstuvwxyz';
    const b = 'zyxwvutsrqponmlkjihgfedcba';
    const m: Record<string, string> = {};
    for (let i = 0; i < 26; i++) {
        m[a[i]] = b[i];
        m[a[i].toUpperCase()] = b[i].toUpperCase();
    }
    return s.split('').map(c => m[c] || c).join('');
}

// 派生密钥（与客户端相同逻辑）
function deriveKey(fingerprint: string): string {
    const parts = [
        reverseMap('kgbkv'), // 'ptype'
        (0x7e4).toString(16), // 2024
        reverseMap('hxfi'), // 'sign'
        hash(fingerprint, 1)
    ];
    return hash(parts.join('-'), 2);
}

/**
 * 验证高级签名
 */
export async function verifyAdvancedSignature(
    payload: AdvancedSignaturePayload | null,
    expectedData?: unknown
): Promise<{ valid: boolean; error?: string }> {
    if (!payload) {
        return { valid: false, error: 'Missing signature payload' };
    }

    const { s, t, n, f, d } = payload;

    // 1. 时间戳验证
    const now = Date.now();
    if (Math.abs(now - t) > TIME_WINDOW) {
        return { valid: false, error: 'Signature expired' };
    }

    // 2. Nonce 重放检查
    const nonceKey = `${n}:${t}`;
    if (usedNonces.has(nonceKey)) {
        return { valid: false, error: 'Replay detected' };
    }
    usedNonces.add(nonceKey);

    // 3. 验证数据哈希（如果提供了预期数据）
    if (expectedData !== undefined) {
        const expectedHash = hash(JSON.stringify(expectedData), 2);
        if (d !== expectedHash) {
            return { valid: false, error: 'Data integrity check failed' };
        }
    }

    // 4. 获取令牌标识
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const tk = token ? token.substring(0, 8) : '';

    // 5. 重建签名
    const dk = deriveKey(f);
    const base = [t, n, f, tk, d || ''].join(':');

    let sig = hmac(dk, base);
    sig = hmac(sig.substring(0, 32), sig);

    const expectedSig = hash(sig + n + t.toString(36), 1);

    // 6. 使用时间常量比较
    try {
        const isValid = crypto.timingSafeEqual(
            Buffer.from(s),
            Buffer.from(expectedSig)
        );

        if (!isValid) {
            return { valid: false, error: 'Signature mismatch' };
        }

        return { valid: true };
    } catch {
        return { valid: false, error: 'Signature verification failed' };
    }
}

export type { AdvancedSignaturePayload };
