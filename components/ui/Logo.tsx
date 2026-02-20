'use client';

import { motion } from 'framer-motion';

export const LOGO_PATH = "M 40 15 C 15 15 15 45 40 45 C 65 45 65 75 40 75 M 60 25 C 35 25 35 55 60 55 C 85 55 85 85 60 85";

interface LogoProps extends React.ComponentProps<'svg'> {
    animated?: boolean;
}

export function Logo({ className, animated = false, ...props }: LogoProps) {
    return (
        <svg viewBox="0 0 100 100" className={className} {...props}>
            <motion.path
                d={LOGO_PATH}
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                initial={animated ? { pathLength: 0 } : undefined}
                animate={animated ? { pathLength: 1 } : undefined}
                transition={animated ? { duration: 1.5, ease: "easeInOut" } : undefined}
            />
        </svg>
    );
}
