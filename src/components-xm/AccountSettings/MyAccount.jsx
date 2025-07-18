import {Card, CardHeader} from "@/components/ui/card.jsx";
import React, {useEffect} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {useAuthStore} from "@/zustland/store.js";
import axiosConn from "@/axioscon.js";
import {toast} from "@/components/hooks/use-toast.js";
import {SidebarTrigger} from "@/components/ui/sidebar.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.jsx";
import {BookOpen, CircleArrowLeft, CircleArrowRight, User} from "lucide-react";
import {Link} from "react-router-dom";


function MyAccount() {
    const {userDetail, fetchUserDetail} = useAuthStore()

    const createAccountSchema = z.object({
        firstName: z.string()
            .min(1, "Name must be at least one character long."),
        lastName: z.string().optional(),
        number: z
            .string()
            .length(10, "Phone number must be 10 digits.")
     });
    const createAccountForm = useForm({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {firstName: "", lastName: "", number: ''},
    });

    useEffect(() => {
        if (userDetail) {
            createAccountForm.reset({
                firstName: userDetail.firstName,
                lastName: userDetail.lastName,
                number: userDetail.number || '',
            });
        }
    }, [userDetail]);

    function onSubmit(data) {
        axiosConn.post(import.meta.env.VITE_API_URL + '/saveUserDetail', {
            firstName: data.firstName,
            lastName: data.lastName,
            number: data.number,
        }).then(res => {
            toast({
                title: "User updated successfully!",
            });
            fetchUserDetail()
        }).catch(err => {
            toast({
                title: "User updation failed!",
            });
        });
    }

    return (
        <>

            <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-2 border-b bg-white px-4">
                <SidebarTrigger className="-ml-1"/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Breadcrumb>
                    <BreadcrumbList>

                        <BreadcrumbItem>
                            <BreadcrumbPage
                                className="truncate max-w-[30ch]">My Account</BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
                <div className="ml-auto sm:flex-initial">

                </div>
            </header>

            <div className="p-3 md:p-6">
                <Card className="rounded-sm border-0 bg-gradient-to-r  from-yellow-300 via-orange-400 to-yellow-700  text-white shadow-2xl mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <CardHeader className="relative z-10 pb-8">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
                                <div className="relative flex-shrink-0">
                                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/20 shadow-xl">
                                        <AvatarFallback className="text-xl sm:text-2xl bg-white/20 text-white font-bold">
                                            {userDetail?.nameInitial}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-400 rounded-full border-2 border-white"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                                        Welcome , {userDetail?.derivedUserName}!
                                    </h1>
                                    <p className="text-blue-100 text-base sm:text-lg flex items-center gap-2 flex-wrap">
                                        <User className="w-4 h-4 flex-shrink-0" />
                                        <span className="break-words">Member since {userDetail?.created_date}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col xs:flex-row gap-3 w-full lg:w-auto">
                                <Link to={'/explore'}>   <Button
                                    variant="secondary"
                                    className="bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm w-full xs:w-auto justify-center xs:justify-start"
                                >
                                    <BookOpen className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span className="whitespace-nowrap">Explore Courses</span>
                                </Button> </Link>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <div className="my-16">
                    <Form {...createAccountForm}>
                        <form
                            onSubmit={createAccountForm.handleSubmit(onSubmit)}
                            className="w-full space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid w-full   items-center gap-1.5">
                                    <FormField
                                        control={createAccountForm.control}
                                        name="firstName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="First Name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <FormField
                                        control={createAccountForm.control}
                                        name="lastName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Last Name" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid w-full  items-center gap-1.5">

                                    <Label htmlFor="email">Email</Label>
                                    <Input type="email" id="email" value={userDetail.email} readOnly/>
                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <FormField
                                        control={createAccountForm.control}
                                        name="number"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Phone Number</FormLabel>
                                                <FormControl>

                                                    <Input
                                                        {...field}
                                                        type="text" // change to text to allow better control
                                                        placeholder="Phone Number"
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        onChange={(e) => {
                                                            const cleaned = e.target.value.replace(/\D/g, ""); // remove non-digits
                                                            field.onChange(cleaned);
                                                        }}
                                                        value={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <Label htmlFor="language">Language</Label>
                                    <Input type="text" id="language" value="English" readOnly/>
                                </div>
                                <div className="grid w-full  items-center gap-1.5">
                                    <Label htmlFor="country">Country</Label>
                                    <Input type="text" id="country" value="India" readOnly/>
                                </div>
                            </div>
                            <div className="flex gap-4 my-6">
                                <Button onClick={()=> createAccountForm.reset()} variant="outline">Reset</Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

        </>)

}


export default MyAccount;