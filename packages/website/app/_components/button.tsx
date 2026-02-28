import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & PropsWithChildren;

export const PrimaryButton = ({ children, ...rest }: PrimaryButtonProps) => {
    return <button {...rest} className="cursor-pointer flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2 text-background font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10 dark:hover:bg-zinc-200 md:w-auto">
        {children}
    </button>
}

export const SecondaryButton = ({ children, ...rest }: PrimaryButtonProps) => {
    return <button {...rest} className="text-foreground bg-transparent dark:text-zinc-300 cursor-pointer flex h-12 w-full items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 px-6 py-2 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 md:w-auto">
        {children}
    </button>
}