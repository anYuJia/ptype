import { CodeLibrary, cleanCode } from './types';

/**
 * Rust 代码库
 */
export const rustLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`fn main() {\n\tprintln!("Hello, world!");\n}`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`fn add(a: i32, b: i32) -> i32 {\n\ta + b\n}`),
            difficulty: 'easy',
            title: '加法函数',
            tags: ['函数'],
        },
        {
            code: cleanCode(`let x = 5;\nlet y = x;\nprintln!("x = {}, y = {}", x, y);`),
            difficulty: 'easy',
            title: '变量绑定',
            tags: ['基础'],
        },
    ],

    medium: [
        {
            code: cleanCode(`struct User {\n\tusername: String,\n\temail: String,\n\tsign_in_count: u64,\n\tactive: bool,\n}`),
            difficulty: 'medium',
            title: '结构体定义',
            tags: ['结构体'],
        },
        {
            code: cleanCode(`enum Message {\n\tQuit,\n\tMove { x: i32, y: i32 },\n\tWrite(String),\n\tChangeColor(i32, i32, i32),\n}`),
            difficulty: 'medium',
            title: '枚举定义',
            tags: ['枚举'],
        },
        {
            code: cleanCode(`fn calculate_length(s: &String) -> usize {\n\ts.len()\n}`),
            difficulty: 'medium',
            title: '引用与借用',
            tags: ['所有权'],
        },
    ],

    hard: [
        {
            code: cleanCode(`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n\tif x.len() > y.len() {\n\t\tx\n\t} else {\n\t\ty\n\t}\n}`),
            difficulty: 'hard',
            title: '生命周期',
            tags: ['生命周期'],
        },
        {
            code: cleanCode(`pub trait Summary {\n\tfn summarize(&self) -> String;\n}\n\nimpl Summary for NewsArticle {\n\tfn summarize(&self) -> String {\n\t\tformat!("{}, by {} ({})", self.headline, self.author, self.location)\n\t}\n}`),
            difficulty: 'hard',
            title: 'Trait 实现',
            tags: ['Trait'],
        },
        {
            code: cleanCode(`use std::thread;\nuse std::time::Duration;\n\nfn main() {\n\tthread::spawn(|| {\n\t\tfor i in 1..10 {\n\t\t\tprintln!("hi number {} from the spawned thread!", i);\n\t\t\tthread::sleep(Duration::from_millis(1));\n\t\t}\n\t});\n}`),
            difficulty: 'hard',
            title: '并发编程',
            tags: ['并发'],
        },
    ],
};
