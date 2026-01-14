'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);

        // Auto-reload if it's a chunk load error (deployment issue)
        if (error.name === 'ChunkLoadError' || error.message?.includes('Loading chunk')) {
            window.location.reload();
        }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-void text-center p-4">
                    <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
                    <p className="text-silver mb-8">We just updated the site. Please refresh the page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 rounded-full bg-white text-void font-bold hover:scale-105 transition-transform"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
