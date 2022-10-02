import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {TbNews} from 'react-icons/tb';
import {TbReportAnalytics} from "react-icons/tb"
import {  FiUsers, FiSettings } from "react-icons/fi"
import {MdSpaceDashboard} from 'react-icons/md';
function DashNav(){
    const { pathname } = useLocation();

    let activeClassName = "bg-blue-400 p-1 m-2 flex flex-row justify-center rounded-2xl";
    let normalStyle = " p-2  m-2 flex flex-row justify-center rounded-lg hover:bg-blue-300";

    return (
    <div className="navbar-container  h-screen m-2  sticky top-0 flex flex-col mt-14 "  >
       <div className="navLinks-container bg-blue-200 rounded-md w-16">
            <ul>
 
                    <NavLink to="/admin/dashboard/home"   className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <MdSpaceDashboard size="2.5em" color={pathname === '/admin/dashboard/home'? 'black':'black'}/>
                    </NavLink>
        
               
                
                    <NavLink to="/admin/dashboard/users" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <FiUsers size="2.5em" color={pathname === '/admin/dashboard/users'? 'blue':'black'}/>
                    </NavLink>
            
    
                    <NavLink to="/admin/dashboard/posts" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <TbNews size="2.5em" color={pathname === '/admin/dashboard/posts'? 'blue':'black'}/>
                    </NavLink>

                    <NavLink to="/admin/dashboard/reports" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <TbReportAnalytics size="2.5em" color={pathname === '/admin/dashboard/reports'? 'blue':'black'}/>
                    </NavLink>

                    {/* <NavLink to="/admin/dashboard/settings" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <FiSettings size="2.5em" color={pathname === 'admin/dashboard/settings'? 'blue':'black'}/>
                    </NavLink> */}
             

                
            </ul>
        
        </div> 
            

         
   </div>
)
}
export default  DashNav;