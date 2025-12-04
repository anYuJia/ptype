import { CodeLibrary, cleanCode } from './types';

/**
 * Java 代码库
 */
export const javaLibrary: CodeLibrary = {
    easy: [
        {
            code: cleanCode(`public class Hello {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}`),
            difficulty: 'easy',
            title: 'Hello World',
            tags: ['基础'],
        },
        {
            code: cleanCode(`public int findMax(int[] arr) {\n\tint max = arr[0];\n\tfor (int num : arr) {\n\t\tif (num > max) max = num;\n\t}\n\treturn max;\n}`),
            difficulty: 'easy',
            title: '查找最大值',
            tags: ['数组'],
        },
        {
            code: cleanCode(`public boolean isPalindrome(String s) {\n\tint left = 0, right = s.length() - 1;\n\twhile (left < right) {\n\t\tif (s.charAt(left++) != s.charAt(right--)) {\n\t\t\treturn false;\n\t\t}\n\t}\n\treturn true;\n}`),
            difficulty: 'easy',
            title: '回文判断',
            tags: ['字符串', '双指针'],
        },
        {
            code: cleanCode(`public String reverseString(String s) {\n\treturn new StringBuilder(s).reverse().toString();\n}`),
            difficulty: 'easy',
            title: '字符串反转',
            tags: ['字符串'],
        },
        {
            code: cleanCode(`public int sumArray(int[] arr) {\n\tint sum = 0;\n\tfor (int num : arr) sum += num;\n\treturn sum;\n}`),
            difficulty: 'easy',
            title: '数组求和',
            tags: ['数组'],
        },
    ],

    medium: [
        {
            code: cleanCode(`public int binarySearch(int[] arr, int target) {\n\tint left = 0, right = arr.length - 1;\n\twhile (left <= right) {\n\t\tint mid = left + (right - left) / 2;\n\t\tif (arr[mid] == target) return mid;\n\t\tif (arr[mid] < target) left = mid + 1;\n\t\telse right = mid - 1;\n\t}\n\treturn -1;\n}`),
            difficulty: 'medium',
            title: '二分查找',
            tags: ['数组', '二分查找'],
        },
        {
            code: cleanCode(`public int[] twoSum(int[] nums, int target) {\n\tMap<Integer, Integer> map = new HashMap<>();\n\tfor (int i = 0; i < nums.length; i++) {\n\t\tint complement = target - nums[i];\n\t\tif (map.containsKey(complement)) {\n\t\t\treturn new int[]{map.get(complement), i};\n\t\t}\n\t\tmap.put(nums[i], i);\n\t}\n\treturn null;\n}`),
            difficulty: 'medium',
            title: '两数之和',
            leetcodeId: 1,
            tags: ['数组', '哈希表'],
        },
        {
            code: cleanCode(`public boolean isValid(String s) {\n\tStack<Character> stack = new Stack<>();\n\tMap<Character, Character> pairs = new HashMap<>();\n\tpairs.put(')', '(');\n\tpairs.put('}', '{');\n\tpairs.put(']', '[');\n\tfor (char c : s.toCharArray()) {\n\t\tif (pairs.containsValue(c)) {\n\t\t\tstack.push(c);\n\t\t} else if (pairs.containsKey(c)) {\n\t\t\tif (stack.isEmpty() || stack.pop() != pairs.get(c)) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\t}\n\treturn stack.isEmpty();\n}`),
            difficulty: 'medium',
            title: '有效的括号',
            leetcodeId: 20,
            tags: ['栈', '字符串'],
        },
        {
            code: cleanCode(`List<String> filtered = list.stream()\n\t.filter(s -> s.startsWith("A"))\n\t.map(String::toUpperCase)\n\t.collect(Collectors.toList());`),
            difficulty: 'medium',
            title: 'Stream API',
            tags: ['Java 8'],
        },
        {
            code: cleanCode(`Optional<String> optional = Optional.ofNullable(getValue());\nString result = optional.orElse("Default");`),
            difficulty: 'medium',
            title: 'Optional',
            tags: ['Java 8'],
        },
    ],

    hard: [
        {
            code: cleanCode(`public String longestPalindrome(String s) {\n\tif (s == null || s.length() < 1) return "";\n\tint start = 0, end = 0;\n\tfor (int i = 0; i < s.length(); i++) {\n\t\tint len1 = expandAroundCenter(s, i, i);\n\t\tint len2 = expandAroundCenter(s, i, i + 1);\n\t\tint len = Math.max(len1, len2);\n\t\tif (len > end - start) {\n\t\t\tstart = i - (len - 1) / 2;\n\t\t\tend = i + len / 2;\n\t\t}\n\t}\n\treturn s.substring(start, end + 1);\n}\nprivate int expandAroundCenter(String s, int left, int right) {\n\twhile (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n\t\tleft--;\n\t\tright++;\n\t}\n\treturn right - left - 1;\n}`),
            difficulty: 'hard',
            title: '最长回文子串',
            leetcodeId: 5,
            tags: ['字符串', '中心扩展'],
        },
        {
            code: cleanCode(`class LRUCache {\n\tprivate Map<Integer, Integer> cache;\n\tprivate int capacity;\n\tpublic LRUCache(int capacity) {\n\t\tthis.capacity = capacity;\n\t\tthis.cache = new LinkedHashMap<>(capacity, 0.75f, true);\n\t}\n\tpublic int get(int key) {\n\t\treturn cache.getOrDefault(key, -1);\n\t}\n\tpublic void put(int key, int value) {\n\t\tif (cache.size() >= capacity && !cache.containsKey(key)) {\n\t\t\tIterator<Integer> it = cache.keySet().iterator();\n\t\t\tit.next();\n\t\t\tit.remove();\n\t\t}\n\t\tcache.put(key, value);\n\t}\n}`),
            difficulty: 'hard',
            title: 'LRU缓存',
            leetcodeId: 146,
            tags: ['设计', '哈希表', '链表'],
        },
        {
            code: cleanCode(`CompletableFuture.supplyAsync(() -> "Hello")\n\t.thenApply(s -> s + " World")\n\t.thenAccept(System.out::println);`),
            difficulty: 'hard',
            title: 'CompletableFuture',
            tags: ['并发'],
        },
        {
            code: cleanCode(`@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.METHOD)\npublic @interface MyAnnotation {\n\tString value();\n}`),
            difficulty: 'hard',
            title: '自定义注解',
            tags: ['反射'],
        },
        {
            code: cleanCode(`InvocationHandler handler = (proxy, method, args) -> {\n\tSystem.out.println("Before");\n\treturn method.invoke(target, args);\n};\nMyInterface proxy = (MyInterface) Proxy.newProxyInstance(\n\tloader, new Class[]{MyInterface.class}, handler);`),
            difficulty: 'hard',
            title: '动态代理',
            tags: ['反射', '设计模式'],
        },
    ],
};
