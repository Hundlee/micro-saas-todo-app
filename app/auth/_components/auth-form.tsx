"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardHeader, CardTitle } from "@/app/_components/ui/card";

import { signIn } from "next-auth/react";

export default function AuthForm() {
    const handleLoginWithGoogle = async () => {
        await signIn("google");
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
            </CardHeader>

            <div className="px-5 pb-5">
                <Button className="w-full" onClick={handleLoginWithGoogle}>
                    Login with Google
                </Button>
            </div>
        </Card>
    );
}
