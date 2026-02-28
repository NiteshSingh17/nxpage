"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarLinkProps {
    href: string;
    children: ReactNode;
}

export function SidebarLink({ href, children }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`text-sm transition-colors block py-0.5 ${isActive
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 placeholder:text-zinc-100"
                }`}
        >
            {children}
        </Link>
    );
}
