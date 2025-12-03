import { TypingMode, DifficultyLevel, ChineseStyle, ProgrammingLanguage } from '@/lib/constants';
import {
  pythonLibrary,
  javascriptLibrary,
  typescriptLibrary,
  javaLibrary,
  goLibrary,
  bashLibrary,
  englishLibrary,
  chineseModernLibrary,
  chineseClassicalLibrary,
  cleanCode,
} from '@/lib/code-libraries';

// 注意：目前使用新的代码库结构
// 如需添加新语言，请在 /lib/code-libraries/ 目录下创建对应文件

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
  // 基础语法
  cleanCode(`def hello(): \n\tprint("Hello World") \n\treturn True`),
  cleanCode(`numbers = [1, 2, 3, 4, 5]\nfor n in numbers: \n\tprint(n * 2)`),
  cleanCode(`def add(a, b): \n\treturn a + b\nresult = add(5, 3)`),

  // 简单算法题
  cleanCode(`def reverse_string(s): \n\treturn s[:: -1]`),
  cleanCode(`def find_max(arr): \n\tif not arr: \n\t\treturn None\n\treturn max(arr)`),
  cleanCode(`def is_palindrome(s): \n\treturn s == s[:: -1]`),
  cleanCode(`def sum_array(arr): \n\ttotal = 0\n\tfor num in arr: \n\t\ttotal += num\n\treturn total`),
  cleanCode(`def count_vowels(s): \n\tvowels = \"aeiou\"\n\treturn sum(1 for c in s.lower() if c in vowels)`),

  // 列表操作
  cleanCode(`def remove_duplicates(arr):\n\treturn list(set(arr))`),
  cleanCode(`def find_even_numbers(arr):\n\treturn [x for x in arr if x % 2 == 0]`),
];

const pythonMedium = [
  // 经典算法
  cleanCode(`def binary_search(arr, target):\n\tleft, right = 0, len(arr) - 1\n\twhile left <= right:\n\t\tmid = (left + right) // 2\n\t\tif arr[mid] == target:\n\t\t\treturn mid\n\t\telif arr[mid] < target:\n\t\t\tleft = mid + 1\n\t\telse:\n\t\t\tright = mid - 1\n\treturn -1`),

  cleanCode(`def two_sum(nums, target):\n\tseen = {}\n\tfor i, num in enumerate(nums):\n\t\tcomplement = target - num\n\t\tif complement in seen:\n\t\t\treturn [seen[complement], i]\n\t\tseen[num] = i\n\treturn None`),

  cleanCode(`def merge_sorted_arrays(arr1, arr2):\n\tresult = []\n\ti, j = 0, 0\n\twhile i < len(arr1) and j < len(arr2):\n\t\tif arr1[i] < arr2[j]:\n\t\t\tresult.append(arr1[i])\n\t\t\ti += 1\n\t\telse:\n\t\t\tresult.append(arr2[j])\n\t\t\tj += 1\n\treturn result + arr1[i:] + arr2[j:]`),

  cleanCode(`def longest_common_prefix(strs):\n\tif not strs:\n\t\treturn ""\n\tprefix = strs[0]\n\tfor s in strs[1:]:\n\t\twhile not s.startswith(prefix):\n\t\t\tprefix = prefix[:-1]\n\t\t\tif not prefix:\n\t\t\t\treturn ""\n\treturn prefix`),

  cleanCode(`def is_valid_parentheses(s):\n\tstack = []\n\tpairs = {'(': ')', '{': '}', '[': ']'}\n\tfor char in s:\n\t\tif char in pairs:\n\t\t\tstack.append(char)\n\t\telif not stack or pairs[stack.pop()] != char:\n\t\t\treturn False\n\treturn not stack`),

  cleanCode(`def max_subarray_sum(arr):\n\tmax_sum = current_sum = arr[0]\n\tfor num in arr[1:]:\n\t\tcurrent_sum = max(num, current_sum + num)\n\t\tmax_sum = max(max_sum, current_sum)\n\treturn max_sum`),

  cleanCode(`def group_anagrams(strs):\n\tfrom collections import defaultdict\n\tgroups = defaultdict(list)\n\tfor s in strs:\n\t\tkey = ''.join(sorted(s))\n\t\tgroups[key].append(s)\n\treturn list(groups.values())`),

  cleanCode(`def fibonacci_dp(n):\n\tif n <= 1:\n\t\treturn n\n\tdp = [0] * (n + 1)\n\tdp[1] = 1\n\tfor i in range(2, n + 1):\n\t\tdp[i] = dp[i-1] + dp[i-2]\n\treturn dp[n]`),
];

const pythonHard = [
  // 高级算法
  cleanCode(`def longest_palindromic_substring(s):\n\tdef expand(left, right):\n\t\twhile left >= 0 and right < len(s) and s[left] == s[right]:\n\t\t\tleft -= 1\n\t\t\tright += 1\n\t\treturn s[left+1:right]\n\tlongest = ""\n\tfor i in range(len(s)):\n\t\todd = expand(i, i)\n\t\teven = expand(i, i + 1)\n\t\tlongest = max(longest, odd, even, key=len)\n\treturn longest`),

  cleanCode(`def word_break(s, word_dict):\n\tn = len(s)\n\tdp = [False] * (n + 1)\n\tdp[0] = True\n\tfor i in range(1, n + 1):\n\t\tfor j in range(i):\n\t\t\tif dp[j] and s[j:i] in word_dict:\n\t\t\t\tdp[i] = True\n\t\t\t\tbreak\n\treturn dp[n]`),

  cleanCode(`def serialize_tree(root):\n\tif not root:\n\t\treturn "null"\n\treturn f"{root.val},{serialize_tree(root.left)},{serialize_tree(root.right)}"`),

  cleanCode(`def lru_cache(capacity):\n\tfrom collections import OrderedDict\n\tcache = OrderedDict()\n\tdef get(key):\n\t\tif key not in cache:\n\t\t\treturn -1\n\t\tcache.move_to_end(key)\n\t\treturn cache[key]\n\tdef put(key, value):\n\t\tif key in cache:\n\t\t\tcache.move_to_end(key)\n\t\tcache[key] = value\n\t\tif len(cache) > capacity:\n\t\t\tcache.popitem(last=False)\n\treturn get, put`),

  cleanCode(`def minimum_window_substring(s, t):\n\tfrom collections import Counter\n\tneed = Counter(t)\n\tmissing = len(t)\n\tstart = end = i = 0\n\tfor j, char in enumerate(s):\n\t\tif need[char] > 0:\n\t\t\tmissing -= 1\n\t\tneed[char] -= 1\n\t\twhile missing == 0:\n\t\t\tif end == 0 or j - i < end - start:\n\t\t\t\tstart, end = i, j + 1\n\t\t\tneed[s[i]] += 1\n\t\t\tif need[s[i]] > 0:\n\t\t\t\tmissing += 1\n\t\t\ti += 1\n\treturn s[start:end]`),
];

// ==================== JavaScript ====================
const javascriptEasy = [
  // 基础语法
  cleanCode(`function greet(name) {\n\tconsole.log("Hello " + name);\n}\ngreet("World");`),
  cleanCode(`const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);`),

  // 简单算法
  cleanCode(`function reverseString(str) {\n\treturn str.split('').reverse().join('');\n}`),
  cleanCode(`function findMax(arr) {\n\treturn Math.max(...arr);\n}`),
  cleanCode(`function isPalindrome(str) {\n\tconst reversed = str.split('').reverse().join('');\n\treturn str === reversed;\n}`),
  cleanCode(`function sumArray(arr) {\n\treturn arr.reduce((sum, num) => sum + num, 0);\n}`),
  cleanCode(`function removeDuplicates(arr) {\n\treturn [...new Set(arr)];\n}`),
  cleanCode(`function countVowels(str) {\n\tconst vowels = 'aeiouAEIOU';\n\treturn [...str].filter(c => vowels.includes(c)).length;\n}`),
];

const javascriptMedium = [
  // 经典算法
  cleanCode(`function binarySearch(arr, target) {\n\tlet left = 0;\n\tlet right = arr.length - 1;\n\twhile (left <= right) {\n\t\tconst mid = Math.floor((left + right) / 2);\n\t\tif (arr[mid] === target) return mid;\n\t\tif (arr[mid] < target) left = mid + 1;\n\t\telse right = mid - 1;\n\t}\n\treturn -1;\n}`),

  cleanCode(`function twoSum(nums, target) {\n\tconst map = new Map();\n\tfor (let i = 0; i < nums.length; i++) {\n\t\tconst complement = target - nums[i];\n\t\tif (map.has(complement)) {\n\t\t\treturn [map.get(complement), i];\n\t\t}\n\t\tmap.set(nums[i], i);\n\t}\n\treturn null;\n}`),

  cleanCode(`function mergeSortedArrays(arr1, arr2) {\n\tconst result = [];\n\tlet i = 0, j = 0;\n\twhile (i < arr1.length && j < arr2.length) {\n\t\tif (arr1[i] < arr2[j]) {\n\t\t\tresult.push(arr1[i++]);\n\t\t} else {\n\t\t\tresult.push(arr2[j++]);\n\t\t}\n\t}\n\treturn result.concat(arr1.slice(i), arr2.slice(j));\n}`),

  cleanCode(`function validParentheses(s) {\n\tconst stack = [];\n\tconst pairs = {'(': ')', '{': '}', '[': ']'};\n\tfor (const char of s) {\n\t\tif (char in pairs) {\n\t\t\tstack.push(char);\n\t\t} else if (!stack.length || pairs[stack.pop()] !== char) {\n\t\t\treturn false;\n\t\t}\n\t}\n\treturn stack.length === 0;\n}`),

  cleanCode(`function maxSubarraySum(arr) {\n\tlet maxSum = arr[0];\n\tlet currentSum = arr[0];\n\tfor (let i = 1; i < arr.length; i++) {\n\t\tcurrentSum = Math.max(arr[i], currentSum + arr[i]);\n\t\tmaxSum = Math.max(maxSum, currentSum);\n\t}\n\treturn maxSum;\n}`),

  cleanCode(`function groupAnagrams(strs) {\n\tconst map = new Map();\n\tfor (const str of strs) {\n\t\tconst key = str.split('').sort().join('');\n\t\tif (!map.has(key)) map.set(key, []);\n\t\tmap.get(key).push(str);\n\t}\n\treturn Array.from(map.values());\n}`),

  cleanCode(`function debounce(func, delay) {\n\tlet timeoutId;\n\treturn (...args) => {\n\t\tclearTimeout(timeoutId);\n\t\ttimeoutId = setTimeout(() => func(...args), delay);\n\t};\n}`),
];

const javascriptHard = [
  // 高级算法
  cleanCode(`function longestPalindrome(s) {\n\tfunction expand(left, right) {\n\t\twhile (left >= 0 && right < s.length && s[left] === s[right]) {\n\t\t\tleft--;\n\t\t\tright++;\n\t\t}\n\t\treturn s.slice(left + 1, right);\n\t}\n\tlet longest = '';\n\tfor (let i = 0; i < s.length; i++) {\n\t\tconst odd = expand(i, i);\n\t\tconst even = expand(i, i + 1);\n\t\tif (odd.length > longest.length) longest = odd;\n\t\tif (even.length > longest.length) longest = even;\n\t}\n\treturn longest;\n}`),

  cleanCode(`function wordBreak(s, wordDict) {\n\tconst n = s.length;\n\tconst dp = new Array(n + 1).fill(false);\n\tdp[0] = true;\n\tconst wordSet = new Set(wordDict);\n\tfor (let i = 1; i <= n; i++) {\n\t\tfor (let j = 0; j < i; j++) {\n\t\t\tif (dp[j] && wordSet.has(s.slice(j, i))) {\n\t\t\t\tdp[i] = true;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\treturn dp[n];\n}`),

  cleanCode(`class LRUCache {\n\tconstructor(capacity) {\n\t\tthis.capacity = capacity;\n\t\tthis.cache = new Map();\n\t}\n\tget(key) {\n\t\tif (!this.cache.has(key)) return -1;\n\t\tconst val = this.cache.get(key);\n\t\tthis.cache.delete(key);\n\t\tthis.cache.set(key, val);\n\t\treturn val;\n\t}\n\tput(key, value) {\n\t\tif (this.cache.has(key)) {\n\t\t\tthis.cache.delete(key);\n\t\t}\n\t\tthis.cache.set(key, value);\n\t\tif (this.cache.size > this.capacity) {\n\t\t\tconst firstKey = this.cache.keys().next().value;\n\t\t\tthis.cache.delete(firstKey);\n\t\t}\n\t}\n}`),

  cleanCode(`function minWindow(s, t) {\n\tconst need = {};\n\tfor (const char of t) {\n\t\tneed[char] = (need[char] || 0) + 1;\n\t}\n\tlet missing = t.length;\n\tlet start = 0, end = 0, i = 0;\n\tfor (let j = 0; j < s.length; j++) {\n\t\tif (need[s[j]] > 0) missing--;\n\t\tneed[s[j]]--;\n\t\twhile (missing === 0) {\n\t\t\tif (end === 0 || j - i < end - start) {\n\t\t\t\tstart = i;\n\t\t\t\tend = j + 1;\n\t\t\t}\n\t\t\tneed[s[i]]++;\n\t\t\tif (need[s[i]] > 0) missing++;\n\t\t\ti++;\n\t\t}\n\t}\n\treturn s.slice(start, end);\n}`),
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
  // 英文模式
  if (mode === 'english') {
    return englishLibrary[difficulty].map(item => item.text);
  }

  // 中文模式
  if (mode === 'chinese') {
    const style = chineseStyle || 'modern';
    const library = style === 'modern' ? chineseModernLibrary : chineseClassicalLibrary;
    return library[difficulty].map(item => item.text);
  }

  // 程序员模式
  if (mode === 'coder') {
    const lang = programmingLanguage || 'python';

    // 使用新的代码库
    const codeLibraries: Record<string, any> = {
      python: pythonLibrary,
      javascript: javascriptLibrary,
      typescript: typescriptLibrary,
      java: javaLibrary,
      go: goLibrary,
      bash: bashLibrary,
    };

    const library = codeLibraries[lang];
    if (library && library[difficulty]) {
      return library[difficulty].map((item: any) => item.code);
    }

    // 对于其他语言，暂时回退到旧的数组（如果存在）
    const oldCodePools: Partial<Record<ProgrammingLanguage, Record<DifficultyLevel, string[]>>> = {
      java: typeof javaEasy !== 'undefined' ? { easy: javaEasy, medium: javaMedium, hard: javaHard } : undefined,
      go: typeof goEasy !== 'undefined' ? { easy: goEasy, medium: goMedium, hard: goHard } : undefined,
      cpp: typeof cppEasy !== 'undefined' ? { easy: cppEasy, medium: cppMedium, hard: cppHard } : undefined,
      c: typeof cppEasy !== 'undefined' ? { easy: cppEasy, medium: cppMedium, hard: cppHard } : undefined,
      html: typeof htmlEasy !== 'undefined' ? { easy: htmlEasy, medium: htmlMedium, hard: htmlMedium } : undefined,
      css: typeof cssEasy !== 'undefined' ? { easy: cssEasy, medium: cssMedium, hard: cssMedium } : undefined,
      bash: typeof bashEasy !== 'undefined' ? { easy: bashEasy, medium: bashMedium, hard: bashMedium } : undefined,
      powershell: typeof powershellEasy !== 'undefined' ? { easy: powershellEasy, medium: powershellMedium, hard: powershellMedium } : undefined,
    } as any;

    return oldCodePools[lang]?.[difficulty] || pythonLibrary.easy.map(item => item.code);
  }

  // 默认返回英文简单文本
  return englishLibrary.easy.map(item => item.text);
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

  // 统一使用换行符作为分隔符，这样每句话/每个代码块都会独占一行
  // 这符合用户“参考code的方式”的要求，也解决了中文模式下句子不换行的问题
  const separator = '\n';

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
