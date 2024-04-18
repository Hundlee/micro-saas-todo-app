"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/_components/ui/sheet";
import { useRef } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form";
import { useForm } from "react-hook-form";
import { Todo } from "../types";
import { upsertTodo } from "../actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertTodoSchema } from "../schema";
import { useRouter } from "next/navigation";
import { toast } from "@/app/_components/ui/use-toast";

type TodoUpsertSheetProps = {
    children?: React.ReactNode;
    defaultValue?: Todo;
};

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(upsertTodoSchema),
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        await upsertTodo(data);
        router.refresh();

        ref.current?.click();

        toast({
            title: "Success",
            description: "Your todo has been created successfully",
        });
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div ref={ref}>{children}</div>
            </SheetTrigger>
            <SheetContent>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8 h-screen"
                    >
                        <SheetHeader>
                            <SheetTitle>Create Todo</SheetTitle>
                            <SheetDescription>
                                Add your task here. Click save when you re
                                ready.
                            </SheetDescription>
                        </SheetHeader>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your task title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is the title of your task
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SheetFooter>
                            <Button type="submit">Create Todo</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
