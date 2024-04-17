import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderTitle,
    DashboardPageMain,
} from "../../_components/_dashboard/dashboardPage";
import { TodoDataTable } from "./_components/todo-data-table";

export default async function Page() {
    return (
        <DashboardPage>
            <DashboardPageHeader>
                <DashboardPageHeaderTitle>Tarefas</DashboardPageHeaderTitle>
            </DashboardPageHeader>
            <DashboardPageMain>
                <TodoDataTable />
            </DashboardPageMain>
        </DashboardPage>
    );
}
