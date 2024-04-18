import { auth } from "@/app/_services/auth";
import { prisma } from "@/app/_services/database";

export async function getUserTodos() {
    const session = await auth();

    const todos = await prisma.todo.findMany({
        where: {
            userId: session?.user?.id,
        },
    });

    return todos;
}
