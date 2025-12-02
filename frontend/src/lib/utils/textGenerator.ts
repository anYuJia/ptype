import { TypingMode, DifficultyLevel } from '../constants';

// 英文句子库 - 简单
const englishTextsEasy = [
  "The quick brown fox jumps over the lazy dog.",
  "Hello world. How are you today?",
  "I like to code every day.",
  "This is a simple test.",
  "Practice makes perfect.",
  "Keep calm and code on.",
  "Time flies when you are having fun.",
  "Every day is a new beginning.",
  "The sun rises in the east.",
  "Water flows down the river.",
];

// 英文句子库 - 中等
const englishTextsMedium = [
  "Programming is the art of telling another human what one wants the computer to do.",
  "Code is like humor. When you have to explain it, it is bad.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "The best error message is the one that never shows up.",
  "Simplicity is the soul of efficiency.",
  "Make it work, make it right, make it fast.",
  "Talk is cheap. Show me the code.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "The most damaging phrase in the language is: We have always done it this way.",
];

// 英文句子库 - 困难
const englishTextsHard = [
  "Software is a great combination of artistry and engineering.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
  "Debugging is twice as hard as writing the code in the first place.",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
  "It's not a bug – it's an undocumented feature.",
  "Walking on water and developing software from a specification are easy if both are frozen.",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
  "There are two ways to write error-free programs; only the third one works.",
  "Before software can be reusable it first has to be usable.",
];

// 中文句子库 - 简单
const chineseTextsEasy = [
  "天行健君子以自强不息",
  "学而不思则罔思而不学则殆",
  "千里之行始于足下",
  "业精于勤荒于嬉",
  "书山有路勤为径",
  "不积跬步无以至千里",
  "人生得意须尽欢",
  "海内存知己天涯若比邻",
  "长风破浪会有时",
  "世上无难事只要肯攀登",
];

// 中文句子库 - 中等
const chineseTextsMedium = [
  "天行健，君子以自强不息；地势坤，君子以厚德载物。",
  "学而不思则罔，思而不学则殆。",
  "千里之行，始于足下。",
  "业精于勤，荒于嬉；行成于思，毁于随。",
  "书山有路勤为径，学海无涯苦作舟。",
  "不积跬步，无以至千里；不积小流，无以成江海。",
  "人生得意须尽欢，莫使金樽空对月。",
  "落红不是无情物，化作春泥更护花。",
  "海内存知己，天涯若比邻。",
  "路漫漫其修远兮，吾将上下而求索。",
];

// 中文句子库 - 困难
const chineseTextsHard = [
  "长风破浪会有时，直挂云帆济沧海。",
  "宝剑锋从磨砺出，梅花香自苦寒来。",
  "纸上得来终觉浅，绝知此事要躬行。",
  "黑发不知勤学早，白首方悔读书迟。",
  "横眉冷对千夫指，俯首甘为孺子牛。",
  "春蚕到死丝方尽，蜡炬成灰泪始干。",
  "山重水复疑无路，柳暗花明又一村。",
  "欲穷千里目，更上一层楼。",
  "问渠那得清如许，为有源头活水来。",
  "少壮不努力，老大徒伤悲。",
];

// 程序员模式代码片段 - 简单
const coderTextsEasy = [
  'const x = 10;',
  'let name = "John";',
  'if (x > 5) { }',
  'for (let i = 0; i < 10; i++) { }',
  'function add(a, b) { return a + b; }',
  'const arr = [1, 2, 3];',
  'console.log("Hello");',
  'const obj = { id: 1 };',
  'return true;',
  'break;',
];

// 程序员模式代码片段 - 中等
const coderTextsMedium = [
  'const user = { id: 1, name: "John", active: true };',
  'function sum(a: number, b: number): number { return a + b; }',
  'if (data && data.length > 0) { process(data); }',
  'const items = arr.filter(x => x.active).map(x => x.name);',
  'export default function App() { return <div>Hello</div>; }',
  'async function fetchData(url: string) { return await fetch(url); }',
  'const [state, setState] = useState<string>("");',
  'interface User { id: number; name: string; email?: string; }',
  'try { await save(data); } catch (err) { console.error(err); }',
  'const result = items.reduce((acc, cur) => acc + cur.value, 0);',
];

// 程序员模式代码片段 - 困难
const coderTextsHard = [
  'Object.keys(obj).forEach(key => { console.log(obj[key]); });',
  'const { name, age, ...rest } = person;',
  'type Status = "pending" | "success" | "error";',
  'router.get("/api/users/:id", async (req, res) => { });',
  'SELECT * FROM users WHERE active = true ORDER BY created_at DESC;',
  'const memoized = useMemo(() => expensiveOperation(data), [data]);',
  'await Promise.all(items.map(async (item) => processItem(item)));',
  'type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };',
  'const observer = new IntersectionObserver((entries) => { });',
  'export const middleware = compose(thunk, logger, crashReporter);',
];

/**
 * 随机打乱数组
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 根据模式和难度获取文本库
 */
function getTextPool(mode: TypingMode, difficulty: DifficultyLevel): string[] {
  const pools = {
    english: {
      easy: englishTextsEasy,
      medium: englishTextsMedium,
      hard: englishTextsHard,
    },
    chinese: {
      easy: chineseTextsEasy,
      medium: chineseTextsMedium,
      hard: chineseTextsHard,
    },
    coder: {
      easy: coderTextsEasy,
      medium: coderTextsMedium,
      hard: coderTextsHard,
    },
  };

  return pools[mode][difficulty];
}

/**
 * 根据模式生成练习文本
 */
export function generateText(
  mode: TypingMode,
  difficulty: DifficultyLevel,
  minLength: number = 200
): string {
  const textPool = getTextPool(mode, difficulty);
  const shuffled = shuffle(textPool);
  let result = '';
  let index = 0;

  // 程序员模式：每行代码用换行符分隔
  if (mode === 'coder') {
    while (result.length < minLength) {
      result += (result ? '\n' : '') + shuffled[index % shuffled.length];
      index++;
    }
  } else {
    // 英文和中文模式：用空格分隔
    while (result.length < minLength) {
      result += (result ? ' ' : '') + shuffled[index % shuffled.length];
      index++;
    }
  }

  return result;
}

/**
 * 获取所有可用文本（用于预览）
 */
export function getAllTexts(mode: TypingMode, difficulty: DifficultyLevel): string[] {
  return getTextPool(mode, difficulty);
}
