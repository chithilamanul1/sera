'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Typewriter({ words, className }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    const typeSpeed = isDeleting ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words]);

  return (
    <span className={className}>
      {text}
      <motion.span 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1 inline-block w-[3px] h-[1em] bg-primary align-middle"
      />
    </span>
  );
}