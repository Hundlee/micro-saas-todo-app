"use server";

import { auth } from "@/app/_services/auth";
import { prisma } from "@/app/_services/database";
import { updateProfileSchema } from "./schemas";
import { z } from "zod";

export async function updateProfile(
    input: z.infer<typeof updateProfileSchema>
) {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Not authorized",
            data: null,
        };
    }

    await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name: input.name,
        },
    });
}
