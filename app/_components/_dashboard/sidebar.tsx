import { cn } from "@/app/_lib/utils";
import Link from "next/link";

export type SidebarGenericProps<T = any> = {
    children: React.ReactNode;
    className?: string;
} & T;

export function Sidebar({ children, className }: SidebarGenericProps) {
    return (
        <aside
            className={cn([
                "border-r border-border flex flex-col space-y-6",
                className,
            ])}
        >
            {children}
        </aside>
    );
}

export function SidebarHeader({ children, className }: SidebarGenericProps) {
    return (
        <header className={cn(["px-6 py-3 border-b border-border", className])}>
            {children}
        </header>
    );
}

export function SidebarHeaderTitle({
    children,
    className,
}: SidebarGenericProps) {
    return <h2 className={cn(["", className])}>{children}</h2>;
}

export function SidebarMain({ children, className }: SidebarGenericProps) {
    return <main className={cn(["px-3", className])}>{children}</main>;
}

export function SidebarNav({ children, className }: SidebarGenericProps) {
    return <nav className={cn(["", className])}>{children}</nav>;
}

export function SidebarNavHeader({ children, className }: SidebarGenericProps) {
    return <header className={cn(["", className])}>{children}</header>;
}

export function SidebarNavHeaderTitle({
    children,
    className,
}: SidebarGenericProps) {
    return (
        <div
            className={cn([
                "text-xs uppercase text-muted-foreground ml-3",
                className,
            ])}
        >
            {children}
        </div>
    );
}

export function SidebarNavMain({ children, className }: SidebarGenericProps) {
    return <main className={cn(["flex flex-col", className])}>{children}</main>;
}

type SidebarNavLinkProps = {
    href: string;
    active?: boolean;
};

export function SidebarNavLink({
    children,
    className,
    href,
    active,
}: SidebarGenericProps<SidebarNavLinkProps>) {
    return (
        <Link
            href={href}
            className={cn([
                "flex items-center text-sm px-3 py-2 rounded-md",
                active && "bg-secondary",
                className,
            ])}
        >
            {children}
        </Link>
    );
}

export function SidebarFooter({ children, className }: SidebarGenericProps) {
    return (
        <footer
            className={cn(["p-6 mt-auto border-t border-border", className])}
        >
            {children}
        </footer>
    );
}
