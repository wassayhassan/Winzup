import React from "react";
import HomeUser from "./homeuser.component";

function HomeUserTableList({users}){
  
    return (
        users && users.map((user)=> {
          return <HomeUser user={user} key={user._id} />
        })
    )
}
export default HomeUserTableList;