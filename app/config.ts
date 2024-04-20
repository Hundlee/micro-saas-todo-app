export const config = {
    stripe: {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABE_KEY,
        secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
        webhookSecret:
            "whsec_a0f709d4b6a605952daf26d91e0f9a7152163856b91658bb1106968bf8c151f6",
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
