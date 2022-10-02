import React from 'react'
import { useEffect } from 'react';


function HeaderPic({userData}){

     return(
        <img src={userData.headerpic? `/api/user/photo/${userData.headerpic}`: `/api/user/photo/profilepic-general.png`} alt="" className='h-full w-full rounded-md' />
     )
 
}
export default HeaderPic;