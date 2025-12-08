'use server';

import { prisma } from '@/lib/prisma';
import { getUserId } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

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

export async function createCustomText(title: string, content: string): Promise<{ success: boolean; data?: CustomText; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        const text = await prisma.customText.create({
            data: {
                userId,
                title,
                content,
            },
        });

        revalidatePath('/settings');
        return { success: true, data: text };
    } catch (error) {
        console.error('Failed to create custom text:', error);
        return { success: false, error: 'Failed to create custom text' };
    }
}

export async function updateCustomText(id: string, title: string, content: string): Promise<{ success: boolean; data?: CustomText; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        const text = await prisma.customText.update({
            where: { id, userId },
            data: {
                title,
                content,
            },
        });

        revalidatePath('/settings');
        return { success: true, data: text };
    } catch (error) {
        console.error('Failed to update custom text:', error);
        return { success: false, error: 'Failed to update custom text' };
    }
}

export async function deleteCustomText(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        const userId = await getUserId();
        if (!userId) return { success: false, error: 'Unauthorized' };

        await prisma.customText.delete({
            where: { id, userId },
        });

        revalidatePath('/settings');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete custom text:', error);
        return { success: false, error: 'Failed to delete custom text' };
    }
}
