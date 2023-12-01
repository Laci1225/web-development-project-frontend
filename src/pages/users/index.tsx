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

function EditUser({user, usersData, setUsersData}: RemoveUserProps) {
    return (<></>)
}

export default function Users({users}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [usersData, setUsersData] = useState<UserData[]>([])
    const [sortConfig, setSortConfig] = useState<{ key: keyof UserData, direction: 'asc' | 'desc' }>();
    useEffect(() => {
        setUsersData(users);
    }, [users])
    const sortUsers = (key: keyof UserData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({key, direction});

        const sortedUsers = [...usersData].sort((a, b) => {
            if (direction === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return b[key] > a[key] ? 1 : -1;
            }
        });
        setUsersData(sortedUsers);
    };

    const renderTableHeaders = () => {
        const headers: { label: string; key: keyof UserData }[] = [
            {label: 'Username', key: 'username'},
            {label: 'Email', key: 'email'},
            {label: 'Orders', key: 'orders'},
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
                        onClick={() => sortUsers(header.key)}
                    >
                        {header.label}{' '}
                        <span>{arrow}</span>
                    </TableHead>
                )
            }
        );
    };
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
                        {renderTableHeaders()}
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
                                                <DropdownMenuItem className={"justify-center"}
                                                                  onClick={e => e.preventDefault()}>
                                                    Edit
                                                    <EditUser user={user} usersData={usersData}
                                                              setUsersData={setUsersData}/>
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