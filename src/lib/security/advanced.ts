/**
 * 高级混淆签名生成器
 * 使用多层混淆和动态代码生成来增加逆向难度
 * 
 * 兼容非 HTTPS 环境（不依赖 crypto.subtle）
 */

// 混淆的字符映射表
const _m = (() => {
    const a = 'abcdefghijklmnopqrstuvwxyz';
    const b = 'zyxwvutsrqponmlkjihgfedcba';
    const m: Record<string, string> = {};
    for (let i = 0; i < 26; i++) {
        m[a[i]] = b[i];
        m[a[i].toUpperCase()] = b[i].toUpperCase();
    }
    return m;
})();

// 反向映射
function _r(s: string): string {
    return s.split('').map(c => _m[c] || c).join('');
}

// 混淆的时间获取
function _t(): number {
    const d = new Date();
    const o = d.getTimezoneOffset() * 60000;
    return d.getTime() + 0 * o; // 使用 UTC
}

// 混淆的随机字节生成
function _n(len: number): string {
    const arr = new Uint8Array(len);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(arr);
    } else {
        for (let i = 0; i < len; i++) {
            arr[i] = Math.random() * 256 | 0;
        }
    }
    return Array.from(arr, b => (b + 0x100).toString(16).slice(-2)).join('');
}

// 浏览器指纹收集（增加唯一性）
function _fp(): string {
    if (typeof window === 'undefined') return '';

    const parts: string[] = [];

    // Screen
    if (window.screen) {
        parts.push(`${window.screen.width}x${window.screen.height}`);
        parts.push(`${window.screen.colorDepth}`);
    }

    // Navigator
    if (navigator) {
        parts.push(navigator.language || '');
        parts.push(String(navigator.hardwareConcurrency || ''));
        parts.push(navigator.platform || '');
    }

    // Timezone
    parts.push(Intl.DateTimeFormat().resolvedOptions().timeZone || '');

    return parts.join('|');
}

/**
 * 简单的哈希函数（不依赖 crypto.subtle）
 * 使用 djb2 变体 + 多轮混合
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

    // 混合两个哈希值
    const mixed = h1 ^ h2;

    // 转换为 hex
    const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
    const hex3 = (mixed >>> 0).toString(16).padStart(8, '0');

    return hex1 + hex2 + hex3;
}

// 多轮哈希（纯 JS 实现）
function _h(data: string, rounds: number = 3): string {
    let hash = data;

    for (let i = 0; i < rounds; i++) {
        // 每轮添加盐值增加复杂度
        const salted = hash + ':' + i + ':' + hash.length;
        hash = _simpleHash(salted);
    }

    // 扩展输出长度
    const extended = _simpleHash(hash + 'a') + _simpleHash(hash + 'b');
    return extended;
}

// 简单 HMAC（纯 JS 实现）
function _hmac(key: string, msg: string): string {
    // 简化的 HMAC 实现
    const ipad = 0x36;
    const opad = 0x5c;

    // 内部哈希
    let innerKey = '';
    for (let i = 0; i < key.length; i++) {
        innerKey += String.fromCharCode(key.charCodeAt(i) ^ ipad);
    }
    const innerHash = _h(innerKey + msg, 2);

    // 外部哈希
    let outerKey = '';
    for (let i = 0; i < key.length; i++) {
        outerKey += String.fromCharCode(key.charCodeAt(i) ^ opad);
    }
    const outerHash = _h(outerKey + innerHash, 2);

    return outerHash;
}

// 混淆的密钥派生
function _dk(): string {
    // 使用多个来源派生密钥
    const parts = [
        _r('kgbkv'), // 'ptype' reversed
        (0x7e4).toString(16), // 2024
        _r('hxfi'), // 'sign' reversed
        _h(_fp(), 1)
    ];
    return _h(parts.join('-'), 2);
}

// 获取当前令牌标识（不暴露实际令牌）
function _tk(): string {
    if (typeof document === 'undefined') return '';
    const c = document.cookie.match(/token=([^;]+)/);
    if (!c) return '';
    // 返回令牌的哈希标识而不是令牌本身
    return c[1].substring(0, 8); // 只用前8个字符作为标识
}

export interface AdvancedSignaturePayload {
    s: string;    // signature
    t: number;    // timestamp
    n: string;    // nonce
    f: string;    // fingerprint hash
    d?: string;   // data hash
}

/**
 * 生成高级混淆签名
 * 注意：此函数必须在客户端环境调用，因为需要浏览器指纹信息
 */
export function generateAdvancedSignature(data?: unknown): AdvancedSignaturePayload {
    // 确保在客户端环境中运行
    if (typeof window === 'undefined') {
        throw new Error('generateAdvancedSignature must be called on the client side');
    }

    const t = _t();
    const n = _n(16);
    const f = _h(_fp(), 1);
    const tk = _tk();

    // 数据哈希
    let d: string | undefined;
    if (data !== null && data !== undefined) {
        const str = JSON.stringify(data);
        d = _h(str, 2);
    }

    // 构建签名
    const dk = _dk();
    const base = [t, n, f, tk, d || ''].join(':');

    // 多轮 HMAC
    let sig = _hmac(dk, base);
    sig = _hmac(sig.substring(0, 32), sig);

    // 最终混淆
    const final = _h(sig + n + t.toString(36), 1);

    return {
        s: final,
        t,
        n,
        f,
        d
    };
}

// 导出便捷方法
export const sign = generateAdvancedSignature;
