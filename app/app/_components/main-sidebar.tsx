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

export function MainSideBar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <DashboardSidebar>
            <DashboardSidebarHeader className="flex">
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
                            Tarefas
                        </DashboardSidebarNavLink>
                        <DashboardSidebarNavLink
                            href="/app/settings"
                            active={isActive("/app/settings")}
                        >
                            <Settings2 size={18} className="mr-3" />
                            Configurações
                        </DashboardSidebarNavLink>
                    </DashboardSidebarNavMain>
                </DashboardSidebarNav>

                <DashboardSidebarNav className="mt-auto">
                    <DashboardSidebarNavHeader>
                        <DashboardSidebarNavHeaderTitle>
                            Links extras
                        </DashboardSidebarNavHeaderTitle>
                    </DashboardSidebarNavHeader>
                    <DashboardSidebarNavMain>
                        <DashboardSidebarNavLink href="/">
                            Precisa de ajuda?
                        </DashboardSidebarNavLink>
                        <DashboardSidebarNavLink href="/">
                            Site
                        </DashboardSidebarNavLink>
                    </DashboardSidebarNavMain>
                </DashboardSidebarNav>
            </DashboardSidebarMain>
            <DashboardSidebarFooter>
                <UserDropdown />
            </DashboardSidebarFooter>
        </DashboardSidebar>
    );
}
