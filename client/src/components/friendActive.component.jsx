import React from "react";

function FriendActiveState({activeUsers, friendData}){
    return(
        <p className="text-gray-600 font-light text-sm">{(activeUsers && activeUsers.find(user=> user.userId === friendData._id))? 'Active': ''}</p>

    )
}
export default FriendActiveState;