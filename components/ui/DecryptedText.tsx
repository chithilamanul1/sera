'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    parentClassName?: string;
    animateOn?: 'view' | 'hover';
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    animateOn = 'hover',
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        const originalText = text.split('');
        let iterations = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = originalText.map((char, index) => {
                if (char === ' ') return char;
                if (iterations > maxIterations) return char;

                // If sequential, reveal characters based on direction
                if (sequential) {
                    if (revealDirection === 'start') {
                        if (index < (iterations / maxIterations) * originalText.length) return char;
                    }
                    if (revealDirection === 'end') {
                        if (index > originalText.length - ((iterations / maxIterations) * originalText.length)) return char;
                    }
                    // TODO: Implement center
                }

                return characters[Math.floor(Math.random() * characters.length)];
            }).join('');

            setDisplayText(scrambled);
            iterations++;

            if (iterations > maxIterations + (sequential ? 20 : 0)) { // Add buffer for sequential
                clearInterval(intervalRef.current as NodeJS.Timeout);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, speed);
    };

    // Auto animate on view
    useEffect(() => {
        if (animateOn === 'view') {
            scramble();
        }
        // Cleanup
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [animateOn]);

    return (
        <span
            className={`${parentClassName} inline-block whitespace-nowrap`}
            onMouseEnter={animateOn === 'hover' ? scramble : undefined}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
}
