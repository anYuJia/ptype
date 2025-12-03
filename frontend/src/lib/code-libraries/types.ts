/**
 * 代码库类型定义
 */

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/**
 * 代码项接口
 */
export interface CodeItem {
    code: string;
    difficulty: DifficultyLevel;
    title?: string;          // 可选：题目标题
    description?: string;    // 可选：题目描述
    tags?: string[];         // 可选：标签（如：数组、哈希表、动态规划等）
    leetcodeId?: number;     // 可选：LeetCode 题号
}

/**
 * 代码库接口
 */
export interface CodeLibrary {
    easy: CodeItem[];
    medium: CodeItem[];
    hard: CodeItem[];
}

/**
 * 文本项接口（用于英文、中文文本）
 */
export interface TextItem {
    text: string;
    difficulty: DifficultyLevel;
    category?: string;       // 可选：分类（如：日常、技术、文学等）
}

/**
 * 文本库接口
 */
export interface TextLibrary {
    easy: TextItem[];
    medium: TextItem[];
    hard: TextItem[];
}

/**
 * 工具函数：移除空行并清理代码
 */
export function cleanCode(code: string): string {
    return code
        .split('\n')
        .filter(line => line.trim().length > 0)
        .join('\n')
        .trim();
}
