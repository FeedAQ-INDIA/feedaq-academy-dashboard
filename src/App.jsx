import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Header from "./components-xm/Header/Header.jsx";
import React, {useEffect} from "react";
import {useAuthStore, useProtectedURIStore} from "@/zustland/store.js";
import "./App.css"
import PublicHeader from "@/components-xm/Header/PublicHeader.jsx";
import HomePage from "@/components-xm/HomeFiles/HomePage.jsx";
import {LoaderOne} from "@/components/ui/loader.jsx";


function App() {
    const navigate = useNavigate();
    const location = useLocation();


    const {fetchUserDetail, loading: loadingStore, userDetail, fetchUserEnrolledCourseIdList} = useAuthStore();
    const {publicUri} = useProtectedURIStore();


    useEffect(() => {
        if (window.location.pathname !== '/') {
            fetchUserDetail();
        }
    }, []);




    useEffect(() => {
         if ((userDetail === null || userDetail === undefined) && !loadingStore) {
            console.log('redirecting to signin')
             if(!publicUri.includes(window.location.pathname)) {
                 window.location = '/signin';
             }
        } else{
            fetchUserEnrolledCourseIdList(userDetail?.userId);
            console.log('App.jsx  :: ', location.pathname)
            //  if(location.pathname == '/') {
            //     navigate('/dashboard')
            // }
        }

    }, [userDetail]); // Redirect only after userDetail updates


    if (window.location.pathname === '/') {
        return <HomePage />;
    }


    // if (loadingStore) {
    //     return <div>Loading...</div>; // Display loading screen until both data are ready
    // }
    if(loadingStore){
        return (
            <div className="flex items-center justify-center h-[100svh] w-full">
                <LoaderOne />
            </div>
        )
    }

    return (
        <>
                 {publicUri.includes(window.location.pathname) ? <></> :<Header/>}
                <div className={`overflow-y-auto ${publicUri.includes(window.location.pathname) ? '' : 'h-[calc(100svh-4em)]' }`}>
                    <Outlet/>
                </div>


        </>
    );
}

export default App;
