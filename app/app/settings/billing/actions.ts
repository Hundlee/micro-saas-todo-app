"use server";

import { auth } from "@/app/_services/auth";
import { createCheckoutSession } from "@/app/_services/stripe";
import { redirect } from "next/navigation";

export async function createCheckoutSessionAction() {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Not authorized",
            data: null,
        };
    }

    const checkoutSession = await createCheckoutSession(
        session.user.id as string,
        session.user.email as string,
        session.user.stripeSubscriptionId as string
    );

    if (!checkoutSession.url) return;

    redirect(checkoutSession.url);
}
