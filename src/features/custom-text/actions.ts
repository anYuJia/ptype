'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { verifyAdvancedSignature, type AdvancedSignaturePayload } from '@/lib/security/verifier';

export interface CustomText {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export async function getCustomTexts(): Promise<{ success: boolean; data?: CustomText[]; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        const texts = await prisma.customText.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
        });

        return { success: true, data: texts };
    } catch (error) {
        console.error('Failed to get custom texts:', error);
        return { success: false, error: 'Failed to fetch custom texts' };
    }
}

interface CreateCustomTextInput {
    title: string;
    content: string;
}

export async function createCustomText(
    input: CreateCustomTextInput,
    signature?: AdvancedSignaturePayload
): Promise<{ success: boolean; data?: CustomText; error?: string }> {
    try {
        // 签名验证
        const verification = await verifyAdvancedSignature(signature || null, input);
        if (!verification.valid) {
            return { success: false, error: 'Invalid request signature' };
        }

        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        const text = await prisma.customText.create({
            data: {
                userId,
                title: input.title,
                content: input.content,
            },
        });

        revalidatePath('/settings');
        return { success: true, data: text };
    } catch (error) {
        console.error('Failed to create custom text:', error);
        return { success: false, error: 'Failed to create custom text' };
    }
}

interface UpdateCustomTextInput {
    id: string;
    title: string;
    content: string;
}

export async function updateCustomText(
    input: UpdateCustomTextInput,
    signature?: AdvancedSignaturePayload
): Promise<{ success: boolean; data?: CustomText; error?: string }> {
    try {
        // 签名验证
        const verification = await verifyAdvancedSignature(signature || null, input);
        if (!verification.valid) {
            return { success: false, error: 'Invalid request signature' };
        }

        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        const text = await prisma.customText.update({
            where: { id: input.id, userId },
            data: {
                title: input.title,
                content: input.content,
            },
        });

        revalidatePath('/settings');
        return { success: true, data: text };
    } catch (error) {
        console.error('Failed to update custom text:', error);
        return { success: false, error: 'Failed to update custom text' };
    }
}

interface DeleteCustomTextInput {
    id: string;
}

export async function deleteCustomText(
    input: DeleteCustomTextInput,
    signature?: AdvancedSignaturePayload
): Promise<{ success: boolean; error?: string }> {
    try {
        // 签名验证
        const verification = await verifyAdvancedSignature(signature || null, input);
        if (!verification.valid) {
            return { success: false, error: 'Invalid request signature' };
        }

        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        await prisma.customText.delete({
            where: { id: input.id, userId },
        });

        revalidatePath('/settings');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete custom text:', error);
        return { success: false, error: 'Failed to delete custom text' };
    }
}

