import { Button } from "@/app/_components/ui/button";
import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderNav,
    DashboardPageHeaderTitle,
    DashboardPageMain,
} from "../../_components/_dashboard/dashboardPage";
import { TodoDataTable } from "./_components/todo-data-table";
import { TodoUpsertSheet } from "./_components/todo-upsert-sheet";
import { PlusIcon } from "lucide-react";
import { getUserTodos } from "./actions";
import { auth } from "@/app/_services/auth";
import { canAddTask } from "./_helpers/canAddTask";
import Link from "next/link";

export default async function Page() {
    const todos = await getUserTodos();
    const session = await auth();

    if (!session) {
        return;
    }

    const userCanAddTask = await canAddTask(session.user.id);

    return (
        <DashboardPage>
            <DashboardPageHeader className="h-[80px]">
                <DashboardPageHeaderTitle>Todos</DashboardPageHeaderTitle>
                <DashboardPageHeaderNav>
                    {userCanAddTask ? (
                        <TodoUpsertSheet>
                            <Button variant="outline" size="sm">
                                <PlusIcon className="w-4 h-4 mr-3" />
                                Add todo
                            </Button>
                        </TodoUpsertSheet>
                    ) : (
                        <Button>
                            <Link href="/app/settings/billing">
                                Upgrade Plan
                            </Link>
                        </Button>
                    )}
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain>
                <TodoDataTable data={todos} />
            </DashboardPageMain>
        </DashboardPage>
    );
}
