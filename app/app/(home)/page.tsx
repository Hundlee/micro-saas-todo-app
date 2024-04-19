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

export default async function Page() {
    const todos = await getUserTodos();

    return (
        <DashboardPage>
            <DashboardPageHeader>
                <DashboardPageHeaderTitle>Todos</DashboardPageHeaderTitle>
                <DashboardPageHeaderNav>
                    <TodoUpsertSheet>
                        <Button variant="outline" size="sm">
                            <PlusIcon className="w-4 h-4 mr-3" />
                            Add todo
                        </Button>
                    </TodoUpsertSheet>
                </DashboardPageHeaderNav>
            </DashboardPageHeader>
            <DashboardPageMain>
                <TodoDataTable data={todos} />
            </DashboardPageMain>
        </DashboardPage>
    );
}
