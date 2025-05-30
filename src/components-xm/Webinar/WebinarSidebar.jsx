import * as React from "react";
import {useEffect, useState} from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar.jsx";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible.jsx";
import {Check, ChevronRight, CircleChevronLeft, Clock, Loader, SquareArrowLeft} from "lucide-react";
import {Separator} from "@/components/ui/separator.jsx";
import {useWebinar} from "@/components-xm/Webinar/WebinarContext.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";


function WebinarSidebar({...props}) {
    const location = useLocation();
    const navigate = useNavigate();
    const {WebinarId} = useParams();

    const [data, setData] = useState(null);

    const {userEnrollmentObj, userEnrollmentWebinarLog, isUserEnrolledAlready, courseList, enroll, disroll, enrollStatus,identifyContentTypeIcons} = useWebinar();


    const contentUrlMap = {
        'WebinarVideo' :  'video',
        'WebinarWritten' :  'doc',
        'WebinarQuiz' :  'quiz',
        'ComprehensionReading' :  'comprehension-reading',
    }

    useEffect(() => {
        if (courseList && location.pathname) {
            let vav =  courseList?.courseTopic?.map(a => (
                {
                    title: a?.courseTopicTitle,
                    url: `/webinar/${courseList?.courseId}`,
                    isClickable: false,
                    isActive: location.pathname === ``,
                    subItems: a?.courseTopicContent?.map(m => ({
                        title: m?.courseTopicContentTitle,
                        courseTopicContentId : m?.courseTopicContentId,
                        contentType:m?.courseTopicContentType,
                        url: `/webinar/${courseList?.courseId}/${contentUrlMap[m?.courseTopicContentType]}/${m?.contentId}`,
                        isClickable: true,
                        isActive: location.pathname === `/webinar/${courseList?.courseId}/${contentUrlMap[m?.courseTopicContentType]}/${m?.contentId}`,
                    }))
                }
            ))

            setData({
                navMain: [
                    {
                        title: `` , url: "#", items: [{
                            title: "OVERVIEW",
                            url: `/webinar/${courseList?.courseId}`,
                            isClickable: true,
                            isActive: location.pathname === `/webinar/${courseList?.courseId}`,
                        },
                        ].concat(vav),
                    },]
            })

        }else{
            return  <div>Loading...</div>
        }
    }, [courseList, location.pathname])

    return (<>
        <Sidebar className="top-[4rem] h-[calc(100svh-4em)]    shadow-lg px-0 border-r " style={{borderRadius: '0px', overflowY: 'auto'}}
        >

            <SidebarHeader>
                <h2 className="text-lg font-medium   text-black text-center">{courseList?.courseTitle} </h2>
                <div className=" ">
                    {/*{userEnrollmentObj?.enrollmentStatus  ?*/}
                    {/*    <Badge  className="animate-blink bg-blue-600 text-white"  variant="outline">*/}
                    {/*        {userEnrollmentObj?.enrollmentStatus}</Badge>*/}
                    {/*    : <></>}*/}

                    {/*<p className=" text-xs font-medium text-muted-foreground text-center mb-2" >*/}
                    {/*         COURSE STATUS - {userEnrollmentObj?.enrollmentStatus  || ''}*/}

                    {/*</p>*/}
                    <p  className="completed-stamp text-base tracking-wide"   >
                        <span className="text-black font-light">Webinar Status</span> : {userEnrollmentObj?.enrollmentStatus}</p>
                    <Link to={'/explore'}>
                        <Button className="w-full flex gap-2 text-muted-foreground" size="sm" variant="ghost"><SquareArrowLeft />Explore more courses</Button>
                    </Link>
                </div>
            </SidebarHeader>
            <Separator/>
            <SidebarContent >


                {data?.navMain?.map((item) => (<SidebarGroup key={item?.title}  className="font-medium text-xs">
                    <SidebarGroupLabel>{item.title}</SidebarGroupLabel>


                    <SidebarGroupContent>
                        <SidebarMenu>
                            {item?.items?.map((item) => (item?.subItems?.length > 0 ? (<Collapsible key={item?.title}>
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item?.title}
                                                               className="py-5 rounded-1">

                                                <span>{item?.title}</span>
                                                <ChevronRight
                                                    className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item?.subItems?.map((subItem) => (

                                                    <SidebarMenuSubItem>
                                                        {subItem?.isClickable? <SidebarMenuSubButton asChild
                                                                                                     isActive={subItem?.isActive}
                                                                                                     className="flex items-center gap-1 py-2 rounded-1 h-fit">
                                                                <Link to={subItem?.url}><div className="flex items-center gap-2">

                                                                    {userEnrollmentWebinarLog?.filter(b => b.courseId == WebinarId && b?.courseTopicContentId == subItem?.courseTopicContentId && b.enrollmentStatus == 'COMPLETED')?.length > 0?
                                                                        <Avatar className="border shadow-sm">
                                                                            <AvatarFallback><Check  color="#11a72a" className="flex-shrink-0"/></AvatarFallback>
                                                                        </Avatar> :  <Avatar  className="border shadow-sm">
                                                                            <AvatarFallback> </AvatarFallback>
                                                                        </Avatar> }

                                                                    {/*<div>{identifyContentTypeIcons(subItem.contentType)}</div>*/}
                                                                    <div className="">{subItem?.title} </div>


                                                                </div></Link>
                                                            </SidebarMenuSubButton> :
                                                            <SidebarMenuSubButton asChild
                                                                                  isActive={subItem?.isActive}
                                                                                  className="flex items-center gap-1 py-5 rounded-1 h-fit">
                                                                <div className="flex items-center gap-1">
                                                                    <div>{identifyContentTypeIcons(subItem.contentType)}</div>
                                                                    <div>{<span>{subItem.title}</span>}</div>
                                                                </div>
                                                            </SidebarMenuSubButton> }
                                                    </SidebarMenuSubItem>))}

                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>) : (<SidebarMenuItem key={item?.title}>
                                    <SidebarMenuButton asChild isActive={item?.isActive}
                                                       className="py-5 rounded-1">
                                        {item?.isClickable?  <Link to={item?.url}>{item?.title}</Link>: <span>{item?.title}</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>)

                            ))}

                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>))}


            </SidebarContent>


        </Sidebar>
    </ >);
}

export default WebinarSidebar