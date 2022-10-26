import React from "react";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {format} from 'timeago.js';
import parse from 'html-react-parser';
import {useSelector} from 'react-redux';



function Notification({notification}){
   const [senderData, setSenderData] = useState({});
   const {userData } = useSelector(state=> state.auth)
   const readStyle = "bg-white flex flex-row rounded-md h-14 m-1 p-2";
   const unreadStyle = "bg-blue-100 flex flex-row rounded-md h-14 m-1 p-2"
   useEffect(()=> {
     axios.post(`api/user/data/${notification.senderId}`).then((response)=> {
         setSenderData(response.data);
     })
   }, [])
   useEffect(()=> {
    
    if(notification.read !== "true"){
        axios.post(`/api/notification/update/read/${notification._id}`);
    }
   }, [])
   if(notification.senderId === userData._id) return null
    return(
        <div className={notification.read === 'true'? readStyle: unreadStyle}>
            
            <div>
            <img src={senderData.profilepic? `/api/user/photo/${senderData.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className=' w-8 h-8 rounded-full' />
            </div>
            <div className="flex flex-col">
            <p className="text-left font-semibold ml-1">{parse(notification.message)}</p>
            <p className="font-light text-xs text-left ml-2">{format(notification.createdAt)}</p>
            </div>
        </div>
    )
}
export default Notification;