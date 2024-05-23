"use client";

import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "@/app/_components/ui/use-toast";
import { Separator } from "@/app/_components/ui/separator";

export default function AuthForm() {
    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await signIn("nodemailer", { email: data.email, redirect: false });
            toast({
                title: "Magic Link Sent",
                description: "Check your email for the magic link to login",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "An error ocurred. Please try again",
            });
        }
    });

    const handleLogin = async () => {
        await signIn("google");
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <form className="space-y-4 p-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="m@example.com"
                        required
                        type="email"
                        {...form.register("email")}
                    />
                </div>
                <Button
                    className="w-full p-5"
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting
                        ? "Sending..."
                        : "Send Magic Link"}
                </Button>
            </form>

            <div className="pb-5">
                <Separator />
            </div>

            <div className="px-5 pb-5">
                <Button className="w-full" onClick={handleLogin}>
                    Login with Google
                </Button>
            </div>
        </Card>
    );
}
