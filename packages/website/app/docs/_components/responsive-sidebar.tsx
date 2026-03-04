"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Zap, Layers, Home, Menu } from "lucide-react";
import { SidebarLink } from "./sidebar-link";
import { ThemeToggle } from "@/app/_components/theme-toggle";

export function ResponsiveSidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="h-fit lg:sticky top-0">
            {/* mobile header with toggle */}
            <header className="flex items-center justify-between px-4 py-4 border-b md:hidden">
                <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold hover:opacity-80 transition-opacity">
                    <Home className="w-4 h-4" />
                    <span>NxPage</span>
                </Link>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileOpen((o) => !o)}
                        className="p-2 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* overlay for mobile when sidebar is open */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform md:relative md:translate-x-0 bg-zinc-50 dark:bg-zinc-900/50 border-r border-zinc-200 dark:border-zinc-800 h-screen overflow-y-auto px-4 py-8
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
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
                                <SidebarLink href="/docs/overview" onClick={() => mobileOpen && setMobileOpen(false)}>
                                    Overview
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink href="/docs/getting-started" onClick={() => mobileOpen && setMobileOpen(false)}>
                                    Getting Started
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink href="/docs/api-reference" onClick={() => mobileOpen && setMobileOpen(false)}>
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
                                <SidebarLink href="/docs/integration" onClick={() => mobileOpen && setMobileOpen(false)}>
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
                                <SidebarLink href="/docs/contributing" onClick={() => mobileOpen && setMobileOpen(false)}>
                                    Contributing
                                </SidebarLink>
                            </li>
                            <li>
                                <SidebarLink href="/docs/issues" onClick={() => mobileOpen && setMobileOpen(false)}>
                                    Bugs & Issues
                                </SidebarLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </aside>
        </div>
    );
}
