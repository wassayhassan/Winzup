import React from "react";
import {format} from 'timeago.js'
function Message({messageData, userData}){
  let own = (messageData.senderId === userData._id);

  let cssowner  = "flex flex-row justify-end";
  let cssother = 'flex flex-row justify-start';

   return(
    <div className="w-full">
      <div className={own? cssowner: cssother}>
        <div className="flex flex-col">
          <p className={own? 'bg-messageColorOwn text-right rounded-xl m-1 p-1': 'bg-white text-left  rounded-xl m-1 p-1'}>{messageData.text}</p>
          <p  className={own? ' m-1 text-right font-light text-xs ': 'm-1 text-left font-light text-xs  '}>{format(messageData.createdAt)}</p>
        </div>

      </div>

    </div>
   )
}
export default Message;