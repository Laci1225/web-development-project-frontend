import React, {useState, useEffect} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/toaster";
import {deleteOrder, getUserOrders} from "@/api/orders";
import ManageOrder from "@/form/ManageOrder";
import {Order} from "@/model/orderData";
import {toast} from "@/components/ui/use-toast";
import {UserData} from "@/model/userData";
import {getUserData} from "@/api/users";
import Custom403 from "@/pages/403";
import {InferGetServerSidePropsType} from "next";

export const getServerSideProps = (async (context: any) => {
    if (context.params)
        return {
            props: {
                id: context.params.userId
            }
        }
})
export default function UserId({id}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [data, setData] = useState<UserData>();
    const [orders, setOrders] = useState<Order[]>([]);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Order,
        direction: 'asc' | 'desc'
    }>();
    const [error403, setError403] = useState(false);

    useEffect(() => {
        getUserData(id)
            .then(value => setData(value))
            .catch(error => {
                if (error.response && error.response.status === 403 || error.response.status === 400) {
                    setError403(true);
                }
            });

        getUserOrders(id)
            .then(value => setOrders(value))
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    setError403(true);
                }
            });
    }, []);
    if (error403) {
        return (
            <Custom403/>
        );
    }

    const sortOrders = (key: keyof Order) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});

        const sortedOrders = [...orders].sort((a, b) => {
            if (direction === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return b[key] > a[key] ? 1 : -1;
            }
        });
        setOrders(sortedOrders);
    };

    const renderTableHeaders = () => {
        const headers: {
            label: string;
            key: keyof Order
        }[] = [
            {label: 'Name', key: 'name'},
            {label: 'Amount', key: 'amount'},
            {label: 'Weight', key: 'weight'},
        ];

        return headers.map((header, index) => {
                let arrow = '↕';
                if (sortConfig?.key === header.key) {
                    arrow = sortConfig.direction === 'asc' ? '↑' : '↓';
                }
                return (
                    <TableHead
                        key={index}
                        className="text-center cursor-pointer"
                        onClick={() => sortOrders(header.key)}
                    >
                        {header.label}{' '}
                        <span>{arrow}</span>
                    </TableHead>
                )
            }
        );
    };
    return (
        <>
            {data && (
                <div className={"container w-4/6 py-28"}>
                    <div className={"flex justify-between px-6 pb-6"}>{data?.username}
                        <ManageOrder triggerName={"Add"} triggerVariant={"default"}
                                     onOrderCreated={(order) => setOrders(prevState => [...(prevState ?? []),
                                         order])}
                                     userId={data.id}/>
                    </div>
                    <Table className={"border border-gray-700 rounded"}>
                        <TableHeader>
                            <TableRow>
                                {renderTableHeaders()}
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
                                                        className={"min-w-8 justify-center"}>
                                                        <DropdownMenuSeparator/>
                                                        <DropdownMenuItem className={"justify-center w-full"} asChild>
                                                            <ManageOrder triggerName={
                                                                <span
                                                                    className="material-icons-outlined">edit</span>
                                                            }
                                                                         triggerVariant={"ghost"}
                                                                         existingOrder={order}
                                                                         onOrderCreated={(newOrder) => {
                                                                             const updatedOrders = orders.filter(value => value.id !== newOrder.id);
                                                                             setOrders([...updatedOrders, newOrder]);
                                                                         }}
                                                                         userId={data.id}
                                                            />
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className={"justify-center"}>
                                                            <Button className={"justify-center"} type={"button"}
                                                                    variant={"destructive"}
                                                                    onClick={async () => {
                                                                        await deleteOrder(order.id)
                                                                            .then((deletedOrder) =>
                                                                                toast({
                                                                                    variant: "default",
                                                                                    title: "Order data deleted successfully",
                                                                                    description: `${deletedOrder.name} deleted`
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
