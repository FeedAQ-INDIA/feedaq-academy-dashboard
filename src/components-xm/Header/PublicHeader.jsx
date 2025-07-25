import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {LogIn, Menu, Play} from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import NavigationMenuDemo from "./nav-menu.jsx"
import {useAuthStore} from "@/zustland/store.js";
import {useEffect, useState} from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export default function PublicHeader( ) {

    const {userDetail, fetchUserDetail} = useAuthStore();

    const [updatedUserDetail, setUpdatedUserDetail] = useState(userDetail)
    //
    // useEffect(() => {
    //
    //     const api = async () => {
    //         await fetchUserDetail();
    //         setUpdatedUserDetail(useAuthStore.getState().userDetail);
    //      }
    //
    //      if(!userDetail){
    //           api()
    //     }
    // },[])


    return (
        <header className="flex h-16 items-center justify-between bg-white px-4 shadow-md border-b">
            {/* Logo */}
            <a
                className="text-2xl sm:text-3xl font-medium text-black"
                href="/"
                style={{ fontFamily: "Anta" }}
            >
                Fee
                <span className="text-[#ffdd00]">d</span>AQ{" "}
                <span
                    className="font-normal"
                    style={{
                        fontFamily: [
                            "Lucida Sans",
                            "Lucida Sans Regular",
                            "Lucida Grande",
                            "Lucida Sans Unicode",
                            "Geneva",
                        ],
                    }}
                >
          Academy
        </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4 ml-4">
                {/*<NavigationMenuDemo />*/}
                <Link to={'/'}><Button variant={window.location.pathname=='/' ? 'secondary' : 'ghost'} >HOME</Button></Link>
                <Link to={'/explore'}><Button variant="ghost" variant={location.pathname.includes('explore') ? 'secondary' : 'ghost'}>EXPLORE</Button></Link>

                {/*<NavigationMenu viewport={false}>*/}
                {/*    <NavigationMenuList className="flex flex-col sm:flex-row gap-2 w-full">*/}
                {/*        <NavigationMenuItem>*/}
                {/*            <NavigationMenuTrigger>List</NavigationMenuTrigger>*/}
                {/*            <NavigationMenuContent>*/}
                {/*                <ul className="grid w-fit gap-2 p-4">*/}
                {/*                    <li className=" ">*/}
                {/*                        <NavigationMenuLink asChild>*/}
                {/*                            <Link href="#"         className="block rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors"*/}
                {/*                            >*/}
                {/*                                <div className="font-medium">Components</div>*/}

                {/*                            </Link>*/}
                {/*                        </NavigationMenuLink>*/}
                {/*                    </li>*/}
                {/*                    <li>*/}
                {/*                        <NavigationMenuLink asChild>*/}
                {/*                            <Link href="#"         className="block rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors"*/}
                {/*                            >*/}
                {/*                                <div className="font-medium">Documentation</div>*/}

                {/*                            </Link>*/}
                {/*                        </NavigationMenuLink>*/}
                {/*                    </li>*/}
                {/*                    <li>*/}
                {/*                        <NavigationMenuLink asChild>*/}
                {/*                            <Link href="#"         className="block rounded-md px-3 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors"*/}
                {/*                            >*/}
                {/*                                <div className="font-medium">Blog</div>*/}

                {/*                            </Link>*/}
                {/*                        </NavigationMenuLink>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </NavigationMenuContent>*/}
                {/*        </NavigationMenuItem>*/}
                {/*    </NavigationMenuList>*/}
                {/*</NavigationMenu>*/}

                  </div>

            {/* Right-side button */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
                {updatedUserDetail ?  <Link to={`/account-settings/profile`}>
                    <Button variant="secondary">
                        {updatedUserDetail?.nameInitial}
                    </Button>
                </Link> : <a href={`/dashboard`}>
                    <Button variant="secondary" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-black-700 hover:to-black-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ">
                        <Play />  GET STARTED
                    </Button>
                </a> }

            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden ml-auto">
                {updatedUserDetail ?  <a href={`/signin`}>
                    <Button variant="secondary">
                        <Play />
                    </Button>
                </a> : <a href={`/dashboard`}>
                    <Button variant="secondary" className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-black-700 hover:to-black-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] ">
                        <Play />
                    </Button>
                </a> }

            </div>
        </header>
    )
}
