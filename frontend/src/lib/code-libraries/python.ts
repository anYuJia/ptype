import { CodeLibrary, cleanCode } from './types';

/**
 * Python 代码库
 */
export const pythonLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`def reverse_string(s):\n\treturn s[::-1]`),
            difficulty: 'easy',
            title: '反转字符串',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`def find_max(arr):\n\tif not arr:\n\t\treturn None\n\treturn max(arr)`),
            difficulty: 'easy',
            title: '查找最大值',
            tags: ['数组'],
        },
        {
            code: cleanCode(`def is_palindrome(s):\n\treturn s == s[::-1]`),
            difficulty: 'easy',
            title: '回文判断',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`def sum_array(arr):\n\ttotal = 0\n\tfor num in arr:\n\t\ttotal += num\n\treturn total`),
            difficulty: 'easy',
            title: '数组求和',
            tags: ['数组', '循环'],
        },
        {
            code: cleanCode(`def count_vowels(s):\n\tvowels = "aeiou"\n\treturn sum(1 for c in s.lower() if c in vowels)`),
            difficulty: 'easy',
            title: '统计元音字母',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`def remove_duplicates(arr):\n\treturn list(set(arr))`),
            difficulty: 'easy',
            title: '移除重复元素',
            tags: ['数组', '集合'],
        },
        {
            code: cleanCode(`def find_even_numbers(arr):\n\treturn [x for x in arr if x % 2 == 0]`),
            difficulty: 'easy',
            title: '筛选偶数',
            tags: ['数组', '列表推导式'],
        },
        {
            code: cleanCode(`def hello():\n\tprint("Hello World")\n\treturn True`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`squares = [x**2 for x in range(10)]\nprint(squares)`),
            difficulty: 'easy',
            title: '列表推导式',
            tags: ['基础'],
        },
        {
            code: cleanCode(`student = {'name': 'John', 'age': 25}\nprint(student.get('name'))`),
            difficulty: 'easy',
            title: '字典操作',
            tags: ['基础'],
        },
    ],

    medium: [
        {
            code: cleanCode(`def binary_search(arr, target):\n\tleft, right = 0, len(arr) - 1\n\twhile left <= right:\n\t\tmid = (left + right) // 2\n\t\tif arr[mid] == target:\n\t\t\treturn mid\n\t\telif arr[mid] < target:\n\t\t\tleft = mid + 1\n\t\telse:\n\t\t\tright = mid - 1\n\treturn -1`),
            difficulty: 'medium',
            title: '二分查找',
            tags: ['数组', '二分查找'],
        },
        {
            code: cleanCode(`def two_sum(nums, target):\n\tseen = {}\n\tfor i, num in enumerate(nums):\n\t\tcomplement = target - num\n\t\tif complement in seen:\n\t\t\treturn [seen[complement], i]\n\t\tseen[num] = i\n\treturn None`),
            difficulty: 'medium',
            title: '两数之和',
            leetcodeId: 1,
            tags: ['数组', '哈希表'],
        },
        {
            code: cleanCode(`def merge_sorted_arrays(arr1, arr2):\n\tresult = []\n\ti, j = 0, 0\n\twhile i < len(arr1) and j < len(arr2):\n\t\tif arr1[i] < arr2[j]:\n\t\t\tresult.append(arr1[i])\n\t\t\ti += 1\n\t\telse:\n\t\t\tresult.append(arr2[j])\n\t\t\tj += 1\n\treturn result + arr1[i:] + arr2[j:]`),
            difficulty: 'medium',
            title: '合并有序数组',
            tags: ['数组', '双指针'],
        },
        {
            code: cleanCode(`def is_valid_parentheses(s):\n\tstack = []\n\tpairs = {'(': ')', '{': '}', '[': ']'}\n\tfor char in s:\n\t\tif char in pairs:\n\t\t\tstack.append(char)\n\t\telif not stack or pairs[stack.pop()] != char:\n\t\t\treturn False\n\treturn not stack`),
            difficulty: 'medium',
            title: '有效的括号',
            leetcodeId: 20,
            tags: ['栈', '字符串'],
        },
        {
            code: cleanCode(`def max_subarray_sum(arr):\n\tmax_sum = current_sum = arr[0]\n\tfor num in arr[1:]:\n\t\tcurrent_sum = max(num, current_sum + num)\n\t\tmax_sum = max(max_sum, current_sum)\n\treturn max_sum`),
            difficulty: 'medium',
            title: '最大子数组和（Kadane算法）',
            leetcodeId: 53,
            tags: ['数组', '动态规划'],
        },
        {
            code: cleanCode(`def group_anagrams(strs):\n\tfrom collections import defaultdict\n\tgroups = defaultdict(list)\n\tfor s in strs:\n\t\tkey = ''.join(sorted(s))\n\t\tgroups[key].append(s)\n\treturn list(groups.values())`),
            difficulty: 'medium',
            title: '字母异位词分组',
            leetcodeId: 49,
            tags: ['字符串', '哈希表'],
        },
        {
            code: cleanCode(`def fibonacci_dp(n):\n\tif n <= 1:\n\t\treturn n\n\tdp = [0] * (n + 1)\n\tdp[1] = 1\n\tfor i in range(2, n + 1):\n\t\tdp[i] = dp[i-1] + dp[i-2]\n\treturn dp[n]`),
            difficulty: 'medium',
            title: '斐波那契数（动态规划）',
            tags: ['动态规划'],
        },
        {
            code: cleanCode(`from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello_world():\n\treturn 'Hello, World!'`),
            difficulty: 'medium',
            title: 'Flask Hello World',
            tags: ['Web'],
        },
        {
            code: cleanCode(`import pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.head())`),
            difficulty: 'medium',
            title: 'Pandas 读取 CSV',
            tags: ['数据分析'],
        },
        {
            code: cleanCode(`def my_decorator(func):\n\tdef wrapper():\n\t\tprint("Something is happening before the function is called.")\n\t\tfunc()\n\t\tprint("Something is happening after the function is called.")\n\treturn wrapper`),
            difficulty: 'medium',
            title: '装饰器',
            tags: ['高级特性'],
        },
    ],

    hard: [
        {
            code: cleanCode(`def longest_palindromic_substring(s):\n\tdef expand(left, right):\n\t\twhile left >= 0 and right < len(s) and s[left] == s[right]:\n\t\t\tleft -= 1\n\t\t\tright += 1\n\t\treturn s[left+1:right]\n\tlongest = ""\n\tfor i in range(len(s)):\n\t\todd = expand(i, i)\n\t\teven = expand(i, i + 1)\n\t\tlongest = max(longest, odd, even, key=len)\n\treturn longest`),
            difficulty: 'hard',
            title: '最长回文子串',
            leetcodeId: 5,
            tags: ['字符串', '动态规划', '中心扩展'],
        },
        {
            code: cleanCode(`def word_break(s, word_dict):\n\tn = len(s)\n\tdp = [False] * (n + 1)\n\tdp[0] = True\n\tfor i in range(1, n + 1):\n\t\tfor j in range(i):\n\t\t\tif dp[j] and s[j:i] in word_dict:\n\t\t\t\tdp[i] = True\n\t\t\t\tbreak\n\treturn dp[n]`),
            difficulty: 'hard',
            title: '单词拆分',
            leetcodeId: 139,
            tags: ['字符串', '动态规划'],
        },
        {
            code: cleanCode(`def lru_cache(capacity):\n\tfrom collections import OrderedDict\n\tcache = OrderedDict()\n\tdef get(key):\n\t\tif key not in cache:\n\t\t\treturn -1\n\t\tcache.move_to_end(key)\n\t\treturn cache[key]\n\tdef put(key, value):\n\t\tif key in cache:\n\t\t\tcache.move_to_end(key)\n\t\tcache[key] = value\n\t\tif len(cache) > capacity:\n\t\t\tcache.popitem(last=False)\n\treturn get, put`),
            difficulty: 'hard',
            title: 'LRU缓存',
            leetcodeId: 146,
            tags: ['设计', '哈希表', '链表'],
        },
        {
            code: cleanCode(`def minimum_window_substring(s, t):\n\tfrom collections import Counter\n\tneed = Counter(t)\n\tmissing = len(t)\n\tstart = end = i = 0\n\tfor j, char in enumerate(s):\n\t\tif need[char] > 0:\n\t\t\tmissing -= 1\n\t\tneed[char] -= 1\n\t\twhile missing == 0:\n\t\t\tif end == 0 or j - i < end - start:\n\t\t\t\tstart, end = i, j + 1\n\t\t\tneed[s[i]] += 1\n\t\t\tif need[s[i]] > 0:\n\t\t\t\tmissing += 1\n\t\t\ti += 1\n\treturn s[start:end]`),
            difficulty: 'hard',
            title: '最小窗口子串',
            leetcodeId: 76,
            tags: ['字符串', '滑动窗口', '哈希表'],
        },
        {
            code: cleanCode(`def serialize_tree(root):\n\tif not root:\n\t\treturn "null"\n\treturn f"{root.val},{serialize_tree(root.left)},{serialize_tree(root.right)}"`),
            difficulty: 'hard',
            title: '序列化二叉树',
            tags: ['树', '递归'],
        },
        {
            code: cleanCode(`import asyncio\n\nasync def main():\n\tprint('Hello')\n\tawait asyncio.sleep(1)\n\tprint('World')\n\nasyncio.run(main())`),
            difficulty: 'hard',
            title: '异步编程',
            tags: ['异步'],
        },
        {
            code: cleanCode(`class Meta(type):\n\tdef __new__(cls, name, bases, dct):\n\t\tx = super().__new__(cls, name, bases, dct)\n\t\tx.attr = 100\n\t\treturn x\n\nclass MyClass(metaclass=Meta):\n\tpass`),
            difficulty: 'hard',
            title: '元类',
            tags: ['元编程'],
        },
    ],
};
