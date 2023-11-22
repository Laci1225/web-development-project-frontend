import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {UserData} from "@/model/userData";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import {deleteUser, getAllUserServer} from "@/api/users";

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

interface RemoveUserProps {
    user: UserData
    usersData: UserData[]
    setUsersData: Dispatch<SetStateAction<UserData[]>>
}

function RemoveUser({user, usersData, setUsersData}: RemoveUserProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button type={"button"} variant={"destructive"}>
                    <span className="material-icons-outlined">delete</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => {
                        deleteUser(user.id)
                            .then((deletedUser) => {
                                    toast({
                                        variant: "default",
                                        title: "User data deleted successfully",
                                        description: `${deletedUser.username} deleted`
                                    });
                                    const updatedUsers = usersData.filter(c => c.id !== user.id)
                                    setUsersData(updatedUsers);
                                }
                            ).catch(error => {
                            if (error.response && error.response.status === 400) {
                                alert("Dont have permission to do that")
                            }
                        });
                    }
                    }>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function Users({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [usersData, setUsersData] = useState<UserData[]>([])
    useEffect(() => {
        setUsersData(users);
    }, [users])
    /*
    const onUserUpdated = (updatedUser: UserData) => {
        const updatedUsers = usersData.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
        );
        setUsersData(updatedUsers)
    }*/

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
                                        {user.orders.length} piece of order
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
                                                <DropdownMenuItem className={"justify-center"}
                                                                  onClick={e => e.preventDefault()}>
                                                    <RemoveUser user={user} usersData={usersData}
                                                                setUsersData={setUsersData}/>
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