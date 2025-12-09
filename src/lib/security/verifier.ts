'use server';

/**
 * 高级签名验证器（服务端）
 * 使用纯 JS 实现，与客户端算法匹配
 */

import { cookies } from 'next/headers';

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

/**
 * 简单的哈希函数（与客户端相同）
 */
function simpleHash(str: string): string {
    let h1 = 0x811c9dc5;
    let h2 = 0x1000193;

    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        h1 ^= c;
        h1 = Math.imul(h1, 0x1000193);
        h2 ^= c;
        h2 = Math.imul(h2, 0x811c9dc5);
    }

    const mixed = h1 ^ h2;

    const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
    const hex3 = (mixed >>> 0).toString(16).padStart(8, '0');

    return hex1 + hex2 + hex3;
}

// 多轮哈希（与客户端相同）
function hash(data: string, rounds: number = 3): string {
    let h = data;

    for (let i = 0; i < rounds; i++) {
        const salted = h + ':' + i + ':' + h.length;
        h = simpleHash(salted);
    }

    const extended = simpleHash(h + 'a') + simpleHash(h + 'b');
    return extended;
}

// 简单 HMAC（与客户端相同）
function hmac(key: string, msg: string): string {
    const ipad = 0x36;
    const opad = 0x5c;

    let innerKey = '';
    for (let i = 0; i < key.length; i++) {
        innerKey += String.fromCharCode(key.charCodeAt(i) ^ ipad);
    }
    const innerHash = hash(innerKey + msg, 2);

    let outerKey = '';
    for (let i = 0; i < key.length; i++) {
        outerKey += String.fromCharCode(key.charCodeAt(i) ^ opad);
    }
    const outerHash = hash(outerKey + innerHash, 2);

    return outerHash;
}

// 派生密钥（与客户端相同逻辑）
// 注意：fingerprint 参数已经是 hash(_fp(), 1) 的结果，不需要再次哈希
function deriveKey(fingerprint: string): string {
    const parts = [
        reverseMap('kgbkv'), // 'ptype'
        (0x7e4).toString(16), // 2024
        reverseMap('hxfi'), // 'sign'
        fingerprint  // 直接使用，因为客户端发送的 f 已经是哈希后的值
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
        console.warn('[Signature] Missing payload');
        return { valid: false, error: 'Missing signature payload' };
    }

    const { s, t, n, f, d } = payload;

    // 调试日志
    console.log('[Signature] Verifying:', {
        hasSignature: !!s,
        timestamp: t,
        hasNonce: !!n,
        fingerprint: f ? f.substring(0, 8) + '...' : '(empty)',
        hasData: !!d
    });

    // 1. 时间戳验证
    const now = Date.now();
    const timeDiff = Math.abs(now - t);
    console.log('[Signature] Time check:', {
        clientTime: t,
        serverTime: now,
        diff: timeDiff,
        maxAllowed: TIME_WINDOW,
        passed: timeDiff <= TIME_WINDOW
    });
    if (timeDiff > TIME_WINDOW) {
        return { valid: false, error: `Signature expired (diff: ${Math.round(timeDiff / 1000)}s)` };
    }

    // 2. Nonce 重放检查
    const nonceKey = `${n}:${t}`;
    if (usedNonces.has(nonceKey)) {
        console.warn('[Signature] Replay detected for nonce:', n);
        return { valid: false, error: 'Replay detected' };
    }
    usedNonces.add(nonceKey);

    // 3. 验证数据哈希（如果提供了预期数据）
    if (expectedData !== undefined) {
        const dataStr = JSON.stringify(expectedData);
        const expectedHash = hash(dataStr, 2);
        if (d !== expectedHash) {
            console.warn('[Signature] Data hash mismatch:', {
                received: d?.substring(0, 16),
                expected: expectedHash.substring(0, 16)
            });
            return { valid: false, error: 'Data integrity check failed' };
        }
    }

    // 4. 获取令牌标识
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';
    const tk = token ? token.substring(0, 8) : '';
    console.log('[Signature] Token prefix:', tk || '(no token)');

    // 5. 重建签名
    const dk = deriveKey(f);
    const base = [t, n, f, tk, d || ''].join(':');

    let sig = hmac(dk, base);
    sig = hmac(sig.substring(0, 32), sig);

    const expectedSig = hash(sig + n + t.toString(36), 1);

    // 6. 比较签名
    if (s !== expectedSig) {
        console.warn('[Signature] Mismatch:', {
            received: s?.substring(0, 16),
            expected: expectedSig.substring(0, 16)
        });
        return { valid: false, error: 'Signature mismatch' };
    }

    console.log('[Signature] Verification successful');
    return { valid: true };
}

export type { AdvancedSignaturePayload };

