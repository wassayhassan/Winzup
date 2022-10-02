import React from "react";
import { Textarea } from "flowbite-react";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import NavBar from "../components/navbar.component";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import {IoIosArrowBack} from 'react-icons/io'
import { useNavigate } from "react-router-dom";
import MessageList from "./messagelist.component";
import { Link} from "react-router-dom";
import axios from "axios";
import {io} from 'socket.io-client';
import FriendActiveState from "./friendActive.component";
import ReceivingCallModal from "./receivecallmodal.component";
import VideoCallModal from "./videoCallModal.component";
import FriendCallModal from "./callfriend.component";

function MessageInnerUI({conversationData}){

  
  const socket = useRef();
  const {userData}  =useSelector((state)=> state.auth);
  const [friendId, setFriendId] = useState('');
  const [friendData, setFriendData] = useState({});
  const [socketState, setSocketState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const [receivingOpen, setRecevingOpen] = useState(false);
  const [callAccepted, setAcceptedCall] = useState(false)
  const [callDetails, setCallDetails] = useState({});
  const [currentCallerId, setCallerId] = useState('');
  const [myStream, setMyStream] = useState(null);
  const [signalData, setSignalData] = useState(null);
  const [showVideoCall, setVideoCall] = useState(false);
  const myVideoRef = useRef();
  const friendVideoRef = useRef();
  const connectionRef = useRef();





useEffect(()=> {
  console.log("scoket function called");
  socket.current = io("ws://localhost:5000/");
   setSocketState(socket.current);
   socket.current.on('getMessage', (data)=> {
    
    setArrivalMsg({
      senderId: data.senderId,
      text: data.newMessage,
      createdAt: Date.now()
    })
   });
   
}, []);
useEffect(()=> {
  socket.current.on('callEnded', (from, to)=> {
    console.log('call Ended Received');
    setVideoCall(false);
    myStream?.getTracks().forEach(function(track) {
        track.stop();
    })
  })
  }, []);

useEffect(()=> {
  socket.current.on('calluser', (({callerId, data})=> {
   setRecevingOpen(true);
   setCallDetails(data);
   setSignalData(data);
   setCallerId(callerId);
  })
  )
}, []);
useEffect(()=> {
  if(callAccepted){
     setVideoCall(true);
  }

}, [callAccepted])




useEffect(()=> {
  
   arrivalMsg && conversationData?.members.includes(arrivalMsg.senderId) && setMessages((prev)=> [...prev, arrivalMsg])
}, [arrivalMsg, conversationData]);

  useEffect(()=> {
    socket.current.emit('addUser', userData._id);
    socket.current.on('getUsers', (users)=> {
      console.log(users);
      setActiveUsers(users);
    })
  }, [userData]);
 


 function  msgtextChange(e){
    let value = e.target.value;
    console.log(value);
    setNewMessage(value);
  }
  function sendMsg(){
   let  msgData = {
      senderId: userData._id,
      conversationId: conversationData._id,
      text: newMessage
    }
    let senderId = userData._id;
    let receiverId = conversationData.members.find(mem=> mem !== userData._id);
   socket.current.emit('sendMessage', {
    senderId,
    receiverId,
    newMessage
   });


    axios.post('/api/chat/newmessage', msgData).then((response)=> {
      console.log(response.data);
      setMessages([...messages, response.data]);
    })
    setNewMessage('');
  }




  useEffect(()=> {
    if(conversationData.members){
        let friendid = conversationData.members && conversationData.members.find((mem)=> mem !== userData._id);
        console.log(friendid);
        setFriendId(friendid);
        friendid && axios.post(`/api/user/data/${friendid}`).then((response)=> {
          setFriendData(response.data);
          console.log(response);
         });
         async function getMessages(){
          try{
             let response = await axios.post(`/api/chat/conversation/${conversationData._id}`);
             setMessages(response.data);
             console.log(response.data);
          }catch(err){
            console.log(err);
          }
        };
        getMessages();

    }

  }, [conversationData]);


 
 

  return (

    <div className="container bg-primary min-h-screen max-h-screen flex sm:flex-row md:flex-row lg:flex-row 2xl:flex-row flex-col-reverse">
          <div className=" md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-primary md:bg-primary lg:bg-primary 2xl:bg-primary  w-fit sm:w-20 md:w-20 lg:w-20 2xl:w-20" >
            <NavBar />
         </div>
    <div className="content-container w-full sm:p-2 md:p-2 lg:p-2 2xl:p-2 sm:m-2 md:m-2 lg:m-2 2xl:m-2 sm:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 md:w-2/3 sm:w-2/3 lg:w-2/3 2xl:w-2/3">
        <div className="heading-container">
            
        </div>
        <div className="messageui h-full">
        <div className="header bg-white rounded-md flex flex-row justify-between">
            <div className="flex flex-row">
                <Link to="/messages" className="flex flex-col justify-center cursor-pointer" >
                   <IoIosArrowBack size="1.5em" color="blue" />
                </Link>
                <img src={friendData.profilepic? `/api/user/photo/${friendData.profilepic}`:`/api/user/photo/profilepic-general.png`} alt="" className='rounded-full h-11 w-11 p-1'/>
                <div className="flex flex-col">
                    <p className="font-bold text-black">{friendData && friendData.firstname + ' ' + friendData.lastname}</p>
                    <FriendActiveState activeUsers={activeUsers} friendData = {friendData} />
                </div>
            </div>
            <div className="call-container p-2 cursor-pointer">
             <FriendCallModal friendId={friendId} setAcceptedCall={setAcceptedCall} currentSocket={socket.current} myVideoRef={myVideoRef} friendVideoRef={friendVideoRef} myStream={myStream} setMyStream={setMyStream} signalData={signalData} friendData={friendData} />
            </div>
        </div>
        <div className="messages-container md:h-96 sm:h-96 lg:h-96 2xl:h-96 bg-white m-1 rounded-md overflow-y-scroll  ">
            <MessageList  messages = {messages}/>
        </div>
        
        <div className="sendtext-container p-1 relative">
        <Textarea
            id="msgarea"
            placeholder="Type Something..."
            required={true}
            rows={1}
            onChange={msgtextChange}
            value={newMessage}
        />
        <div className="absolute right-2 top-2">
           <SendIcon onClick={sendMsg} />
   
        </div>
       
        </div>

    </div>
    <div className="modals">
      <ReceivingCallModal receivingOpen={receivingOpen} setRecevingOpen={setRecevingOpen} setAcceptedCall={setAcceptedCall} myStream={myStream} myVideoRef={myVideoRef} friendVideoRef={friendVideoRef} currentSocket={socket.current} callerId={currentCallerId} signalData={signalData} setMyStream={setMyStream}  />
      <VideoCallModal showVideoCall= {showVideoCall} setVideoCall={setVideoCall} acceptedCall={callAccepted} myVideoRef={myVideoRef} friendVideoRef={friendVideoRef} setAcceptedCall={setAcceptedCall} myStream={myStream} currentSocket={socket.current} callerId={currentCallerId} />
    </div>
        
    </div>

</div>
  )
}
export default MessageInnerUI;