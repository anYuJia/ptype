import { TypingMode } from '@/lib/constants';

export interface LineInfo {
    text: string;
    startIndex: number;
    hasNewline: boolean;
}

export interface DisplayLines {
    prevLine: string;
    currentLine: string;
    nextLine: string;
    prevLineStart: number;
    currentLineStart: number;
    nextLineStart: number;
    prevLineHasNewline: boolean;
    currentLineHasNewline: boolean;
    nextLineHasNewline: boolean;
}

export function calculateLines(
    displayText: string,
    typedText: string,
    mode: TypingMode
): DisplayLines {
    if (mode === 'coder') {
        // 程序员模式：显示三行代码
        const lines = displayText.split('\n');
        let charCount = 0;
        let currentLineIndex = 0;

        // 找到当前输入位置所在的行
        for (let i = 0; i < lines.length; i++) {
            const lineLength = lines[i].length + (i < lines.length - 1 ? 1 : 0); // +1 for \n

            if (charCount + lineLength > typedText.length) {
                currentLineIndex = i;
                break;
            }
            charCount += lineLength;
        }

        // 获取三行内容
        const prevLine = lines[currentLineIndex - 1] || '';
        const currentLine = lines[currentLineIndex] || '';
        const nextLine = lines[currentLineIndex + 1] || '';

        // 计算每行的起始位置
        let prevLineStart = 0;
        for (let i = 0; i < currentLineIndex - 1; i++) {
            prevLineStart += lines[i].length + 1;
        }

        let currentLineStart = prevLineStart + (currentLineIndex > 0 ? prevLine.length + 1 : 0);
        let nextLineStart = currentLineStart + currentLine.length + 1;

        return {
            prevLine,
            currentLine,
            nextLine,
            prevLineStart,
            currentLineStart,
            nextLineStart,
            prevLineHasNewline: currentLineIndex > 0,
            currentLineHasNewline: currentLineIndex < lines.length - 1,
            nextLineHasNewline: currentLineIndex + 1 < lines.length - 1,
        };
    } else {
        // 英文和中文模式：三行滚动显示
        let words: string[] = [];
        if (mode === 'english') {
            const lines = displayText.split('\n');
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].length > 0) {
                    words.push(...lines[i].split(' '));
                }
                if (i < lines.length - 1) {
                    words.push('\n');
                }
            }
        } else {
            words = displayText.split('');
        }

        const separator = mode === 'english' ? ' ' : '';
        const maxCharsPerLine = mode === 'english' ? 55 : 35;

        const allLines: LineInfo[] = [];
        let currentLine: string[] = [];
        let currentLineLength = 0;
        let charIndex = 0;

        for (let i = 0; i < words.length; i++) {
            const word = words[i];

            if (word === '\n') {
                const lineStartIndex = charIndex - currentLineLength;
                allLines.push({
                    text: currentLine.join(''), // Use join('') because we will append separators to words
                    startIndex: lineStartIndex,
                    hasNewline: true
                });
                currentLine = [];
                currentLineLength = 0;
                charIndex += 1;
                continue;
            }

            const nextWord = words[i + 1];
            const shouldAddSeparator = mode === 'english' && nextWord !== '\n' && i < words.length - 1;
            const wordWithSeparator = word + (shouldAddSeparator ? separator : '');
            const wordLength = wordWithSeparator.length;

            if (currentLine.length > 0 && currentLineLength + wordLength > maxCharsPerLine) {
                const lineStartIndex = charIndex - currentLineLength;
                allLines.push({
                    text: currentLine.join(''),
                    startIndex: lineStartIndex,
                    hasNewline: false
                });
                currentLine = [wordWithSeparator];
                currentLineLength = wordLength;
            } else {
                currentLine.push(wordWithSeparator);
                currentLineLength += wordLength;
            }

            charIndex += wordLength;
        }

        if (currentLine.length > 0) {
            const lineStartIndex = charIndex - currentLineLength;
            allLines.push({
                text: currentLine.join(''),
                startIndex: lineStartIndex,
                hasNewline: false
            });
        }

        let currentLineIndex = 0;
        for (let i = 0; i < allLines.length; i++) {
            const line = allLines[i];
            const nextLine = allLines[i + 1];
            const lineEndIndex = nextLine ? nextLine.startIndex : (line.startIndex + line.text.length + (line.hasNewline ? 1 : 0));

            if (typedText.length < lineEndIndex) {
                currentLineIndex = i;
                break;
            }
        }

        const emptyLine = { text: '', startIndex: 0, hasNewline: false };
        const prevLine = allLines[currentLineIndex - 1] || emptyLine;
        const currentLineObj = allLines[currentLineIndex] || emptyLine;
        const nextLine = allLines[currentLineIndex + 1] || emptyLine;

        return {
            prevLine: prevLine.text,
            currentLine: currentLineObj.text,
            nextLine: nextLine.text,
            prevLineStart: prevLine.startIndex,
            currentLineStart: currentLineObj.startIndex,
            nextLineStart: nextLine.startIndex,
            prevLineHasNewline: prevLine.hasNewline,
            currentLineHasNewline: currentLineObj.hasNewline,
            nextLineHasNewline: nextLine.hasNewline,
        };
    }
}

export function isLineStart(displayText: string, typedText: string, mode: TypingMode): boolean {
    // If no text typed, we are at start
    if (typedText.length === 0) return true;

    // Calculate lines based on displayText
    // Note: This is expensive to do on every keystroke, but for typing test lengths it should be fine.
    // Optimization: We only need to know the start indices of all lines.

    if (mode === 'coder') {
        const lines = displayText.split('\n');
        let currentIndex = 0;
        for (const line of lines) {
            if (typedText.length === currentIndex && currentIndex !== 0) return true;
            currentIndex += line.length + 1; // +1 for newline
        }
        return false;
    } else {
        // Reuse the logic from calculateLines but simplified for just indices
        // Or just call calculateLines and check currentLineStart
        const { currentLineStart } = calculateLines(displayText, typedText, mode);
        return typedText.length === currentLineStart && currentLineStart !== 0;
    }
}
