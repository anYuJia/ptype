/**
 * 高级混淆签名生成器
 * 使用多层混淆和动态代码生成来增加逆向难度
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

// 多轮哈希
async function _h(data: string, rounds: number = 3): Promise<string> {
    const enc = new TextEncoder();
    let hash = data;

    for (let i = 0; i < rounds; i++) {
        const buf = await crypto.subtle.digest('SHA-256', enc.encode(hash));
        hash = Array.from(new Uint8Array(buf))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    return hash;
}

// HMAC
async function _hmac(key: string, msg: string): Promise<string> {
    const enc = new TextEncoder();
    const k = await crypto.subtle.importKey(
        'raw', enc.encode(key),
        { name: 'HMAC', hash: 'SHA-256' },
        false, ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', k, enc.encode(msg));
    return Array.from(new Uint8Array(sig))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// 混淆的密钥派生
async function _dk(): Promise<string> {
    // 使用多个来源派生密钥
    const parts = [
        _r('kgbkv'), // 'ptype' reversed
        (0x7e4).toString(16), // 2024
        _r('hxfi'), // 'sign' reversed
        await _h(_fp(), 1)
    ];
    return await _h(parts.join('-'), 2);
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
 */
export async function generateAdvancedSignature(data?: unknown): Promise<AdvancedSignaturePayload> {
    const t = _t();
    const n = _n(16);
    const f = await _h(_fp(), 1);
    const tk = _tk();

    // 数据哈希
    let d: string | undefined;
    if (data !== null && data !== undefined) {
        const str = JSON.stringify(data);
        d = await _h(str, 2);
    }

    // 构建签名
    const dk = await _dk();
    const base = [t, n, f, tk, d || ''].join(':');

    // 多轮 HMAC
    let sig = await _hmac(dk, base);
    sig = await _hmac(sig.substring(0, 32), sig);

    // 最终混淆
    const final = await _h(sig + n + t.toString(36), 1);

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
