/**
 * 客户端请求签名生成器
 * 使用混淆技术使逆向工程更加困难
 * 
 * 注意：前端代码永远不可能100%安全，但我们可以增加逆向的成本
 */

// 混淆的常量（实际值通过运算得出）
const _0x1a2b = [0x70, 0x74, 0x79, 0x70, 0x65]; // 'ptype'
const _0x3c4d = [0x73, 0x65, 0x63, 0x75, 0x72, 0x65]; // 'secure'

// 获取混淆的密钥
function _getKey(): string {
    const p1 = String.fromCharCode(..._0x1a2b);
    const p2 = String.fromCharCode(..._0x3c4d);
    const p3 = (0x7e4).toString(16); // '2024'
    return `${p1}-${p2}-signature-key-${p3}`;
}

// 混淆的字符转换
function _rot(s: string, n: number): string {
    return s.split('').map(c => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + n) % 26) + 65);
        }
        if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + n) % 26) + 97);
        }
        return c;
    }).join('');
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

// 简单的哈希函数（浏览器兼容）
async function _hash(message: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// HMAC-SHA256
async function _hmac(key: string, message: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const messageData = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
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

// 混淆的时间戳获取
function _getTimestamp(): number {
    // 使用多种方式获取时间戳来增加混淆
    const d = new Date();
    const t1 = d.getTime();
    const t2 = Date.now();
    // 使用两者的平均值（实际上是相同的，但增加了代码复杂度）
    return Math.floor((t1 + t2) / 2);
}

export interface SignaturePayload {
    signature: string;
    timestamp: number;
    nonce: string;
    data?: string;
}

/**
 * 生成请求签名
 * @param data 可选的额外数据（如请求体的哈希）
 */
export async function generateSignature(data?: string): Promise<SignaturePayload> {
    const timestamp = _getTimestamp();
    const nonce = _generateNonce();

    // 获取 token（如果已登录）
    // 注意：httpOnly cookie 在客户端不可读，所以我们用一个标记
    const token = _getCookie('token') || '';

    // 构建签名基础字符串
    const baseString = `${timestamp}:${nonce}:${token}:${data || ''}`;

    // 获取密钥
    const key = _getKey();

    // 第一轮 HMAC
    let hash = await _hmac(key, baseString);

    // 第二轮 HMAC（使用第一轮结果的一部分作为密钥）
    hash = await _hmac(hash.substring(0, 32), hash);

    return {
        signature: hash,
        timestamp,
        nonce,
        data
    };
}

/**
 * 为 Server Action 调用创建带签名的请求
 * 这是一个包装函数，自动添加签名
 */
export async function signedAction<T, R>(
    action: (data: T, signature: SignaturePayload) => Promise<R>,
    data: T
): Promise<R> {
    // 生成数据的哈希（如果有数据）
    let dataHash: string | undefined;
    if (data !== null && data !== undefined) {
        const dataString = JSON.stringify(data);
        dataHash = await _hash(dataString);
    }

    const signature = await generateSignature(dataHash);

    return action(data, signature);
}

/**
 * 创建一个已签名的 action 调用器
 */
export function createSignedCaller<T, R>(
    action: (data: T, signature: SignaturePayload) => Promise<R>
): (data: T) => Promise<R> {
    return async (data: T) => {
        return signedAction(action, data);
    };
}
