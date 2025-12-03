import { TextLibrary } from './types';

/**
 * 中文现代文本库
 */
export const chineseModernLibrary: TextLibrary = {
    easy: [
        {
            text: "今天天气很好，阳光明媚，我和朋友一起去公园散步。",
            difficulty: 'easy',
            category: '日常',
        },
        {
            text: "妈妈做的饭菜很好吃，我最喜欢吃她做的红烧肉。",
            difficulty: 'easy',
            category: '日常',
        },
        {
            text: "图书馆里很安静，大家都在认真地看书学习。",
            difficulty: 'easy',
            category: '学习',
        },
        {
            text: "小猫在阳台上晒太阳，看起来很舒服的样子。",
            difficulty: 'easy',
            category: '动物',
        },
        {
            text: "周末我喜欢在家里看电影，放松一下心情。",
            difficulty: 'easy',
            category: '休闲',
        },
        {
            text: "这家咖啡店的环境很好，咖啡也很香醇。",
            difficulty: 'easy',
            category: '日常',
        },
        {
            text: "春天来了，公园里的花都开了，非常漂亮。",
            difficulty: 'easy',
            category: '自然',
        },
        {
            text: "他每天早上都会去跑步锻炼身体，风雨无阻。",
            difficulty: 'easy',
            category: '健康',
        },
        {
            text: "晚上的星空很美，星星一闪一闪地发着光。",
            difficulty: 'easy',
            category: '自然',
        },
        {
            text: "学习新知识需要耐心和毅力，不能半途而废。",
            difficulty: 'easy',
            category: '学习',
        },
    ],

    medium: [
        {
            text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。每一天都充满了未知的惊喜和挑战，我们要学会珍惜当下，享受生活中的每一个美好瞬间。",
            difficulty: 'medium',
            category: '哲理',
        },
        {
            text: "读书是一种很好的习惯，它能够让我们增长见识，开阔视野。通过阅读，我们可以了解不同的文化，体验不同的人生，让自己的思想变得更加丰富多彩。",
            difficulty: 'medium',
            category: '教育',
        },
        {
            text: "科技的发展改变了我们的生活方式，让我们的日常变得更加便捷。从智能手机到人工智能，科技创新不断地影响着我们的工作和生活，带来了前所未有的便利。",
            difficulty: 'medium',
            category: '科技',
        },
        {
            text: "友谊是人生中最宝贵的财富之一。真正的朋友会在你需要的时候陪伴在你身边，分享你的快乐，分担你的忧愁，让你的人生不再孤单。",
            difficulty: 'medium',
            category: '情感',
        },
        {
            text: "旅行可以让我们放松心情，开阔眼界。每到一个新的地方，我们都能体验不同的文化，品尝特色美食，结识新的朋友，获得难忘的回忆和宝贵的经历。",
            difficulty: 'medium',
            category: '旅行',
        },
    ],

    hard: [
        {
            text: "时间是一条永不停息的河流，它无声无息地流淌着，带走了我们的青春，留下了岁月的痕迹。我们无法阻止时间的脚步，但可以选择如何度过每一天，让生命更加充实和有意义。在这个快节奏的社会里，我们需要学会慢下来，用心感受生活中的美好，珍惜与家人朋友相处的每一刻时光。",
            difficulty: 'hard',
            category: '哲理',
        },
        {
            text: "教育的本质不仅仅是传授知识，更重要的是培养学生的思维能力和创新精神。一个优秀的教育体系应该注重学生的全面发展，不仅要让他们掌握必要的技能和知识，还要培养他们的批判性思维、创造力和解决问题的能力，使他们能够在未来的社会中立足并做出贡献。",
            difficulty: 'hard',
            category: '教育',
        },
        {
            text: "人工智能技术的飞速发展正在深刻地改变着我们的世界。从自动驾驶汽车到智能医疗诊断，从语音助手到机器翻译，人工智能正在各个领域展现出巨大的潜力。然而，我们也需要认真思考这项技术可能带来的伦理问题和社会影响，确保技术发展能够真正造福人类。",
            difficulty: 'hard',
            category: '科技',
        },
    ],
};

/**
 * 中文古文文本库
 */
export const chineseClassicalLibrary: TextLibrary = {
    easy: [
        {
            text: "学而时习之，不亦说乎？有朋自远方来，不亦乐乎？",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "三人行，必有我师焉。择其善者而从之，其不善者而改之。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "知之为知之，不知为不知，是知也。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "己所不欲，勿施于人。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "温故而知新，可以为师矣。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "学而不思则罔，思而不学则殆。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "敏而好学，不耻下问。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "知者不惑，仁者不忧，勇者不惧。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "君子坦荡荡，小人长戚戚。",
            difficulty: 'easy',
            category: '论语',
        },
        {
            text: "岁寒，然后知松柏之后凋也。",
            difficulty: 'easy',
            category: '论语',
        },
    ],

    medium: [
        {
            text: "天将降大任于斯人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能。",
            difficulty: 'medium',
            category: '孟子',
        },
        {
            text: "鱼，我所欲也；熊掌，亦我所欲也。二者不可得兼，舍鱼而取熊掌者也。生，亦我所欲也；义，亦我所欲也。二者不可得兼，舍生而取义者也。",
            difficulty: 'medium',
            category: '孟子',
        },
        {
            text: "富贵不能淫，贫贱不能移，威武不能屈，此之谓大丈夫。",
            difficulty: 'medium',
            category: '孟子',
        },
        {
            text: "生于忧患，死于安乐。故天将降大任于是人也，必先苦其心志。",
            difficulty: 'medium',
            category: '孟子',
        },
        {
            text: "人恒过，然后能改；困于心，衡于虑，而后作；征于色，发于声，而后喻。",
            difficulty: 'medium',
            category: '孟子',
        },
    ],

    hard: [
        {
            text: "子曰：学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？有子曰：其为人也孝弟，而好犯上者，鲜矣；不好犯上，而好作乱者，未之有也。君子务本，本立而道生。孝弟也者，其为仁之本与！",
            difficulty: 'hard',
            category: '论语',
        },
        {
            text: "大学之道，在明明德，在亲民，在止于至善。知止而后有定，定而后能静，静而后能安，安而后能虑，虑而后能得。物有本末，事有终始，知所先后，则近道矣。古之欲明明德于天下者，先治其国；欲治其国者，先齐其家。",
            difficulty: 'hard',
            category: '大学',
        },
        {
            text: "天下之至柔，驰骋天下之至坚。无有入无间，吾是以知无为之有益。不言之教，无为之益，天下希及之。名与身孰亲？身与货孰多？得与亡孰病？是故甚爱必大费，多藏必厚亡。知足不辱，知止不殆，可以长久。",
            difficulty: 'hard',
            category: '道德经',
        },
    ],
};
