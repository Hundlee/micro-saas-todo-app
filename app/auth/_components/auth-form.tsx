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

export default function AuthForm() {
    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await signIn("email", { email: data.email, redirect: false });
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
                <Button className="w-full p-5" type="submit">
                    Send Magic Link
                </Button>
            </form>
        </Card>
    );
}
