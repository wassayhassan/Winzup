import { Modal, Button } from "flowbite-react";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { MdCallEnd } from 'react-icons/md'
import  { IoMdCall } from 'react-icons/io';

function ReceivingCallModal({receivingOpen, setRecevingOpen, setAcceptedCall, myStream,myVideoRef, friendVideoRef, currentSocket,callerId, callDetails, signalData, setMyStream}){

   const {userData} = useSelector(state=> state.auth);
   const [callerDetails, setCallerDetails] = useState({});

   function getVideo(){
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream)=> {
    setMyStream(stream); 
       myVideoRef.current.srcObject = stream;
    })
}
  useEffect(()=> {
    axios.post(`/api/user/data/${callerId}`).then((response)=> {
     setCallerDetails(response.data);
    })
  },[callerId])


  function handleAccept(){
    console.log(signalData);
      // getVideo();
      const peer = new Peer({initiator: false, trickle: false, stream: myStream});
      
      peer.signal(JSON.stringify(signalData));
      peer.on("signal", (data)=> {
  
        currentSocket.emit('callAccepted', {callerid: callerId, receiverId: userData._id, data: data});

      });

      
      peer.on("stream", (currentStream)=> {
         console.log("stream received")
        friendVideoRef.current.srcObject = currentStream;
      });
      peer.on('close', ()=> {
        console.log('connection closed');
      })
      peer.on('error', (err)=> {
        console.log(`Error: ${err} `);
      })
      

      setAcceptedCall(true);;
      handleClose();
  }
  function handleReject(){
    currentSocket.emit('rejectedCall', {from: userData._id, to: callerId});
    setRecevingOpen(false);
    setAcceptedCall(false)
    handleClose();
  }
    function handleClose(){
       setRecevingOpen(false);
    }
    return (
        <>
            <Modal
                show={receivingOpen}
                onClose={handleClose}
            >
                <Modal.Body>
                <div className="space-y-6">
                <p className="font-semibold text-2xl"> {callerDetails.firstname? callerDetails.firstname+' '+ callerDetails.lastname: 'Friend'} is Calling</p> 
  
                </div>
                </Modal.Body>
                <Modal.Footer>
                  <div className="flex flex-row justify-end">
                      <div onClick={()=> {handleAccept() }} className="flex flex-col justify-around mx-3 cursor-pointer" >
                          <div className="flex flex-row justify-center items-center bg-blue-500 rounded-full h-10 w-20">
                            <IoMdCall color="white" size='1.5em' />
                          </div>
                          
                        <p className="ml-4"> Accept</p>
                    </div>
                    <div
                        color="red"
                        onClick={()=> {
                          handleReject()
                        }}
                        className="flex flex-col justify-around mx-3 cursor-pointer"
                    >
                      <div className="flex flex-row justify-center items-center bg-red-500 rounded-full  h-10 w-20">
                         <MdCallEnd color="white" size="1.5em" />
                      </div>
                        <p className="ml-4">Decline</p> 
                    </div>

                  </div>
              
                </Modal.Footer>
            </Modal>
</>
    )

}
export default ReceivingCallModal;