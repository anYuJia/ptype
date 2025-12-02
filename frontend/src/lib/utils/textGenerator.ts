import { TypingMode, DifficultyLevel, ChineseStyle, ProgrammingLanguage } from '@/lib/constants';

// 工具函数：移除空行并清理代码
function cleanCode(code: string): string {
  return code
    .split('\n')
    .filter(line => line.trim().length > 0)  // 移除空行
    .join('\n')
    .trim();
}

// ==================== 英文文本库 ====================
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

const chineseModernMedium = [
  "生活就像一盒巧克力，你永远不知道下一颗是什么味道。每一天都充满了未知的惊喜和挑战，我们要学会珍惜当下，享受生活中的每一个美好瞬间。",
  "读书是一种很好的习惯，它能够让我们增长见识，开阔视野。通过阅读，我们可以了解不同的文化，体验不同的人生，让自己的思想变得更加丰富多彩。",
  "科技的发展改变了我们的生活方式，让我们的日常变得更加便捷。从智能手机到人工智能，科技创新不断地影响着我们的工作和生活，带来了前所未有的便利。",
  "友谊是人生中最宝贵的财富之一。真正的朋友会在你需要的时候陪伴在你身边，分享你的快乐，分担你的忧愁，让你的人生不再孤单。",
  "旅行可以让我们放松心情，开阔眼界。每到一个新的地方，我们都能体验不同的文化，品尝特色美食，结识新的朋友，获得难忘的回忆和宝贵的经历。",
];

const chineseModernHard = [
  "时间是一条永不停息的河流，它无声无息地流淌着，带走了我们的青春，留下了岁月的痕迹。我们无法阻止时间的脚步，但可以选择如何度过每一天，让生命更加充实和有意义。在这个快节奏的社会里，我们需要学会慢下来，用心感受生活中的美好，珍惜与家人朋友相处的每一刻时光。",
  "教育的本质不仅仅是传授知识，更重要的是培养学生的思维能力和创新精神。一个优秀的教育体系应该注重学生的全面发展，不仅要让他们掌握必要的技能和知识，还要培养他们的批判性思维、创造力和解决问题的能力，使他们能够在未来的社会中立足并做出贡献。",
  "人工智能技术的飞速发展正在深刻地改变着我们的世界。从自动驾驶汽车到智能医疗诊断，从语音助手到机器翻译，人工智能正在各个领域展现出巨大的潜力。然而，我们也需要认真思考这项技术可能带来的伦理问题和社会影响，确保技术发展能够真正造福人类。",
];

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

const chineseClassicalMedium = [
  "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。",
  "鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。",
  "富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。",
  "生于忧患，死于安乐。故天将降大任于是人也，必先苦其心志。",
  "人恒过，然后能改；困于心，衡于虑，而后作；征于色，发于声，而后喻。",
];

const chineseClassicalHard = [
  "子曰：学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？有子曰：其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！",
  "大学之道，在明明德，在亲民，在止于至善。知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。物有本末，事有终始，知所先后，则近道矣。古之欲明明德于天下者，先治其国；欲治其国者，先齐其家。",
  "天下之至柔，驰骋天下之至坚。无有入无间，吾是以知无为之有益。不言之教，无为之益，天下希及之。名与身孰亲？身与货孰多？得与亡孰病？是故甚爱必大费，多藏必厚亡。知足不辱，知止不殆，可以长久。",
];

// ==================== Python ====================
const pythonEasy = [
  cleanCode(`def hello():
\tprint("Hello World")
\treturn True`),
  cleanCode(`numbers = [1, 2, 3, 4, 5]
for n in numbers:
\tprint(n * 2)`),
  cleanCode(`def add(a, b):
\treturn a + b
result = add(5, 3)`),
  cleanCode(`name = "Python"
if len(name) > 5:
\tprint("Long name")`),
  cleanCode(`items = ["a", "b", "c"]
for i in items:
\tprint(i.upper())`),
  cleanCode(`x = 10
y = 20
print(f"Sum: {x + y}")`),
  cleanCode(`def is_even(num):
\treturn num % 2 == 0`),
  cleanCode(`words = "hello world"
print(words.split())`),
  cleanCode(`count = 0
while count < 5:
\tcount += 1`),
  cleanCode(`data = {"key": "value"}
print(data.get("key"))`),
];

const pythonMedium = [
  cleanCode(`class Person:
\tdef __init__(self, name, age):
\t\tself.name = name
\t\tself.age = age
\tdef greet(self):
\t\treturn f"Hi, I'm {self.name}"`),
  cleanCode(`def fibonacci(n):
\tif n <= 1:
\t\treturn n
\treturn fibonacci(n-1) + fibonacci(n-2)`),
  cleanCode(`numbers = [1, 2, 3, 4, 5]
squared = [x**2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]`),
  cleanCode(`with open('file.txt', 'r') as f:
\tdata = f.read()
\tlines = data.split('\\n')`),
  cleanCode(`def process_data(items):
\tresult = []
\tfor item in items:
\t\tif item > 0:
\t\t\tresult.append(item * 2)
\treturn result`),
  cleanCode(`import json
data = {"name": "John", "age": 30}
json_str = json.dumps(data)
parsed = json.loads(json_str)`),
  cleanCode(`class Calculator:
\tdef __init__(self):
\t\tself.result = 0
\tdef add(self, n):
\t\tself.result += n
\t\treturn self`),
  cleanCode(`try:
\tvalue = int(input("Enter number: "))
\tprint(10 / value)
except ValueError:
\tprint("Invalid input")
except ZeroDivisionError:
\tprint("Cannot divide by zero")`),
];

const pythonHard = [
  cleanCode(`from functools import wraps
def timing_decorator(func):
\t@wraps(func)
\tdef wrapper(*args, **kwargs):
\t\tstart = time.time()
\t\tresult = func(*args, **kwargs)
\t\tend = time.time()
\t\tprint(f"{func.__name__} took {end-start:.2f}s")
\t\treturn result
\treturn wrapper`),
  cleanCode(`async def fetch_data(url):
\tasync with aiohttp.ClientSession() as session:
\t\tasync with session.get(url) as response:
\t\t\treturn await response.json()`),
  cleanCode(`class Meta(type):
\tdef __new__(cls, name, bases, attrs):
\t\tattrs['created_at'] = datetime.now()
\t\treturn super().__new__(cls, name, bases, attrs)`),
  cleanCode(`from typing import List, Optional, Dict
def process(items: List[int], config: Optional[Dict] = None) -> List[int]:
\tif config is None:
\t\tconfig = {}
\treturn [x * config.get('multiplier', 2) for x in items]`),
];

// ==================== JavaScript ====================
const javascriptEasy = [
  cleanCode(`function greet(name) {
\tconsole.log("Hello " + name);
}
greet("World");`),
  cleanCode(`const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);`),
  cleanCode(`let count = 0;
while (count < 5) {
\tconsole.log(count);
\tcount++;
}`),
  cleanCode(`const user = {
\tname: "John",
\tage: 30
};
console.log(user.name);`),
  cleanCode(`const colors = ["red", "green", "blue"];
for (let color of colors) {
\tconsole.log(color);
}`),
  cleanCode(`function add(a, b) {
\treturn a + b;
}
const result = add(5, 3);`),
  cleanCode(`const isEven = (n) => n % 2 === 0;
console.log(isEven(4));`),
  cleanCode(`const str = "hello world";
const upper = str.toUpperCase();`),
  cleanCode(`if (x > 10) {
\tconsole.log("Large");
} else {
\tconsole.log("Small");
}`),
  cleanCode(`const arr = [1, 2, 3];
arr.push(4);
arr.pop();`),
];

const javascriptMedium = [
  cleanCode(`const fetchData = async (url) => {
\ttry {
\t\tconst response = await fetch(url);
\t\tconst data = await response.json();
\t\treturn data;
\t} catch (error) {
\t\tconsole.error("Error:", error);
\t}
};`),
  cleanCode(`class Calculator {
\tconstructor() {
\t\tthis.result = 0;
\t}
\tadd(num) {
\t\tthis.result += num;
\t\treturn this;
\t}
\tmultiply(num) {
\t\tthis.result *= num;
\t\treturn this;
\t}
}`),
  cleanCode(`const debounce = (func, delay) => {
\tlet timeoutId;
\treturn (...args) => {
\t\tclearTimeout(timeoutId);
\t\ttimeoutId = setTimeout(() => func(...args), delay);
\t};
};`),
  cleanCode(`const users = [
\t{ name: "John", age: 30 },
\t{ name: "Jane", age: 25 }
];
const names = users.map(u => u.name);
const adults = users.filter(u => u.age >= 18);`),
  cleanCode(`function* fibonacci() {
\tlet [a, b] = [0, 1];
\twhile (true) {
\t\tyield a;
\t\t[a, b] = [b, a + b];
\t}
}`),
  cleanCode(`const promise = new Promise((resolve, reject) => {
\tsetTimeout(() => {
\t\tresolve("Success!");
\t}, 1000);
});
promise.then(result => console.log(result));`),
];

const javascriptHard = [
  cleanCode(`const createStore = (reducer) => {
\tlet state;
\tlet listeners = [];
\tconst getState = () => state;
\tconst dispatch = (action) => {
\t\tstate = reducer(state, action);
\t\tlisteners.forEach(listener => listener());
\t};
\tconst subscribe = (listener) => {
\t\tlisteners.push(listener);
\t\treturn () => {
\t\t\tlisteners = listeners.filter(l => l !== listener);
\t\t};
\t};
\treturn { getState, dispatch, subscribe };
};`),
  cleanCode(`const compose = (...fns) =>
\tfns.reduce((f, g) => (...args) => f(g(...args)));
const pipe = (...fns) =>
\tfns.reduce((f, g) => (...args) => g(f(...args)));`),
];

// ==================== Java ====================
const javaEasy = [
  cleanCode(`public class Hello {
\tpublic static void main(String[] args) {
\t\tSystem.out.println("Hello World");
\t}
}`),
  cleanCode(`int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
\tSystem.out.println(num * 2);
}`),
  cleanCode(`String name = "Java";
if (name.length() > 3) {
\tSystem.out.println("Long name");
}`),
  cleanCode(`public int add(int a, int b) {
\treturn a + b;
}`),
  cleanCode(`List<String> items = new ArrayList<>();
items.add("apple");
items.add("banana");`),
  cleanCode(`for (int i = 0; i < 5; i++) {
\tSystem.out.println(i);
}`),
  cleanCode(`String text = "hello world";
String upper = text.toUpperCase();`),
  cleanCode(`boolean isEven(int n) {
\treturn n % 2 == 0;
}`),
];

const javaMedium = [
  cleanCode(`public class Person {
\tprivate String name;
\tprivate int age;
\tpublic Person(String name, int age) {
\t\tthis.name = name;
\t\tthis.age = age;
\t}
\tpublic String introduce() {
\t\treturn "Hi, I'm " + name;
\t}
}`),
  cleanCode(`public interface Shape {
\tdouble getArea();
\tdouble getPerimeter();
}
public class Circle implements Shape {
\tprivate double radius;
\tpublic Circle(double radius) {
\t\tthis.radius = radius;
\t}
\tpublic double getArea() {
\t\treturn Math.PI * radius * radius;
\t}
}`),
  cleanCode(`try {
\tint result = divide(10, 0);
} catch (ArithmeticException e) {
\tSystem.err.println("Error: " + e.getMessage());
} finally {
\tSystem.out.println("Done");
}`),
];

const javaHard = [
  cleanCode(`public class GenericRepository<T extends Entity> {
\tprivate final Class<T> entityClass;
\tpublic GenericRepository(Class<T> entityClass) {
\t\tthis.entityClass = entityClass;
\t}
\tpublic List<T> findAll() {
\t\tCriteriaBuilder cb = em.getCriteriaBuilder();
\t\tCriteriaQuery<T> query = cb.createQuery(entityClass);
\t\tRoot<T> root = query.from(entityClass);
\t\treturn em.createQuery(query).getResultList();
\t}
}`),
];

// ==================== Go ====================
const goEasy = [
  cleanCode(`package main
import "fmt"
func main() {
\tfmt.Println("Hello World")
}`),
  cleanCode(`func add(a, b int) int {
\treturn a + b
}`),
  cleanCode(`numbers := []int{1, 2, 3, 4, 5}
for _, n := range numbers {
\tfmt.Println(n * 2)
}`),
  cleanCode(`name := "Go"
if len(name) > 2 {
\tfmt.Println("Valid")
}`),
  cleanCode(`var count int = 0
for count < 5 {
\tcount++
}`),
  cleanCode(`m := map[string]int{"a": 1, "b": 2}
fmt.Println(m["a"])`),
];

const goMedium = [
  cleanCode(`type Person struct {
\tName string
\tAge  int
}
func (p *Person) Introduce() string {
\treturn fmt.Sprintf("Hi, I'm %s", p.Name)
}`),
  cleanCode(`func fetchData(url string) ([]byte, error) {
\tresp, err := http.Get(url)
\tif err != nil {
\t\treturn nil, err
\t}
\tdefer resp.Body.Close()
\treturn ioutil.ReadAll(resp.Body)
}`),
  cleanCode(`func divide(a, b int) (int, error) {
\tif b == 0 {
\t\treturn 0, errors.New("division by zero")
\t}
\treturn a / b, nil
}`),
];

const goHard = [
  cleanCode(`func worker(id int, jobs <-chan int, results chan<- int) {
\tfor j := range jobs {
\t\tfmt.Printf("worker %d processing job %d\\n", id, j)
\t\ttime.Sleep(time.Second)
\t\tresults <- j * 2
\t}
}
func main() {
\tjobs := make(chan int, 100)
\tresults := make(chan int, 100)
\tfor w := 1; w <= 3; w++ {
\t\tgo worker(w, jobs, results)
\t}
}`),
];

// ==================== C++ ====================
const cppEasy = [
  cleanCode(`#include <iostream>
int main() {
\tstd::cout << "Hello World" << std::endl;
\treturn 0;
}`),
  cleanCode(`int add(int a, int b) {
\treturn a + b;
}`),
  cleanCode(`for (int i = 0; i < 5; i++) {
\tstd::cout << i << std::endl;
}`),
  cleanCode(`int arr[] = {1, 2, 3, 4, 5};
int sum = 0;
for (int n : arr) {
\tsum += n;
}`),
];

const cppMedium = [
  cleanCode(`class Person {
private:
\tstd::string name;
\tint age;
public:
\tPerson(std::string n, int a) : name(n), age(a) {}
\tstd::string introduce() {
\t\treturn "Hi, I'm " + name;
\t}
};`),
  cleanCode(`std::vector<int> numbers = {1, 2, 3, 4, 5};
std::sort(numbers.begin(), numbers.end());
auto it = std::find(numbers.begin(), numbers.end(), 3);`),
];

const cppHard = [
  cleanCode(`template<typename T>
class SmartPointer {
private:
\tT* ptr;
\tsize_t* ref_count;
public:
\tSmartPointer(T* p = nullptr) : ptr(p), ref_count(new size_t(1)) {}
\tSmartPointer(const SmartPointer& other) {
\t\tptr = other.ptr;
\t\tref_count = other.ref_count;
\t\t(*ref_count)++;
\t}
\t~SmartPointer() {
\t\tif (--(*ref_count) == 0) {
\t\t\tdelete ptr;
\t\t\tdelete ref_count;
\t\t}
\t}
};`),
];

// ==================== HTML/CSS ====================
const htmlEasy = [
  cleanCode(`<!DOCTYPE html>
<html>
<head>
\t<title>My Page</title>
</head>
<body>
\t<h1>Hello World</h1>
\t<p>Welcome!</p>
</body>
</html>`),
  cleanCode(`<div class="container">
\t<h2>Title</h2>
\t<p>Content goes here</p>
\t<a href="#">Link</a>
</div>`),
  cleanCode(`<ul>
\t<li>Item 1</li>
\t<li>Item 2</li>
\t<li>Item 3</li>
</ul>`),
  cleanCode(`<form>
\t<input type="text" name="username">
\t<input type="password" name="password">
\t<button type="submit">Login</button>
</form>`),
];

const htmlMedium = [
  cleanCode(`<div class="card">
\t<header>
\t\t<h2>Article Title</h2>
\t</header>
\t<main>
\t\t<p>Article content...</p>
\t</main>
\t<footer>
\t\t<small>Published on 2024</small>
\t</footer>
</div>`),
];

const cssEasy = [
  cleanCode(`.button {
\tbackground-color: blue;
\tcolor: white;
\tpadding: 10px 20px;
\tborder: none;
\tborder-radius: 5px;
}`),
  cleanCode(`.container {
\twidth: 100%;
\tmax-width: 1200px;
\tmargin: 0 auto;
}`),
  cleanCode(`.flex-center {
\tdisplay: flex;
\tjustify-content: center;
\talign-items: center;
}`),
];

const cssMedium = [
  cleanCode(`.card {
\tdisplay: flex;
\tflex-direction: column;
\tbackground: white;
\tborder-radius: 8px;
\tbox-shadow: 0 2px 4px rgba(0,0,0,0.1);
\ttransition: transform 0.3s ease;
}
.card:hover {
\ttransform: translateY(-5px);
\tbox-shadow: 0 4px 8px rgba(0,0,0,0.2);
}`),
];

// ==================== Bash/Linux 命令 ====================
const bashEasy = [
  "ls -la",
  "cd /home/user",
  "pwd",
  "mkdir new_folder",
  "rm file.txt",
  "cp source.txt dest.txt",
  "mv old.txt new.txt",
  "cat file.txt",
  "grep 'pattern' file.txt",
  "find . -name '*.txt'",
  "chmod 755 script.sh",
  "chown user:group file.txt",
  "ps aux | grep nginx",
  "kill -9 1234",
  "df -h",
  "du -sh *",
  "tar -xzf archive.tar.gz",
  "wget https://example.com/file.zip",
  "curl -X GET https://api.example.com",
  "ssh user@server.com",
];

const bashMedium = [
  "find /var/log -name '*.log' -mtime +7 -delete",
  "grep -r 'ERROR' /var/log/ | wc -l",
  "sed 's/old/new/g' file.txt > output.txt",
  "awk '{print $1, $3}' data.txt",
  "tail -f /var/log/syslog",
  "ps aux --sort=-%mem | head -n 10",
  "netstat -tulpn | grep :80",
  "docker ps -a",
  "docker run -d -p 8080:80 nginx",
  "git log --oneline --graph --all",
  "git diff HEAD~1 HEAD",
  "rsync -avz /source/ user@remote:/dest/",
  "crontab -e",
  "systemctl status nginx",
  "journalctl -u nginx -f",
];

// ==================== PowerShell/Windows 命令 ====================
const powershellEasy = [
  "Get-ChildItem",
  "Set-Location C:\\Users",
  "Get-Location",
  "New-Item -ItemType Directory -Name 'folder'",
  "Remove-Item file.txt",
  "Copy-Item source.txt dest.txt",
  "Move-Item old.txt new.txt",
  "Get-Content file.txt",
  "Select-String 'pattern' file.txt",
  "Get-Process",
  "Stop-Process -Id 1234",
  "Get-Service",
  "Start-Service -Name 'nginx'",
  "Stop-Service -Name 'nginx'",
  "Get-EventLog -LogName System -Newest 10",
  "Test-Connection google.com",
  "Get-NetIPAddress",
  "Get-Disk",
  "Get-Volume",
  "Get-Command",
];

const powershellMedium = [
  "Get-ChildItem -Path C:\\Logs -Filter '*.log' -Recurse",
  "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10",
  "Get-Service | Where-Object {$_.Status -eq 'Running'}",
  "Get-EventLog -LogName Application -EntryType Error -Newest 50",
  "Invoke-WebRequest -Uri 'https://api.example.com' -Method GET",
  "Get-WmiObject -Class Win32_LogicalDisk",
  "Get-NetTCPConnection -State Listen",
  "Test-NetConnection google.com -Port 443",
  "Get-ChildItem | ForEach-Object { $_.Name.ToUpper() }",
  "Measure-Command { Get-Process }",
  "Export-Csv -Path output.csv -NoTypeInformation",
  "Import-Csv -Path data.csv | Where-Object {$_.Age -gt 18}",
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

  // 对于bash和powershell，每个命令占一行
  const isBashOrPowershell = programmingLanguage === 'bash' || programmingLanguage === 'powershell';
  const separator = isBashOrPowershell ? '\n' : ' ';

  let result = '';
  let index = 0;

  while (result.length < minLength && index < shuffled.length) {
    if (result.length > 0) {
      result += separator;
    }
    result += shuffled[index];
    index++;
  }

  // 如果遍历完了还不够长，重新开始
  while (result.length < minLength) {
    if (result.length > 0) {
      result += separator;
    }
    result += shuffled[index % shuffled.length];
    index++;
  }

  return result.trim();
}
