(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/ptype/frontend/src/lib/constants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 练习模式
__turbopack_context__.s([
    "CHARS_PER_WORD",
    ()=>CHARS_PER_WORD,
    "CHINESE_STYLE_LABELS",
    ()=>CHINESE_STYLE_LABELS,
    "CHINESE_STYLE_OPTIONS",
    ()=>CHINESE_STYLE_OPTIONS,
    "DEFAULT_CHINESE_STYLE",
    ()=>DEFAULT_CHINESE_STYLE,
    "DEFAULT_DIFFICULTY",
    ()=>DEFAULT_DIFFICULTY,
    "DEFAULT_DURATION",
    ()=>DEFAULT_DURATION,
    "DEFAULT_ENGLISH_OPTIONS",
    ()=>DEFAULT_ENGLISH_OPTIONS,
    "DEFAULT_MODE",
    ()=>DEFAULT_MODE,
    "DEFAULT_PROGRAMMING_LANGUAGE",
    ()=>DEFAULT_PROGRAMMING_LANGUAGE,
    "DIFFICULTY_OPTIONS",
    ()=>DIFFICULTY_OPTIONS,
    "DURATION_OPTIONS",
    ()=>DURATION_OPTIONS,
    "PROGRAMMING_LANGUAGE_LABELS",
    ()=>PROGRAMMING_LANGUAGE_LABELS,
    "PROGRAMMING_LANGUAGE_OPTIONS",
    ()=>PROGRAMMING_LANGUAGE_OPTIONS
]);
const DEFAULT_DURATION = 60; // 默认60秒
const DEFAULT_MODE = 'english';
const DEFAULT_DIFFICULTY = 'medium';
const DEFAULT_CHINESE_STYLE = 'modern';
const DEFAULT_PROGRAMMING_LANGUAGE = 'python';
const DEFAULT_ENGLISH_OPTIONS = {
    caseSensitive: false,
    ignorePunctuation: false
};
const DURATION_OPTIONS = [
    15,
    30,
    60,
    120
];
const DIFFICULTY_OPTIONS = [
    'easy',
    'medium',
    'hard'
];
const CHINESE_STYLE_OPTIONS = [
    'modern',
    'classical'
];
const PROGRAMMING_LANGUAGE_OPTIONS = [
    'python',
    'javascript',
    'typescript',
    'java',
    'cpp',
    'c',
    'go',
    'dart',
    'html',
    'css',
    'bash',
    'powershell'
];
const PROGRAMMING_LANGUAGE_LABELS = {
    python: 'Python',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    go: 'Go',
    dart: 'Dart',
    html: 'HTML',
    css: 'CSS',
    bash: 'Bash/Linux',
    powershell: 'PowerShell'
};
const CHINESE_STYLE_LABELS = {
    modern: '现代文',
    classical: '文言文'
};
const CHARS_PER_WORD = 5; // 标准：5个字符算1个单词
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/lib/utils/textGenerator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateText",
    ()=>generateText
]);
// ==================== 英文文本库 ====================
// 英文 - 简单
const englishTextsEasy = [
    "The cat sat on the mat and looked around.",
    "I like to eat pizza on Friday nights.",
    "The sun is bright and the sky is blue.",
    "She has a red car and a black bike.",
    "We go to the park every weekend.",
    "He reads books before going to bed.",
    "The dog runs fast in the garden.",
    "They play games after school ends.",
    "My room is clean and very tidy.",
    "The baby sleeps in the small crib."
];
// 英文 - 中等
const englishTextsMedium = [
    "The quick brown fox jumps over the lazy dog near the riverbank.",
    "Technology has changed the way we communicate with each other every single day.",
    "Learning a new language requires patience, practice, and dedication to succeed.",
    "The beautiful sunset painted the sky with shades of orange and purple tonight.",
    "She decided to pursue her dreams despite facing numerous challenges along the way.",
    "Reading books expands your knowledge and improves your vocabulary significantly over time.",
    "The coffee shop on the corner serves the best cappuccino in the entire neighborhood.",
    "Exercise regularly and eat healthy food to maintain a balanced lifestyle always.",
    "The mountains stood tall against the horizon as clouds drifted by slowly overhead.",
    "Music has the power to evoke emotions and create lasting memories for everyone."
];
// 英文 - 困难  
const englishTextsHard = [
    "There are two ways to write error-free programs; only the third one works consistently in practice.",
    "The peculiarity of the scientific method is precisely that it does not necessarily lead to certainty.",
    "Procrastination is the art of keeping up with yesterday and avoiding today until tomorrow arrives.",
    "In the midst of chaos, there is also opportunity for those who are prepared to seize it boldly.",
    "The fundamental cause of trouble is that the foolish are so certain while the wise are full of doubt.",
    "Excellence is not a destination but a continuous journey that requires persistent effort and dedication.",
    "The difference between ordinary and extraordinary is that little extra effort applied consistently over time.",
    "Innovation distinguishes between a leader and a follower in any competitive environment or marketplace.",
    "The only way to do great work is to love what you do passionately and pursue it relentlessly.",
    "Success is not final, failure is not fatal; it is the courage to continue that truly counts."
];
// ==================== 中文文本库 ====================
// 中文现代文 - 简单
const chineseModernEasy = [
    "今天天气很好，阳光明媚，我和朋友一起去公园散步。",
    "妈妈做的饭菜很好吃，我最喜欢吃她做的红烧肉。",
    "图书馆里很安静，大家都在认真地看书学习。",
    "小猫在阳台上晒太阳，看起来很舒服的样子。",
    "周末我喜欢在家里看电影，放松一下心情。",
    "这家咖啡店的环境很好，咖啡也很香醇。",
    "春天来了，公园里的花都开了，非常漂亮。",
    "他每天早上都会去跑步锻炼身体，风雨无阻。",
    "晚上的星空很美，星星一闪一闪地发着光。",
    "学习新知识需要耐心和毅力，不能半途而废。"
];
// 中文现代文 - 中等
const chineseModernMedium = [
    "生活就像一盒巧克力，你永远不知道下一颗是什么味道。每一天都充满了未知的惊喜和挑战，我们要学会珍惜当下，享受生活中的每一个美好瞬间。",
    "读书是一种很好的习惯，它能够让我们增长见识，开阔视野。通过阅读，我们可以了解不同的文化，体验不同的人生，让自己的思想变得更加丰富多彩。",
    "科技的发展改变了我们的生活方式，让我们的日常变得更加便捷。从智能手机到人工智能，科技创新不断地影响着我们的工作和生活，带来了前所未有的便利。",
    "友谊是人生中最宝贵的财富之一。真正的朋友会在你需要的时候陪伴在你身边，分享你的快乐，分担你的忧愁，让你的人生不再孤单。",
    "旅行可以让我们放松心情，开阔眼界。每到一个新的地方，我们都能体验不同的文化，品尝特色美食，结识新的朋友，获得难忘的回忆和宝贵的经历。"
];
// 中文现代文 - 困难
const chineseModernHard = [
    "时间是一条永不停息的河流，它无声无息地流淌着，带走了我们的青春，留下了岁月的痕迹。我们无法阻止时间的脚步，但可以选择如何度过每一天，让生命更加充实和有意义。在这个快节奏的社会里，我们需要学会慢下来，用心感受生活中的美好，珍惜与家人朋友相处的每一刻时光。",
    "教育的本质不仅仅是传授知识，更重要的是培养学生的思维能力和创新精神。一个优秀的教育体系应该注重学生的全面发展，不仅要让他们掌握必要的技能和知识，还要培养他们的批判性思维、创造力和解决问题的能力，使他们能够在未来的社会中立足并做出贡献。",
    "人工智能技术的飞速发展正在深刻地改变着我们的世界。从自动驾驶汽车到智能医疗诊断，从语音助手到机器翻译，人工智能正在各个领域展现出巨大的潜力。然而，我们也需要认真思考这项技术可能带来的伦理问题和社会影响，确保技术发展能够真正造福人类。"
];
// 中文文言文 - 简单
const chineseClassicalEasy = [
    "学而时习之，不亦说乎？有朋自远方来，不亦乐乎？",
    "三人行，必有我师焉。择其善者而从之，其不善者而改之。",
    "知之为知之，不知为不知，是知也。",
    "己所不欲，勿施于人。",
    "温故而知新，可以为师矣。",
    "学而不思则罔，思而不学则殆。",
    "敏而好学，不耻下问。",
    "知者不惑，仁者不忧，勇者不惧。",
    "君子坦荡荡，小人长戚戚。",
    "岁寒，然后知松柏之后凋也。"
];
// 中文文言文 - 中等  
const chineseClassicalMedium = [
    "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。",
    "故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，增益其所不能。",
    "鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。",
    "富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。",
    "生于忧患，死于安乐。故天将降大任于是人也，必先苦其心志。"
];
// 中文文言文 - 困难
const chineseClassicalHard = [
    "子曰：学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？有子曰：其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！",
    "大学之道，在明明德，在亲民，在止于至善。知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。物有本末，事有终始，知所先后，则近道矣。古之欲明明德于天下者，先治其国；欲治其国者，先齐其家。",
    "天下之至柔，驰骋天下之至坚。无有入无间，吾是以知无为之有益。不言之教，无为之益，天下希及之。名与身孰亲？身与货孰多？得与亡孰病？是故甚爱必大费，多藏必厚亡。知足不辱，知止不殆，可以长久。"
];
// ==================== 代码文本库 ====================
// Python - 简单
const pythonEasy = [
    `def hello_world():
    print("Hello, World!")
    return True`,
    `numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num * 2)`,
    `def add(a, b):
    return a + b

result = add(5, 3)
print(result)`
];
// Python - 中等
const pythonMedium = [
    `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old"`,
    `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

result = [fibonacci(i) for i in range(10)]
print(result)`
];
// Python - 困难
const pythonHard = [
    `from functools import wraps
from time import time

def timing_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        print(f'{func.__name__} took {end-start:.2f}s')
        return result
    return wrapper

@timing_decorator
async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()`
];
// JavaScript - 简单
const javascriptEasy = [
    `function greet(name) {
    console.log("Hello, " + name);
}

greet("World");`,
    `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`
];
// JavaScript - 中等
const javascriptMedium = [
    `const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};`,
    `class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(num) {
        this.result += num;
        return this;
    }
    
    multiply(num) {
        this.result *= num;
        return this;
    }
}`
];
// JavaScript - 困难
const javascriptHard = [
    `const createStore = (reducer) => {
    let state;
    let listeners = [];
    
    const getState = () => state;
    
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };
    
    return { getState, dispatch, subscribe };
};`
];
// Java - 简单
const javaEasy = [
    `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    `int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println(num * 2);
}`
];
// Java - 中等
const javaMedium = [
    `public class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String introduce() {
        return "Hi, I'm " + name + " and I'm " + age + " years old";
    }
}`
];
// Java - 困难
const javaHard = [
    `public class GenericRepository<T extends Entity> {
    private final Class<T> entityClass;
    
    public GenericRepository(Class<T> entityClass) {
        this.entityClass = entityClass;
    }
    
    public List<T> findAll() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<T> query = cb.createQuery(entityClass);
        Root<T> root = query.from(entityClass);
        return em.createQuery(query).getResultList();
    }
}`
];
// Go - 简单
const goEasy = [
    `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
    `func add(a, b int) int {
    return a + b
}

result := add(5, 3)
fmt.Println(result)`
];
// Go - 中等
const goMedium = [
    `type Person struct {
    Name string
    Age  int
}

func (p *Person) Introduce() string {
    return fmt.Sprintf("Hi, I'm %s and I'm %d years old", p.Name, p.Age)
}`,
    `func fetchData(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return ioutil.ReadAll(resp.Body)
}`
];
// Go - 困难
const goHard = [
    `func worker(id int, jobs <-chan int, results chan<- int) {
    for j := range jobs {
        fmt.Printf("worker %d processing job %d\\n", id, j)
        time.Sleep(time.Second)
        results <- j * 2
    }
}

func main() {
    jobs := make(chan int, 100)
    results := make(chan int, 100)
    
    for w := 1; w <= 3; w++ {
        go worker(w, jobs, results)
    }
}`
];
// C++ - 简单
const cppEasy = [
    `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    `int add(int a, int b) {
    return a + b;
}

int result = add(5, 3);
std::cout << result;`
];
// C++ - 中等
const cppMedium = [
    `class Person {
private:
    std::string name;
    int age;
    
public:
    Person(std::string n, int a) : name(n), age(a) {}
    
    std::string introduce() {
        return "Hi, I'm " + name;
    }
};`
];
// C++ - 困难
const cppHard = [
    `template<typename T>
class SmartPointer {
private:
    T* ptr;
    size_t* ref_count;
    
public:
    SmartPointer(T* p = nullptr) : ptr(p), ref_count(new size_t(1)) {}
    
    SmartPointer(const SmartPointer& other) {
        ptr = other.ptr;
        ref_count = other.ref_count;
        (*ref_count)++;
    }
    
    ~SmartPointer() {
        if (--(*ref_count) == 0) {
            delete ptr;
            delete ref_count;
        }
    }
};`
];
// HTML - 简单
const htmlEasy = [
    `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Welcome to my website.</p>
</body>
</html>`
];
// HTML - 中等
const htmlMedium = [
    `<div class="container">
    <header class="navbar">
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="content">
            <article>
                <h2>Article Title</h2>
                <p>Article content goes here...</p>
            </article>
        </section>
    </main>
</div>`
];
// CSS - 简单
const cssEasy = [
    `.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}`
];
// CSS - 中等
const cssMedium = [
    `.card {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}`
];
// Bash - 简单
const bashEasy = [
    `#!/bin/bash

echo "Hello, World!"
name="User"
echo "Welcome, $name"`
];
// Bash - 中等
const bashMedium = [
    `#!/bin/bash

for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing $file"
        cat "$file" | grep "pattern" > output.txt
    fi
done`
];
// PowerShell - 简单
const powershellEasy = [
    `Write-Host "Hello, World!"
$name = "User"
Write-Host "Welcome, $name"`
];
// PowerShell - 中等
const powershellMedium = [
    `Get-ChildItem -Path "C:\\Logs" -Filter "*.log" | 
    Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) } |
    ForEach-Object {
        Write-Host "Processing $($_.Name)"
        Get-Content $_.FullName | Select-String "ERROR"
    }`
];
// ==================== 文本池获取函数 ====================
function getTextPool(mode, difficulty, chineseStyle, programmingLanguage) {
    if (mode === 'english') {
        const pools = {
            easy: englishTextsEasy,
            medium: englishTextsMedium,
            hard: englishTextsHard
        };
        return pools[difficulty];
    }
    if (mode === 'chinese') {
        const style = chineseStyle || 'modern';
        const pools = {
            modern: {
                easy: chineseModernEasy,
                medium: chineseModernMedium,
                hard: chineseModernHard
            },
            classical: {
                easy: chineseClassicalEasy,
                medium: chineseClassicalMedium,
                hard: chineseClassicalHard
            }
        };
        return pools[style][difficulty];
    }
    if (mode === 'coder') {
        const lang = programmingLanguage || 'python';
        const codePools = {
            python: {
                easy: pythonEasy,
                medium: pythonMedium,
                hard: pythonHard
            },
            javascript: {
                easy: javascriptEasy,
                medium: javascriptMedium,
                hard: javascriptHard
            },
            typescript: {
                easy: javascriptEasy,
                medium: javascriptMedium,
                hard: javascriptHard
            },
            java: {
                easy: javaEasy,
                medium: javaMedium,
                hard: javaHard
            },
            go: {
                easy: goEasy,
                medium: goMedium,
                hard: goHard
            },
            cpp: {
                easy: cppEasy,
                medium: cppMedium,
                hard: cppHard
            },
            c: {
                easy: cppEasy,
                medium: cppMedium,
                hard: cppHard
            },
            dart: {
                easy: javascriptEasy,
                medium: javascriptMedium,
                hard: javascriptHard
            },
            html: {
                easy: htmlEasy,
                medium: htmlMedium,
                hard: htmlMedium
            },
            css: {
                easy: cssEasy,
                medium: cssMedium,
                hard: cssMedium
            },
            bash: {
                easy: bashEasy,
                medium: bashMedium,
                hard: bashMedium
            },
            powershell: {
                easy: powershellEasy,
                medium: powershellMedium,
                hard: powershellMedium
            }
        };
        return codePools[lang]?.[difficulty] || pythonEasy;
    }
    return englishTextsEasy;
}
// 随机打乱数组
function shuffleArray(array) {
    const newArray = [
        ...array
    ];
    for(let i = newArray.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [
            newArray[j],
            newArray[i]
        ];
    }
    return newArray;
}
function generateText(mode, difficulty, minLength = 200, chineseStyle, programmingLanguage) {
    const textPool = getTextPool(mode, difficulty, chineseStyle, programmingLanguage);
    const shuffled = shuffleArray(textPool);
    let result = '';
    let index = 0;
    while(result.length < minLength && index < shuffled.length){
        if (result.length > 0) {
            result += ' ';
        }
        result += shuffled[index];
        index++;
    }
    // 如果遍历完了还不够长，重新开始
    while(result.length < minLength){
        if (result.length > 0) {
            result += ' ';
        }
        result += shuffled[index % shuffled.length];
        index++;
    }
    return result.trim();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/utils/wpmCalculator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeTyping",
    ()=>analyzeTyping,
    "calculateAccuracy",
    ()=>calculateAccuracy,
    "calculateCPM",
    ()=>calculateCPM,
    "calculateLPM",
    ()=>calculateLPM,
    "calculateRawWPM",
    ()=>calculateRawWPM,
    "calculateWPM",
    ()=>calculateWPM,
    "normalizeSpecialChars",
    ()=>normalizeSpecialChars
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/lib/constants.ts [app-client] (ecmascript)");
;
function normalizeSpecialChars(text) {
    return text// 各种连字符 → 标准连字符
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-') // en-dash, em-dash, minus等 → hyphen
    // 各种引号 → 标准引号
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'") // 左右单引号 → 直单引号
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"') // 左右双引号 → 直双引号
    .replace(/[\u00AB\u00BB]/g, '"') // 书名号 → 双引号
    // 省略号 → 三个点
    .replace(/\u2026/g, '...') // … → ...
    // 各种空格 → 标准空格
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, ' ') // 不换行空格、各种宽度空格 → 普通空格
    // 其他特殊字符
    .replace(/\u00D7/g, 'x') // × → x (乘号)
    .replace(/\u00F7/g, '/') // ÷ → / (除号)
    .replace(/\u2022/g, '*') // • → * (项目符号)
    .replace(/\u2219/g, '*') // ∙ → * (bullet operator)
    ;
}
function calculateWPM(correctChars, elapsedSeconds) {
    if (elapsedSeconds <= 0) return 0;
    const minutes = elapsedSeconds / 60;
    const words = correctChars / __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARS_PER_WORD"];
    return Math.round(words / minutes);
}
function calculateRawWPM(totalChars, elapsedSeconds) {
    if (elapsedSeconds <= 0) return 0;
    const minutes = elapsedSeconds / 60;
    const words = totalChars / __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHARS_PER_WORD"];
    return Math.round(words / minutes);
}
function calculateAccuracy(correctChars, totalChars) {
    if (totalChars <= 0) return 100;
    return Math.round(correctChars / totalChars * 100);
}
function calculateCPM(correctChars, elapsedSeconds) {
    if (elapsedSeconds <= 0) return 0;
    const minutes = elapsedSeconds / 60;
    return Math.round(correctChars / minutes);
}
function calculateLPM(totalText, correctChars, elapsedSeconds) {
    if (elapsedSeconds <= 0) return 0;
    // 计算总行数
    const totalLines = totalText.split('\n').length;
    // 计算完成的比例
    const completionRate = correctChars / totalText.length;
    // 估算完成的行数
    const completedLines = totalLines * completionRate;
    const minutes = elapsedSeconds / 60;
    return Math.round(completedLines / minutes);
}
function analyzeTyping(targetText, typedText) {
    // 1. 特殊字符标准化 - 确保符号正确匹配
    let normalizedTarget = normalizeSpecialChars(targetText);
    let normalizedTyped = normalizeSpecialChars(typedText);
    // 2. Unicode 标准化 - 确保中文字符比较正确
    normalizedTarget = normalizedTarget.normalize('NFC');
    normalizedTyped = normalizedTyped.normalize('NFC');
    let correctChars = 0;
    let errors = 0;
    for(let i = 0; i < normalizedTyped.length; i++){
        if (i < normalizedTarget.length && normalizedTyped[i] === normalizedTarget[i]) {
            correctChars++;
        } else {
            errors++;
        }
    }
    return {
        correctChars,
        errors,
        totalTyped: normalizedTyped.length
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/store/typingStore.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTypingStore",
    ()=>useTypingStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/lib/constants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$utils$2f$textGenerator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/lib/utils/textGenerator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/utils/wpmCalculator.ts [app-client] (ecmascript)");
;
;
;
;
/**
 * 处理目标文本（根据英文选项）
 */ function processTargetText(text, mode, options) {
    if (mode !== 'english') return text;
    let processed = text;
    // 忽略标点符号：直接从文本中移除
    if (options.ignorePunctuation) {
        processed = processed.replace(/[.,!?;:'"-]/g, '');
    }
    // 不区分大小写：转换为小写
    if (!options.caseSensitive) {
        processed = processed.toLowerCase();
    }
    return processed;
}
const useTypingStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        // 初始状态
        status: 'idle',
        targetText: '',
        displayText: '',
        typedText: '',
        correctChars: 0,
        errors: 0,
        wpm: 0,
        cpm: 0,
        lpm: 0,
        accuracy: 100,
        timeLeft: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DURATION"],
        startTime: null,
        wpmHistory: [],
        settings: {
            duration: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DURATION"],
            mode: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MODE"],
            difficulty: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_DIFFICULTY"],
            chineseStyle: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_CHINESE_STYLE"],
            programmingLanguage: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PROGRAMMING_LANGUAGE"],
            englishOptions: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_ENGLISH_OPTIONS"]
        },
        // 初始化测试（生成新文本）
        initTest: ()=>{
            const { settings } = get();
            const rawText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$utils$2f$textGenerator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateText"])(settings.mode, settings.difficulty, 500, settings.chineseStyle, settings.programmingLanguage);
            const displayText = processTargetText(rawText, settings.mode, settings.englishOptions);
            set({
                status: 'idle',
                targetText: rawText,
                displayText,
                typedText: '',
                correctChars: 0,
                errors: 0,
                wpm: 0,
                accuracy: 100,
                timeLeft: settings.duration,
                startTime: null,
                wpmHistory: []
            });
        },
        // 开始测试
        startTest: ()=>{
            set({
                status: 'running',
                startTime: Date.now()
            });
        },
        // 处理输入
        handleInput: (char)=>{
            const { status, displayText, typedText } = get();
            // 如果是 idle 状态，先开始测试
            if (status === 'idle') {
                get().startTest();
            }
            if (status === 'finished') return;
            // 如果已经输入完所有目标文本，忽略新输入
            if (typedText.length >= displayText.length) return;
            // 直接添加输入字符（不做任何转换，因为displayText已经预处理过了）
            const newTypedText = typedText + char;
            const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTyping"])(displayText, newTypedText);
            set({
                typedText: newTypedText,
                correctChars: analysis.correctChars,
                errors: analysis.errors,
                accuracy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAccuracy"])(analysis.correctChars, analysis.totalTyped)
            });
            // 检查是否完成所有文本
            if (newTypedText.length >= displayText.length) {
                get().finishTest();
            }
        },
        // 处理退格
        handleBackspace: ()=>{
            const { status, typedText, displayText } = get();
            if (status === 'finished' || typedText.length === 0) return;
            const newTypedText = typedText.slice(0, -1);
            const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTyping"])(displayText, newTypedText);
            set({
                typedText: newTypedText,
                correctChars: analysis.correctChars,
                errors: analysis.errors,
                accuracy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateAccuracy"])(analysis.correctChars, analysis.totalTyped)
            });
        },
        // 每秒计时器更新
        tick: ()=>{
            const { status, timeLeft, settings, startTime, correctChars, targetText } = get();
            if (status !== 'running') return;
            const newTimeLeft = timeLeft - 1;
            // 每秒更新所有速度指标
            const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0;
            const currentAccuracy = get().accuracy;
            // 计算 WPM (仅英文模式)
            const currentWpm = settings.mode === 'english' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateWPM"])(correctChars, elapsedSeconds) : 0;
            // 计算 CPM (所有模式)
            const currentCpm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCPM"])(correctChars, elapsedSeconds);
            // 计算 LPM (仅代码模式)
            const currentLpm = settings.mode === 'coder' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateLPM"])(targetText, correctChars, elapsedSeconds) : 0;
            // 记录速度历史（根据模式使用不同的值）
            // 英文模式用WPM，中文模式用CPM，代码模式用LPM
            const speedValue = settings.mode === 'english' ? currentWpm : settings.mode === 'chinese' ? currentCpm : currentLpm;
            const wpmHistory = [
                ...get().wpmHistory,
                {
                    time: Math.floor(elapsedSeconds),
                    wpm: speedValue,
                    accuracy: currentAccuracy
                }
            ];
            if (newTimeLeft <= 0) {
                set({
                    timeLeft: 0,
                    wpm: currentWpm,
                    cpm: currentCpm,
                    lpm: currentLpm,
                    wpmHistory
                });
                get().finishTest();
            } else {
                set({
                    timeLeft: newTimeLeft,
                    wpm: currentWpm,
                    cpm: currentCpm,
                    lpm: currentLpm,
                    wpmHistory
                });
            }
        },
        // 完成测试
        finishTest: ()=>{
            set({
                status: 'finished'
            });
        },
        // 重置测试
        resetTest: ()=>{
            get().initTest();
        },
        // 更新设置
        updateSettings: (newSettings)=>{
            const { settings, targetText } = get();
            const updatedSettings = {
                ...settings,
                ...newSettings
            };
            set({
                settings: updatedSettings
            });
            // 如果更改了模式、难度、文体或语言，重新生成文本
            if (newSettings.mode && newSettings.mode !== settings.mode || newSettings.difficulty && newSettings.difficulty !== settings.difficulty || newSettings.chineseStyle && newSettings.chineseStyle !== settings.chineseStyle || newSettings.programmingLanguage && newSettings.programmingLanguage !== settings.programmingLanguage) {
                get().initTest();
            } else if (newSettings.englishOptions && settings.mode === 'english') {
                // 如果只是英文选项改变，重新处理文本
                const displayText = processTargetText(targetText, settings.mode, updatedSettings.englishOptions);
                set({
                    displayText,
                    typedText: '',
                    correctChars: 0,
                    errors: 0,
                    accuracy: 100
                });
            } else if (newSettings.duration) {
                set({
                    timeLeft: newSettings.duration
                });
            }
        }
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/hooks/useTypingEngine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTypingEngine",
    ()=>useTypingEngine
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$store$2f$typingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/store/typingStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function useTypingEngine() {
    _s();
    const { status, targetText, displayText, typedText, wpm, cpm, lpm, accuracy, timeLeft, errors, correctChars, wpmHistory, settings, initTest, handleInput, handleBackspace, tick, resetTest, updateSettings } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$store$2f$typingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTypingStore"])();
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isComposingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const inputValueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    // 初始化测试
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTypingEngine.useEffect": ()=>{
            if (!targetText) {
                initTest();
            }
        }
    }["useTypingEngine.useEffect"], [
        targetText,
        initTest
    ]);
    // 计时器逻辑
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTypingEngine.useEffect": ()=>{
            if (status === 'running') {
                timerRef.current = setInterval({
                    "useTypingEngine.useEffect": ()=>{
                        tick();
                    }
                }["useTypingEngine.useEffect"], 1000);
            }
            return ({
                "useTypingEngine.useEffect": ()=>{
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                }
            })["useTypingEngine.useEffect"];
        }
    }["useTypingEngine.useEffect"], [
        status,
        tick
    ]);
    // 重新开始测试
    const restart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[restart]": ()=>{
            resetTest();
            inputValueRef.current = '';
        }
    }["useTypingEngine.useCallback[restart]"], [
        resetTest
    ]);
    // 更新设置
    const setDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[setDuration]": (duration)=>{
            updateSettings({
                duration
            });
        }
    }["useTypingEngine.useCallback[setDuration]"], [
        updateSettings
    ]);
    const setMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[setMode]": (mode)=>{
            updateSettings({
                mode
            });
        }
    }["useTypingEngine.useCallback[setMode]"], [
        updateSettings
    ]);
    const setDifficulty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[setDifficulty]": (difficulty)=>{
            updateSettings({
                difficulty
            });
        }
    }["useTypingEngine.useCallback[setDifficulty]"], [
        updateSettings
    ]);
    const setEnglishOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[setEnglishOptions]": (englishOptions)=>{
            updateSettings({
                englishOptions
            });
        }
    }["useTypingEngine.useCallback[setEnglishOptions]"], [
        updateSettings
    ]);
    const setChineseStyle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[setChineseStyle]": (chineseStyle)=>{
            updateSettings({
                chineseStyle
            });
        }
    }["useTypingEngine.useCallback[setChineseStyle]"], [
        updateSettings
    ]);
    const setProgrammingLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[setProgrammingLanguage]": (programmingLanguage)=>{
            updateSettings({
                programmingLanguage
            });
        }
    }["useTypingEngine.useCallback[setProgrammingLanguage]"], [
        updateSettings
    ]);
    // Input change handler - 处理输入法确认后的输入
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[handleInputChange]": (e)=>{
            // 如果正在使用输入法，不处理 - 等待 compositionEnd
            if (isComposingRef.current) {
                return;
            }
            if (status === 'finished') return;
            const newValue = e.target.value;
            const oldValue = inputValueRef.current;
            // 计算新增的字符
            if (newValue.length > oldValue.length) {
                const newChars = newValue.slice(oldValue.length);
                // 逐个字符添加
                for (const char of newChars){
                    handleInput(char);
                }
            } else if (newValue.length < oldValue.length) {
                // 处理删除
                const deleteCount = oldValue.length - newValue.length;
                for(let i = 0; i < deleteCount; i++){
                    handleBackspace();
                }
            }
            inputValueRef.current = newValue;
            // 清空input以准备下一次输入
            e.target.value = '';
            inputValueRef.current = '';
        }
    }["useTypingEngine.useCallback[handleInputChange]"], [
        status,
        handleInput,
        handleBackspace
    ]);
    // Composition event handlers
    const handleCompositionStart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[handleCompositionStart]": ()=>{
            isComposingRef.current = true;
        }
    }["useTypingEngine.useCallback[handleCompositionStart]"], []);
    const handleCompositionEnd = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[handleCompositionEnd]": (e)=>{
            isComposingRef.current = false;
            if (status === 'finished') return;
            // 获取确认的文本（中文字符）
            const data = e.data;
            if (data) {
                // 逐个字符添加
                for (const char of data){
                    handleInput(char);
                }
            }
            // 清空input
            const target = e.target;
            target.value = '';
            inputValueRef.current = '';
        }
    }["useTypingEngine.useCallback[handleCompositionEnd]"], [
        status,
        handleInput
    ]);
    // KeyDown handler - 处理特殊键
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTypingEngine.useCallback[handleKeyDown]": (e)=>{
            // 忽略输入法激活时的按键
            if (isComposingRef.current) return;
            if (status === 'finished') return;
            // 处理 Backspace
            if (e.key === 'Backspace') {
                e.preventDefault();
                handleBackspace();
                const target = e.target;
                target.value = '';
                inputValueRef.current = '';
                return;
            }
            // 处理 Enter 换行（程序员模式）
            if (e.key === 'Enter' && settings.mode === 'coder') {
                e.preventDefault();
                handleInput('\n');
                const target = e.target;
                target.value = '';
                inputValueRef.current = '';
                return;
            }
        }
    }["useTypingEngine.useCallback[handleKeyDown]"], [
        status,
        settings.mode,
        handleBackspace,
        handleInput
    ]);
    return {
        // 状态
        status,
        targetText,
        displayText,
        typedText,
        wpm,
        cpm,
        lpm,
        accuracy,
        timeLeft,
        errors,
        correctChars,
        wpmHistory,
        settings,
        // 方法
        restart,
        setDuration,
        setMode,
        setDifficulty,
        setEnglishOptions,
        setChineseStyle,
        setProgrammingLanguage,
        // Input 事件处理器
        inputHandlers: {
            onChange: handleInputChange,
            onCompositionStart: handleCompositionStart,
            onCompositionEnd: handleCompositionEnd,
            onKeyDown: handleKeyDown
        }
    };
}
_s(useTypingEngine, "6zR6u0W5rTWMXH4oDr4XLmiG9Dk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$store$2f$typingStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTypingStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextDisplay",
    ()=>TextDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/utils/wpmCalculator.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// 单个字符组件
const Character = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(function Character({ char, status, index }) {
    const baseClass = 'inline-block transition-colors duration-100';
    const statusClasses = {
        pending: 'text-gray-500',
        correct: 'text-emerald-400',
        incorrect: 'text-red-400',
        current: 'text-white bg-teal-500/30 border-b-2 border-teal-400'
    };
    // 处理空格和换行显示
    let displayChar = char;
    if (char === ' ') displayChar = '\u00A0';
    if (char === '\n') displayChar = '↵'; // 程序员模式显示换行符
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
        className: `${baseClass} ${statusClasses[status]}`,
        initial: status === 'correct' ? {
            scale: 1.1
        } : false,
        animate: {
            scale: 1
        },
        transition: {
            duration: 0.1
        },
        children: displayChar
    }, void 0, false, {
        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
});
_c = Character;
function TextDisplay({ targetText, displayText, typedText, status, mode, inputRef, inputHandlers }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cursorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 自动聚焦并定位input
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextDisplay.useEffect": ()=>{
            if (inputRef.current && status !== 'finished') {
                inputRef.current.focus();
            }
        }
    }["TextDisplay.useEffect"], [
        status,
        inputRef
    ]);
    // 计算每个字符的状态 - 使用 displayText 进行比较
    const characters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TextDisplay.useMemo[characters]": ()=>{
            // 1. 特殊字符标准化 - 确保符号正确匹配
            let normalizedDisplay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeSpecialChars"])(displayText);
            let normalizedTyped = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$utils$2f$wpmCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeSpecialChars"])(typedText);
            // 2. Unicode 标准化 - 确保中文字符比较正确
            normalizedDisplay = normalizedDisplay.normalize('NFC');
            normalizedTyped = normalizedTyped.normalize('NFC');
            return normalizedDisplay.split('').map({
                "TextDisplay.useMemo[characters]": (char, index)=>{
                    let charStatus;
                    if (index < normalizedTyped.length) {
                        // 已输入的字符
                        charStatus = normalizedTyped[index] === char ? 'correct' : 'incorrect';
                    } else if (index === normalizedTyped.length && status !== 'finished') {
                        // 当前待输入的字符
                        charStatus = 'current';
                    } else {
                        // 未输入的字符
                        charStatus = 'pending';
                    }
                    return {
                        char,
                        status: charStatus,
                        index
                    };
                }
            }["TextDisplay.useMemo[characters]"]);
        }
    }["TextDisplay.useMemo[characters]"], [
        displayText,
        typedText,
        status
    ]);
    // 计算当前应该显示的两行内容（优化版：真正的两行滚动）
    const displayLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TextDisplay.useMemo[displayLines]": ()=>{
            if (mode === 'coder') {
                // 程序员模式：显示两行代码 - 使用 displayText
                const lines = displayText.split('\n');
                let charCount = 0;
                let currentLineIndex = 0;
                // 找到当前输入位置所在的行
                for(let i = 0; i < lines.length; i++){
                    const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0); // +1 for \n
                    if (charCount + lineLength > typedText.length) {
                        currentLineIndex = i;
                        break;
                    }
                    charCount += lineLength;
                }
                // 显示当前行和下一行
                const line1 = lines[currentLineIndex] || '';
                const line2 = lines[currentLineIndex + 1] || '';
                let line1Start = 0;
                for(let i = 0; i < currentLineIndex; i++){
                    line1Start += lines[i].length + 1; // +1 for \n
                }
                return {
                    line1,
                    line2,
                    line1Start,
                    line2Start: line1Start + line1.length + (line2 ? 1 : 0)
                };
            } else {
                // 英文和中文模式：两行滚动显示，单词不截断 - 使用 displayText
                const words = mode === 'english' ? displayText.split(' ') : displayText.split('');
                const separator = mode === 'english' ? ' ' : '';
                const maxCharsPerLine = mode === 'english' ? 55 : 35;
                // 将所有单词分成多行（每行不超过最大字符数）
                const allLines = [];
                let currentLine = [];
                let currentLineLength = 0;
                let charIndex = 0;
                for(let i = 0; i < words.length; i++){
                    const word = words[i];
                    const wordWithSeparator = word + (mode === 'english' && i < words.length - 1 ? ' ' : '');
                    const wordLength = wordWithSeparator.length;
                    // 检查是否需要换行
                    if (currentLine.length > 0 && currentLineLength + wordLength > maxCharsPerLine) {
                        // 保存当前行
                        const lineStartIndex = charIndex - currentLineLength;
                        allLines.push({
                            text: currentLine.join(separator),
                            startIndex: lineStartIndex
                        });
                        // 开始新行
                        currentLine = [
                            word
                        ];
                        currentLineLength = wordLength;
                    } else {
                        // 继续当前行
                        currentLine.push(word);
                        currentLineLength += wordLength;
                    }
                    charIndex += wordLength;
                }
                // 添加最后一行
                if (currentLine.length > 0) {
                    const lineStartIndex = charIndex - currentLineLength;
                    allLines.push({
                        text: currentLine.join(separator),
                        startIndex: lineStartIndex
                    });
                }
                // 找到当前输入位置所在的行
                let currentLineIndex = 0;
                for(let i = 0; i < allLines.length; i++){
                    const line = allLines[i];
                    const lineEndIndex = line.startIndex + line.text.length + (mode === 'english' && i < allLines.length - 1 ? 1 : 0);
                    if (typedText.length < lineEndIndex) {
                        currentLineIndex = i;
                        break;
                    }
                }
                // 返回当前行和下一行
                const line1 = allLines[currentLineIndex] || {
                    text: '',
                    startIndex: 0
                };
                const line2 = allLines[currentLineIndex + 1] || {
                    text: '',
                    startIndex: line1.startIndex + line1.text.length + (mode === 'english' ? 1 : 0)
                };
                return {
                    line1: line1.text,
                    line2: line2.text,
                    line1Start: line1.startIndex,
                    line2Start: line2.startIndex
                };
            }
        }
    }["TextDisplay.useMemo[displayLines]"], [
        displayText,
        typedText,
        mode
    ]);
    // 为两行中的每个字符添加状态
    const renderLine = (lineText, startOffset)=>{
        return lineText.split('').map((char, i)=>{
            const globalIndex = startOffset + i;
            const charData = characters[globalIndex];
            if (!charData) return null;
            // 如果是当前字符，添加ref用于定位input
            const isCurrent = charData.status === 'current';
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                ref: isCurrent ? cursorRef : null,
                className: "relative inline-block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Character, {
                    char: char,
                    status: charData.status,
                    index: globalIndex
                }, void 0, false, {
                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                    lineNumber: 216,
                    columnNumber: 11
                }, this)
            }, globalIndex, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                lineNumber: 215,
                columnNumber: 9
            }, this);
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        children: [
            status === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "absolute -top-8 left-0 text-sm text-gray-400",
                initial: {
                    opacity: 0,
                    y: 10
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.3
                },
                children: "开始输入以开始测试..."
            }, void 0, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                lineNumber: 230,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "text",
                className: "absolute opacity-0 pointer-events-auto caret-transparent",
                style: {
                    position: 'absolute',
                    left: cursorRef.current?.offsetLeft || 0,
                    top: cursorRef.current?.offsetTop || 0,
                    width: '1px',
                    height: '1em',
                    zIndex: 10
                },
                autoComplete: "off",
                autoCorrect: "off",
                autoCapitalize: "off",
                spellCheck: "false",
                ...inputHandlers
            }, void 0, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: `
          relative
          font-mono leading-relaxed
          p-6 rounded-xl
          bg-gray-900/50 backdrop-blur-sm
          border border-gray-800
          select-none
          ${mode === 'coder' ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'}
        `,
                onClick: ()=>inputRef.current?.focus(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[2.5rem] mb-2",
                        children: renderLine(displayLines.line1, displayLines.line1Start)
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-h-[2.5rem] text-gray-500",
                        children: renderLine(displayLines.line2, displayLines.line2Start)
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                        lineNumber: 280,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 text-xs text-gray-600 text-center",
                children: [
                    mode === 'coder' && '程序员模式：每行是一行代码',
                    mode === 'english' && '英文模式：单词不会被截断',
                    mode === 'chinese' && '中文模式'
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
                lineNumber: 286,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
_s(TextDisplay, "g54ibJP0PcXOQqUfca82t+FETUk=");
_c1 = TextDisplay;
var _c, _c1;
__turbopack_context__.k.register(_c, "Character");
__turbopack_context__.k.register(_c1, "TextDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatsDisplay",
    ()=>StatsDisplay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function StatsDisplay({ mode, wpm, cpm, lpm, accuracy, timeLeft, status }) {
    // 根据模式决定显示哪些指标
    const getSpeedStats = ()=>{
        switch(mode){
            case 'english':
                // 英文：显示 WPM 和 CPM
                return [
                    {
                        value: wpm,
                        label: 'WPM',
                        sublabel: '单词/分钟'
                    },
                    {
                        value: cpm,
                        label: 'CPM',
                        sublabel: '字符/分钟'
                    }
                ];
            case 'chinese':
                // 中文：只显示 CPM
                return [
                    {
                        value: cpm,
                        label: 'CPM',
                        sublabel: '字符/分钟'
                    }
                ];
            case 'coder':
                // 代码：显示 LPM 和 CPM
                return [
                    {
                        value: lpm,
                        label: 'LPM',
                        sublabel: '行/分钟'
                    },
                    {
                        value: cpm,
                        label: 'CPM',
                        sublabel: '字符/分钟'
                    }
                ];
            default:
                return [
                    {
                        value: wpm,
                        label: 'WPM',
                        sublabel: '单词/分钟'
                    }
                ];
        }
    };
    const speedStats = getSpeedStats();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-center gap-6 md:gap-12",
        children: [
            speedStats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "text-4xl md:text-6xl font-extrabold text-teal-400 tracking-tighter tabular-nums",
                            initial: {
                                scale: 1.1,
                                opacity: 0.5
                            },
                            animate: {
                                scale: 1,
                                opacity: 1
                            },
                            transition: {
                                duration: 0.15
                            },
                            children: stat.value
                        }, stat.value, false, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                            lineNumber: 49,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-400 mt-1",
                            children: stat.label
                        }, void 0, false, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-gray-500",
                            children: stat.sublabel
                        }, void 0, false, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    ]
                }, stat.label, true, {
                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: `text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${timeLeft <= 10 && status === 'running' ? 'text-red-400' : 'text-white'}`,
                        initial: timeLeft <= 10 ? {
                            scale: 1.1
                        } : false,
                        animate: {
                            scale: 1
                        },
                        transition: {
                            duration: 0.1
                        },
                        children: timeLeft
                    }, timeLeft, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400 mt-1",
                        children: "SEC"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500",
                        children: "秒"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: `text-4xl md:text-6xl font-extrabold tracking-tighter tabular-nums ${accuracy < 90 ? 'text-yellow-400' : 'text-emerald-400'}`,
                        initial: {
                            scale: 1.05
                        },
                        animate: {
                            scale: 1
                        },
                        transition: {
                            duration: 0.15
                        },
                        children: accuracy
                    }, accuracy, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-400 mt-1",
                        children: "ACC%"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-gray-500",
                        children: "准确率"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = StatsDisplay;
var _c;
__turbopack_context__.k.register(_c, "StatsDisplay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
'use client';
;
;
function Button({ variant = 'primary', size = 'md', children, className = '', ...props }) {
    const baseClass = `
    inline-flex items-center justify-center
    font-medium rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
    const variantClasses = {
        primary: 'bg-teal-500 hover:bg-teal-400 text-white focus:ring-teal-500',
        secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500',
        ghost: 'bg-transparent hover:bg-gray-800 text-gray-300 focus:ring-gray-500'
    };
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
        className: `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`,
        whileHover: {
            scale: 1.02
        },
        whileTap: {
            scale: 0.98
        },
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/code/ptype/frontend/src/components/ui/Button.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WpmChart",
    ()=>WpmChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
'use client';
;
;
function WpmChart({ data }) {
    if (data.length < 2) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-48 flex items-center justify-center text-gray-500",
            children: "Not enough data to display chart"
        }, void 0, false, {
            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-48 w-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
            width: "100%",
            height: "100%",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                data: data,
                margin: {
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "wpmGradient",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "5%",
                                    stopColor: "#14b8a6",
                                    stopOpacity: 0.3
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "95%",
                                    stopColor: "#14b8a6",
                                    stopOpacity: 0
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                        strokeDasharray: "3 3",
                        stroke: "#374151"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                        dataKey: "time",
                        stroke: "#6b7280",
                        fontSize: 12,
                        tickFormatter: (value)=>`${value}s`
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                        stroke: "#6b7280",
                        fontSize: 12
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                        contentStyle: {
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                        },
                        labelFormatter: (value)=>`Time: ${value}s`,
                        formatter: (value, name)=>[
                                value,
                                name === 'wpm' ? 'WPM' : 'Accuracy %'
                            ]
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                        type: "monotone",
                        dataKey: "wpm",
                        stroke: "#14b8a6",
                        strokeWidth: 2,
                        fill: "url(#wpmGradient)"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                        lineNumber: 60,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
                lineNumber: 32,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = WpmChart;
var _c;
__turbopack_context__.k.register(_c, "WpmChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ResultsCard",
    ()=>ResultsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$WpmChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/components/WpmChart.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function ResultsCard({ mode, wpm, cpm, lpm, accuracy, correctChars, errors, wpmHistory, duration, onRestart }) {
    // 根据模式决定显示哪些速度指标
    const getSpeedStats = ()=>{
        switch(mode){
            case 'english':
                return [
                    {
                        value: wpm,
                        label: 'WPM',
                        sublabel: '单词/分钟',
                        color: 'text-teal-400'
                    },
                    {
                        value: cpm,
                        label: 'CPM',
                        sublabel: '字符/分钟',
                        color: 'text-cyan-400'
                    }
                ];
            case 'chinese':
                return [
                    {
                        value: cpm,
                        label: 'CPM',
                        sublabel: '字符/分钟',
                        color: 'text-teal-400'
                    }
                ];
            case 'coder':
                return [
                    {
                        value: lpm,
                        label: 'LPM',
                        sublabel: '行/分钟',
                        color: 'text-teal-400'
                    },
                    {
                        value: cpm,
                        label: 'CPM',
                        sublabel: '字符/分钟',
                        color: 'text-cyan-400'
                    }
                ];
            default:
                return [
                    {
                        value: wpm,
                        label: 'WPM',
                        sublabel: '单词/分钟',
                        color: 'text-teal-400'
                    }
                ];
        }
    };
    const speedStats = getSpeedStats();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        className: " bg-gray-900/80 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 shadow-2xl shadow-teal-500/10 max-w-2xl mx-auto ",
        initial: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        transition: {
            type: 'spring',
            duration: 0.5,
            bounce: 0.3
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                className: "text-3xl font-bold text-center text-white mb-8",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.2
                },
                children: "测试完成！"
            }, void 0, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-8 md:gap-12 mb-8 flex-wrap",
                children: [
                    speedStats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "text-center",
                            initial: {
                                opacity: 0,
                                y: 20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: 0.3 + index * 0.1
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-5xl md:text-6xl font-extrabold ${stat.color} tabular-nums`,
                                    children: stat.value
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm text-gray-400 mt-1",
                                    children: stat.label
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-500",
                                    children: stat.sublabel
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                    lineNumber: 93,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, stat.label, true, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-center",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.3 + speedStats.length * 0.1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl md:text-6xl font-extrabold text-emerald-400 tabular-nums",
                                children: [
                                    accuracy,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-400 mt-1",
                                children: "ACC%"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500",
                                children: "准确率"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "text-center",
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: 0.4 + speedStats.length * 0.1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-5xl md:text-6xl font-extrabold text-red-400 tabular-nums",
                                children: errors
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-400 mt-1",
                                children: "Errors"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-500",
                                children: "错误"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "mb-8",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.7
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm text-gray-400 mb-4",
                        children: mode === 'english' ? 'WPM 变化曲线' : mode === 'coder' ? 'LPM 变化曲线' : 'CPM 变化曲线'
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$WpmChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WpmChart"], {
                        data: wpmHistory
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex justify-center",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.8
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    size: "lg",
                    onClick: onRestart,
                    children: "再来一次"
                }, void 0, false, {
                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                    lineNumber: 142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                className: "text-center text-gray-500 text-sm mt-4",
                initial: {
                    opacity: 0
                },
                animate: {
                    opacity: 1
                },
                transition: {
                    delay: 0.9
                },
                children: [
                    "按 ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "px-2 py-1 bg-gray-800 rounded text-gray-300",
                        children: "Tab"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this),
                    " +",
                    ' ',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                        className: "px-2 py-1 bg-gray-800 rounded text-gray-300",
                        children: "Enter"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this),
                    " 重新开始"
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c = ResultsCard;
var _c;
__turbopack_context__.k.register(_c, "ResultsCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsPanel",
    ()=>SettingsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/lib/constants.ts [app-client] (ecmascript)");
'use client';
;
;
;
const modes = [
    {
        value: 'english',
        label: 'English',
        description: 'Common phrases & quotes'
    },
    {
        value: 'chinese',
        label: '中文',
        description: '现代文、文言文'
    },
    {
        value: 'coder',
        label: 'Coder',
        description: 'Multi-language code'
    }
];
const difficultyLabels = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
};
function SettingsPanel({ duration, mode, difficulty, chineseStyle, programmingLanguage, englishOptions, onDurationChange, onModeChange, onDifficultyChange, onChineseStyleChange, onProgrammingLanguageChange, onEnglishOptionsChange, disabled = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row items-center justify-center gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-400 mr-2",
                                children: "Time:"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 bg-gray-900/50 rounded-lg p-1",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DURATION_OPTIONS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>!disabled && onDurationChange(d),
                                        className: `
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${duration === d ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `,
                                        whileHover: !disabled ? {
                                            scale: 1.05
                                        } : undefined,
                                        whileTap: !disabled ? {
                                            scale: 0.95
                                        } : undefined,
                                        disabled: disabled,
                                        children: [
                                            d,
                                            "s"
                                        ]
                                    }, d, true, {
                                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:block w-px h-8 bg-gray-700"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-400 mr-2",
                                children: "Mode:"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 bg-gray-900/50 rounded-lg p-1",
                                children: modes.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>!disabled && onModeChange(m.value),
                                        className: `
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${mode === m.value ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `,
                                        whileHover: !disabled ? {
                                            scale: 1.05
                                        } : undefined,
                                        whileTap: !disabled ? {
                                            scale: 0.95
                                        } : undefined,
                                        disabled: disabled,
                                        title: m.description,
                                        children: m.label
                                    }, m.value, false, {
                                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden md:block w-px h-8 bg-gray-700"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-400 mr-2",
                                children: "Difficulty:"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 bg-gray-900/50 rounded-lg p-1",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIFFICULTY_OPTIONS"].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        onClick: ()=>!disabled && onDifficultyChange(d),
                                        className: `
                  px-3 py-1.5 rounded-md text-sm font-medium
                  transition-colors duration-200
                  ${difficulty === d ? 'bg-teal-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `,
                                        whileHover: !disabled ? {
                                            scale: 1.05
                                        } : undefined,
                                        whileTap: !disabled ? {
                                            scale: 0.95
                                        } : undefined,
                                        disabled: disabled,
                                        children: difficultyLabels[d]
                                    }, d, false, {
                                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            mode === 'english' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    height: 0
                },
                animate: {
                    opacity: 1,
                    height: 'auto'
                },
                exit: {
                    opacity: 0,
                    height: 0
                },
                className: "flex items-center justify-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-400",
                        children: "Options:"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: englishOptions.caseSensitive,
                                onChange: (e)=>!disabled && onEnglishOptionsChange({
                                        ...englishOptions,
                                        caseSensitive: e.target.checked
                                    }),
                                disabled: disabled,
                                className: "w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-300",
                                children: "区分大小写"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: englishOptions.ignorePunctuation,
                                onChange: (e)=>!disabled && onEnglishOptionsChange({
                                        ...englishOptions,
                                        ignorePunctuation: e.target.checked
                                    }),
                                disabled: disabled,
                                className: "w-4 h-4 rounded border-gray-600 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900 cursor-pointer"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 184,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-300",
                                children: "忽略标点符号"
                            }, void 0, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 183,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                lineNumber: 156,
                columnNumber: 9
            }, this),
            mode === 'chinese' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    height: 0
                },
                animate: {
                    opacity: 1,
                    height: 'auto'
                },
                exit: {
                    opacity: 0,
                    height: 0
                },
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-400 mr-2",
                        children: "文体:"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1 bg-gray-900/50 rounded-lg p-1",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHINESE_STYLE_OPTIONS"].map((style)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                onClick: ()=>!disabled && onChineseStyleChange(style),
                                className: `
                  px-4 py-1.5 rounded-md text-sm font-medium transition-all
                  ${chineseStyle === style ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/50' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}
                  ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `,
                                whileHover: !disabled ? {
                                    scale: 1.05
                                } : {},
                                whileTap: !disabled ? {
                                    scale: 0.95
                                } : {},
                                disabled: disabled,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHINESE_STYLE_LABELS"][style]
                            }, style, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 213,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this),
            mode === 'coder' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    height: 0
                },
                animate: {
                    opacity: 1,
                    height: 'auto'
                },
                exit: {
                    opacity: 0,
                    height: 0
                },
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-gray-400 mr-2",
                        children: "编程语言:"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: programmingLanguage,
                        onChange: (e)=>!disabled && onProgrammingLanguageChange(e.target.value),
                        disabled: disabled,
                        className: " flex-1 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROGRAMMING_LANGUAGE_OPTIONS"].map((lang)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: lang,
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$lib$2f$constants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROGRAMMING_LANGUAGE_LABELS"][lang]
                            }, lang, false, {
                                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
                lineNumber: 237,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c = SettingsPanel;
var _c;
__turbopack_context__.k.register(_c, "SettingsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TypingTest",
    ()=>TypingTest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$hooks$2f$useTypingEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/hooks/useTypingEngine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$TextDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/components/TextDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$StatsDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/components/StatsDisplay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$ResultsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/typing-test/components/ResultsCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$settings$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/ptype/frontend/src/features/settings/SettingsPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function TypingTest() {
    _s();
    const { status, targetText, displayText, typedText, wpm, cpm, lpm, accuracy, timeLeft, errors, correctChars, wpmHistory, settings, restart, setDuration, setMode, setDifficulty, setEnglishOptions, setChineseStyle, setProgrammingLanguage, inputHandlers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$hooks$2f$useTypingEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTypingEngine"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 自动聚焦到隐藏的 input
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypingTest.useEffect": ()=>{
            if (inputRef.current && status !== 'finished') {
                inputRef.current.focus();
            }
        }
    }["TypingTest.useEffect"], [
        status
    ]);
    // Tab + Enter 快捷键重新开始
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TypingTest.useCallback[handleKeyDown]": (e)=>{
            if (e.key === 'Enter' && e.getModifierState('Tab')) {
                e.preventDefault();
                restart();
                // 重新聚焦
                setTimeout({
                    "TypingTest.useCallback[handleKeyDown]": ()=>inputRef.current?.focus()
                }["TypingTest.useCallback[handleKeyDown]"], 0);
            }
        }
    }["TypingTest.useCallback[handleKeyDown]"], [
        restart
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypingTest.useEffect": ()=>{
            document.addEventListener('keydown', handleKeyDown);
            return ({
                "TypingTest.useEffect": ()=>document.removeEventListener('keydown', handleKeyDown)
            })["TypingTest.useEffect"];
        }
    }["TypingTest.useEffect"], [
        handleKeyDown
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-950 text-gray-200 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "py-6 px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                        className: "text-2xl font-bold text-center text-teal-400",
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        children: "PType"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        className: "text-center text-gray-500 text-sm mt-1",
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 0.2
                        },
                        children: "Test your typing speed"
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 flex flex-col items-center justify-center px-4 pb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-full max-w-4xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        mode: "wait",
                        children: status === 'finished' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$ResultsCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsCard"], {
                            mode: settings.mode,
                            wpm: wpm,
                            cpm: cpm,
                            lpm: lpm,
                            accuracy: accuracy,
                            correctChars: correctChars,
                            errors: errors,
                            wpmHistory: wpmHistory,
                            duration: settings.duration,
                            onRestart: restart
                        }, "results", false, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                            lineNumber: 89,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "space-y-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$settings$2f$SettingsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsPanel"], {
                                    duration: settings.duration,
                                    mode: settings.mode,
                                    difficulty: settings.difficulty,
                                    chineseStyle: settings.chineseStyle,
                                    programmingLanguage: settings.programmingLanguage,
                                    englishOptions: settings.englishOptions,
                                    onDurationChange: setDuration,
                                    onModeChange: setMode,
                                    onDifficultyChange: setDifficulty,
                                    onChineseStyleChange: setChineseStyle,
                                    onProgrammingLanguageChange: setProgrammingLanguage,
                                    onEnglishOptionsChange: setEnglishOptions,
                                    disabled: false
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                    lineNumber: 111,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center gap-4",
                                    children: [
                                        status === 'running' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            onClick: restart,
                                            className: "px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors",
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: 0.95
                                            },
                                            children: "停止并重新开始"
                                        }, void 0, false, {
                                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                            lineNumber: 130,
                                            columnNumber: 21
                                        }, this),
                                        status === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            onClick: restart,
                                            className: "px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition-colors",
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: 0.95
                                            },
                                            children: "重新生成文本"
                                        }, void 0, false, {
                                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                            lineNumber: 140,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                    lineNumber: 128,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$StatsDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatsDisplay"], {
                                    mode: settings.mode,
                                    wpm: wpm,
                                    cpm: cpm,
                                    lpm: lpm,
                                    accuracy: accuracy,
                                    timeLeft: timeLeft,
                                    status: status
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                    lineNumber: 152,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$components$2f$TextDisplay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextDisplay"], {
                                    targetText: targetText,
                                    displayText: displayText,
                                    typedText: typedText,
                                    status: status,
                                    mode: settings.mode,
                                    inputRef: inputRef,
                                    inputHandlers: inputHandlers
                                }, void 0, false, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                    lineNumber: 163,
                                    columnNumber: 17
                                }, this),
                                status === 'running' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "text-center text-gray-500 text-sm",
                                    initial: {
                                        opacity: 0
                                    },
                                    animate: {
                                        opacity: 1
                                    },
                                    children: [
                                        "Press",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "px-2 py-1 bg-gray-800 rounded text-gray-400",
                                            children: "Tab"
                                        }, void 0, false, {
                                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                            lineNumber: 181,
                                            columnNumber: 21
                                        }, this),
                                        ' ',
                                        "+",
                                        ' ',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                            className: "px-2 py-1 bg-gray-800 rounded text-gray-400",
                                            children: "Enter"
                                        }, void 0, false, {
                                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                            lineNumber: 183,
                                            columnNumber: 21
                                        }, this),
                                        ' ',
                                        "to restart"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                                    lineNumber: 175,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, "typing", true, {
                            fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "py-4 text-center text-gray-600 text-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Built with Next.js, Tailwind CSS & Framer Motion"
                }, void 0, false, {
                    fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/ptype/frontend/src/features/typing-test/TypingTest.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(TypingTest, "zHnX9wruBqHL3MoMTJYXxfR0Reo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$ptype$2f$frontend$2f$src$2f$features$2f$typing$2d$test$2f$hooks$2f$useTypingEngine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTypingEngine"]
    ];
});
_c = TypingTest;
var _c;
__turbopack_context__.k.register(_c, "TypingTest");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=code_ptype_frontend_src_7a7061f6._.js.map