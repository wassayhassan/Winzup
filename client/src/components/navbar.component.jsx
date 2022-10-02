import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BiHomeCircle, BiSearch } from "react-icons/bi"
import {AiOutlineHeart, AiOutlineUser} from "react-icons/ai"
import { IoNotifications } from 'react-icons/io5';
import { FiInbox } from "react-icons/fi"
function NavBar(){
    const { pathname } = useLocation();

    let activeClassName = "bg-tertiary p-1 m-2 flex flex-row justify-center rounded-2xl";
    let normalStyle = " p-2  m-2 flex flex-row justify-center rounded-lg hover:bg-tertiary hover:scale-125";

    return (
    <div className = "navbar-container  sm:h-screen md:h-screen lg:h-screen 2xl:h-screen m-2 sticky bottom-0 sm:top-0 md:top-0 lg:top-0 2xl:top-0 flex flex-col justify-center"  >
       <div className="navLinks-container rounded-md sm:w-16 md:w-16 lg:w-16 2xl:w-16">
            <ul className="flex flex-row justify-around sm:flex-col md:flex-col lg:flex-col 2xl:flex-col">
 
                    <NavLink to="/"   className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <BiHomeCircle size="2.5em" color={pathname === '/'? 'blue':'black'}/>
                    </NavLink>
        
               
                
                    <NavLink to="/search" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <BiSearch size="2.5em" color={pathname === '/search'? 'blue':'black'}/>
                    </NavLink>
            
                <NavLink to="/notifications" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <IoNotifications size="2.5em" color={pathname === '/notifications'? 'blue':'black'}/>
                    </NavLink>
    
                    <NavLink to="/messages" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <FiInbox size="2.5em" color={pathname === ('/messages' ||  '/messages/*')? 'blue':'black'}/>
                    </NavLink>
                    <NavLink to="/user/profile" className={({ isActive }) =>
         isActive ? activeClassName : normalStyle
        }>
                        <AiOutlineUser size="2.5em" color={pathname === '/user/profile'? 'blue':'black'}/>
                    </NavLink>
             

                
            </ul>
        
        </div> 
            

         
   </div>
)
}
export default NavBar;