    import {FormEvent, useEffect, useState} from 'react';
    import {postRegister} from "@/api/users";
    import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
    import {registerSchema} from "@/form/formSchema";
    import {useForm} from "react-hook-form"
    import {zodResolver} from "@hookform/resolvers/zod";
    import {z} from "zod";
    import {Input} from "@/components/ui/input";
    import LoadingButton from "@/form/LoadingButton";


export default function Table(){
    const [isSubmitting, setIsSubmitting] = useState(false)
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
        postRegister(values).then(
            value => {
                console.log(value)
                setIsSubmitting(false)
            })
    }



    return(
        <div className={"container"}>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className="flex justify-center flex-col space-y-4 mx-4">
                <div className="mx-4">
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Family name*</FormLabel>
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
                                <FormItem className="flex-1">
                                    <FormLabel>Given name*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Birthdate*</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            <LoadingButton type="submit" isLoading={isSubmitting}/>
        </form>
    </Form>
        </div>
        );
    };
