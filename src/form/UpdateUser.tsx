import React, {ChangeEvent, useState} from 'react';
import {updateUser} from "@/api/users";
import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {registerSchema} from "@/form/formSchema";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import LoadingButton from "@/form/LoadingButton";
import {Toaster} from "@/components/ui/toaster";
import {UserData} from "@/model/userData";
import {Button} from "@/components/ui/button";
import {toast} from "@/components/ui/use-toast";

interface RegisterPros {
    user: UserData
}

export default function UpdateUser({user}: RegisterPros) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showError, setShowError] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: user.username,
            email: user.email,
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsSubmitting(true)
        updateUser(user.username, values).then(
            value => {
                toast({
                    title: "Successfully updated",
                    duration: 2000
                })
                console.log(value)
                setIsSubmitting(false)
                window.location.reload()
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
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild onClick={event => event.preventDefault()}>
                    <Button onClick={() => {
                        setDialogOpen(true)
                    }} variant={"ghost"}
                    ><span className="material-icons-outlined">edit</span></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] max-h-[90vh] shadow-muted-foreground">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                              className="flex justify-center flex-col space-y-4 mx-4 py-4">
                            <div className={"font-bold text-lg"}>Update a user</div>
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
                                                <Input placeholder="New passsword" {...field} type={"password"}
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
                            <DialogFooter>
                                <LoadingButton type="submit" isLoading={isSubmitting} value={"Update"}/>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <Toaster/>
        </>

    );
};
