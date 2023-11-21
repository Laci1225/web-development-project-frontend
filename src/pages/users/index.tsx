import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {UserData} from "@/model/userData";
import {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {toast} from "@/components/ui/use-toast";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Toaster} from "@/components/ui/toaster";
import {getAllUserServer} from "@/api/users";

export const getServerSideProps = (async () => {
    const users = await getAllUserServer()
    return {
        props: {
            users
        }
    };
}) satisfies GetServerSideProps<{
    users: UserData[]
}>;

export default function Users({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [usersData, setUsersData] = useState<UserData[]>([])
    useEffect(() => {
        setUsersData(users);
    }, [users])
    const onUserCreated = (newUser: UserData) => {
        setUsersData(prevState => [...prevState, newUser])
    }
    const onUserUpdated = (updatedUser: UserData) => {
        const updatedUsers = usersData.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsersData(updatedUsers)
    }

    return (
        <div className={"container w-4/6 py-28"}>
            <div className={"flex justify-between px-6 pb-6"}>Users
            </div>
            <Table className={"border border-gray-700 rounded"}>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Username</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Orders</TableHead>
                        <TableHead className="px-5"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        usersData && usersData.length !== 0 ? (
                            usersData.map((user) => (
                                <TableRow key={user.id} className={"hover:bg-gray-200"}>
                                    <TableCell className="text-center">
                                        {user.username}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {user.email}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        Nothing
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