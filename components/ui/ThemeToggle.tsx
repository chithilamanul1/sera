"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 1 : 0,
                    rotate: theme === "dark" ? 0 : 180,
                }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 0 : 1,
                    rotate: theme === "dark" ? -180 : 0,
                }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex items-center justify-center"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] text-black" />
            </motion.div>
            <span className="sr-only">Toggle theme</span>
        </button>
    )
}
