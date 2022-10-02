import React from "react";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {format} from 'timeago.js';


function Notification({notification}){
   const [senderData, setSenderData] = useState({});
   useEffect(()=> {
     axios.post(`api/user/data/${notification.senderId}`).then((response)=> {
         setSenderData(response.data);
     })
   }, [])
    return(
        <div className="bg-white flex flex-row rounded-md h-14 m-1 p-2">
            
            <div>
            <img src={senderData.profilepic? `/api/user/photo/${senderData.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className=' w-8 h-8 rounded-full' />
            </div>
            <div className="flex flex-col">
            <p className="text-left font-semibold ml-1">{JSON.stringify(notification.message)}</p>
            <p className="font-light text-xs text-left ml-2">{format(notification.createdAt)}</p>
            </div>
        </div>
    )
}
export default Notification;