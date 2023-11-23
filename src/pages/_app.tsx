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


export default function App({Component, pageProps}: AppProps) {
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
                            <NavigationMenuLink>
                                My data
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={"px-5"}>
                        <Link href="/users" legacyBehavior passHref>
                            <NavigationMenuLink>
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
                    <NavigationMenuItem className={"px-5"}>
                        <Link href="/register" legacyBehavior passHref>
                            <NavigationMenuLink>
                                Register
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className={"px-5"}>
                        <Link href="/authenticate" legacyBehavior passHref>
                            <NavigationMenuLink>
                                Login
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <Component {...pageProps} />
        </>
    )
}
