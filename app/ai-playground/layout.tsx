import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "AI Playground & Model Sandbox | Seranex",
    description: "Interact with our sandboxed AI models. Test prompts, experience low-latency responses, and see agentic workflows in action.",
};

export default function AiPlaygroundLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
