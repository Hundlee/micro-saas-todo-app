import { PropsWithChildren } from "react";

import { MainSideBar } from "./_components/main-sidebar";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <div className="grid grid-cols-[20rem_1fr] gap-4">
            <MainSideBar />
            <main>{children}</main>
        </div>
    );
}
