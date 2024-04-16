"use client";

import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMain,
    SidebarNav,
    SidebarNavHeader,
    SidebarNavHeaderTitle,
    SidebarNavLink,
    SidebarNavMain,
} from "@/app/_components/_dashboard/sidebar";
import { HomeIcon, Settings2 } from "lucide-react";
import { usePathname } from "next/navigation";

export function MainSideBar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <h1></h1>
            </SidebarHeader>
            <SidebarMain className="flex flex-col flex-grow">
                <SidebarNav>
                    <SidebarNavMain>
                        <SidebarNavLink href="/app" active={isActive("/app")}>
                            <HomeIcon size={18} className="mr-3" />
                            Tarefas
                        </SidebarNavLink>
                        <SidebarNavLink
                            href="/app/settings"
                            active={isActive("/app/settings")}
                        >
                            <Settings2 size={18} className="mr-3" />
                            Configurações
                        </SidebarNavLink>
                    </SidebarNavMain>
                </SidebarNav>

                <SidebarNav className="mt-auto">
                    <SidebarNavHeader>
                        <SidebarNavHeaderTitle>
                            Links extras
                        </SidebarNavHeaderTitle>
                    </SidebarNavHeader>
                    <SidebarNavMain>
                        <SidebarNavLink href="/">
                            Precisa de ajuda?
                        </SidebarNavLink>
                        <SidebarNavLink href="/">Site</SidebarNavLink>
                    </SidebarNavMain>
                </SidebarNav>
            </SidebarMain>
            <SidebarFooter>
                <h1>User</h1>
            </SidebarFooter>
        </Sidebar>
    );
}
