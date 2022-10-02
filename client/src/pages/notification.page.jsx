import React from 'react';
import NavBar from '../components/navbar.component';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import NotificationList from '../components/notificationlist.component';

function NotificationsPage(){
    const [notifications, setNotifications] = useState([]);
    const {userData}  = useSelector(state=> state.auth);
    const navigate = useNavigate();

    useEffect(()=> {
      if(!userData){
        navigate('/auth/user/login');
       }else if(userData.verifiedStatus === 'false'){
        navigate('/user/verification/page');
       }else{
        axios.post('/api/notification/getbyuserid', {userId: userData._id}).then((response)=> {
          console.log(response.data);
          setNotifications(response.data);
        }).catch((err)=> {
          console.log(err);
        })
       }

    }, [])

    return (
        <div className="container bg-primary min-h-screen flex flex-row w-screen">
            <div className="fixed w-screen bottom-0 z-10 md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-transparent md:bg-transparent lg:bg-transparent 2xl:bg-transparent sm:w-20 md:w-20 lg:w-20 2xl:w-20">
                <NavBar />
            </div>
            <div className="content-container md:p-2 lg:p-2 2xl:p-2 md:m-2 lg:m-2 2xl:m-2 md:ml-3 lg:ml-3 2xl:ml-3  md:w-2/3 lg:w-2/3 2xl:w-2/3">
                <div className="heading-container">
                    <p className="font-bold text-blue-500 text-2xl text-left">Notifications</p>
                </div>
                <div className='notifications-container'>
                   <NotificationList notifications={notifications}/>
                </div>

            </div>
        </div>
    )
}
export default NotificationsPage