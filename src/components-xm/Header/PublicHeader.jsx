import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {LogIn, Menu, Play} from "lucide-react"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import NavigationMenuDemo from "./nav-menu.jsx"

export default function PublicHeader( ) {



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
                <Link to={'/'}><Button variant="ghost">HOME</Button></Link>
                <Link to={'/browse'}><Button variant="ghost">EXPLORE</Button></Link>
            </div>

            {/* Right-side button */}
            <div className="hidden md:flex items-center gap-2 ml-auto">
                <a href={`/dashboard`}>
                    <Button variant="secondary" className="">
                        <Play />  GET STARTED
                    </Button>
                </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden ml-auto">
                <a href={`/signin`}>
                    <Button variant="secondary">
                        <Play />
                    </Button>
                </a>
                {/*<Sheet>*/}
                {/*    <SheetTrigger asChild>*/}
                {/*        <Button variant="ghost" size="icon">*/}
                {/*            <Menu className="h-5 w-5" />*/}
                {/*        </Button>*/}
                {/*    </SheetTrigger>*/}
                {/*    <SheetContent side="right" className="p-4 w-64">*/}
                {/*        <div className="flex flex-col gap-4 mt-4">*/}
                {/*            /!*<NavigationMenuDemo orientation={"vertical"}/>*!/*/}
                {/*<a href={`/signin`}>*/}
                {/*    <Button variant="secondary">*/}
                {/*        <LogIn /> GET STARTED*/}
                {/*    </Button>*/}
                {/*</a>*/}
                {/*        </div>*/}
                {/*    </SheetContent>*/}
                {/*</Sheet>*/}
            </div>
        </header>
    )
}
