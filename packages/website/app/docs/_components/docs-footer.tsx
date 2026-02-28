"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DOC_PAGES = [
    { href: "/docs/overview", title: "Overview" },
    { href: "/docs/getting-started", title: "Getting Started" },
    { href: "/docs/api-reference", title: "Options & Packages" },
    { href: "/docs/integration", title: "Existing Project Integration" },
    { href: "/docs/contributing", title: "Contributing" },
    { href: "/docs/issues", title: "Bugs & Issues" },
];

export function DocsFooter() {
    const pathname = usePathname();
    const currentIndex = DOC_PAGES.findIndex(page => page.href === pathname);

    if (currentIndex === -1) return null;

    const prevPage = currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null;
    const nextPage = currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null;

    return (
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevPage ? (
                <Link
                    href={prevPage.href}
                    className="flex flex-col items-start px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors w-full sm:w-1/2 group"
                >
                    <span className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                        <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        Previous
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{prevPage.title}</span>
                </Link>
            ) : (
                <div className="w-full sm:w-1/2" />
            )}

            {nextPage ? (
                <Link
                    href={nextPage.href}
                    className="flex flex-col items-end px-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors w-full sm:w-1/2 text-right group"
                >
                    <span className="text-xs text-zinc-500 mb-1 flex items-center gap-1">
                        Next
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{nextPage.title}</span>
                </Link>
            ) : (
                <div className="w-full sm:w-1/2" />
            )}
        </div>
    );
}
