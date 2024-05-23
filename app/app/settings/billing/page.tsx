import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { createCheckoutSessionAction } from "./actions";
import { auth } from "@/app/_services/auth";
import { getUserCurrentPlan } from "@/app/_services/stripe";

export default async function Page() {
    const session = await auth();
    const plan = await getUserCurrentPlan(session?.user.id as string);

    return (
        <form action={createCheckoutSessionAction}>
            <Card>
                <CardHeader className="border-b border-border">
                    <CardTitle>Plan Usage</CardTitle>
                    <CardDescription>
                        You are currently on the{" "}
                        <span className="uppercase font-bold">{plan.name}</span>{" "}
                        plan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-2">
                        <header className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                                {plan.quota.TASKS.current}/
                                {plan.quota.TASKS.available}
                            </span>
                            <span className="text-muted-foreground text-sm">
                                {plan.quota.TASKS.usage.toFixed(1)}%
                            </span>
                        </header>
                        <main>
                            <Progress value={plan.quota.TASKS.usage} />
                        </main>
                    </div>
                </CardContent>
                {plan.quota.TASKS.available > 10 ? (
                    <CardFooter className="flex items-center justify-between border-t border-border pt-6">
                        <span>Thanks for the sign Pro plan</span>
                    </CardFooter>
                ) : (
                    <CardFooter className="flex items-center justify-between border-t border-border pt-6">
                        <span>
                            for a higher limit subscribe to the PRO plan
                        </span>
                        <Button type="submit">Upgrade for $9/month</Button>
                    </CardFooter>
                )}
            </Card>
        </form>
    );
}
