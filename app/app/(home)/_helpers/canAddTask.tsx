import { getUserCurrentPlan } from "@/app/_services/stripe";

export async function canAddTask(userId: string): Promise<boolean> {
    try {
        const userPlan = await getUserCurrentPlan(userId);

        if (userPlan.quota.TASKS.current >= userPlan.quota.TASKS.available) {
            return false;
        }

        return true;
    } catch (error) {
        console.error(
            "Erro ao verificar se o usuário pode adicionar tarefas:",
            error
        );
        return false;
    }
}
