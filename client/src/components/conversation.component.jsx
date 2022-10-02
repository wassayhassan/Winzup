import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";
import {AiOutlineUser, AiFillDelete} from 'react-icons/ai';
import { motion } from "framer-motion"

function Conversation({conversation, currentUserId, editState}){
    const[friendDat, setFriendDat] = useState({});
    const [anim, setAnim] = useState({});
    const [deleted, setDeleted] = useState(false);

    let friendid = conversation.members.find((mem)=> mem !== currentUserId);
    useEffect(()=> {
        axios.post(`/api/user/data/${friendid}`).then((response)=> {
            setFriendDat(response.data);
            })
    }, [])
    function deleteConversation(){
       axios.delete(`/api/chat/conversation/${conversation._id}`).then((response)=> {
        if(response.data.error === 'false'){
            setDeleted(true);
        }
       })
    }
    useEffect(()=> {
       if(editState){
        setAnim({rotate:[0,1,0,-1,0]});
       }else{
        setAnim({});
       }

    }, [editState])

    return (!deleted) && (
        <div className="flex flex-row ml-5">
            { editState && 
            <div className="flex flex-col justify-center">          
              <AiFillDelete color="red" size="1.7em" className="cursor-pointer hover:scale-125" onClick={deleteConversation}/>     
            </div>
            }

            <Link to={`/messages/${conversation._id}`}>
             <motion.div className='friend flex flex-row h-16 p-2 w-96  m-1 cursor-pointer rounded-md bg-slate-100' animate={anim} transition={editState && {repeat: Infinity}}>
                <img src={friendDat.profilepic? `/api/user/photo/${friendDat.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className='h-10 rounded-full w-10 p-1'/>
                <div className='flex flex-col justify-center ml-2'>
                <p className='text-black'>{ friendDat && friendDat.firstname + ' ' + friendDat.lastname}</p>
                </div>
                
             </motion.div>
             </Link>
         </div>
    )

}
export default Conversation;