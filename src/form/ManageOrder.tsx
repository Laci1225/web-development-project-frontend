import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import {orderSchema} from "@/form/formSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {toast} from "@/components/ui/use-toast";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button, ButtonProps} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {Input} from "@/components/ui/input";
import {createOrder, updateOrder} from "@/api/orders";
import {Order} from "@/model/orderData";

interface OrderFormProps {
    onOrderCreated: (order: Order) => void;
    existingOrder?: Order
    triggerName: ReactNode
    triggerVariant?: ButtonProps["variant"]
}


export default function ManageOrder({onOrderCreated, existingOrder, triggerVariant, triggerName}: OrderFormProps) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const form = useForm<z.infer<typeof orderSchema>>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            name: existingOrder?.name,
            amount: existingOrder?.amount,
            weight: existingOrder?.weight
        },
    })

    function onSubmit(values: z.infer<typeof orderSchema>) {
        setIsSubmitting(true)
        if (existingOrder) {
            updateOrder(existingOrder.id, values)
                .then((result) => {
                    onOrderCreated(result)
                    toast({
                        title: "An order is successfully updated",
                        description: `An order with name: ${form.getValues("name")} updated`,
                    })
                    setDialogOpen(false)
                }).catch(reason => {
                toast({
                    variant: "destructive",
                    title: reason.toString(),
                })
            }).finally(() => {
                setIsSubmitting(false)
            })
        } else {
            createOrder(values)
                .then((result) => {
                    onOrderCreated(result)
                    toast({
                        title: "An order is successfully added",
                        description: `An order with name: ${form.getValues("name")} created`,
                    })
                    setDialogOpen(false)
                }).catch(reason => {
                toast({
                    variant: "destructive",
                    title: reason.toString(),
                })
            }).finally(() => {
                setIsSubmitting(false)
            })
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => {
                    setDialogOpen(true)
                    existingOrder || form.reset()
                }} variant={triggerVariant}
                >{triggerName}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] h-[60vh] shadow-muted-foreground">
                <DialogHeader>
                    <DialogTitle>{triggerName} an order</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="flex justify-center flex-col space-y-4 mx-4">
                        <div className="mx-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Weight*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Weight" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Amount*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Amount" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type={"submit"}>{triggerName}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}