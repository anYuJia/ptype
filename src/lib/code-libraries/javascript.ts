import { CodeLibrary, cleanCode } from './types';

/**
 * JavaScript 代码库
 */
export const javascriptLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`function reverseString(str) {\n\treturn str.split('').reverse().join('');\n}`),
            difficulty: 'easy',
            title: '反转字符串',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`function findMax(arr) {\n\treturn Math.max(...arr);\n}`),
            difficulty: 'easy',
            title: '查找最大值',
            tags: ['数组'],
        },
        {
            code: cleanCode(`function isPalindrome(str) {\n\tconst reversed = str.split('').reverse().join('');\n\treturn str === reversed;\n}`),
            difficulty: 'easy',
            title: '回文判断',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`function sumArray(arr) {\n\treturn arr.reduce((sum, num) => sum + num, 0);\n}`),
            difficulty: 'easy',
            title: '数组求和',
            tags: ['数组'],
        },
        {
            code: cleanCode(`function removeDuplicates(arr) {\n\treturn [...new Set(arr)];\n}`),
            difficulty: 'easy',
            title: '移除重复元素',
            tags: ['数组', 'Set'],
        },
        {
            code: cleanCode(`function countVowels(str) {\n\tconst vowels = 'aeiouAEIOU';\n\treturn [...str].filter(c => vowels.includes(c)).length;\n}`),
            difficulty: 'easy',
            title: '统计元音字母',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`function greet(name) {\n\tconsole.log("Hello " + name);\n}\ngreet("World");`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`const name = "World";\nconsole.log(\`Hello \${name}!\`);`),
            difficulty: 'easy',
            title: '模板字符串',
            tags: ['ES6'],
        },
        {
            code: cleanCode(`const user = { name: "John", age: 30 };\nconst { name, age } = user;\nconsole.log(name, age);`),
            difficulty: 'easy',
            title: '解构赋值',
            tags: ['ES6'],
        },
    ],

    medium: [
        {
            code: cleanCode(`function binarySearch(arr, target) {\n\tlet left = 0;\n\tlet right = arr.length - 1;\n\twhile (left <= right) {\n\t\tconst mid = Math.floor((left + right) / 2);\n\t\tif (arr[mid] === target) return mid;\n\t\tif (arr[mid] < target) left = mid + 1;\n\t\telse right = mid - 1;\n\t}\n\treturn -1;\n}`),
            difficulty: 'medium',
            title: '二分查找',
            tags: ['数组', '二分查找'],
        },
        {
            code: cleanCode(`function twoSum(nums, target) {\n\tconst map = new Map();\n\tfor (let i = 0; i < nums.length; i++) {\n\t\tconst complement = target - nums[i];\n\t\tif (map.has(complement)) {\n\t\t\treturn [map.get(complement), i];\n\t\t}\n\t\tmap.set(nums[i], i);\n\t}\n\treturn null;\n}`),
            difficulty: 'medium',
            title: '两数之和',
            leetcodeId: 1,
            tags: ['数组', 'Map'],
        },
        {
            code: cleanCode(`function mergeSortedArrays(arr1, arr2) {\n\tconst result = [];\n\tlet i = 0, j = 0;\n\twhile (i < arr1.length && j < arr2.length) {\n\t\tif (arr1[i] < arr2[j]) {\n\t\t\tresult.push(arr1[i++]);\n\t\t} else {\n\t\t\tresult.push(arr2[j++]);\n\t\t}\n\t}\n\treturn result.concat(arr1.slice(i), arr2.slice(j));\n}`),
            difficulty: 'medium',
            title: '合并有序数组',
            tags: ['数组', '双指针'],
        },
        {
            code: cleanCode(`function validParentheses(s) {\n\tconst stack = [];\n\tconst pairs = {'(': ')', '{': '}', '[': ']'};\n\tfor (const char of s) {\n\t\tif (char in pairs) {\n\t\t\tstack.push(char);\n\t\t} else if (!stack.length || pairs[stack.pop()] !== char) {\n\t\t\treturn false;\n\t\t}\n\t}\n\treturn stack.length === 0;\n}`),
            difficulty: 'medium',
            title: '有效的括号',
            leetcodeId: 20,
            tags: ['栈', '字符串'],
        },
        {
            code: cleanCode(`function maxSubarraySum(arr) {\n\tlet maxSum = arr[0];\n\tlet currentSum = arr[0];\n\tfor (let i = 1; i < arr.length; i++) {\n\t\tcurrentSum = Math.max(arr[i], currentSum + arr[i]);\n\t\tmaxSum = Math.max(maxSum, currentSum);\n\t}\n\treturn maxSum;\n}`),
            difficulty: 'medium',
            title: '最大子数组和',
            leetcodeId: 53,
            tags: ['数组', '动态规划'],
        },
        {
            code: cleanCode(`function groupAnagrams(strs) {\n\tconst map = new Map();\n\tfor (const str of strs) {\n\t\tconst key = str.split('').sort().join('');\n\t\tif (!map.has(key)) map.set(key, []);\n\t\tmap.get(key).push(str);\n\t}\n\treturn Array.from(map.values());\n}`),
            difficulty: 'medium',
            title: '字母异位词分组',
            leetcodeId: 49,
            tags: ['字符串', 'Map'],
        },
        {
            code: cleanCode(`function debounce(func, delay) {\n\tlet timeoutId;\n\treturn (...args) => {\n\t\tclearTimeout(timeoutId);\n\t\ttimeoutId = setTimeout(() => func(...args), delay);\n\t};\n}`),
            difficulty: 'medium',
            title: '防抖函数',
            tags: ['高阶函数', '实用工具'],
        },
        {
            code: cleanCode(`const myPromise = new Promise((resolve, reject) => {\n\tsetTimeout(() => {\n\t\tresolve("Success!");\n\t}, 1000);\n});\n\nmyPromise.then(value => console.log(value));`),
            difficulty: 'medium',
            title: 'Promise',
            tags: ['异步'],
        },
        {
            code: cleanCode(`async function fetchData() {\n\ttry {\n\t\tconst response = await fetch('https://api.example.com/data');\n\t\tconst data = await response.json();\n\t\tconsole.log(data);\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}`),
            difficulty: 'medium',
            title: 'Async/Await & Fetch',
            tags: ['异步', '网络'],
        },
    ],

    hard: [
        {
            code: cleanCode(`function longestPalindrome(s) {\n\tfunction expand(left, right) {\n\t\twhile (left >= 0 && right < s.length && s[left] === s[right]) {\n\t\t\tleft--;\n\t\t\tright++;\n\t\t}\n\t\treturn s.slice(left + 1, right);\n\t}\n\tlet longest = '';\n\tfor (let i = 0; i < s.length; i++) {\n\t\tconst odd = expand(i, i);\n\t\tconst even = expand(i, i + 1);\n\t\tif (odd.length > longest.length) longest = odd;\n\t\tif (even.length > longest.length) longest = even;\n\t}\n\treturn longest;\n}`),
            difficulty: 'hard',
            title: '最长回文子串',
            leetcodeId: 5,
            tags: ['字符串', '中心扩展'],
        },
        {
            code: cleanCode(`function wordBreak(s, wordDict) {\n\tconst n = s.length;\n\tconst dp = new Array(n + 1).fill(false);\n\tdp[0] = true;\n\tconst wordSet = new Set(wordDict);\n\tfor (let i = 1; i <= n; i++) {\n\t\tfor (let j = 0; j < i; j++) {\n\t\t\tif (dp[j] && wordSet.has(s.slice(j, i))) {\n\t\t\t\tdp[i] = true;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\treturn dp[n];\n}`),
            difficulty: 'hard',
            title: '单词拆分',
            leetcodeId: 139,
            tags: ['字符串', '动态规划'],
        },
        {
            code: cleanCode(`class LRUCache {\n\tconstructor(capacity) {\n\t\tthis.capacity = capacity;\n\t\tthis.cache = new Map();\n\t}\n\tget(key) {\n\t\tif (!this.cache.has(key)) return -1;\n\t\tconst val = this.cache.get(key);\n\t\tthis.cache.delete(key);\n\t\tthis.cache.set(key, val);\n\t\treturn val;\n\t}\n\tput(key, value) {\n\t\tif (this.cache.has(key)) {\n\t\t\tthis.cache.delete(key);\n\t\t}\n\t\tthis.cache.set(key, value);\n\t\tif (this.cache.size > this.capacity) {\n\t\t\tconst firstKey = this.cache.keys().next().value;\n\t\t\tthis.cache.delete(firstKey);\n\t\t}\n\t}\n}`),
            difficulty: 'hard',
            title: 'LRU缓存',
            leetcodeId: 146,
            tags: ['设计', 'Map'],
        },
        {
            code: cleanCode(`function minWindow(s, t) {\n\tconst need = {};\n\tfor (const char of t) {\n\t\tneed[char] = (need[char] || 0) + 1;\n\t}\n\tlet missing = t.length;\n\tlet start = 0, end = 0, i = 0;\n\tfor (let j = 0; j < s.length; j++) {\n\t\tif (need[s[j]] > 0) missing--;\n\t\tneed[s[j]]--;\n\t\twhile (missing === 0) {\n\t\t\tif (end === 0 || j - i < end - start) {\n\t\t\t\tstart = i;\n\t\t\t\tend = j + 1;\n\t\t\t}\n\t\t\tneed[s[i]]++;\n\t\t\tif (need[s[i]] > 0) missing++;\n\t\t\ti++;\n\t\t}\n\t}\n\treturn s.slice(start, end);\n}`),
            difficulty: 'hard',
            title: '最小窗口子串',
            leetcodeId: 76,
            tags: ['字符串', '滑动窗口'],
        },
        {
            code: cleanCode(`function Animal(name) {\n\tthis.name = name;\n}\nAnimal.prototype.speak = function() {\n\tconsole.log(this.name + ' makes a noise.');\n};\n\nfunction Dog(name) {\n\tAnimal.call(this, name);\n}\nDog.prototype = Object.create(Animal.prototype);\nDog.prototype.constructor = Dog;`),
            difficulty: 'hard',
            title: '原型链继承',
            tags: ['面向对象'],
        },
        {
            code: cleanCode(`const handler = {\n\tget: function(obj, prop) {\n\t\treturn prop in obj ? obj[prop] : 37;\n\t}\n};\nconst p = new Proxy({}, handler);\np.a = 1;\nconsole.log(p.a, p.b); // 1, 37`),
            difficulty: 'hard',
            title: 'Proxy',
            tags: ['元编程'],
        },
        {
            code: cleanCode(`function* idMaker() {\n\tlet index = 0;\n\twhile (true) {\n\t\tyield index++;\n\t}\n}\nconst gen = idMaker();\nconsole.log(gen.next().value); // 0`),
            difficulty: 'hard',
            title: 'Generator',
            tags: ['ES6'],
        },
    ],
};
