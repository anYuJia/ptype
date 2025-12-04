import { CodeLibrary, cleanCode } from './types';

/**
 * C 语言代码库
 */
export const cLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`#include <stdio.h>\n\nint main() {\n\tprintf("Hello, World!\n");\n\treturn 0;\n}`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`int a = 10;\nint b = 20;\nint sum = a + b;\nprintf("Sum: %d", sum);`),
            difficulty: 'easy',
            title: '基本运算',
            tags: ['基础'],
        },
        {
            code: cleanCode(`for (int i = 0; i < 10; i++) {\n\tprintf("%d ", i);\n}`),
            difficulty: 'easy',
            title: '循环',
            tags: ['循环'],
        },
    ],

    medium: [
        {
            code: cleanCode(`void swap(int *x, int *y) {\n\tint temp = *x;\n\t*x = *y;\n\t*y = temp;\n}`),
            difficulty: 'medium',
            title: '指针交换',
            tags: ['指针'],
        },
        {
            code: cleanCode(`struct Point {\n\tint x;\n\tint y;\n};\nstruct Point p1 = {10, 20};`),
            difficulty: 'medium',
            title: '结构体',
            tags: ['结构体'],
        },
        {
            code: cleanCode(`int arr[] = {1, 2, 3, 4, 5};\nint len = sizeof(arr) / sizeof(arr[0]);`),
            difficulty: 'medium',
            title: '数组长度',
            tags: ['数组'],
        },
    ],

    hard: [
        {
            code: cleanCode(`int *ptr = (int*)malloc(5 * sizeof(int));\nif (ptr != NULL) {\n\tfor (int i = 0; i < 5; ++i) {\n\t\tptr[i] = i + 1;\n\t}\n\tfree(ptr);\n}`),
            difficulty: 'hard',
            title: '动态内存分配',
            tags: ['内存管理'],
        },
        {
            code: cleanCode(`FILE *fp = fopen("file.txt", "w");\nif (fp != NULL) {\n\tfprintf(fp, "Hello file");\n\tfclose(fp);\n}`),
            difficulty: 'hard',
            title: '文件写入',
            tags: ['文件操作'],
        },
        {
            code: cleanCode(`#define MAX(x, y) ((x) > (y) ? (x) : (y))\nint m = MAX(10, 20);`),
            difficulty: 'hard',
            title: '宏定义',
            tags: ['预处理'],
        },
    ],
};
