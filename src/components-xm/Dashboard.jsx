import {
  ChevronLeft,
  ChevronRight, Clock,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosConn from "@/axioscon.js";
import {useAuthStore} from "@/zustland/store.js";
import {toast} from "@/components/hooks/use-toast.js";


export function Dashboard() {
  const {userDetail} = useAuthStore()
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [courseList, setCourseList] = useState({});
  const [apiQuery, setApiQuery] = useState({
    limit: limit, offset: offset, getThisData: {
      datasource: "User",  attributes: [], where : {userId: userDetail?.userId},
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
        .post("http://localhost:3000/searchCourse", apiQuery)
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
        .post("http://localhost:3000/disroll", {
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


  return (
    <div  className="p-6">
      <Card className="border-0 bg-[#ffdd00]">
        <CardHeader>
          <div className="flex flex-sm justify-items-center gap-4 items-center">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="text-xl">TS</AvatarFallback>
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
              <Input type="text" placeholder="What do you want to learn today ?"/>
              <Button type="submit"><Search/></Button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10 items-center">
              {courseList?.courses?.map(a => (
                  <Card className=" border shadow-sm hover:shadow-md cursor-pointer ">
                    <CardHeader>
                      {/* Badge row - wraps on smaller screens */}
                      <div className="flex flex-wrap gap-2 w-full mb-3">
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
                          <Clock size={18}/>                                             {`${Math.floor(+(a?.courseDuration) / 60)}hr ${+(a?.courseDuration) % 60}min`}
                        </div>
                        <div className="flex flex-row gap-2 items-center mt-2">
                          <span>16% complete</span>
                          <Progress value={66} /></div>



                      </div>
                    </CardContent>

                    <CardFooter className="flex gap-2 ">
                      <Button className="  w-full  " variant="destructive" onClick={()=> disroll(a?.courseId)}>Leave Course</Button>
                      <Link to={`/course/${a?.courseId}`} className="  w-full "><Button className="  w-full ">Learn More</Button>
                      </Link>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
