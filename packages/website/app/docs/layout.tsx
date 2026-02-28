import React from "react";
import Link from "next/link";
import { BookOpen, Zap, Layers, Home } from "lucide-react";
import { ThemeToggle } from "../_components/theme-toggle";
import { DocsFooter } from "./_components/docs-footer";
import { SidebarLink } from "./_components/sidebar-link";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full min-h-screen bg-background text-foreground font-sans">
            {/* Desktop Sidebar (CSS Only, No JS hooks for toggle!) */}
            <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 h-screen sticky top-0 overflow-y-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold hover:opacity-80 transition-opacity">
                        <Home className="w-4 h-4" />
                        <span>NxPage</span>
                    </Link>
                    <ThemeToggle />
                </div>

                <nav className="space-y-8">
                    <div>
                        <h4 className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                            <BookOpen className="w-4 h-4 text-emerald-500" />
                            Core Concepts
                        </h4>
                        <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800 ml-2 pl-4">
                            <li>
                                <SidebarLink href="/docs/overview">
                                    Overview
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink href="/docs/getting-started">
                                    Getting Started
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink href="/docs/api-reference">
                                    Options & Packages
                                </SidebarLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                            <Layers className="w-4 h-4 text-purple-500" />
                            Guides
                        </h4>
                        <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800 ml-2 pl-4">
                            <li>
                                <SidebarLink href="/docs/integration">
                                    Existing Project Integration
                                </SidebarLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-amber-500" />
                            Community
                        </h4>
                        <ul className="space-y-2 border-l border-zinc-200 dark:border-zinc-800 ml-2 pl-4">
                            <li>
                                <SidebarLink href="/docs/contributing">
                                    Contributing
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink href="/docs/issues">
                                    Bugs & Issues
                                </SidebarLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>

            {/* Main MDX Content Area */}
            <main className="flex-1 w-full max-w-4xl px-6 md:px-12 py-12 mx-auto overflow-x-hidden">
                <article className="prose prose-zinc dark:prose-invert max-w-none">
                    {children}
                </article>
                <DocsFooter />
            </main>
        </div>
    );
}
