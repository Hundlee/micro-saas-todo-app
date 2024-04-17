import { PropsWithChildren } from "react";

import { MainSideBar } from "./_components/main-sidebar";
import { auth } from "../_services/auth";

export default async function Layout({ children }: PropsWithChildren) {
    const session = await auth();

    return (
        <div className="grid grid-cols-[20rem_1fr]">
            <MainSideBar user={session?.user} />
            <main>{children}</main>
        </div>
    );
}
