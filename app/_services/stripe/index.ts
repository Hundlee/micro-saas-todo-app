import Stripe from "stripe";
import { config } from "@/app/config";
import { prisma } from "../database";

export const stripe = new Stripe(config.stripe.secretKey || "", {
    apiVersion: "2024-04-10",
    httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email: string) => {
    const customers = await stripe.customers.list({ email });
    return customers.data[0];
};

export const createStripeCustomer = async (input: {
    name?: string;
    email: string;
}) => {
    const customer = await getStripeCustomerByEmail(input.email);
    if (customer) return customer;

    const createdCustomer = await stripe.customers.create({
        email: input.email,
        name: input.name,
    });

    const createdCustomerSubscription = await stripe.subscriptions.create({
        customer: createdCustomer.id,
        items: [{ price: config.stripe.plans.free.priceId }],
    });

    await prisma.user.update({
        where: {
            email: input.email,
        },
        data: {
            stripeCustomerId: createdCustomer.id,
            stripeSubscriptionId: createdCustomerSubscription.id,
            stripeSubscriptionStatus: createdCustomerSubscription.status,
            stripePriceId: config.stripe.plans.free.priceId,
        },
    });

    return createdCustomer;
};

export const createCheckoutSession = async (
    userId: string,
    userEmail: string,
    userStripeSubscriptionId: string
) => {
    try {
        let customer = await createStripeCustomer({
            email: userEmail,
        });

        const subscription = await stripe.subscriptionItems.list({
            subscription: userStripeSubscriptionId,
            limit: 1,
        });

        const session = await stripe.billingPortal.sessions.create({
            customer: customer.id,
            return_url:
                "https://micro-saas-todo-app-eosin.vercel.app/app/settings/billing",
            flow_data: {
                type: "subscription_update_confirm",
                after_completion: {
                    type: "redirect",
                    redirect: {
                        return_url:
                            "https://micro-saas-todo-app-eosin.vercel.app/app/settings/billing?success=true",
                    },
                },
                subscription_update_confirm: {
                    subscription: userStripeSubscriptionId,
                    items: [
                        {
                            id: subscription.data[0].id,
                            price: config.stripe.plans.pro.priceId,
                            quantity: 1,
                        },
                    ],
                },
            },
        });

        return {
            url: session.url,
        };
    } catch (error) {
        console.log(error);
        throw new Error(`Error to create checkout session`);
    }
};

export const handleProcessWebhookCheckout = async (event: {
    object: Stripe.Checkout.Session;
}) => {
    const clientReferenceId = event.object.client_reference_id as string;
    const stripeSubscriptionId = event.object.subscription as string;
    const stripeCustomerId = event.object.customer as string;
    const checkoutStatus = event.object.status;

    if (checkoutStatus !== "complete") return;

    if (!clientReferenceId || !stripeSubscriptionId || !stripeCustomerId) {
        throw new Error(
            "clientReferenceId, stripeSubscriptionId and stripeCustomerId is required"
        );
    }

    const userExists = await prisma.user.findUnique({
        where: {
            id: clientReferenceId,
        },
        select: {
            id: true,
        },
    });

    if (!userExists) {
        throw new Error("user of clientReferenceId not found");
    }

    await prisma.user.update({
        where: {
            id: userExists.id,
        },
        data: {
            stripeCustomerId,
            stripeSubscriptionId,
        },
    });
};

export const handleProcessWebhookUpdatedSubscription = async (event: {
    object: Stripe.Subscription;
}) => {
    const stripeSubscriptionId = event.object.id as string;
    const stripeCustomerId = event.object.customer as string;
    const stripeSubscriptionStatus = event.object.status;
    const stripePriceId = event.object.items.data[0].price.id;

    const userExists = await prisma.user.findFirst({
        where: {
            stripeCustomerId,
        },
        select: {
            id: true,
        },
    });

    if (!userExists) {
        throw new Error("user of stripeCustomerId not found");
    }

    await prisma.user.update({
        where: {
            id: userExists.id,
        },
        data: {
            stripeCustomerId,
            stripeSubscriptionId,
            stripeSubscriptionStatus,
            stripePriceId,
        },
    });
};

type Plan = {
    priceId: string;
    quota: {
        TASKS: number;
    };
};

type Plans = {
    [key: string]: Plan;
};

export const getPlanByPrice = async (priceId: string) => {
    const plans: Plans = config.stripe.plans;

    const planKey = Object.keys(plans).find(
        (key) => plans[key].priceId === priceId
    ) as keyof Plans | undefined;

    const plan = planKey ? plans[planKey] : null;
    if (!plan) {
        throw new Error(`Plan not found for priceId: ${priceId}`);
    }

    return {
        name: planKey,
        quota: plan.quota,
    };
};

export const getUserCurrentPlan = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stripePriceId: true,
        },
    });

    if (!user || !user.stripePriceId) {
        throw new Error("User or user stripePriceId not found");
    }

    const plan = await getPlanByPrice(user.stripePriceId);
    const tasksCount = await prisma.todo.count({
        where: {
            userId,
        },
    });

    const availableTasks = plan.quota.TASKS;
    const currentTasks = tasksCount;
    const usage = (currentTasks / availableTasks) * 100;

    return {
        name: plan.name,
        quota: {
            TASKS: {
                available: availableTasks,
                current: currentTasks,
                usage,
            },
        },
    };
};
