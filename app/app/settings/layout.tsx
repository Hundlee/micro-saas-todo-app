import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderTitle,
    DashboardPageMain,
} from "@/app/_components/_dashboard/dashboardPage";
import { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <DashboardPage>
            <DashboardPageHeader>
                <DashboardPageHeaderTitle>Settings</DashboardPageHeaderTitle>
            </DashboardPageHeader>
            <DashboardPageMain>
                <div className="container max-w-screen-lg">
                    <div className="grid grid-cols-[16rem_1fr] gap-12">
                        <SettingsSidebar />
                        <div>{children}</div>
                    </div>
                </div>
            </DashboardPageMain>
        </DashboardPage>
    );
}
