import { Modal, Button } from "flowbite-react";
import {useState} from 'react'
import {MdCallEnd}from 'react-icons/md';
import {useSelector} from 'react-redux'
function VideoCallModal({showVideoCall, setVideoCall, acceptedCall, myVideoRef, friendVideoRef, setAcceptedCall, myStream, currentSocket, callerId}){

    const {userData} = useSelector(state=> state.auth);
    
    function handleClose(){

    currentSocket.emit('callEnded', {from: userData._id, to: callerId});
       setVideoCall(false);
       setAcceptedCall(false);
       myStream?.getTracks().forEach(function(track) {
        track.stop();
      });
      
       
    }
    return (
        <>
            <Modal
                show={showVideoCall}
                onClose={handleClose}
            >
                <Modal.Body>
                <div className="space-y-6">

                    <hr />
                    <div className="receivervideo w-full h-96 rounded-md border-2 relative ">  
                     <div className="bg-red-100 h-full w-full rounded-lg">
                       <video className="w-full h-full rounded-lg" ref={friendVideoRef} autoPlay/>
                    </div> 
                      <div className="absolute bottom-5 right-5 w-36 h-36 border-2 rounded-lg border-black">
                      <video className="w-full h-full" muted ref={myVideoRef} autoPlay/>
                    </div>
                    <div className="absolute bottom-5 left-1/2 right-1/2 h-14 w-14 rounded-full bg-red-500 cursor-pointer flex flex-row justify-center items-center">
                    <MdCallEnd color="white" size="1.8em"
                    onClick={()=> { handleClose()  }} />

                    </div>

                    </div>


                </div>
                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>
</>
    )

}
export default VideoCallModal;