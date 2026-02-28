"use client";

import React, { useState } from "react";
import { fetchAndExtractPage, type AnalysisResult } from "./actions";
import { useTheme } from "next-themes";
import { Search, Code2, LayoutTemplate, Copy, Download, Zap, Sun, Moon } from "lucide-react";
import { Iframe } from "./iframe";
import Link from "next/link";

export function DemoViewer({ defaultUrl }: { defaultUrl: string }) {
    const [mounted, setMounted] = useState(false);
    const [url, setUrl] = useState(defaultUrl);
    const [mode, setMode] = useState<"human" | "agent">("human");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);
        try {
            const data = await fetchAndExtractPage(url);
            setResult(data);
        } catch (err: any) {
            setError(err.message || "Failed to analyze page");
        } finally {
            setLoading(false);
        }
    };

    const copyJson = async () => {
        if (result) {
            await navigator.clipboard.writeText(result.extractedJson);
        }
    };

    const downloadJson = () => {
        if (result) {
            const blob = new Blob([result.extractedJson], { type: "application/json" });
            const dlUrl = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = dlUrl;
            a.download = "extracted-data.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(dlUrl);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-background text-foreground font-sans">
            {/* Header / Input Section */}
            <header className="flex flex-col gap-4 p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <h1 className="text-xl font-bold tracking-tight">NxPage Demo</h1>
                    </Link>
                    <div className="flex items-center gap-4">
                        {mounted && (
                            <button
                                onClick={() => {
                                    if (theme === 'system') setTheme('dark');
                                    else if (theme === 'dark') setTheme('light');
                                    else setTheme('system');
                                }}
                                className="relative p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center justify-center w-8 h-8"
                                title="Toggle Theme"
                            >
                                {theme === 'system' ? (
                                    <span className="font-semibold text-[10px] leading-none uppercase tracking-wider">Sys</span>
                                ) : theme === 'dark' ? (
                                    <Moon className="h-4 w-4" />
                                ) : (
                                    <Sun className="h-4 w-4" />
                                )}
                                <span className="sr-only">Toggle theme</span>
                            </button>
                        )}

                        {/* Mode Toggle */}
                        <div className="flex bg-zinc-200 dark:bg-zinc-800 p-1 rounded-lg">
                            <button
                                onClick={() => setMode("human")}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "human"
                                    ? "bg-white dark:bg-zinc-950 text-black dark:text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                                    }`}
                            >
                                <LayoutTemplate className="w-4 h-4" />
                                Human Mode
                            </button>
                            <button
                                onClick={() => setMode("agent")}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${mode === "agent"
                                    ? "bg-white dark:bg-zinc-950 text-black dark:text-white shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                                    }`}
                            >
                                <Code2 className="w-4 h-4" />
                                Agent Mode
                            </button>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleAnalyze} className="relative w-full max-w-3xl mx-auto flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter a URL to analyze..."
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-zinc-800 dark:focus:ring-zinc-200 transition-all font-mono text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : "Analyze"}
                    </button>
                </form>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden flex flex-col relative bg-zinc-100 dark:bg-black">
                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-100 text-red-700 rounded-md border border-red-200 shadow-sm z-50">
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="absolute inset-0 z-40 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <span className="w-8 h-8 border-4 border-zinc-800 dark:border-zinc-200 border-t-transparent rounded-full animate-spin" />
                            <p className="font-medium text-zinc-600 dark:text-zinc-400 pulse">Extracting and analyzing...</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!result && !loading && (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-4">
                        <LayoutTemplate className="w-12 h-12 opacity-20" />
                        <p>Enter a URL above to analyze how it appears to Humans and AI Agents.</p>
                    </div>
                )}

                {/* Results Area */}
                {result && (
                    <div className="flex-1 overflow-y-auto h-full flex flex-col md:flex-row">

                        {/* Human Mode View */}
                        {mode === "human" && (
                            <div className="flex-1 w-full h-full p-4 md:p-8">
                                <div className="w-full h-full max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
                                    <div className="bg-zinc-100 dark:bg-zinc-950 py-2 px-4 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 truncate flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                                        <span className="ml-2">{url}</span>
                                    </div>
                                    <div className="flex-1 relative bg-white overflow-hidden">
                                        <Iframe content={result.rawHtml} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Agent Mode View */}
                        {mode === "agent" && (
                            <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-8 h-full max-w-[1400px] mx-auto w-full">

                                {/* Metrics Sidebar */}
                                <div className="flex flex-col gap-4 w-full lg:w-72 shrink-0">
                                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white shadow-md relative overflow-hidden group">
                                        {/* Decorative pattern */}
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />

                                        <div className="flex items-center gap-2 font-medium mb-1 opacity-90">
                                            <Zap className="w-4 h-4" />
                                            Bandwidth Saved
                                        </div>
                                        <div className="text-4xl font-bold tracking-tight mb-1">
                                            {result.savedPercent}%
                                        </div>
                                        <p className="text-sm opacity-80 leading-snug">
                                            Smaller than original HTML for bots & AI agents.
                                        </p>
                                    </div>

                                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-4">
                                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                            Metrics Breakdown
                                        </h3>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-zinc-500">Raw HTML Size</span>
                                                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-medium">{(result.htmlSize / 1024).toFixed(2)} KB</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-zinc-500">Extracted JSON</span>
                                                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-medium">{(result.jsonSize / 1024).toFixed(2)} KB</span>
                                            </div>
                                            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 my-1" />
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="text-zinc-500">Total Reduction</span>
                                                <span className="font-mono text-green-600 dark:text-green-400 font-semibold">{(result.savedBytes / 1024).toFixed(2)} KB</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pt-2">
                                                <span className="text-zinc-500">Extraction Time</span>
                                                <span className="font-mono text-zinc-900 dark:text-zinc-100 text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{result.timeMs}ms</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* JSON Display */}
                                <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-full min-h-[400px]">
                                    <div className="bg-zinc-100 dark:bg-zinc-900 py-3 px-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                                        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                                            <Code2 className="w-3.5 h-3.5" />
                                            extracted.json
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <button onClick={copyJson} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors group relative" title="Copy JSON">
                                                <Copy className="w-4 h-4" />
                                            </button>
                                            <button onClick={downloadJson} className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded transition-colors group relative" title="Download JSON">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                                        <pre className="text-[13px] leading-[1.6] font-mono text-emerald-600 dark:text-emerald-400">
                                            <code>{result.extractedJson}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
