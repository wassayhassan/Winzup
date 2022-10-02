import React, { useState } from 'react';
import { ListGroup, Checkbox } from 'flowbite-react';

function ShareFriend({friend, shareList, setShareList}){


  function handleChange(e){
   if(e.target.checked){
    setShareList(prev=> prev.concat(e.target.id));
   }else{
    setShareList(shareList.filter(fnd=> fnd !== e.target.id))
   }
  }

    return (
        <>
        <div className='flex flex-row justify-between mt-2'>
            <div className='m-2'>
            <ListGroup.Item >
            {friend.firstname + ' '+ friend.lastname}
            
            </ListGroup.Item>

            </div>
            <div className='m-2'>
               <Checkbox
                id={friend._id}
                name={friend._id}
                defaultChecked={false}
                onChange={handleChange}
                />

            </div>
        </div>
        <hr />
        </>
      
          
        
    )

    

}
export default ShareFriend;