import {useState, useEffect} from "react";
import {UserData} from "@/model/userData";
import {useRouter} from "next/router";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/toaster";
import {deleteOrder, getOrders} from "@/api/orders";
import ManageOrder from "@/form/ManageOrder";
import {Order} from "@/model/orderData";
import {toast} from "@/components/ui/use-toast";
import {getMyData} from "@/api/users";

export default function Me() {
    getMyData()
        .then(value => setData(value))
        .catch(error => {
            if (error.response && error.response.status === 403) {
                router.replace('/403');
            }
        });
    const [data, setData] = useState<UserData>();
    const [orders, setOrders] = useState<Order[]>([]);
    const router = useRouter();

    useEffect(() => {
        getOrders()
            .then(value => setOrders(value))
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    router.replace('/403');
                }
            });
    }, [router]);

    return (
        <>
            {data && (
                <div className={"container w-4/6 py-28"}>
                    <div className={"flex justify-between px-6 pb-6"}>{data?.username}
                        <ManageOrder triggerName={"Add"} triggerVariant={"default"}
                                     onOrderCreated={(order) => setOrders(prevState => [...(prevState ?? []), order])}/>
                    </div>
                    <Table className={"border border-gray-700 rounded"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">Name</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                                <TableHead className="text-center">Weight</TableHead>
                                <TableHead className="px-5"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                orders && orders.length !== 0 ? (
                                    orders.map((order) => (
                                        <TableRow key={order.id} className={"hover:bg-gray-200"}>
                                            <TableCell className="text-center">
                                                {order.name}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {order.amount}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {order.weight}
                                            </TableCell>
                                            <TableCell className="p-1 text-center">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger>
                                                        <span className="material-icons-outlined">more_horiz</span>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        className={"max-w-8 justify-center flex flex-col"}>
                                                        <DropdownMenuSeparator/>
                                                        <DropdownMenuItem className={"justify-center"} asChild>
                                                            <ManageOrder triggerName={"Edit"} triggerVariant={"default"}
                                                                         existingOrder={order}
                                                                         onOrderCreated={(newOrder) => {
                                                                             const updatedOrders = orders.filter(value => value.id !== newOrder.id);
                                                                             setOrders([...updatedOrders, newOrder]);
                                                                         }}
                                                            />
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className={"justify-center"} asChild>
                                                            <Button type={"button"} variant={"destructive"}
                                                                    onClick={async () => {
                                                                        await deleteOrder(order.id)
                                                                            .then((deletedUser) =>
                                                                                toast({
                                                                                    variant: "default",
                                                                                    title: "User data deleted successfully",
                                                                                    description: `${deletedUser.username} deleted`
                                                                                })
                                                                            )
                                                                        const updatedOrders = orders.filter(c => c.id !== order.id)
                                                                        setOrders(updatedOrders);
                                                                    }}><span
                                                                className="material-icons-outlined">delete</span>
                                                            </Button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>Nothing added</TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                    <Toaster/>
                </div>
            )}
        </>
    )
}
