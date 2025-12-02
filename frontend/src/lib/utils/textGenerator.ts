import { TypingMode, DifficultyLevel, ChineseStyle, ProgrammingLanguage } from '@/lib/constants';

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
  "The baby sleeps in the small crib.",
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
  "Music has the power to evoke emotions and create lasting memories for everyone.",
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
  "Success is not final, failure is not fatal; it is the courage to continue that truly counts.",
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
  "学习新知识需要耐心和毅力，不能半途而废。",
];

// 中文现代文 - 中等
const chineseModernMedium = [
  "生活就像一盒巧克力，你永远不知道下一颗是什么味道。每一天都充满了未知的惊喜和挑战，我们要学会珍惜当下，享受生活中的每一个美好瞬间。",
  "读书是一种很好的习惯，它能够让我们增长见识，开阔视野。通过阅读，我们可以了解不同的文化，体验不同的人生，让自己的思想变得更加丰富多彩。",
  "科技的发展改变了我们的生活方式，让我们的日常变得更加便捷。从智能手机到人工智能，科技创新不断地影响着我们的工作和生活，带来了前所未有的便利。",
  "友谊是人生中最宝贵的财富之一。真正的朋友会在你需要的时候陪伴在你身边，分享你的快乐，分担你的忧愁，让你的人生不再孤单。",
  "旅行可以让我们放松心情，开阔眼界。每到一个新的地方，我们都能体验不同的文化，品尝特色美食，结识新的朋友，获得难忘的回忆和宝贵的经历。",
];

// 中文现代文 - 困难
const chineseModernHard = [
  "时间是一条永不停息的河流，它无声无息地流淌着，带走了我们的青春，留下了岁月的痕迹。我们无法阻止时间的脚步，但可以选择如何度过每一天，让生命更加充实和有意义。在这个快节奏的社会里，我们需要学会慢下来，用心感受生活中的美好，珍惜与家人朋友相处的每一刻时光。",
  "教育的本质不仅仅是传授知识，更重要的是培养学生的思维能力和创新精神。一个优秀的教育体系应该注重学生的全面发展，不仅要让他们掌握必要的技能和知识，还要培养他们的批判性思维、创造力和解决问题的能力，使他们能够在未来的社会中立足并做出贡献。",
  "人工智能技术的飞速发展正在深刻地改变着我们的世界。从自动驾驶汽车到智能医疗诊断，从语音助手到机器翻译，人工智能正在各个领域展现出巨大的潜力。然而，我们也需要认真思考这项技术可能带来的伦理问题和社会影响，确保技术发展能够真正造福人类。",
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
  "岁寒，然后知松柏之后凋也。",
];

// 中文文言文 - 中等  
const chineseClassicalMedium = [
  "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。",
  "故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，增益其所不能。",
  "鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。",
  "富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。",
  "生于忧患，死于安乐。故天将降大任于是人也，必先苦其心志。",
];

// 中文文言文 - 困难
const chineseClassicalHard = [
  "子曰：学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？有子曰：其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！",
  "大学之道，在明明德，在亲民，在止于至善。知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。物有本末，事有终始，知所先后，则近道矣。古之欲明明德于天下者，先治其国；欲治其国者，先齐其家。",
  "天下之至柔，驰骋天下之至坚。无有入无间，吾是以知无为之有益。不言之教，无为之益，天下希及之。名与身孰亲？身与货孰多？得与亡孰病？是故甚爱必大费，多藏必厚亡。知足不辱，知止不殆，可以长久。",
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
print(result)`,
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
print(result)`,
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
            return await response.json()`,
];

// JavaScript - 简单
const javascriptEasy = [
  `function greet(name) {
    console.log("Hello, " + name);
}

greet("World");`,
  `const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
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
}`,
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
};`,
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
}`,
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
}`,
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
}`,
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
fmt.Println(result)`,
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
}`,
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
}`,
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
std::cout << result;`,
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
};`,
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
};`,
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
</html>`,
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
</div>`,
];

// CSS - 简单
const cssEasy = [
  `.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}`,
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
}`,
];

// Bash - 简单
const bashEasy = [
  `#!/bin/bash

echo "Hello, World!"
name="User"
echo "Welcome, $name"`,
];

// Bash - 中等
const bashMedium = [
  `#!/bin/bash

for file in *.txt; do
    if [ -f "$file" ]; then
        echo "Processing $file"
        cat "$file" | grep "pattern" > output.txt
    fi
done`,
];

// PowerShell - 简单
const powershellEasy = [
  `Write-Host "Hello, World!"
$name = "User"
Write-Host "Welcome, $name"`,
];

// PowerShell - 中等
const powershellMedium = [
  `Get-ChildItem -Path "C:\\Logs" -Filter "*.log" | 
    Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) } |
    ForEach-Object {
        Write-Host "Processing $($_.Name)"
        Get-Content $_.FullName | Select-String "ERROR"
    }`,
];

// ==================== 文本池获取函数 ====================

function getTextPool(
  mode: TypingMode,
  difficulty: DifficultyLevel,
  chineseStyle?: ChineseStyle,
  programmingLanguage?: ProgrammingLanguage
): string[] {
  if (mode === 'english') {
    const pools = {
      easy: englishTextsEasy,
      medium: englishTextsMedium,
      hard: englishTextsHard,
    };
    return pools[difficulty];
  }

  if (mode === 'chinese') {
    const style = chineseStyle || 'modern';
    const pools = {
      modern: {
        easy: chineseModernEasy,
        medium: chineseModernMedium,
        hard: chineseModernHard,
      },
      classical: {
        easy: chineseClassicalEasy,
        medium: chineseClassicalMedium,
        hard: chineseClassicalHard,
      },
    };
    return pools[style][difficulty];
  }

  if (mode === 'coder') {
    const lang = programmingLanguage || 'python';
    const codePools: Record<ProgrammingLanguage, Record<DifficultyLevel, string[]>> = {
      python: { easy: pythonEasy, medium: pythonMedium, hard: pythonHard },
      javascript: { easy: javascriptEasy, medium: javascriptMedium, hard: javascriptHard },
      typescript: { easy: javascriptEasy, medium: javascriptMedium, hard: javascriptHard },
      java: { easy: javaEasy, medium: javaMedium, hard: javaHard },
      go: { easy: goEasy, medium: goMedium, hard: goHard },
      cpp: { easy: cppEasy, medium: cppMedium, hard: cppHard },
      c: { easy: cppEasy, medium: cppMedium, hard: cppHard },
      dart: { easy: javascriptEasy, medium: javascriptMedium, hard: javascriptHard },
      html: { easy: htmlEasy, medium: htmlMedium, hard: htmlMedium },
      css: { easy: cssEasy, medium: cssMedium, hard: cssMedium },
      bash: { easy: bashEasy, medium: bashMedium, hard: bashMedium },
      powershell: { easy: powershellEasy, medium: powershellMedium, hard: powershellMedium },
    };

    return codePools[lang]?.[difficulty] || pythonEasy;
  }

  return englishTextsEasy;
}

// 随机打乱数组
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * 生成练习文本
 */
export function generateText(
  mode: TypingMode,
  difficulty: DifficultyLevel,
  minLength: number = 200,
  chineseStyle?: ChineseStyle,
  programmingLanguage?: ProgrammingLanguage
): string {
  const textPool = getTextPool(mode, difficulty, chineseStyle, programmingLanguage);
  const shuffled = shuffleArray(textPool);

  let result = '';
  let index = 0;

  while (result.length < minLength && index < shuffled.length) {
    if (result.length > 0) {
      result += ' ';
    }
    result += shuffled[index];
    index++;
  }

  // 如果遍历完了还不够长，重新开始
  while (result.length < minLength) {
    if (result.length > 0) {
      result += ' ';
    }
    result += shuffled[index % shuffled.length];
    index++;
  }

  return result.trim();
}
