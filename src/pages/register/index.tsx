import React, {ChangeEvent, useState} from 'react';
import {registerUser} from "@/api/users";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {registerSchema} from "@/form/formSchema";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/form/LoadingButton";
import {toast} from "@/components/ui/use-toast";
import {Toaster} from "@/components/ui/toaster";
import {router} from "next/client";


export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showError, setShowError] = useState(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsSubmitting(true)
        registerUser(values).then(
            value => {
                toast({
                    title: "Successfully registered",
                })
                setIsSubmitting(false)
                router.replace('/authenticate');

            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    form.setError('username', {
                        type: 'manual',
                        message: 'Username already taken'
                    });
                    setShowError(true);
                    setIsSubmitting(false)
                }
            });
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name} = event.target;
        if (showError) {
            if (name === 'username' || name === 'password' || name === 'email') {
                setShowError(false);
            }
        }
    };

    return (
        <>
            <div className="
        fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full
shadow-muted-foreground
        ">
                <div className={"container max-w-[500px]"}>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="flex justify-center flex-col space-y-4 mx-4 py-4">
                            <div className={"font-bold text-lg"}>Registration form</div>
                            <div className="mx-4 flex flex-col py-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Username*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Usarname" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="email" {...field} onChange={(e) => {
                                                    form.setValue('email', e.target.value);
                                                    handleInputChange(e);
                                                }}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password*</FormLabel>
                                            <FormControl>
                                                <Input placeholder="password" {...field} type={"password"}
                                                       onChange={(e) => {
                                                           form.setValue('password', e.target.value);
                                                           handleInputChange(e);
                                                       }}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <LoadingButton type="submit" isLoading={isSubmitting} value={"Register"}/>
                        </form>
                    </Form>
                </div>
            </div>
            <Toaster/>
        </>

    );
};
