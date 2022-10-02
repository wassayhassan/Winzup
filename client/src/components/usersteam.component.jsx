import React from "react";

function UserStream({myStream}){
    console.log(myStream);

    return (
        <video width="750" height="500" autoPlay = {true} >
             <source src={myStream} type="video/mp4"/>
     </video>
    )
}
export default UserStream