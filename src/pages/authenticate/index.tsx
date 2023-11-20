import {FormEvent, useEffect, useState} from 'react';
import {postLogin} from "@/api/users";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {loginSchema, registerSchema} from "@/form/formSchema";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/form/LoadingButton";


export default function Authenticate() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsSubmitting(true)
        postLogin(values).then(
            value => {
                console.log(value)
                setIsSubmitting(false)
            })
    }


    return (
        <div className={"container max-w-[500px]"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex justify-center flex-col space-y-4 mx-4">
                    <div className="mx-4 flex flex-col">
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
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <LoadingButton type="submit" isLoading={isSubmitting}/>
                </form>
            </Form>
        </div>
    );
};
