import { CodeLibrary, cleanCode } from './types';

/**
 * TypeScript 代码库
 */
export const typescriptLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`function greet(name: string): void {\n\tconsole.log(\`Hello \${name}\`);\n}`),
            difficulty: 'easy',
            title: '基础函数',
            tags: ['基础', '类型注解'],
        },
        {
            code: cleanCode(`interface User {\n\tname: string;\n\tage: number;\n\temail?: string;\n}\nconst user: User = {\n\tname: "John",\n\tage: 30\n};`),
            difficulty: 'easy',
            title: '接口定义',
            tags: ['接口', '类型'],
        },
        {
            code: cleanCode(`function reverseString(s: string): string {\n\treturn s.split('').reverse().join('');\n}`),
            difficulty: 'easy',
            title: '反转字符串',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`const numbers: number[] = [1, 2, 3];\nconst names: Array<string> = ["Alice", "Bob"];`),
            difficulty: 'easy',
            title: '数组类型',
            tags: ['基础'],
        },
        {
            code: cleanCode(`enum Direction {\n\tUp,\n\tDown,\n\tLeft,\n\tRight\n}\nconst move: Direction = Direction.Up;`),
            difficulty: 'easy',
            title: '枚举',
            tags: ['基础'],
        },
    ],

    medium: [
        {
            code: cleanCode(`function binarySearch<T>(arr: T[], target: T): number {\n\tlet left = 0, right = arr.length - 1;\n\twhile (left <= right) {\n\t\tconst mid = Math.floor((left + right) / 2);\n\t\tif (arr[mid] === target) return mid;\n\t\tif (arr[mid] < target) left = mid + 1;\n\t\telse right = mid - 1;\n\t}\n\treturn -1;\n}`),
            difficulty: 'medium',
            title: '泛型二分查找',
            tags: ['数组', '二分查找', '泛型'],
        },
        {
            code: cleanCode(`type Result<T, E = Error> = \n\t| { ok: true; value: T }\n\t| { ok: false; error: E };\nfunction divide(a: number, b: number): Result<number> {\n\tif (b === 0) {\n\t\treturn { ok: false, error: new Error("Division by zero") };\n\t}\n\treturn { ok: true, value: a / b };\n}`),
            difficulty: 'medium',
            title: 'Result 类型模式',
            tags: ['类型', '错误处理'],
        },
        {
            code: cleanCode(`class EventEmitter<T extends Record<string, any>> {\n\tprivate events: Map<keyof T, Set<Function>> = new Map();\n\ton<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {\n\t\tif (!this.events.has(event)) {\n\t\t\tthis.events.set(event, new Set());\n\t\t}\n\t\tthis.events.get(event)!.add(handler);\n\t}\n\temit<K extends keyof T>(event: K, data: T[K]): void {\n\t\tthis.events.get(event)?.forEach(handler => handler(data));\n\t}\n}`),
            difficulty: 'medium',
            title: '类型安全的事件发射器',
            tags: ['类', '泛型', '事件'],
        },
        {
            code: cleanCode(`interface Lengthwise {\n\tlength: number;\n}\nfunction loggingIdentity<T extends Lengthwise>(arg: T): T {\n\tconsole.log(arg.length);\n\treturn arg;\n}`),
            difficulty: 'medium',
            title: '泛型约束',
            tags: ['泛型'],
        },
        {
            code: cleanCode(`interface Colorful {\n\tcolor: string;\n}\ninterface Circle {\n\tradius: number;\n}\ntype ColorfulCircle = Colorful & Circle;\nconst cc: ColorfulCircle = {\n\tcolor: "red",\n\tradius: 42\n};`),
            difficulty: 'medium',
            title: '交叉类型',
            tags: ['类型'],
        },
    ],

    hard: [
        {
            code: cleanCode(`type DeepReadonly<T> = {\n\treadonly [K in keyof T]: T[K] extends object\n\t\t? DeepReadonly<T[K]>\n\t\t: T[K];\n};\ntype DeepPartial<T> = {\n\t[K in keyof T]?: T[K] extends object\n\t\t? DeepPartial<T[K]>\n\t\t: T[K];\n};`),
            difficulty: 'hard',
            title: '递归类型工具',
            tags: ['高级类型', '递归'],
        },
        {
            code: cleanCode(`function memoize<T extends (...args: any[]) => any>(\n\tfn: T\n): T {\n\tconst cache = new Map<string, ReturnType<T>>();\n\treturn ((...args: Parameters<T>) => {\n\t\tconst key = JSON.stringify(args);\n\t\tif (cache.has(key)) return cache.get(key)!;\n\t\tconst result = fn(...args);\n\t\tcache.set(key, result);\n\t\treturn result;\n\t}) as T;\n}`),
            difficulty: 'hard',
            title: '类型安全的记忆化函数',
            tags: ['高阶函数', '泛型'],
        },
        {
            code: cleanCode(`type IsString<T> = T extends string ? true : false;\ntype A = IsString<string>; // true\ntype B = IsString<number>; // false`),
            difficulty: 'hard',
            title: '条件类型',
            tags: ['高级类型'],
        },
        {
            code: cleanCode(`type EventName<T extends string> = \`on\${Capitalize<T>}\`;\ntype ClickEvent = EventName<"click">; // "onClick"`),
            difficulty: 'hard',
            title: '模板字面量类型',
            tags: ['高级类型'],
        },
        {
            code: cleanCode(`type MyPick<T, K extends keyof T> = {\n\t[P in K]: T[P];\n};\ntype MyOmit<T, K extends keyof T> = {\n\t[P in Exclude<keyof T, K>]: T[P];\n};`),
            difficulty: 'hard',
            title: 'Pick 和 Omit 实现',
            tags: ['工具类型'],
        },
    ],
};
