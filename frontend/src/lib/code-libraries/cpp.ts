import { CodeLibrary, cleanCode } from './types';

/**
 * C++ 代码库
 */
export const cppLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`#include <iostream>\n\nint main() {\n\tstd::cout << "Hello World" << std::endl;\n\treturn 0;\n}`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`#include <iostream>\n\nint main() {\n\tint a, b;\n\tstd::cin >> a >> b;\n\tstd::cout << a + b << std::endl;\n\treturn 0;\n}`),
            difficulty: 'easy',
            title: '两数之和',
            tags: ['基础', '输入输出'],
        },
        {
            code: cleanCode(`int max(int a, int b) {\n\treturn a > b ? a : b;\n}`),
            difficulty: 'easy',
            title: '最大值函数',
            tags: ['函数'],
        },
    ],

    medium: [
        {
            code: cleanCode(`class Rectangle {\nprivate:\n\tint width, height;\npublic:\n\tRectangle(int w, int h) : width(w), height(h) {}\n\tint area() {\n\t\treturn width * height;\n\t}\n};`),
            difficulty: 'medium',
            title: '类定义',
            tags: ['面向对象'],
        },
        {
            code: cleanCode(`#include <vector>\n#include <algorithm>\n\nvoid sortVector(std::vector<int>& v) {\n\tstd::sort(v.begin(), v.end());\n}`),
            difficulty: 'medium',
            title: 'STL Vector 排序',
            tags: ['STL', '算法'],
        },
        {
            code: cleanCode(`void swap(int* a, int* b) {\n\tint temp = *a;\n\t*a = *b;\n\t*b = temp;\n}`),
            difficulty: 'medium',
            title: '指针交换',
            tags: ['指针'],
        },
    ],

    hard: [
        {
            code: cleanCode(`template <typename T>\nT add(T a, T b) {\n\treturn a + b;\n}`),
            difficulty: 'hard',
            title: '函数模板',
            tags: ['模板'],
        },
        {
            code: cleanCode(`#include <memory>\n\nclass Node {\npublic:\n\tint value;\n\tstd::shared_ptr<Node> next;\n\tNode(int v) : value(v) {}\n};`),
            difficulty: 'hard',
            title: '智能指针',
            tags: ['内存管理', 'C++11'],
        },
        {
            code: cleanCode(`#include <thread>\n#include <iostream>\n\nvoid task(int id) {\n\tstd::cout << "Thread " << id << " running" << std::endl;\n}\n\nint main() {\n\tstd::thread t1(task, 1);\n\tt1.join();\n\treturn 0;\n}`),
            difficulty: 'hard',
            title: '多线程',
            tags: ['并发', 'C++11'],
        },
    ],
};
