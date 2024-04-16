import { cn } from "@/app/_lib/utils";

export type DashboardPageGenericProps<T = any> = {
    children: React.ReactNode;
    className?: string;
} & T;

export function DashboardPage({
    children,
    className,
}: DashboardPageGenericProps) {
    return (
        <section className={cn(["h-screen", className])}>{children}</section>
    );
}

export function DashboardPageHeader({
    children,
    className,
}: DashboardPageGenericProps) {
    return (
        <header className={cn(["px-6 py-3 border-b border-border", className])}>
            {children}
        </header>
    );
}
export function DashboardPageHeaderTitle({
    children,
    className,
}: DashboardPageGenericProps) {
    return (
        <h1 className={cn(["text-muted-foreground uppercase", className])}>
            {children}
        </h1>
    );
}
export function DashboardPageHeaderNav({
    children,
    className,
}: DashboardPageGenericProps) {
    return <nav className={cn(["", className])}>{children}</nav>;
}
export function DashboardPageMain({
    children,
    className,
}: DashboardPageGenericProps) {
    return <main className={cn(["p-6", className])}>{children}</main>;
}
