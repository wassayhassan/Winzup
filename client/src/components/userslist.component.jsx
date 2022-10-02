import React from "react";
import User from "./user.component";

function UserTableList({users}){
  
    return (
        users && users.map((user)=> {
          return <User user={user} key={user._id} />
        })
    )
}
export default UserTableList;