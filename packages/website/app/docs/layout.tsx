import React from "react";
import { DocsFooter } from "./_components/docs-footer";
import { ResponsiveSidebar } from "./_components/responsive-sidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="lg:flex w-full min-h-screen bg-background text-foreground font-sans">
            <ResponsiveSidebar />


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
