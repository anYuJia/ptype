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

// Cache for calculated lines to avoid expensive re-computation
const linesCache = new Map<string, LineInfo[]>();

/**
 * Calculate all text lines based on mode and constraints.
 * This is the expensive operation that should be memoized.
 */
export function calculateAllLines(
    displayText: string,
    mode: TypingMode
): LineInfo[] {
    const cacheKey = `${mode}:${displayText.length}:${displayText.slice(0, 20)}`;
    if (linesCache.has(cacheKey) && linesCache.get(cacheKey)!.length > 0) {
        // Simple cache check - can be improved or removed if component-level memoization is sufficient
        // But since this is a pure function, local weak cache or dependency on args is better handled by React useMemo.
        // We will skip internal caching here to avoid memory leaks and rely on React.
    }

    if (mode === 'coder') {
        // 程序员模式：按实际换行符分割
        const lines = displayText.split('\n');
        const allLines: LineInfo[] = [];
        let currentIndex = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            allLines.push({
                text: line,
                startIndex: currentIndex,
                hasNewline: i < lines.length - 1
            });
            currentIndex += line.length + (i < lines.length - 1 ? 1 : 0);
        }
        return allLines;

    } else {
        // 英文和中文模式：根据宽度自动换行
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
                    text: currentLine.join(''),
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

        return allLines;
    }
}

/**
 * Get the visible 3 lines (prev, current, next) based on typed text length.
 * This is a cheap operation.
 */
export function getLinesView(
    allLines: LineInfo[],
    typedTextLength: number
): DisplayLines {
    let currentLineIndex = 0;

    // Find current line based on typedTextLength
    // Optimization: Binary search could be used here for very large text, 
    // but linear scan is fine for < 100 lines usually visible in short tests.
    // For longer tests, this is still O(L) where L is line count.
    for (let i = 0; i < allLines.length; i++) {
        const line = allLines[i];

        // Calculate the end index of this line
        // The effective end index for "being in this line" includes the newline character if present
        const lineLength = line.text.length + (line.hasNewline ? 1 : 0);
        const lineEndIndex = line.startIndex + lineLength;

        // If typed text length is less than the end of this line, we are in this line.
        // Special case: if we are exactly at the end of the line, we might be moving to next line 
        // BUT logic usually dictates we are still completing this line until we type the next char
        // However, usually index comparison is strictly less for "inside", 
        // but here `typedTextLength` represents the cursor position (between chars).

        if (typedTextLength < lineEndIndex) {
            currentLineIndex = i;
            break;
        }
        // If we matched exactly the end, and there is a next line, we stay here until we type?
        // Actually, if typedTextLength == lineEndIndex, it means we have typed everything in this line.
        // So we should be on the NEXT line.
        if (typedTextLength === lineEndIndex && i < allLines.length - 1) {
            currentLineIndex = i + 1;
            // Don't break yet, we continue to check... actually we can just set it and break?
            // No, let loops continue? No, break.
            break;
        }
        // If we are at the very end of text
        if (i === allLines.length - 1) {
            currentLineIndex = i;
        }
    }

    const emptyLine = { text: '', startIndex: 0, hasNewline: false };
    // Handle bounds
    const prevLine = currentLineIndex > 0 ? allLines[currentLineIndex - 1] : emptyLine;
    const currentLineObj = allLines[currentLineIndex] || emptyLine;
    const nextLine = currentLineIndex < allLines.length - 1 ? allLines[currentLineIndex + 1] : emptyLine;

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


