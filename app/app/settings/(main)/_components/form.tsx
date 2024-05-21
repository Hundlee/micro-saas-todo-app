"use client";

import { toast } from "@/app/_components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateProfile } from "../actions";
import { updateProfileSchema } from "../schemas";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { SheetFooter } from "@/app/_components/ui/sheet";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Session } from "next-auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";

type ProfileFormProps = {
    defaultValues: Session["user"];
};

export function ProfileForm({ defaultValues }: ProfileFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof updateProfileSchema>>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: defaultValues?.name ?? "",
            email: defaultValues?.email ?? "",
        },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        await updateProfile(data);
        router.refresh();

        toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully",
        });
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Name</CardTitle>
                        <CardDescription>
                            Enter your name as you did like it to appear on your
                            profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your name"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Address</CardTitle>
                                <CardDescription>
                                    To change your email, please contact support
                                    at support@micro-saas-todo.com.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
                                            readOnly
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            </CardContent>
                        </Card>
                    )}
                />

                <SheetFooter>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting && "Saving..."}
                        {!form.formState.isSubmitting && "Save changes"}
                    </Button>
                </SheetFooter>
            </form>
        </Form>
    );
}
