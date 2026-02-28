import clsx from "clsx";

type HeadingProps = {
    children: React.ReactNode;
    className?: string;
}

export const Heading = ({ children, className }: HeadingProps) => {
    return (
        <h1 className={clsx(
            'text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight',
            'text-zinc-900',
            'dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-zinc-100 dark:to-zinc-500',
            className
        )}>
            {children}
        </h1>
    );
}