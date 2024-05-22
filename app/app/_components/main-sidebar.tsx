"use client";

import {
    DashboardSidebar,
    DashboardSidebarFooter,
    DashboardSidebarHeader,
    DashboardSidebarHeaderTitle,
    DashboardSidebarMain,
    DashboardSidebarNav,
    DashboardSidebarNavHeader,
    DashboardSidebarNavHeaderTitle,
    DashboardSidebarNavLink,
    DashboardSidebarNavMain,
} from "@/app/_components/_dashboard/dashBoardSidebar";
import { HomeIcon, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Logo } from "@/app/_components/logo";
import { Session } from "next-auth";

type MainSidebarProps = {
    user: Session["user"];
};

export function MainSideBar({ user }: MainSidebarProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <DashboardSidebar>
            <DashboardSidebarHeader className="flex items-center h-[80px]">
                <Logo />
                <DashboardSidebarHeaderTitle className="ml-3">
                    Todo-App
                </DashboardSidebarHeaderTitle>
            </DashboardSidebarHeader>
            <DashboardSidebarMain className="flex flex-col flex-grow">
                <DashboardSidebarNav>
                    <DashboardSidebarNavMain>
                        <DashboardSidebarNavLink
                            href="/app"
                            active={isActive("/app")}
                        >
                            <HomeIcon size={18} className="mr-3" />
                            Todos
                        </DashboardSidebarNavLink>
                        <DashboardSidebarNavLink
                            href="/app/settings"
                            active={isActive("/app/settings")}
                        >
                            <Settings2 size={18} className="mr-3" />
                            Settings
                        </DashboardSidebarNavLink>
                    </DashboardSidebarNavMain>
                </DashboardSidebarNav>

                <DashboardSidebarNav className="mt-auto">
                    <DashboardSidebarNavHeader>
                        <DashboardSidebarNavHeaderTitle>
                            Extra Links
                        </DashboardSidebarNavHeaderTitle>
                    </DashboardSidebarNavHeader>
                    <DashboardSidebarNavMain>
                        <DashboardSidebarNavLink href="/">
                            Need help?
                        </DashboardSidebarNavLink>
                        <DashboardSidebarNavLink href="/">
                            Site
                        </DashboardSidebarNavLink>
                    </DashboardSidebarNavMain>
                </DashboardSidebarNav>
            </DashboardSidebarMain>
            <DashboardSidebarFooter>
                <UserDropdown user={user} />
            </DashboardSidebarFooter>
        </DashboardSidebar>
    );
}
