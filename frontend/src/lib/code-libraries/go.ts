import { CodeLibrary, cleanCode } from './types';

/**
 * Go 代码库
 */
export const goLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`package main\nimport "fmt"\nfunc main() {\n\tfmt.Println("Hello World")\n}`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`func reverseString(s string) string {\n\trunes := []rune(s)\n\tfor i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n\t\trunes[i], runes[j] = runes[j], runes[i]\n\t}\n\treturn string(runes)\n}`),
            difficulty: 'easy',
            title: '反转字符串',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`func findMax(arr []int) int {\n\tmax := arr[0]\n\tfor _, num := range arr {\n\t\tif num > max {\n\t\t\tmax = num\n\t\t}\n\t}\n\treturn max\n}`),
            difficulty: 'easy',
            title: '查找最大值',
            tags: ['数组'],
        },
    ],

    medium: [
        {
            code: cleanCode(`func binarySearch(arr []int, target int) int {\n\tleft, right := 0, len(arr)-1\n\tfor left <= right {\n\t\tmid := left + (right-left)/2\n\t\tif arr[mid] == target {\n\t\t\treturn mid\n\t\t}\n\t\tif arr[mid] < target {\n\t\t\tleft = mid + 1\n\t\t} else {\n\t\t\tright = mid - 1\n\t\t}\n\t}\n\treturn -1\n}`),
            difficulty: 'medium',
            title: '二分查找',
            tags: ['数组', '二分查找'],
        },
        {
            code: cleanCode(`func twoSum(nums []int, target int) []int {\n\tm := make(map[int]int)\n\tfor i, num := range nums {\n\t\tcomplement := target - num\n\t\tif j, ok := m[complement]; ok {\n\t\t\treturn []int{j, i}\n\t\t}\n\t\tm[num] = i\n\t}\n\treturn nil\n}`),
            difficulty: 'medium',
            title: '两数之和',
            leetcodeId: 1,
            tags: ['数组', '哈希表'],
        },
        {
            code: cleanCode(`type Stack struct {\n\titems []interface{}\n}\nfunc (s *Stack) Push(item interface{}) {\n\ts.items = append(s.items, item)\n}\nfunc (s *Stack) Pop() interface{} {\n\tif len(s.items) == 0 {\n\t\treturn nil\n\t}\n\titem := s.items[len(s.items)-1]\n\ts.items = s.items[:len(s.items)-1]\n\treturn item\n}`),
            difficulty: 'medium',
            title: '栈实现',
            tags: ['数据结构', '栈'],
        },
    ],

    hard: [
        {
            code: cleanCode(`func longestPalindrome(s string) string {\n\tif len(s) < 1 {\n\t\treturn ""\n\t}\n\tstart, end := 0, 0\n\tfor i := 0; i < len(s); i++ {\n\t\tlen1 := expandAroundCenter(s, i, i)\n\t\tlen2 := expandAroundCenter(s, i, i+1)\n\t\tmaxLen := max(len1, len2)\n\t\tif maxLen > end-start {\n\t\t\tstart = i - (maxLen-1)/2\n\t\t\tend = i + maxLen/2\n\t\t}\n\t}\n\treturn s[start : end+1]\n}\nfunc expandAroundCenter(s string, left, right int) int {\n\tfor left >= 0 && right < len(s) && s[left] == s[right] {\n\t\tleft--\n\t\tright++\n\t}\n\treturn right - left - 1\n}`),
            difficulty: 'hard',
            title: '最长回文子串',
            leetcodeId: 5,
            tags: ['字符串', '中心扩展'],
        },
        {
            code: cleanCode(`type LRUCache struct {\n\tcapacity int\n\tcache    map[int]*Node\n\thead, tail *Node\n}\ntype Node struct {\n\tkey, val   int\n\tprev, next *Node\n}\nfunc Constructor(capacity int) LRUCache {\n\thead, tail := &Node{}, &Node{}\n\thead.next = tail\n\ttail.prev = head\n\treturn LRUCache{\n\t\tcapacity: capacity,\n\t\tcache:    make(map[int]*Node),\n\t\thead:     head,\n\t\ttail:     tail,\n\t}\n}`),
            difficulty: 'hard',
            title: 'LRU缓存',
            leetcodeId: 146,
            tags: ['设计', '哈希表', '链表'],
        },
    ],
};
