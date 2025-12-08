import { describe, it, expect } from 'vitest';
import {
    calculateWPM,
    calculateCPM,
    calculateAccuracy,
    normalizeSpecialChars,
} from './wpmCalculator';

describe('wpmCalculator', () => {
    describe('normalizeSpecialChars', () => {
        it('should normalize different types of hyphens to a standard hyphen', () => {
            const text = '— – −'; // em-dash, en-dash, minus
            expect(normalizeSpecialChars(text)).toBe('- - -');
        });

        it('should normalize smart quotes to straight quotes', () => {
            const text = '“Hello” ‘World’';
            expect(normalizeSpecialChars(text)).toBe('"Hello" \'World\'');
        });

        it('should normalize ellipsis', () => {
            const text = 'Waiting…';
            expect(normalizeSpecialChars(text)).toBe('Waiting...');
        });
    });

    describe('calculateWPM', () => {
        it('should calculate WPM correctly', () => {
            // 25 chars = 5 words. 60 seconds = 1 minute. WPM should be 5.
            expect(calculateWPM(25, 60)).toBe(5);
        });

        it('should handle zero duration', () => {
            expect(calculateWPM(25, 0)).toBe(0);
        });

        it('should round correctly', () => {
            // 27 chars = 5.4 words. 60s = 1 min. WPM = 5.4 -> 5
            expect(calculateWPM(27, 60)).toBe(5);

            // 28 chars = 5.6 words. 60s = 1 min. WPM = 5.6 -> 6
            expect(calculateWPM(28, 60)).toBe(6);
        });
    });

    describe('calculateCPM', () => {
        it('should calculate CPM correctly', () => {
            // 100 chars in 60 seconds = 100 CPM
            expect(calculateCPM(100, 60)).toBe(100);
        });

        it('should calculate CPM for partial minutes', () => {
            // 50 chars in 30 seconds (0.5 min) = 100 CPM
            expect(calculateCPM(50, 30)).toBe(100);
        });
    });

    describe('calculateAccuracy', () => {
        it('should calculate accuracy correctly', () => {
            expect(calculateAccuracy(90, 100)).toBe(90);
        });

        it('should handle zero total chars', () => {
            expect(calculateAccuracy(0, 0)).toBe(100);
        });

        it('should round accuracy', () => {
            // 2/3 = 66.666... -> 67
            expect(calculateAccuracy(2, 3)).toBe(67);
        });
    });
});
