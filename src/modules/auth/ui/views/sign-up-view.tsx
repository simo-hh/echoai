"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle} from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form";
import Link from "next/link";
import { set } from "date-fns";
import React from "react";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
 });

export const SignUpView = () => {
    const router = useRouter();
    const [error, setError] = React.useState<string | null>(null);
    const [pending, setPending] = React.useState<boolean>(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setError(null);
        setPending(true);

        const { error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                setPending(false);
                router.push("/");
            },
            onError: (error) => {
                setPending(false);
                setError(error.error.message);
            },
        }
    );
    };

    const onSocial = async (provider: "github" | "google") => {
        setError(null);
        setPending(true);

        const { error } = await authClient.signIn.social({
            provider: provider,
            callbackURL: "/",
        },
        {
            onSuccess: () => {
                setPending(false);
            },
            onError: (error) => {
                setPending(false);
                setError(error.error.message);
            },
        }
    );
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="ocerflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                            <div className="flex flex-col gap-6">
                                <h1 className="text-2xl font-bold">
                                    Let's get started
                                </h1>
                            </div>
                            <div className="grid gap-3 mt-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="John Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3 mt-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3 mt-3 mb-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="***********"
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3 mt-3 mb-3">
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="***********"
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                                    <AlertTitle>{error}</AlertTitle>                                
                                </Alert>)}
                            <Button
                                disabled={pending}
                                className="w-full mt-6"
                                type="submit">
                                Register
                            </Button>
                            <div className="after:border-border relative text-center text-sm after:absolute
                                after:inset-0 after:-top-1/2 after:z-0 after:flex after:items-center after:border-t mt-5">
                                    <span className="bg-card text-muted-foreground relative z-10 px-2">
                                        Or continue with
                                    </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Button disabled={pending} variant="outline" className="w-full" type="button"
                                onClick={() => onSocial("google")}>
                                    
                                    <FaGoogle />
                                </Button>
                                <Button disabled={pending} variant="outline" className="w-full" type="button"
                                    onClick={() => onSocial("github")}>
                                    <FaGithub />
                                </Button>
                            </div>
                            <div className="text-center text-sm mt-4">
                                Already have an account?{" "}
                                <Link href="/sign-in" className="underline undeline-offset-4">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </Form>
                    <div className ="bg-radial from-blue-700 to0-blue-900 relative hidden md:flex flex-col
                        gap-y-4 items-center justify-center">
                            <img src='/logo.svg' alt='Echo.AI' className="h-[92px] w-[92px]" />
                            <p className="text-2xl font-semibold text-black">
                                Echo.AI
                            </p>
                        </div>
                    </CardContent>
            </Card>

        </div>
    );
};