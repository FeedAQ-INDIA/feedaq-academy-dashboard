import {Clock, Search, Terminal,} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Progress} from "@/components/ui/progress";
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosConn from "@/axioscon.js";
import {useAuthStore} from "@/zustland/store.js";
import {toast} from "@/components/hooks/use-toast.js";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.jsx";


export function Dashboard() {
    const {userDetail,  userEnrolledCourseIdList, fetchUserEnrolledCourseIdList} = useAuthStore()
    const navigate = useNavigate()

    const [totalCount, setTotalCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [courseList, setCourseList] = useState(null);
    const [apiQuery, setApiQuery] = useState({
        limit: limit, offset: offset, getThisData: {
            datasource: "User", attributes: [], where: {userId: userDetail?.userId},
            include: [{
                datasource: "Course", as: "courses", required: false, order: [], attributes: [], where: {},
            },
            ],
        },
    });

    useEffect(() => {
        fetchCourses();
    }, [apiQuery]);

    const fetchCourses = () => {
        axiosConn
            .post(import.meta.env.VITE_API_URL+"/searchCourse", apiQuery)
            .then((res) => {
                console.log(res.data);
                setCourseList(res.data.data?.results?.[0]);
                setTotalCount(res.data.data.totalCount);
                setOffset(res.data.data.offset);
                setLimit(res.data.data.limit);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const disroll = (courseId) => {
        axiosConn
            .post(import.meta.env.VITE_API_URL+"/disroll", {
                courseId: courseId
            })
            .then((res) => {
                console.log(res.data);
                toast({
                    title: 'Disrollment is successfull'
                });
                fetchCourses()
             })
            .catch((err) => {
                console.log(err);
                toast({
                    title: 'Error occured while Disrollment'
                })
            });
    }


    const [exploreCourseText, setExploreCourseText] = useState("");

    return (
        <div className="p-6">
            <Card className="border-0 bg-[#ffdd00]">
                <CardHeader>
                    <div className="flex flex-sm justify-items-center gap-4 items-center">
                        <Avatar className="w-12 h-12">
                            <AvatarFallback className="text-xl">{userDetail?.nameInitial}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-medium">Welcome {userDetail?.derivedUserName}</h1>
                            <p>Member since {userDetail?.created_date}</p>
                        </div>
                    </div>


                </CardHeader>
            </Card>

            <Card className="border-0 bg-muted/50  my-6 py-6">
                <CardHeader>
                    <CardTitle className="text-center">
                        What would you like to learn today ?
                    </CardTitle>


                </CardHeader>
                <CardContent>
                    <div className="my-2">
                        <div className="flex gap-2 w-full md:w-3/4 lg:w-1/2 mx-auto items-center">
                            <Input type="text" value={exploreCourseText} onChange={(e)=> setExploreCourseText(e.target.value)} placeholder="What do you want to learn today ?"/>
                            <Button type="submit" onClick={()=> navigate('/explore?search='+exploreCourseText)}><Search/></Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-0 bg-muted/50  my-6">
                <CardHeader>
                    <CardTitle>
                        My Journey
                    </CardTitle>


                </CardHeader>
                <CardContent>
                    <div className="my-2">
                        {courseList?.courses?.filter(a => a.user_enrollment?.enrollmentStatus!= 'COMPLETED' && a.user_enrollment?.enrollmentStatus!= 'CERTIFIED')?.length > 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 items-center">
                            {courseList?.courses?.filter(a =>  a.user_enrollment?.enrollmentStatus!= 'COMPLETED' && a.user_enrollment?.enrollmentStatus!= 'CERTIFIED')?.map(a => (
                                <Card className=" border shadow-sm hover:shadow-md cursor-pointer ">
                                    <CardHeader>
                                        {/* Badge row - wraps on smaller screens */}
                                        <div className="flex flex-wrap gap-2 w-full mb-3">
                                            <Badge className="animate-blink bg-green-600 text-white">FREE</Badge>
                                            <Badge variant="outline">Course</Badge>
                                            <Badge variant="outline">Beginner</Badge>
                                        </div>

                                        {/* Title with responsive spacing */}
                                        <div className=" ">
                                            <CardTitle className="text-lg sm:text-xl  font-semibold">
                                                {a?.courseTitle}
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="mb-2 line-clamp-3">{a?.courseDescription}</p>
                                        {/*<p className="my-2 animate-blink text-blue-800 font-medium"> Registration Started</p>*/}
                                        <div className="font-medium  ">
                                            <div className="flex gap-2 items-center">
                                                <Clock
                                                    size={18}/> {`${Math.floor(+(a?.courseDuration) / 60)}hr ${+(a?.courseDuration) % 60}min`}
                                            </div>
                                            {/*<div className="flex flex-row gap-2 items-center mt-2">*/}
                                            {/*    <span>16% complete</span>*/}
                                            {/*    <Progress value={66}/></div>*/}


                                        </div>

                                    </CardContent>

                                    <CardFooter className="flex w-full flex-wrap gap-2">
                                        <Button className=" flex-1 " variant="destructive"
                                                onClick={() => disroll(a?.courseId)}>Leave Course</Button>
                                        <Link to={`/course/${a?.courseId}`} className="  flex-1 "><Button
                                            className="  w-full ">Learn More</Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                        :
                            <Alert>   <Terminal className="h-4 w-4" />
                                <div className="flex flex-row md:flex-row flex-wrap gap-2 items-center">
                                    <div>
                                        <AlertTitle>No Enrollment found</AlertTitle>
                                        <AlertDescription>
                                            <p>You are not enrolled in any course</p>

                                        </AlertDescription>
                                    </div>

                                     <div className="md:ml-auto">
                                         <Link to='/explore'>
                                             <Button className="mt-2 flex-1" size={'sm'}>Start your journey today</Button>
                                         </Link>
                                    </div>
                                </div>

                            </Alert>}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
