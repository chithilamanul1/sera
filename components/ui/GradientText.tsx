'use client';
import React from 'react';

interface GradientTextProps {
    children: React.ReactNode;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
    className?: string;
}

export default function GradientText({
    children,
    className = "",
    colors = ["#5227FF", "#7156fb", "#2b43f7", "#2606a7", "#5227FF"],
    animationSpeed = 9,
    showBorder = false,
}: GradientTextProps) {
    return (
        <span className={`relative mx-auto flex max-w-fit flex-row items-center font-medium transition-shadow duration-500 overflow-hidden ${className}`}>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes gradient-text-anim {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
      `}} />
            <span
                className="inline-block relative z-2 text-transparent bg-clip-text"
                style={{
                    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
                    backgroundSize: "300% 300%",
                    animation: `gradient-text-anim ${animationSpeed}s ease infinite`,
                }}
            >
                {children}
            </span>
        </span>
    );
}
