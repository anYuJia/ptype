/**
 * Code Mode Helper Functions
 * Focused on target-based matching for perfect alignment in typing tests.
 */

/**
 * Get the leading whitespace characters in a text starting from a given position.
 */
export function getLeadingWhitespace(text: string, position: number): string {
  let i = position
  let whitespace = ''
  while (i < text.length && (text[i] === ' ' || text[i] === '\t')) {
    whitespace += text[i]
    i++
  }
  return whitespace
}

/**
 * Get the matching closing bracket for an opening bracket.
 */
export function getMatchingBracket(char: string): string | null {
  const pairs: Record<string, string> = {
    '(': ')',
    '{': '}',
    '[': ']',
    "'": "'",
    '"': '"',
    '`': '`',
  }
  return pairs[char] || null
}

/**
 * Check if a character should trigger auto-pairing.
 */
export function shouldAutoPair(char: string): boolean {
  return ['(', '{', '[', "'", '"', '`'].includes(char)
}

/**
 * Calculate how many spaces/tabs to auto-type to reach the next non-whitespace character in target text.
 * Returns the exact sequence of characters from the target.
 */
export function getIndentToConsume(
  targetText: string,
  currentPosition: number,
  limit: number = 2
): string {
  let i = currentPosition
  let consumed = ''
  
  // Only consume if the target actually has whitespace here
  while (i < targetText.length && (targetText[i] === ' ' || targetText[i] === '\t') && consumed.length < limit) {
    consumed += targetText[i]
    i++
  }
  
  return consumed
}
