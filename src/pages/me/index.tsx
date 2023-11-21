import {getMyData} from "@/api/users";
import {useState, useEffect} from "react";
import {Order, UserData} from "@/model/userData";
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
import {getOrders} from "@/api/orders";

export default function Users() {
    const [data, setData] = useState<UserData>();
    const [orders, setOrders] = useState<Order[]>();
    const router = useRouter();

    useEffect(() => {
        getMyData()
            .then(value => setData(value))
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    router.replace('/403');
                }
            });
        getOrders()
            .then(value => setOrders(value))
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    router.replace('/403');
                }
            });
    }, []);

    return (
        <div className={"container w-4/6 py-28"}>
            <div className={"flex justify-between px-6 pb-6"}>{data?.username}
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
                                            <DropdownMenuContent className={"min-w-8"}>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem className={"justify-center"}>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className={"justify-center"}>
                                                    <Button type={"button"} variant={"destructive"}
                                                            onClick={async (event) => {
                                                                event.preventDefault()
                                                                /*await deleteUser(user.id)
                                                                    .then((deletedUser) =>
                                                                        toast({
                                                                            variant: "default",
                                                                            title: "User data deleted successfully",
                                                                            description: `${deletedUser.username} deleted`
                                                                        })
                                                                    )
                                                                const updatedUsers = usersData.filter(c => c.id !== user.id)
                                                                setUsersData(updatedUsers);*/
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
    )
}
