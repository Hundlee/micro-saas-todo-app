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
import { getPlanByPrice } from "@/app/_services/stripe";

export default async function Page() {
    const session = await auth();
    const plan = getPlanByPrice(session?.user.stripePriceId as string);

    return (
        <form action={createCheckoutSessionAction}>
            <Card>
                <CardHeader className="border-b border-border">
                    <CardTitle>Plan Usage</CardTitle>
                    <CardDescription>
                        You are currently on the{" "}
                        <span className="uppercase font-bold">
                            {(await plan).name}
                        </span>{" "}
                        plan.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-2">
                        <header className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm">
                                1/{(await plan).quota.TASKS}
                            </span>
                            <span className="text-muted-foreground text-sm">
                                20%
                            </span>
                        </header>
                        <main>
                            <Progress value={20} />
                        </main>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border pt-6">
                    <span>for a higher limit subscribe to the PRO plan</span>
                    <Button type="submit">Upgrade for $9/month</Button>
                </CardFooter>
            </Card>
        </form>
    );
}
