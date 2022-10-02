import React from 'react'
import { useEffect } from 'react';
import { AiOutlineUser} from "react-icons/ai"

function ProfilePic({userData}){
    useEffect(()=> {

    }, [userData])

        return (    
            <img src={userData.profilepic? `/api/user/photo/${userData.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className='h-full w-28 rounded-full' />
     )
    
       
    
 
}
export default ProfilePic;