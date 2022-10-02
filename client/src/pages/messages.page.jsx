import React from "react";
import NavBar from "../components/navbar.component";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from 'axios';
import {AiOutlineEdit} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import {Button} from 'flowbite-react';
import NewMessage from "../components/newmessage.component";
import Conversation from "../components/conversation.component";

function Messages(){
  const navigate = useNavigate();
  const [conversationz, setConversationz] = useState([]);
  const {userData} = useSelector((state)=> state.auth);
  const [editState, setEditState] = useState(false);
 

    useEffect(()=> {
       if(!userData){
        navigate('/user/login');
       }else if(userData.verifiedStatus === 'false'){
        navigate('/user/verification/page');
       }else{
        axios.post(`/api/chat/conversations/${userData._id}`).then((response)=> {
          setConversationz(response.data);
         })
       }

      
    }, [userData]);
    function changeEditState(){
      setEditState(!editState);
    }

  return (

    <div className="container bg-primary min-h-screen flex flex-row">
          <div className="fixed w-full bottom-0 z-10 md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-transparent md:bg-transparent lg:bg-transparent 2xl:bg-transparent sm:w-20 md:w-20 lg:w-20 2xl:w-20">
            <NavBar />
         </div>
    <div className="content-container p-2 m-2 ml-3 w-full ">
    
        <div className="heading-container">
            <p className="font-bold text-blue-500 text-2xl text-left">Messages</p>
        </div>
        <div className = "messages-container min-h-screen relative bg-white w-full rounded-md ">
        <div className="actions-conatiner w-full flex flex-row justify-between p-2">
          <div className="hover:scale-110">
              <Button onClick={changeEditState} >
              <AiOutlineEdit size="1.5em" />
                <p className="text-base">Edit</p> 
              </Button>
          </div>
          <div className="newmessage-container">
             
          <NewMessage/>
        </div>
        </div>
        <div className="coversations-controller">
          {
            conversationz && conversationz.map((con)=> {
            return <Conversation conversation={con} currentUserId={userData._id} key={con._id} editState={editState}/>
            })
          }
           
        </div>
        
        
          
          
        </div>
        
    </div>
</div>
  )
}
export default Messages;