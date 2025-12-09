/**
 * 客户端请求签名生成器（基础版）
 * 使用纯 JS 实现，兼容非 HTTPS 环境
 */

// 混淆的常量
const _0x1a2b = [0x70, 0x74, 0x79, 0x70, 0x65]; // 'ptype'
const _0x3c4d = [0x73, 0x65, 0x63, 0x75, 0x72, 0x65]; // 'secure'

// 获取混淆的密钥
function _getKey(): string {
    const p1 = String.fromCharCode(..._0x1a2b);
    const p2 = String.fromCharCode(..._0x3c4d);
    const p3 = (0x7e4).toString(16); // '2024'
    return `${p1}-${p2}-signature-key-${p3}`;
}

// 生成随机 nonce
function _generateNonce(): string {
    const arr = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(arr);
    } else {
        for (let i = 0; i < 16; i++) {
            arr[i] = Math.floor(Math.random() * 256);
        }
    }
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * 简单的哈希函数（不依赖 crypto.subtle）
 */
function _simpleHash(str: string): string {
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

// 多轮哈希
function _hash(data: string, rounds: number = 3): string {
    let hash = data;

    for (let i = 0; i < rounds; i++) {
        const salted = hash + ':' + i + ':' + hash.length;
        hash = _simpleHash(salted);
    }

    const extended = _simpleHash(hash + 'a') + _simpleHash(hash + 'b');
    return extended;
}

// 简单 HMAC
function _hmac(key: string, message: string): string {
    const ipad = 0x36;
    const opad = 0x5c;

    let innerKey = '';
    for (let i = 0; i < key.length; i++) {
        innerKey += String.fromCharCode(key.charCodeAt(i) ^ ipad);
    }
    const innerHash = _hash(innerKey + message, 2);

    let outerKey = '';
    for (let i = 0; i < key.length; i++) {
        outerKey += String.fromCharCode(key.charCodeAt(i) ^ opad);
    }
    const outerHash = _hash(outerKey + innerHash, 2);

    return outerHash;
}

// 获取 cookie 值
function _getCookie(name: string): string {
    if (typeof document === 'undefined') return '';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || '';
    }
    return '';
}

// 获取时间戳
function _getTimestamp(): number {
    return Date.now();
}

export interface SignaturePayload {
    signature: string;
    timestamp: number;
    nonce: string;
    data?: string;
}

/**
 * 生成请求签名
 * @param data 可选的额外数据
 */
export function generateSignature(data?: string): SignaturePayload {
    const timestamp = _getTimestamp();
    const nonce = _generateNonce();

    // 获取 token
    const token = _getCookie('token') || '';

    // 构建签名基础字符串
    const baseString = `${timestamp}:${nonce}:${token}:${data || ''}`;

    // 获取密钥
    const key = _getKey();

    // 第一轮 HMAC
    let hash = _hmac(key, baseString);

    // 第二轮 HMAC
    hash = _hmac(hash.substring(0, 32), hash);

    return {
        signature: hash,
        timestamp,
        nonce,
        data
    };
}

/**
 * 为 Server Action 调用创建带签名的请求
 */
export function signedAction<T, R>(
    action: (data: T, signature: SignaturePayload) => Promise<R>,
    data: T
): Promise<R> {
    let dataHash: string | undefined;
    if (data !== null && data !== undefined) {
        const dataString = JSON.stringify(data);
        dataHash = _hash(dataString, 2);
    }

    const signature = generateSignature(dataHash);

    return action(data, signature);
}

/**
 * 创建一个已签名的 action 调用器
 */
export function createSignedCaller<T, R>(
    action: (data: T, signature: SignaturePayload) => Promise<R>
): (data: T) => Promise<R> {
    return (data: T) => {
        return signedAction(action, data);
    };
}
