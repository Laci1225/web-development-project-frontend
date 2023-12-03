import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import 'material-icons/iconfont/material-icons.css';
import {getMyData} from "@/api/users";
import {useEffect, useState} from "react";
import {UserData} from "@/model/userData";
import Cookies from "universal-cookie";
import {useRouter} from "next/router";


export default function App({Component, pageProps}: AppProps) {
    const router = useRouter()
    const [data, setData] = useState<UserData>();
    useEffect(() => {

        getMyData().then(value => setData(value))
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    console.log(error)
                }
            });
    }, []);
    return (
        <>
            <NavigationMenu className={"flex w-full justify-between bg-gray-600 h-10"}>
                <div className={"px-5"}>
                    Webfejlesztés
                </div>
                <NavigationMenuList>
                    <NavigationMenuItem className={"px-5"}>
                        <Link href="/me" legacyBehavior passHref>
                            <NavigationMenuLink
                                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded">
                                My data
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={"px-5"}>
                        <Link href="/users" legacyBehavior passHref>
                            <NavigationMenuLink
                                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded">
                                Users
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem className={"px-5"}>
                        {data ? data.username : ""}
                    </NavigationMenuItem>
                    <NavigationMenuItem className={"px-5"}>
                        {data ? data.role : ""}
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    {data ? (
                        <NavigationMenuItem className={"px-5"}>
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink
                                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded"
                                    onClick={async () => {
                                        const cookie = new Cookies();
                                        cookie.remove('jwtToken', {});
                                        try {
                                            const cookie = new Cookies();
                                            setData(undefined);
                                            cookie.remove('jwtToken', {});
                                            await router.push("/");
                                        } catch (error) {
                                            console.error("Logout error:", error);
                                        }
                                    }}>
                                    Log out
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ) : (
                        <>
                            <NavigationMenuItem className={"px-5"}>
                                <Link href="/register" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded">
                                        Register
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem className={"px-5"}>
                                <Link href="/authenticate" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-1 px-2 rounded">
                                        Login
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </>

                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <Component {...pageProps} />
        </>
    )
}
