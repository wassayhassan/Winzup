import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'


function Friend({friendid, conversations}){
   const {userData} = useSelector((state)=> state.auth);
   const navigate = useNavigate();
   
    const [friendData, setFriendData] = useState({});
    useEffect(()=> {
      axios.post(`/api/user/data/${friendid}`).then((response)=> {
         setFriendData(response.data);
         })
    }, [])
   

   function handleClick(){
       let conversation = conversations?.filter((con)=> {
        return con.members.includes(friendid);
       
       })[0];
       console.log(conversation);
       if(conversation){
         navigate(`/messages/${conversation._id}`);
       }else{
         let data = {
            senderId: userData._id,
            receiverId: friendid
         }
          axios.post('/api/chat/createconversation',data).then((response)=>{
            console.log(response.data);
            if(response.data._id){
               navigate(`/messages/${response.data._id}`)
            }
          })
       }
   }

   return (
    
     <div className='friend bg-slate-50 flex flex-row h-10 w-96 border m-1 cursor-pointer rounded-md' onClick={handleClick}>
        <img src={(friendData && friendData.profilepic)? `/api/user/photo/${friendData.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className='h-10 rounded-full w-10 p-1'/>
        <div className='flex flex-col justify-center ml-2'>
        <p >{ friendData && friendData.firstname + ' ' + friendData.lastname}</p>
        </div>
        
     </div>
     
   )
}
export default Friend;