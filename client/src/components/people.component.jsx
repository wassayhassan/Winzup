import React from 'react';
import Button from '@mui/material/Button';
import {AiOutlineUserAdd} from 'react-icons/ai';
import {useSelector, useDispatch} from "react-redux";
import { addFriend, remFreind } from '../slices/authSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

function People({user}){
    const dispatch = useDispatch();
     
     const {userData} = useSelector((state)=> state.auth);
     console.log(userData.friends);
     console.log(user._id);
function addUser(){
    dispatch(addFriend({id: user._id})).then(()=> {
      axios.post('/api/notification/create', {receiverId: user._id, senderId: userData._id, message: `${user.firstname+" "+user.lastname} added you as friend`});
    });    
}
function removeFriend(){
    dispatch(remFreind({id: user._id}));
}

    let isFriend = false;
    userData.friends.forEach((friend)=> {
          if(friend.friend === user._id){
            isFriend = true;
          }
    })

     return (
        
        <div className='user bg-primary p-2 rounded-md flex flex-row justify-between'>
          <Link  to={`/search/profile/${user._id}`}>
          <p className='text-black'>{user.firstname + ' ' +user.lastname}</p> 
          </Link> 
          {isFriend?           <Button variant="contained" endIcon={<AiOutlineUserAdd/>} onClick={removeFriend} > Friends </Button>
:           <Button variant="contained" endIcon={<AiOutlineUserAdd/>} onClick={addUser} > Add Friend</Button>}

        </div>
        
     )
}
export default People;