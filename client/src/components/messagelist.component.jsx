import { useSelector } from 'react-redux';
import React from 'react';
import Message from './message.component';
import { useRef,useEffect } from "react";

function MessageList({messages}){
    const scrollRef = useRef();
    const {userData}  = useSelector((state)=> state.user);
 
    useEffect(()=> {
        scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
       }, [messages]);


    return(
         <>
             {messages && messages.map((msg)=> {
                return(
                    <div ref={scrollRef} key={msg._id}>
                        <Message   messageData={msg} userData= {userData} />
                    </div>
        
                      )
                  })}  
        </>
        )
    
}
export default MessageList;