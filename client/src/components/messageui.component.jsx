import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {IoIosArrowBack} from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import { getAll } from "../slices/blogSlice";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import MessageInnerUI from "./messageinnerui.component";

function MessageUI(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const {userData}  = useSelector((state)=> state.auth);

  const [conversationData, setConversationData] = useState({});

  async function getConvData(){
    
    let response = await axios.post(`/api/chat/findcoversation/${params.id}`);
    if(response){
    setConversationData(response.data);
  }
}
 
  let friendid;
    useEffect(()=> {
       if(!userData){
        navigate('/auth/user/login');
       }
       getConvData();

       
      dispatch(getAll())
    }, []);

  return (
   <MessageInnerUI conversationData = {conversationData}/>
  )
}
export default MessageUI;