"use client";

import { toast } from "@/app/_components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { themeFormSchema } from "../schemas";
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
import { Button } from "@/app/_components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/app/_components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { useTheme } from "next-themes";

export function ThemeForm() {
    const theme = useTheme();

    const form = useForm<z.infer<typeof themeFormSchema>>({
        resolver: zodResolver(themeFormSchema),
        defaultValues: {
            theme: theme.theme,
        },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        theme.setTheme((data.theme as "light") || "dark");
        toast({
            title: "Theme Updated",
            description: "Your theme settings have been updated successfully",
        });
    });

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                        <CardDescription>
                            Select the theme for the dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormMessage />
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="grid max-w-md grid-cols-2 gap-8 pt-2"
                                    >
                                        <FormItem>
                                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="light"
                                                        className="sr-only"
                                                    />
                                                </FormControl>
                                                <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                                    <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                            <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                        </div>
                                                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                        </div>
                                                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                            <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                            <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="block w-full p-2 text-center font-normal">
                                                    Light
                                                </span>
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem>
                                            <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="dark"
                                                        className="sr-only"
                                                    />
                                                </FormControl>
                                                <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                                    <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                            <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                        </div>
                                                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                        </div>
                                                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                            <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                            <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="block w-full p-2 text-center font-normal">
                                                    Dark
                                                </span>
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

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
