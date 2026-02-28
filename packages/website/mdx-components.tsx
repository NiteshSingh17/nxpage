import type { MDXComponents } from "mdx/types";
import { CopyButton } from "./app/_components/copy-button"; // We'll add a minimal server-action copy button or pure CSS later if needed, but for now just standard tags.

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => <h1 className="text-4xl font-extrabold tracking-tight mb-8 mt-12 text-zinc-900 dark:text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-semibold tracking-tight mb-6 mt-10 text-zinc-900 dark:text-white pb-2 border-b border-zinc-200 dark:border-zinc-800">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-semibold tracking-tight mb-4 mt-8 text-zinc-900 dark:text-zinc-100">{children}</h3>,
        p: ({ children }) => <p className="leading-7 text-zinc-700 dark:text-zinc-300 mb-6">{children}</p>,
        ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-700 dark:text-zinc-300">{children}</ul>,
        ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-zinc-700 dark:text-zinc-300">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        a: ({ href, children }) => (
            <a href={href} className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4">
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-zinc-300 dark:border-zinc-700 pl-6 italic text-zinc-600 dark:text-zinc-400">
                {children}
            </blockquote>
        ),
        code: ({ children, className }) => {
            const isInline = !className;
            return isInline ? (
                <code className="relative rounded bg-zinc-100 dark:bg-zinc-800/50 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-900 dark:text-zinc-200">
                    {children}
                </code>
            ) : (
                <code className={className}>{children}</code>
            );
        },
        pre: ({ children }: { children?: React.ReactNode }) => {
            // Helper to recursively extract text from React children
            const extractText = (node: any): string => {
                if (typeof node === "string") return node;
                if (Array.isArray(node)) return node.map(extractText).join("");
                if (node?.props?.children) return extractText(node.props.children);
                return "";
            };

            const codeText = extractText(children);

            return (
                <div className="relative group">
                    <pre className="mb-6 mt-6 overflow-x-auto rounded-xl bg-zinc-900 dark:bg-[#111111] border border-zinc-800 dark:border-zinc-800/80 p-5 font-mono text-[13.5px] leading-snug text-zinc-100 shadow-sm custom-scrollbar">
                        {children}
                    </pre>
                    <CopyButton text={codeText} />
                </div>
            );
        },
        hr: () => <hr className="my-10 border-zinc-200 dark:border-zinc-800" />,
        ...components,
    };
}
