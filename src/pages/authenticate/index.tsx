import {useState} from 'react';
import {loginUser} from "@/api/users";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {loginSchema} from "@/form/formSchema";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/form/LoadingButton";
import Cookies from "universal-cookie";


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
        loginUser(values).then(
            response => {
                const token = response.token
                const cookie = new Cookies();
                cookie.set('jwtToken', token, {});
                setIsSubmitting(false)
                console.log(token)
            })
    }


    return (
        <div className="
        fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full
shadow-muted-foreground
        ">
            <div className={"container max-w-[500px]"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="flex justify-center flex-col space-y-4 mx-4">
                        <div className={"font-bold text-lg"}>Login form</div>

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
        </div>
    );
};
