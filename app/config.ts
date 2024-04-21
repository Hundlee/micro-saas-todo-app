export const config = {
    stripe: {
        publishableKey: process.env.STRIPE_PUBLISHABE_KEY,
        secretKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        plans: {
            free: {
                priceId: "price_1P7kfdBxmzJLnDmEqDVM6wgt",
                quota: {
                    TASKS: 5,
                },
            },
            pro: {
                priceId: "price_1P7kdbBxmzJLnDmEGltW3F5C",
                quota: {
                    TASKS: 100,
                },
            },
        },
    },
};
