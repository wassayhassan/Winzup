import { Modal, Button } from "flowbite-react";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Peer from 'simple-peer';
import {useSelector}  from 'react-redux';
import { IoCallOutline } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";

const FriendCallModal = ({friendId, setAcceptedCall,  myVideoRef, friendVideoRef, myStream, setMyStream, currentSocket, signalData, friendData})=>{

  const connectionRef = useRef();
  const {userData}  =useSelector(state=> state.auth);


 function callUser(){

  navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((stream)=> {
    setMyStream(stream);
    console.log(stream)
       myVideoRef.current.srcObject = stream;
   
 

      
      const peer = new Peer({initiator: true, trickle: false, stream: stream});
      peer.on("signal", (data)=> {
          currentSocket.emit('calluser', {userId: userData._id, receiverId: friendId, data: data});

      })
      currentSocket.on('callAccepted', ({callerid, receiverId, data})=> {
        console.log(data);
        peer.signal(JSON.stringify(data));
        setAcceptedCall(true);
        handleClose();
    }); 

      
      
      peer.on("stream", (currentStream)=> {
        console.log(currentStream)
        friendVideoRef.current.srcObject = (currentStream);
      })

      
      connectionRef.current = peer;
    })
    
  }



    const [open, setOpen] = useState(false);

    useEffect(()=> {
      currentSocket && currentSocket.on('rejectedCall', (({from, to})=> {
          console.log('rejected received');
          myStream?.getTracks().forEach(function(track) {
            track.stop();
          });
          handleClose();

            
        })
        )
      }, [currentSocket]);

 
    function handleOpen(){
        console.log('open called');
        setOpen(true)
        callUser();
    }


    function handleClose(){
       setOpen(false);
    }


 
    return (
        <>
        <Button onClick={handleOpen} className="cursor-pointer">
          <IoCallOutline size="1.5em" color='white' className="cursor-pointer"/>
        </Button>

            <Modal
                show={open}
                onClose={handleClose}
            >
                <Modal.Header>
                You are Calling {friendData.firstname + ' ' + friendData.lastname}
                </Modal.Header>
                <Modal.Body>
                <div className="space-y-6 ">
                    <video muted ref={myVideoRef} autoPlay={true} /> 
                </div>
                </Modal.Body>
                <Modal.Footer>
                <div className="flex flex-row justify-center">
                 <div className="absolute bottom-5 left-1/2 right-1/2 h-14 w-14 rounded-full bg-red-500 cursor-pointer flex flex-row justify-center items-center">
                    <MdCallEnd color="white" size="1.8em"
                     onClick={()=> {
                      handleClose();
                    }} />

                    </div>
                </div>
                </Modal.Footer>
            </Modal>
</>
    )

}
export default FriendCallModal;