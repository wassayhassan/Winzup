import React from "react";
import Notification from "./notification.component";

function NotificationList({notifications}){
    return (
        notifications.map(notification=> {
          return   <Notification notification={notification} key={notification._id} />
        
         }
        )
    )
}
export default NotificationList;