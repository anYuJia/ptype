'use client';

import { useCallback } from 'react';
import { generateSignature, SignaturePayload } from './signature';

/**
 * React Hook 用于在组件中生成请求签名
 */
export function useSignature() {
    /**
     * 生成签名
     */
    const sign = useCallback(async (data?: unknown): Promise<SignaturePayload> => {
        let dataHash: string | undefined;

        if (data !== null && data !== undefined) {
            const dataString = JSON.stringify(data);
            const encoder = new TextEncoder();
            const dataBytes = encoder.encode(dataString);
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBytes);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            dataHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }

        return generateSignature(dataHash);
    }, []);

    /**
     * 包装一个 server action 调用，自动添加签名
     */
    const signedCall = useCallback(async <T, R>(
        action: (data: T, signature: SignaturePayload) => Promise<R>,
        data: T
    ): Promise<R> => {
        const signature = await sign(data);
        return action(data, signature);
    }, [sign]);

    return {
        sign,
        signedCall,
        generateSignature
    };
}

export type { SignaturePayload };
