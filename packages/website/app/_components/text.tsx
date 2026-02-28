import clsx from "clsx";
import { HTMLAttributes, JSX, PropsWithChildren } from "react";

type TextProps = HTMLAttributes<HTMLParagraphElement> & PropsWithChildren;

export const Text = (props: TextProps): JSX.Element => {
    return <p {...props} className={clsx("text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 font-normal", props.className)}>
        {props.children}
    </p>
}