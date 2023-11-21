import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <NavigationMenu className={"flex w-full justify-between bg-gray-600 h-10"}>
                <div className={"px-5"}>
                    Webfejlesztés
                </div>
                <NavigationMenuList>
                    <NavigationMenuItem className={"px-5"}>
                        <Link href="/add_user" legacyBehavior passHref>
                            <NavigationMenuLink>
                                Add
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
